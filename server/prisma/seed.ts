import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.photo.deleteMany()
  await prisma.participant.deleteMany()
  await prisma.playthrough.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await bcrypt.hash('password123', 10)

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'nestor@example.com',
      username: 'nestor',
      passwordHash
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'john',
      passwordHash
    },
  })

  // Create playthrough
  const playthrough = await prisma.playthrough.create({
    data: {
      userId: user1.id,
      game: 'Terraforming Mars',
      playDate: new Date(),
      location: 'Board Game Cafe',
      notes: 'Great game night',

      participants: {
        create: [
          {
            userId: user1.id,
            name: user1.username,
            score: '82',
            winner: true,
          },
          {
            userId: user2.id,
            name: user2.username,
            score: '76',
          },
          {
            name: 'Sarah',
            score: '65',
          },
        ],
      },

      photos: {
        create: [
          {
            url: 'https://example.com/photo1.jpg',
            caption: 'Final board state',
          },
        ],
      },
    },
    include: {
      participants: true,
      photos: true,
    },
  })

  console.log('Seed complete')
  console.log(playthrough)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })