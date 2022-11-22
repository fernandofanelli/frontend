import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import BookDetail from "./pages/BookDetail/BookDetail";
import Layout from "./components/Layout/Layout";

import useAuthStore from "./store/useAuthStore";
import { getCurrentUserToken } from "./utils/service";
import "./App.css";

function App() {
  const { refreshSession } = useAuthStore();

  useEffect(() => {
    if (getCurrentUserToken() !== "") refreshSession();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
