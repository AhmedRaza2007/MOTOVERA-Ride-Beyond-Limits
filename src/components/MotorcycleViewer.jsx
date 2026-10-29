import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshReflectorMaterial, useGLTF, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'
import { RotateCcw, Play, Pause, Minus, Plus, Maximize, Volume2, VolumeX, Sun, Moon } from 'lucide-react'

/* =====================================================================
   MODEL PATH — put bmw_s1000_rr.glb inside your /public/models/ folder
   ===================================================================== */
const MODEL_URL = '/models/bmw_s1000_rr.glb'

/* =====================================================================
   MATERIAL MAP — which glTF material name gets tinted by which prop.
   These names come directly from the downloaded BMW S1000RR glb.
   If a color lands on the wrong part after you test it locally, tell
   me which part is wrong and I'll correct the material name below.
   ===================================================================== */
const MATERIAL_MAP = {
  paint: ['vehicle_paint1', 'vehicle_paint1_DASHBOARD'],
  wheelColor: ['vehicle_generic_smallspecmap_WHEEL'],
  seatColor: ['bride_alcantara'],
  accent: ['bmw_m1krr_brakes'],
}

/* Node-name patterns used to find the headlight / brakelight meshes
   so we can light them up. */
const HEADLIGHT_PATTERN = /headlight/i
const BRAKELIGHT_PATTERN = /brakelight|taillight/i

/* ============================== REAL BIKE MODEL ============================== */
function BikeModel({ paint, wheelColor, seatColor, accent, autoSpin, lightsOn }) {
  const group = useRef()
  const { scene } = useGLTF(MODEL_URL)

  // IMPORTANT: this model's wheels are bound to the body via a
  // bone/skeleton rig. A plain scene.clone(true) does NOT correctly
  // re-link skinned meshes to their skeleton, which is exactly why
  // the wheels were detaching from the body and no longer moving
  // with it. SkeletonUtils.clone() clones bones + skin bindings
  // correctly, so every part stays properly connected.
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene])

  // Collect references to headlight / brakelight meshes once
  const lightMeshes = useMemo(() => {
    const heads = []
    const brakes = []
    cloned.traverse((child) => {
      if (!child.isMesh) return
      if (HEADLIGHT_PATTERN.test(child.name)) heads.push(child)
      if (BRAKELIGHT_PATTERN.test(child.name)) brakes.push(child)
    })
    return { heads, brakes }
  }, [cloned])

  // Collect unique materials by name for fast lookup, and make sure
  // each material we plan to tint is NOT shared with unrelated meshes
  const materialsByName = useMemo(() => {
    const map = {}
    cloned.traverse((child) => {
      if (!child.isMesh) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((m) => {
        if (m && m.name && !map[m.name]) {
          // clone so tinting this material never affects other objects
          const fresh = m.clone()
          child.material = Array.isArray(child.material)
            ? child.material.map((mm) => (mm.name === m.name ? fresh : mm))
            : fresh
          map[m.name] = fresh
        }
      })
    })
    return map
  }, [cloned])

  // Apply shadows once
  useEffect(() => {
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [cloned])

  // Auto-fit: every downloaded glb is modeled at its own real-world
  // scale (meters, cm, etc). Instead of guessing a scale number, we
  // measure the model's actual bounding box and normalize it so it
  // always ends up the right size, centered, and sitting on the
  // floor — regardless of the source file's original units.
  useEffect(() => {
    // CRITICAL: force every child's world matrix to be computed right
    // now. Without this, Box3().setFromObject() measures the model
    // before its nested parts (wheels, tank, fairing...) have their
    // real world transforms applied — giving a bogus box where some
    // parts look "sunk" or misplaced after we scale/reposition.
    cloned.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    if (!maxDim || !isFinite(maxDim)) return

    const TARGET_LENGTH = 2.2 // desired bike length in scene units
    const scale = TARGET_LENGTH / maxDim
    cloned.scale.setScalar(scale)
    cloned.updateMatrixWorld(true) // re-sync after changing scale

    // re-measure after scaling to center it and drop it onto y = 0
    const box2 = new THREE.Box3().setFromObject(cloned)
    const center2 = new THREE.Vector3()
    box2.getCenter(center2)
    cloned.position.x -= center2.x
    cloned.position.z -= center2.z
    cloned.position.y -= box2.min.y
    cloned.updateMatrixWorld(true) // re-sync after repositioning
  }, [cloned])

  // One-time diagnostic: print every material name this particular
  // model load actually has, so a mismatch (if any) is easy to spot
  // in the browser console (F12 → Console tab).
  useEffect(() => {
    if (import.meta.env?.DEV) {
      console.log('[MotorcycleViewer] materials found on this model:', Object.keys(materialsByName))
    }
  }, [materialsByName])

  // Tint materials whenever a color prop changes.
  // Matches by EXACT name first, and falls back to a case-insensitive
  // "contains" match — so small naming differences between loads
  // still get caught instead of silently doing nothing.
  const applyTint = (names, hex) => {
    if (!hex) return
    const lowerTargets = names.map((n) => n.toLowerCase())
    let matched = 0
    Object.entries(materialsByName).forEach(([matName, mat]) => {
      const lower = matName.toLowerCase()
      const isMatch = lowerTargets.some((t) => lower === t || lower.includes(t))
      if (isMatch && mat && mat.color) {
        mat.color.set(hex)
        matched++
      }
    })
    if (import.meta.env?.DEV && matched === 0) {
      console.warn(`[MotorcycleViewer] no material matched for`, names, '— check the names logged above.')
    }
  }

  useEffect(() => applyTint(MATERIAL_MAP.paint, paint), [paint, materialsByName])
  useEffect(() => applyTint(MATERIAL_MAP.wheelColor, wheelColor), [wheelColor, materialsByName])
  useEffect(() => applyTint(MATERIAL_MAP.seatColor, seatColor), [seatColor, materialsByName])
  useEffect(() => applyTint(MATERIAL_MAP.accent, accent), [accent, materialsByName])

  // Headlight / brakelight glow toggle
  useEffect(() => {
    lightMeshes.heads.forEach((mesh) => {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      mats.forEach((m) => {
        if (!m) return
        m.emissive = new THREE.Color(lightsOn ? '#dfefff' : '#000000')
        m.emissiveIntensity = lightsOn ? 3.5 : 0
      })
    })
    lightMeshes.brakes.forEach((mesh) => {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      mats.forEach((m) => {
        if (!m) return
        m.emissive = new THREE.Color(lightsOn ? '#ff1c1c' : '#000000')
        m.emissiveIntensity = lightsOn ? 3 : 0
      })
    })
  }, [lightsOn, lightMeshes])

  useFrame((_, delta) => {
    if (autoSpin && group.current) group.current.rotation.y += delta * 0.4
  })

  return (
    <group ref={group}>
      {/* scale/position are now set automatically above via the
          bounding-box auto-fit effect, not hardcoded here. */}
      <primitive object={cloned} />

      {/* Extra point lights sitting at approximate headlight / tail
          position so the glow actually lights up the floor/fog too,
          not just the emissive material itself. */}
      {lightsOn && (
        <>
          <pointLight position={[1.4, 1, 0]} color="#bfe0ff" intensity={3} distance={5} />
          <pointLight position={[-1.3, 1.1, 0]} color="#ff2200" intensity={2} distance={4} />
        </>
      )}
    </group>
  )
}

