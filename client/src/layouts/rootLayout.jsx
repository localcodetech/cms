import { Outlet } from "react-router-dom"
import Navbar from "./navBar";
import Footer from "./footer";


function RootLayout() {
  return (
    <div>
    <Navbar />

    <main>
      <Outlet />
    </main>
<Footer />
    </div>
  )
}

export default RootLayout