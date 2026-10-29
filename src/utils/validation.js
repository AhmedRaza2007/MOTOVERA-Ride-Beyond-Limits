import { z } from 'zod'

const nameRule = (label) =>
  z.string()
    .min(2, `${label} must be at least 2 characters`)
    .max(40, `${label} must be under 40 characters`)
    .regex(/^[A-Za-z\s]+$/, `${label} can only contain letters and spaces`)

export const phoneRule = z
  .string()
  .regex(/^(?:\+92|0)?3\d{9}$/, 'Enter a valid Pakistani phone (e.g. 03001234567 or +923001234567)')

export const testRideSchema = z.object({
  firstName: nameRule('First name'),
  lastName: nameRule('Last name'),
  email: z.string().email('Enter a valid email address'),
  phone: phoneRule,
  city: z.string().min(2, 'City is required').max(60, 'City name too long'),
  date: z.string().refine((d) => {
    if (!d) return false
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const picked = new Date(d + 'T00:00:00')
    const max = new Date(); max.setDate(max.getDate() + 60)
    return picked >= today && picked <= max
  }, 'Pick a valid date (not in the past, within 60 days)'),
  time: z.string().min(1, 'Preferred time is required'),
  motorcycle: z.string().min(1, 'Please select a motorcycle'),
  experience: z.string().optional(),
  message: z.string().min(20, 'Message must be at least 20 characters').max(500, 'Message must be under 500 characters'),
})

export const contactSchema = z.object({
  name: nameRule('Name'),
  email: z.string().email('Enter a valid email address'),
  phone: phoneRule.optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject is required').max(100, 'Subject too long'),
  message: z.string().min(20, 'Message must be at least 20 characters').max(500, 'Message must be under 500 characters'),
})

export const passwordStrength = (pw = '') => {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score <= 2) return { label: 'Weak', score, color: 'bg-red-500' }
  if (score <= 4) return { label: 'Medium', score, color: 'bg-yellow-500' }
  return { label: 'Strong', score, color: 'bg-green-500' }
}

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    fullName: nameRule('Full name'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    agree: z.literal(true, { errorMap: () => ({ message: 'You must agree to the terms' }) }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })