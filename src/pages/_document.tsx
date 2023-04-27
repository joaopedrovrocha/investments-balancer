import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-gray-100">
      <Head />

      <body className="h-full">
        <div className="min-h-full">
          <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Balancer | Zero 34"
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Balancer | Zero 34 Tech</h1>
            </div>
          </header>
          <main> <Main /> </main>
        </div>

        <NextScript />
      </body>
    </Html >
  )
}
