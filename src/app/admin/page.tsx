'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Person {
  id: number
  name: string
  age: number
  createdAt: string
}

export default function AdminPage() {
  const [persons, setPersons] = useState<Person[]>([])
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

  // Verwijder een persoon
  const deletePerson = async (id: number) => {
    if (!confirm('Weet je zeker dat je deze persoon wilt verwijderen?')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/persons/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPersons() // Herlaad de lijst
      }
    } catch (error) {
      console.error('Error deleting person:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Laad personen bij het opstarten
  useEffect(() => {
    fetchPersons()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Beheer alle personen in de database
            </p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Terug naar Homepage
            </Link>
          </div>

          {/* Statistieken */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Totaal Personen
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {persons.length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Gemiddelde Leeftijd
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {persons.length > 0 
                  ? Math.round(persons.reduce((sum, p) => sum + p.age, 0) / persons.length)
                  : 0
                }
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Jongste Persoon
              </h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {persons.length > 0 
                  ? Math.min(...persons.map(p => p.age))
                  : 0
                }
              </p>
            </div>
          </div>

          {/* Personen tabel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Alle Personen ({persons.length})
              </h2>
            </div>
            
            {persons.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Nog geen personen in de database
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Naam
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Leeftijd
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Toegevoegd
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Acties
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {persons.map((person) => (
                      <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          #{person.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {person.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {person.age} jaar
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(person.createdAt).toLocaleString('nl-NL')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deletePerson(person.id)}
                            disabled={isLoading}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? 'Verwijderen...' : 'Verwijderen'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
