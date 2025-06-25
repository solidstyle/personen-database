import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Haal alle personen op
export async function GET() {
  try {
    const persons = await prisma.person.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(persons)
  } catch (error) {
    console.error('Error fetching persons:', error)
    return NextResponse.json(
      { error: 'Fout bij ophalen van personen' },
      { status: 500 }
    )
  }
}

// POST - Voeg een nieuwe persoon toe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, age } = body

    if (!name || !age) {
      return NextResponse.json(
        { error: 'Naam en leeftijd zijn verplicht' },
        { status: 400 }
      )
    }

    const person = await prisma.person.create({
      data: {
        name: name.trim(),
        age: parseInt(age)
      }
    })

    return NextResponse.json(person, { status: 201 })
  } catch (error) {
    console.error('Error creating person:', error)
    return NextResponse.json(
      { error: 'Fout bij toevoegen van persoon' },
      { status: 500 }
    )
  }
}
