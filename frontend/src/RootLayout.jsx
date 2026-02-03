import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"


function RootLayout() {
  return (
    <>
    <Outlet />
    <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default RootLayout