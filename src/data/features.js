import { Zap, Disc3, Lightbulb, Gauge, ShieldAlert, Flag, Lock, Wifi } from 'lucide-react'

export const TECHNOLOGIES = [
  { id: '01', title: 'ENGINEERING', description: 'A race-derived 998cc powerplant tuned for instant response and linear delivery across the entire rev range.', points: ['998cc inline-four', 'Ride-by-wire throttle', 'Titanium valves'], progress: 96 },
  { id: '02', title: 'PRECISION', description: 'Chassis geometry and mass centralization engineered for razor-sharp handling and total rider confidence.', points: ['Aluminium twin-spar frame', 'Mass centralization', 'Öhlins-style suspension'], progress: 92 },
  { id: '03', title: 'CONTROL', description: 'Layered rider aids that adapt to conditions, giving you the confidence to extract every ounce of performance.', points: ['Cornering ABS', '8-level traction control', 'Wheelie control'], progress: 94 },
  { id: '04', title: 'INTELLIGENCE', description: 'A connected digital ecosystem that brings navigation, telemetry and customization to your fingertips.', points: ['6.5" TFT dash', 'GPS navigation', 'Mobile app sync'], progress: 90 },
]

export const PREMIUM_FEATURES = [
  { icon: Zap, title: 'Race-Tuned Engine', text: '200 HP delivered with surgical precision.' },
  { icon: Disc3, title: 'Advanced Suspension', text: 'Fully adjustable electronic suspension.' },
  { icon: Lightbulb, title: 'Adaptive LED', text: 'Lighting that follows every corner.' },
  { icon: Gauge, title: 'Digital Dashboard', text: 'Full-color TFT with live telemetry.' },
  { icon: ShieldAlert, title: 'Smart Braking', text: 'Cornering ABS with brake assist.' },
  { icon: Flag, title: 'Track Mode', text: 'Lap timing, lean angle and race data.' },
  { icon: Lock, title: 'Smart Security', text: 'Keyless ignition and immobilizer.' },
  { icon: Wifi, title: 'Connected Ride', text: 'OTA updates and phone integration.' },
]