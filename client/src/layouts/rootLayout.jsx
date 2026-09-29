import { Outlet, useLocation } from "react-router-dom"
import { MotionConfig, motion } from "framer-motion";
import Navbar from "./navBar";
import Footer from "./footer";
import { ease } from "../lib/motion";


function RootLayout() {
  const { pathname } = useLocation();

  return (
    // reducedMotion="user": respect the OS "reduce motion" setting
    <MotionConfig reducedMotion="user">
    <div className="bg-[#07070c]">
    <Navbar />

    {/* keyed by path so every page fades in on navigation */}
    <motion.main
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease }}
    >
      <Outlet />
    </motion.main>
<Footer />
    </div>
    </MotionConfig>
  )
}

export default RootLayout
