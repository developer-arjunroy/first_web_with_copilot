'use client'
import React from 'react'

export type Mode = 'Beginner' | 'Teacher' | 'CEO' | 'Scientist'

type Props = {
  mode: Mode
  onChange: (m: Mode) => void
}

const modes: Mode[] = ['Beginner', 'Teacher', 'CEO', 'Scientist']

export default function ModeSelector({ mode, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            m === mode ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
