import { Routes, Route } from "react-router-dom"
import SignIn from "./pages/signin"
import Signup from "./pages/signup"
import HomePage from "./pages/homePage"

function App() {


  return (
  <>
  <Routes>
    <Route path="/login" element={<SignIn />} />
    <Route path="/register" element={<Signup /> } />

    <Route path="/" element={<HomePage />} />



  </Routes>
  </>
  )
}

export default App
