'use client'
import React from 'react'
import CopyButton from './CopyButton'

export default function OutputSection({
  title,
  children,
  rawText
}: {
  title: string
  children: React.ReactNode
  rawText?: string
}) {
  return (
    <section className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        {rawText ? <CopyButton text={rawText} /> : null}
      </div>
      <div className="mt-2 text-sm text-slate-700">{children}</div>
    </section>
  )
}
