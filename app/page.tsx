'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [compliances, setCompliances] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('Compliances') // ✅ YOUR TABLE NAME
      .select('*')

    if (error) console.log(error)
    else setCompliances(data || [])
  }

  // ✅ ADD NEW
  const addCompliances = async () => {
    if (!name || !date) return alert('Fill all fields')

    const { error } = await supabase.from('Compliances').insert([
      {
        name,
        due_date: date,
        status: 'pending',
      },
    ])

    if (!error) {
      setName('')
      setDate('')
      fetchData()
    }
  }

  // ✅ MARK COMPLETE
  const markComplete = async (id: string) => {
    await supabase
      .from('Compliances')
      .update({ status: 'completed' })
      .eq('id', id)

    fetchData()
  }

  // ✅ DELETE
  const deleteItem = async (id: string) => {
    await supabase.from('Compliances').delete().eq('id', id)
    fetchData()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        ComplyFlow Dashboard 🚀
      </h1>

      {/* FORM */}
      <div className="flex gap-3 mb-8">
        <input
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400"
          placeholder="Compliance Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={addCompliances}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
        >
          Add
        </button>
      </div>

      {/* CARDS */}
      <div className="space-y-4">
        {compliances.map((item: any) => (
          <div
            key={item.id}
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg hover:scale-[1.01] transition"
          >
            <h2 className="text-lg font-semibold text-white">
              {item.name}
            </h2>

            <p className="text-sm text-gray-300 mt-1">
              📅 Due: {item.due_date}
            </p>

            <p className="text-sm mt-1">
              Status:{' '}
              <span
                className={`${
                  item.status === 'pending'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                } font-medium`}
              >
                {item.status}
              </span>
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => markComplete(item.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
              >
                Complete
              </button>

              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}