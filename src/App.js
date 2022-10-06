import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/profile/Profile";
import "./App.css";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
