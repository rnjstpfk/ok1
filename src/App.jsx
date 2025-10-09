// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Eatables from "./pages/Eatables";     // ✅ 대소문자 맞춤
import Wearables from "./pages/Wearables";
import About from "./pages/About";
import Certificate from "./pages/Certificate";
import Contact from "./pages/Contact";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import BlogWrite from "./pages/BlogWrite";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <CartProvider> {/** ✅ 전역 카트가 전체를 감쌈 */}
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eatables" element={<Eatables />} />
          <Route path="/wearables" element={<Wearables />} />
          <Route path="/about" element={<About />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blog/write" element={<BlogWrite />} />
          <Route path="/account" element={<AuthPage defaultTab="login" />} />
        </Routes>

        <Footer />
      </Router>
    </CartProvider>
  );
}
