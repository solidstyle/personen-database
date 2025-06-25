import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE - Verwijder een persoon
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is verplicht' },
        { status: 400 }
      )
    }

    await prisma.person.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Persoon succesvol verwijderd' })
  } catch (error) {
    console.error('Error deleting person:', error)
    return NextResponse.json(
      { error: 'Fout bij verwijderen van persoon' },
      { status: 500 }
    )
  }
}
