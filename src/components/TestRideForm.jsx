import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { testRideSchema } from '../utils/validation.js'

const MODELS = ['Motovera X1', 'Motovera X1R', 'Motovera Sport']

function Field({ label, error, children, counter }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-[11px] tracking-[0.2em] text-silver">{label}</label>
        {counter}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -8, filter: 'blur(3px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <AlertCircle size={12} /> {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TestRideForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [shake, setShake] = useState(false)

  const {
    register, handleSubmit, watch, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(testRideSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '', city: '',
      date: '', time: '', motorcycle: '', experience: '', message: '',
    },
  })

  const messageLen = watch('message')?.length || 0

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await new Promise((r) => setTimeout(r, 1600)) // API call simulation
      console.log('TEST RIDE:', data)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const onInvalid = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
        className="glass flex flex-col items-center rounded-2xl p-12 text-center">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}>
          <CheckCircle2 size={64} className="text-green-500" />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-bold tracking-[0.2em]">REQUEST RECEIVED</h3>
        <p className="mt-3 max-w-sm text-sm text-silver">
          Your test ride request has been submitted successfully. Our team will contact you shortly to confirm your slot.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-ghost mt-8">BOOK ANOTHER RIDE</button>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : {}}
      transition={{ duration: 0.45 }}
      className="glass rounded-2xl p-6 md:p-10"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="FIRST NAME *" error={errors.firstName}>
          <input className="field" placeholder="Ali" {...register('firstName')} />
        </Field>
        <Field label="LAST NAME *" error={errors.lastName}>
          <input className="field" placeholder="Khan" {...register('lastName')} />
        </Field>
        <Field label="EMAIL *" error={errors.email}>
          <input type="email" className="field" placeholder="you@example.com" {...register('email')} />
        </Field>
        <Field label="PHONE *" error={errors.phone}>
          <input className="field" placeholder="03001234567" {...register('phone')} />
        </Field>
        <Field label="CITY *" error={errors.city}>
          <input className="field" placeholder="Lahore" {...register('city')} />
        </Field>
        <Field label="MOTORCYCLE *" error={errors.motorcycle}>
          <select className="field" {...register('motorcycle')}>
            <option value="" className="bg-carbon">Select model</option>
            {MODELS.map((m) => <option key={m} value={m} className="bg-carbon">{m}</option>)}
          </select>
        </Field>
        <Field label="PREFERRED DATE *" error={errors.date}>
          <input type="date" className="field [color-scheme:dark]" {...register('date')} />
        </Field>
        <Field label="PREFERRED TIME *" error={errors.time}>
          <input type="time" className="field [color-scheme:dark]" {...register('time')} />
        </Field>
        <div className="md:col-span-2">
          <Field label="RIDING EXPERIENCE">
            <select className="field" {...register('experience')}>
              <option value="" className="bg-carbon">Select (optional)</option>
              <option value="beginner" className="bg-carbon">Beginner</option>
              <option value="intermediate" className="bg-carbon">Intermediate</option>
              <option value="advanced" className="bg-carbon">Advanced</option>
            </select>
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field
            label="MESSAGE *"
            error={errors.message}
            counter={
              <span className={`text-[11px] tabular-nums ${messageLen > 500 ? 'text-red-400' : 'text-silver'}`}>
                {messageLen} / 500
              </span>
            }>
            <textarea rows={4} className="field resize-none" placeholder="Tell us about your preferred ride route..." {...register('message')} />
          </Field>
        </div>
      </div>

      {status === 'error' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={16} /> Something went wrong. Please try again.
        </motion.p>
      )}

      <button type="submit" disabled={isSubmitting || status === 'loading'} className="btn-primary mt-8 w-full md:w-auto">
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> PROCESSING...</>
        ) : (
          'BOOK TEST RIDE'
        )}
      </button>
    </motion.form>
  )
}