useGLTF.preload(MODEL_URL)

function ModelFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-silver">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <span className="text-[10px] tracking-[0.3em]">LOADING BIKE…</span>
      </div>
    </Html>
  )
}

/* ====================== ASPHALT-8 STYLE RING ======================= */
function GlowRing() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <mesh>
        <torusGeometry args={[2.1, 0.022, 12, 100]} />
        <meshStandardMaterial color="#ff6a00" emissive="#ff5500" emissiveIntensity={3.2} />
      </mesh>
      <mesh>
        <torusGeometry args={[2.45, 0.01, 12, 100]} />
        <meshStandardMaterial color="#ff2200" emissive="#E10600" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[0, 0, 1.2]} color="#ff5500" intensity={2.5} distance={6} />
    </group>
  )
}

/* ========================== PARTICLES ============================== */
function Particles({ count = 140 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 5
      const a = Math.random() * Math.PI * 2
      arr[i * 3] = Math.cos(a) * r
      arr[i * 3 + 1] = Math.random() * 5
      arr[i * 3 + 2] = Math.sin(a) * r
    }
    return arr
  }, [count])

  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.05 })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ffb37a" transparent opacity={0.7}
        sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

/* ======================= ENGINE SOUND (WebAudio) =================== */
function useEngineSound() {
  const ctxRef = useRef(null)
  const nodesRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!playing) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!ctxRef.current) ctxRef.current = new Ctx()
      const ctx = ctxRef.current
      const osc = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      osc.type = 'sawtooth'; osc.frequency.value = 55
      osc2.type = 'square'; osc2.frequency.value = 110
      gain.gain.value = 0.05
      lfo.frequency.value = 9; lfoGain.gain.value = 8
      lfo.connect(lfoGain); lfoGain.connect(osc.frequency)
      osc.connect(gain); osc2.connect(gain); gain.connect(ctx.destination)
      osc.start(); osc2.start(); lfo.start()
      nodesRef.current = { osc, osc2, lfo, gain }
      setPlaying(true)
    } else {
      const n = nodesRef.current
      if (n) {
        n.gain.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.1)
        setTimeout(() => { n.osc.stop(); n.osc2.stop(); n.lfo.stop() }, 300)
      }
      setPlaying(false)
    }
  }
  return { playing, toggle }
}

