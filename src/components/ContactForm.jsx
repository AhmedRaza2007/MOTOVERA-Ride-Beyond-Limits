import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { contactSchema } from '../utils/validation.js'

function Field({ label, error, children, counter }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-[11px] tracking-[0.2em] text-silver">{label}</label>
        {counter}
      </div>
      {children}
      {error && (
        <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle size={12} /> {error.message}
        </motion.p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const {
    register, handleSubmit, watch, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  })

  const messageLen = watch('message')?.length || 0

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await new Promise((r) => setTimeout(r, 1500))
      console.log('CONTACT:', data)
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="NAME *" error={errors.name}>
          <input className="field" placeholder="Your name" {...register('name')} />
        </Field>
        <Field label="EMAIL *" error={errors.email}>
          <input type="email" className="field" placeholder="you@example.com" {...register('email')} />
        </Field>
        <Field label="PHONE" error={errors.phone}>
          <input className="field" placeholder="03001234567 (optional)" {...register('phone')} />
        </Field>
        <Field label="SUBJECT *" error={errors.subject}>
          <input className="field" placeholder="How can we help?" {...register('subject')} />
        </Field>
        <div className="md:col-span-2">
          <Field
            label="MESSAGE *"
            error={errors.message}
            counter={<span className="text-[11px] tabular-nums text-silver">{messageLen} / 500</span>}>
            <textarea rows={5} className="field resize-none" placeholder="Write your message (min 20 characters)..." {...register('message')} />
          </Field>
        </div>
      </div>

      {status === 'success' && (
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 text-sm text-green-400">
          <CheckCircle2 size={16} /> Message sent successfully!
        </motion.p>
      )}
      {status === 'error' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={16} /> Something went wrong. Please try again.
        </motion.p>
      )}

      <button type="submit" disabled={isSubmitting || status === 'loading'} className="btn-primary mt-8 w-full md:w-auto">
        {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> SENDING...</> : 'SEND MESSAGE'}
      </button>
    </form>
  )
}