import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Voeg test personen toe (zonder bestaande data te verwijderen voor veiligheid)
  const persons = [
    { name: 'Alice Johnson', age: 28 },
    { name: 'Bob Smith', age: 34 },
    { name: 'Charlie Brown', age: 22 },
    { name: 'Diana Prince', age: 31 },
    { name: 'Erik van der Berg', age: 45 },
    { name: 'Fatima Al-Rashid', age: 29 },
    { name: 'Giovanni Rossi', age: 38 },
    { name: 'Hannah Lee', age: 26 },
  ]

  let createdCount = 0
  for (const personData of persons) {
    try {
      await prisma.person.create({
        data: personData,
      })
      createdCount++
      console.log(`✅ Created: ${personData.name}`)
    } catch (error) {
      console.log(`⚠️  Skipped: ${personData.name} (mogelijk al bestaat)`)
    }
  }

  console.log(`\n🎉 Created ${createdCount} new persons`)

  // Toon alle personen
  const allPersons = await prisma.person.findMany({
    orderBy: { id: 'asc' }
  })
  console.log(`\n📋 Total persons in database: ${allPersons.length}`)
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
