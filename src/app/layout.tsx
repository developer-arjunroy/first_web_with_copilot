import '../styles/globals.css'

export const metadata = {
  title: 'ExplainOS',
  description: 'Turn text into structured, actionable knowledge'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold">ExplainOS</h1>
              <nav className="text-sm text-slate-600">Transform text into structured, actionable knowledge</nav>
            </div>
          </header>
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">{children}</main>
          <footer className="py-6">
            <div className="max-w-4xl mx-auto text-sm text-center text-slate-500">© ExplainOS</div>
          </footer>
        </div>
      </body>
    </html>
  )
}
