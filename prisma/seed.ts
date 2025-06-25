import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Verwijder bestaande data (optioneel)
  await prisma.person.deleteMany({})

  // Voeg test personen toe
  const persons = await prisma.person.createMany({
    data: [
      { name: 'Alice Johnson', age: 28 },
      { name: 'Bob Smith', age: 34 },
      { name: 'Charlie Brown', age: 22 },
      { name: 'Diana Prince', age: 31 },
      { name: 'Erik van der Berg', age: 45 },
      { name: 'Fatima Al-Rashid', age: 29 },
      { name: 'Giovanni Rossi', age: 38 },
      { name: 'Hannah Lee', age: 26 },
    ],
  })

  console.log(`✅ Created ${persons.count} persons`)

  // Toon alle personen
  const allPersons = await prisma.person.findMany()
  console.log('\n📋 All persons in database:')
  allPersons.forEach((person) => {
    console.log(`  ${person.id}: ${person.name} (${person.age} jaar)`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('\n🎉 Seeding completed!')
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
