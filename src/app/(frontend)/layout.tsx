'use client'
import Header from '@/components/header'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../public/assets/css/custom-template.css'
import '../../../public/assets/css/meanmenu.min.css'
import '../../../public/assets/css/responsive.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import ReduxProvider from '@/redux/redux-provider'
config.autoAddCss = false



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
