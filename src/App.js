import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import BookDetail from "./pages/BookDetail/BookDetail";
import Layout from "./components/Layout/Layout";

import useAuthStore from "./store/useAuthStore";
import { getCurrentUserToken } from "./utils/service";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  const { refreshSession, isSigned } = useAuthStore();

  useEffect(() => {
    const token = getCurrentUserToken();
    if (token !== "" && token !== "undefined") refreshSession(token);
  }, []);

  const AuthenticatedUser = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/book/:id" element={<BookDetail />} />
    </Routes>
  );

  const BaseUser = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetail />} />
    </Routes>
  );

  return (
    <>
      <Layout>
        {isSigned ? AuthenticatedUser : BaseUser} <Footer />
      </Layout>
    </>
  );
}

export default App;