/* ========================= VIEW PRESETS ============================ */
const VIEW_MODES = {
  Studio: { pos: [3.6, 1.7, 4.4], target: [0, 0.8, 0] },
  Performance: { pos: [4.6, 0.8, 1.4], target: [0, 0.7, 0] },
  Detail: { pos: [1.2, 1.6, 1.7], target: [0.2, 1.05, 0] },
}

/* ============================ MAIN VIEWER ========================== */
export default function MotorcycleViewer({
  paint = '#E10600',
  wheelColor = '#111114',
  seatColor = '#101012',
  accent = '#A7A7A7',
  viewMode = 'Studio',
  className = '',
  showControls = true,
}) {
  const controlsRef = useRef()
  const cameraRef = useRef()
  const containerRef = useRef()
  const [autoRotate, setAutoRotate] = useState(true)
  const [lightsOn, setLightsOn] = useState(true)
  const { playing, toggle: toggleSound } = useEngineSound()

  const applyPreset = () => {
    const p = VIEW_MODES[viewMode] || VIEW_MODES.Studio
    if (cameraRef.current) {
      cameraRef.current.position.set(...p.pos)
      cameraRef.current.lookAt(...p.target)
    }
    if (controlsRef.current) {
      controlsRef.current.target.set(...p.target)
      controlsRef.current.update()
    }
  }

  useEffect(applyPreset, [viewMode]) // eslint-disable-line

  const zoom = (dir) => {
    if (cameraRef.current && controlsRef.current) {
      const v = cameraRef.current.position.clone()
        .sub(controlsRef.current.target)
        .multiplyScalar(dir > 0 ? 0.85 : 1.18)
      cameraRef.current.position.copy(controlsRef.current.target.clone().add(v))
    }
  }

  const fullscreen = () => {
    const el = containerRef.current
    if (!document.fullscreenElement) el?.requestFullscreen?.()
    else document.exitFullscreen?.()
  }

  const btn = 'flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-silver transition-all hover:border-accent hover:text-accent'

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [3.6, 1.7, 4.4], fov: 40 }}
        onCreated={({ camera }) => { cameraRef.current = camera }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 9, 20]} />

        {/* Asphalt-8 style lighting */}
        <ambientLight intensity={0.3} />
        <spotLight position={[6, 9, 5]} angle={0.5} penumbra={1} intensity={2.5} castShadow color="#eaf2ff" />
        <spotLight position={[-7, 5, -5]} angle={0.6} penumbra={1} intensity={3} color="#E10600" />
        <pointLight position={[0, 4, -5]} color="#3a66ff" intensity={1.4} />

        {/* reflective dark floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 80]}
            resolution={1024}
            mixBlur={1}
            mixStrength={12}
            roughness={0.9}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#08080a"
            metalness={0.6}
            mirror={0.55}
          />
        </mesh>

        <GlowRing />
        <Particles />

        <Suspense fallback={<ModelFallback />}>
          <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.3}>
            <BikeModel
              paint={paint}
              wheelColor={wheelColor}
              seatColor={seatColor}
              accent={accent}
              autoSpin={autoRotate}
              lightsOn={lightsOn}
            />
          </Float>
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enablePan
          enableZoom
          enableRotate
          minDistance={2.4}
          maxDistance={9}
          enableDamping
          dampingFactor={0.06}
        />

        {/* Glow (Asphalt shine) */}
        <EffectComposer>
          <Bloom intensity={0.85} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <p className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 text-[10px] tracking-[0.35em] text-silver/70">
        DRAG • ROTATE • SCROLL / PINCH • ZOOM
      </p>

      {showControls && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full glass px-3 py-2">
          <button onClick={applyPreset} className={btn} title="Reset" aria-label="Reset"><RotateCcw size={16} /></button>
          <button onClick={() => setAutoRotate(!autoRotate)} className={`${btn} ${autoRotate ? '!border-accent !text-accent' : ''}`}
            title="Auto rotate" aria-label="Auto rotate">
            {autoRotate ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={() => zoom(1)} className={btn} title="Zoom in" aria-label="Zoom in"><Plus size={16} /></button>
          <button onClick={() => zoom(-1)} className={btn} title="Zoom out" aria-label="Zoom out"><Minus size={16} /></button>
          <button onClick={fullscreen} className={btn} title="Fullscreen" aria-label="Fullscreen"><Maximize size={16} /></button>
          <button onClick={() => setLightsOn(!lightsOn)} className={`${btn} ${lightsOn ? '!border-accent !text-accent' : ''}`}
            title="Headlights" aria-label="Headlights">
            {lightsOn ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={toggleSound} className={`${btn} ${playing ? '!border-accent !text-accent' : ''}`}
            title="Engine sound" aria-label="Sound">
            {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      )}
    </div>
  )
}