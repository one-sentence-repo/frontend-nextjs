import type { Metadata } from 'next'
import './globals.css'
import ReactQueryProvider from '@/src/store/context/query-client-provider'
import ThemeProvider from '@/src/store/context/theme-provider'

export const metadata: Metadata = {
  title: {
    template: '%s | OneSentence',
    default: 'OneSentence',
  },
  description: '하루 한 문장씩 - 당신의 감정을 기록하세요.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <ThemeProvider>
        <body className="hidden bg-var-lightgray transition dark:bg-var-dark">
          <ReactQueryProvider>
            {children}
            <div id="portal" />
          </ReactQueryProvider>
        </body>
      </ThemeProvider>
    </html>
  )
}
