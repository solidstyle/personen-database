'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Person {
  id: number
  name: string
  age: number
  createdAt: string
}

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Haal alle personen op
  const fetchPersons = async () => {
    try {
      const response = await fetch('/api/persons')
      if (response.ok) {
        const data = await response.json()
        setPersons(data)
      }
    } catch (error) {
      console.error('Error fetching persons:', error)
    }
  }

  // Voeg een nieuwe persoon toe
  const addPerson = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !age) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim(), age: parseInt(age) }),
      })

      if (response.ok) {
        setName('')
        setAge('')
        fetchPersons() // Herlaad de lijst
      }
    } catch (error) {
      console.error('Error adding person:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Laad personen bij het opstarten
  useEffect(() => {
    fetchPersons()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Personen Database
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Voeg personen toe aan de database
            </p>
            <Link
              href="/admin"
              className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>

          {/* Formulier */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Nieuwe Persoon Toevoegen
            </h2>
            <form onSubmit={addPerson} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Naam
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Voer een naam in"
                  required
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Leeftijd
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Voer een leeftijd in"
                  min="1"
                  max="150"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !name.trim() || !age}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Toevoegen...' : 'Persoon Toevoegen'}
              </button>
            </form>
          </div>

          {/* Personen lijst */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Personen Lijst ({persons.length})
            </h2>
            {persons.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Nog geen personen toegevoegd
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {persons.map((person) => (
                  <div key={person.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                      {person.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Leeftijd: {person.age} jaar
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Toegevoegd: {new Date(person.createdAt).toLocaleDateString('nl-NL')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
