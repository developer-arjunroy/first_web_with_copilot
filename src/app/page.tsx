'use client'
import React from 'react'
import InputBox from '../components/InputBox'
import ModeSelector, { Mode } from '../components/ModeSelector'
import OutputSection from '../components/OutputSection'
import LoadingSpinner from '../components/LoadingSpinner'

type ApiResponse = {
  oneLiner: string
  bullets: string[]
  explainLike10: string
  actionSteps: string[]
  questions: string[]
}

export default function Page() {
  const [input, setInput] = React.useState<string>('')
  const [mode, setMode] = React.useState<Mode>('Beginner')
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<ApiResponse | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const generate = async () => {
    setError(null)
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, mode })
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'API Error')
      }
      const data: ApiResponse = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Input</label>
            <div className="mt-2">
              <InputBox value={input} onChange={setInput} placeholder="Paste text, article, or topic to explain..." />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <ModeSelector mode={mode} onChange={setMode} />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInput('')}
                  className="px-3 py-1.5 text-sm rounded-md bg-white border border-slate-200"
                >
                  Clear
                </button>
                <button
                  onClick={generate}
                  disabled={!input || loading}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white disabled:opacity-60"
                >
                  {loading ? 'Generating…' : 'Explain'}
                </button>
              </div>
            </div>
            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
            <h4 className="text-sm font-medium text-slate-700">Mode</h4>
            <p className="mt-2 text-xs text-slate-500">Select voice/level for the explanation</p>
            <div className="mt-3">
              <ModeSelector mode={mode} onChange={setMode} />
            </div>
            <div className="mt-4 text-xs text-slate-500">
              Tip: Use 'Teacher' for examples, 'CEO' for TL;DR & business impact.
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
            <h4 className="text-sm font-medium text-slate-700">Output Preview</h4>
            <p className="mt-2 text-xs text-slate-500">One-line summary + bullet highlights</p>
            <div className="mt-3 text-sm text-slate-700 min-h-[48px]">
              {loading ? <LoadingSpinner /> : result ? (
                <>
                  <div className="font-medium">{result.oneLiner}</div>
                  <ul className="mt-2 list-disc ml-5 text-slate-600">
                    {result.bullets.slice(0,3).map((b,i) => <li key={i}>{b}</li>)}
                  </ul>
                </>
              ) : <div className="text-slate-400">No output yet</div>}
            </div>
          </div>
        </aside>
      </div>

      <div className="space-y-4">
        {loading && <div className="p-4"><LoadingSpinner /></div>}

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OutputSection title="One-line summary" rawText={result.oneLiner}>
              <div className="text-sm">{result.oneLiner}</div>
            </OutputSection>

            <OutputSection title="Bullet point summary" rawText={result.bullets.join('\n')}>
              <ul className="list-disc ml-5 space-y-1">
                {result.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </OutputSection>

            <OutputSection title="Explain like I'm 10" rawText={result.explainLike10}>
              <div className="text-sm">{result.explainLike10}</div>
            </OutputSection>

            <OutputSection title="Action steps" rawText={result.actionSteps.join('\n')}>
              <ol className="list-decimal ml-5 space-y-1">
                {result.actionSteps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </OutputSection>

            <OutputSection title="Questions to test understanding" rawText={result.questions.join('\n')}>
              <ul className="list-disc ml-5 space-y-1">
                {result.questions.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </OutputSection>
          </div>
        )}
      </div>
    </div>
  )
}
