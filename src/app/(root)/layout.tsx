import StreamClientProvider from "@/components/Providers/StreamClientProvider"
import { ReactNode } from "react"

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <StreamClientProvider>
      {children}
    </StreamClientProvider>
  )
}

export default Layout
