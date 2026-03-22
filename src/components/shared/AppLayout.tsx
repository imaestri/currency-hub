import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/components/shared/AppHeader'

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
