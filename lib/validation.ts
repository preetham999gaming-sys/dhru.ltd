import { z } from 'zod'

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  mobile: z.string().optional(),
})

export const LoginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(6),
})

export const CreditSpendSchema = z.object({
  userId: z.string().uuid(),
  cost: z.number().int().positive(),
  reason: z.string().min(1),
})

export const PredictionRequestSchema = z.object({
  userId: z.string().uuid(),
  symbol: z.string().min(1),
})
