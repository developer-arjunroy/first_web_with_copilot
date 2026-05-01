'use client'
import React from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function InputBox({ value, onChange, placeholder }: Props) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'Paste text or topic here...'}
      className="w-full min-h-[140px] p-4 rounded-lg border border-slate-200 bg-white shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
  )
}
