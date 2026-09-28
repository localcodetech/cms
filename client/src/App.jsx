import { Routes, Route } from "react-router-dom"
import SignIn from "./pages/signin"
import Signup from "./pages/signup"
import HomePage from "./pages/homePage"
import Posts from "./pages/posts"
import PostDetail from "./pages/postDetails"
import MyPosts from "./pages/myPosts"
import PostEditor from "./pages/postEditor"
import Navbar from "./layouts/navBar"
import ProtectedRoute from "./layouts/protectedRoute"
import RootLayout from "./layouts/rootLayout"
function App() {


  return (
  
  <>
 
 <Routes>
<RootLayout >
    <Route path="/" element={ <Posts />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/register" element={<SignIn />} />
      <Route path="/register" element={<Signup />} />



<Route element={<ProtectedRoute />} />
<Route path="/dashboard" element={<MyPosts />} />
<Route path="/dashboard/new" element={<PostEditor />} />
<Route path="/dashboard/edit/:id" element={<PostEditor />} />

    </RootLayout>




 </Routes>

  </>
  )
}

export default App
