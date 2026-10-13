import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const packs = [
    { name: 'Starter', credits: 10, priceINR: 99 },
    { name: 'Pro', credits: 50, priceINR: 399 },
    { name: 'Elite', credits: 200, priceINR: 999 },
  ]

  for (const pack of packs) {
    await prisma.creditPack.upsert({
      where: { name: pack.name },
      update: {},
      create: pack,
    })
  }

  const admin = process.env.SEED_ADMIN_EMAIL || 'admin@dhru.ltd'
  const password = process.env.SEED_ADMIN_PASSWORD || 'admin1234'
  const existing = await prisma.user.findUnique({ where: { email: admin } })
  if (!existing) {
    await prisma.user.create({
      data: {
        email: admin,
        passwordHash: await bcrypt.hash(password, 12),
      },
    })
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
