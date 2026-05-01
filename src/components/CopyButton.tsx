'use client'
import React from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }
  return (
    <button
      onClick={doCopy}
      className="ml-2 text-xs text-slate-500 hover:text-slate-700"
      aria-label="Copy"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
