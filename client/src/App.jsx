import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import Signup from "./pages/signup";
import Posts from "./pages/posts";
import PostDetail from "./pages/postDetails";
import MyPosts from "./pages/myPosts";
import PostEditor from "./pages/postEditor";
import ProtectedRoute from "./layouts/protectedRoute";
import RootLayout from "./layouts/rootLayout";
import HomePage from "./pages/homePage";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Signup />} />



        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<MyPosts />} />
          <Route path="/dashboard/new" element={<PostEditor />} />
          <Route path="/dashboard/edit/:id" element={<PostEditor />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;