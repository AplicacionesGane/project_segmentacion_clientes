import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <section className='flex'>
      {/* <NavBar /> */}
      <main className='w-full'>
        <Outlet />
      </main>
      <Toaster position='top-right' duration={5000} visibleToasts={4} richColors />
    </section>
  )
}