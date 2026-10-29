import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff } from 'lucide-react'
import { loginSchema, registerSchema, passwordStrength } from '../utils/validation.js'

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] tracking-[0.2em] text-silver">{label}</label>
      {children}
      {error && <motion.p initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="mt-1 text-xs text-red-400">{error.message}</motion.p>}
    </div>
  )
}

function PasswordInput({ register, name, placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input type={show ? 'text' : 'password'} placeholder={placeholder} className="field pr-11" {...register(name)} />
      <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-silver hover:text-accent">
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}

export default function AuthModal({ open, onClose }) {
  const [mode, setMode] = useState('login')
  const [pw, setPw] = useState('')
  const strength = passwordStrength(pw)

  const loginForm = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '', remember: false } })
  const regForm = useForm({ resolver: zodResolver(registerSchema), defaultValues: { fullName: '', email: '', password: '', confirmPassword: '', agree: false } })

  const switchMode = (m) => { setMode(m); loginForm.reset(); regForm.reset(); setPw('') }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="glass relative w-full max-w-md rounded-2xl p-8"
            onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-silver hover:text-accent">
              <X size={20} />
            </button>

            <div className="mb-6 flex rounded-lg border border-white/10 p-1">
              {['login', 'register'].map((m) => (
                <button key={m} onClick={() => switchMode(m)}
                  className={`relative flex-1 rounded-md py-2 text-[11px] tracking-[0.25em] uppercase transition-colors ${mode === m ? 'text-white' : 'text-silver hover:text-ivory'}`}>
                  {mode === m && (
                    <motion.span layoutId="auth-tab" className="absolute inset-0 rounded-md bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative z-10">{m === 'login' ? 'Login' : 'Register'}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.form key="login"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
                  className="space-y-4"
                  onSubmit={loginForm.handleSubmit((d) => { console.log('LOGIN', d); onClose() })}>
                  <Field label="EMAIL *" error={loginForm.formState.errors.email}>
                    <input className="field" placeholder="you@example.com" {...loginForm.register('email')} />
                  </Field>
                  <Field label="PASSWORD *" error={loginForm.formState.errors.password}>
                    <PasswordInput register={loginForm.register} name="password" placeholder="••••••••" />
                  </Field>
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex cursor-pointer items-center gap-2 text-silver">
                      <input type="checkbox" className="accent-[#E10600]" {...loginForm.register('remember')} /> Remember me
                    </label>
                    <a href="#" className="text-accent hover:underline">Forgot Password?</a>
                  </div>
                  <button type="submit" className="btn-primary w-full">LOGIN</button>
                </motion.form>
              ) : (
                <motion.form key="register"
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  className="space-y-4"
                  onSubmit={regForm.handleSubmit((d) => { console.log('REGISTER', d); onClose() })}>
                  <Field label="FULL NAME *" error={regForm.formState.errors.fullName}>
                    <input className="field" placeholder="Ahmed Raza" {...regForm.register('fullName')} />
                  </Field>
                  <Field label="EMAIL *" error={regForm.formState.errors.email}>
                    <input className="field" placeholder="you@example.com" {...regForm.register('email')} />
                  </Field>
                  <Field label="PASSWORD *" error={regForm.formState.errors.password}>
                    <div onChange={() => setPw(regForm.getValues('password') || '')}>
                      <PasswordInput register={regForm.register} name="password" placeholder="Min. 8 characters" />
                    </div>
                  </Field>
                  {pw && (
                    <div>
                      <div className="flex gap-1.5">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < strength.score ? strength.color : 'bg-white/10'}`} />
                        ))}
                      </div>
                      <p className="mt-1 text-[11px] text-silver">{strength.label} password</p>
                    </div>
                  )}
                  <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-[11px] leading-relaxed text-silver">
                    <p className="mb-1 text-accent">Password requirements:</p>
                    8+ characters • Uppercase • Lowercase • Number • Special character
                  </div>
                  <Field label="CONFIRM PASSWORD *" error={regForm.formState.errors.confirmPassword}>
                    <PasswordInput register={regForm.register} name="confirmPassword" placeholder="Repeat password" />
                  </Field>
                  <label className="flex cursor-pointer items-start gap-2 text-xs text-silver">
                    <input type="checkbox" className="mt-0.5 accent-[#E10600]" {...regForm.register('agree')} />
                    I agree to the Terms & Conditions
                  </label>
                  {regForm.formState.errors.agree && <p className="text-xs text-red-400">{regForm.formState.errors.agree.message}</p>}
                  <button type="submit" className="btn-primary w-full">CREATE ACCOUNT</button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}