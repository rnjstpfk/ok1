// src/components/Header.jsx
import "./Header.scss";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { auth, onAuth, watchIsAdmin, signOutUser } from "../firebase";

/* === 아이콘 === */
function UserIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="currentColor" aria-hidden="true">
      <path d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
    </svg>
  );
}
function BagIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="5.7 0 105.5 126.1" preserveAspectRatio="xMinYMax meet" fill="currentColor" aria-hidden="true">
      <path d="M99.8 28.4c0-1.2-0.9-2-2.1-2h-15c0 3.2 0 7.6 0 8.2 0 1.5-1.2 2.6-2.6 2.9 -1.5 0.3-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.9 0-4.7 0-8.2H40.1c0 3.2 0 7.3 0 8.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.6 0-5 0-8.2h-15c-1.2 0-2 0.9-2 2L8.3 124c0 1.2 0.9 2.1 2.1 2.1h96.3c1.2 0 2.1-0.9 2.1-2.1L99.8 28.4z"></path>
      <path d="M59.1 5.9c-2.9 0-2 0-2.9 0 -2 0-4.4 0.6-6.4 1.5 -3.2 1.5-5.9 4.1-7.6 7.3 -0.9 1.8-1.5 3.5-1.8 5.6 0 0.9-0.3 1.5-0.3 2.3 0 1.2 0 2.1 0 3.2 0 1.5-1.2 2.6-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-1.2 0-2.3 0-3.5 0-3.2 0.9-6.4 2-9.4 1.2-2.3 2.6-4.7 4.7-6.4 3.2-2.9 6.7-5 11.1-5.9C53.5 0.3 55 0 56.7 0c1.5 0 2.9 0 4.4 0 2.9 0 5.6 0.6 7.9 1.8 2.6 1.2 5 2.6 6.7 4.4 3.2 3.2 5.3 6.7 6.4 11.1 0.3 1.5 0.6 3.2 0.6 4.7 0 1.2 0 2.3 0 3.2 0 1.5-1.2 2.6-2.6 2.9s-2.9-0.9-3.2-2.3c0-0.3 0-0.3 0-0.6 0-1.2 0-2.6 0-3.8 0-2.3-0.6-4.4-1.8-6.4 -1.5-3.2-4.1-5.9-7.3-7.3 -1.8-0.9-3.5-1.8-5.9-1.8C61.1 5.9 59.1 5.9 59.1 5.9L59.1 5.9z"></path>
    </svg>
  );
}

/* === 모바일 메뉴 === */
function MobileMenu({ open, onClose, user, isAdmin, onLogout }) {
  return (
    <div className={`mm ${open ? "show" : ""}`} role="dialog" aria-modal="true" aria-label="Mobile menu">
      <div className="mm-backdrop" onClick={onClose} />
      <aside className="mm-panel">
        <div className="mm-header">
          <button className="mm-close" aria-label="Close menu" onClick={onClose}>×</button>

          {!user ? (
            <div className="mm-login">
              <NavLink to="/account" onClick={onClose} className="btn-primary" style={{ display:"inline-flex",alignItems:"center" }}>
                <UserIcon /><span style={{ marginLeft: 6 }}>Log In</span>
              </NavLink>
            </div>
          ) : (
            <div className="mm-login" style={{ display:"flex", alignItems:"center", gap:8 }}>
              {user.photoURL && <img src={user.photoURL} alt="" style={{ width: 28, height: 28, borderRadius: "50%" }} />}
              <span>
                {user.displayName || user.email}
                {isAdmin && <span style={{ color:"#10b981", marginLeft:6 }}>(Admin)</span>}
              </span>
              <button onClick={onLogout} className="btn-ghost" style={{ marginLeft: 8 }}>Log Out</button>
            </div>
          )}
        </div>

        <nav className="mm-nav">
          <NavLink to="/" end onClick={onClose}>Home</NavLink>
          <NavLink to="/eatables" onClick={onClose}>Eatables</NavLink>
          <NavLink to="/wearables" onClick={onClose}>Wearables</NavLink>
          <details className="mm-details">
            <summary>About</summary>
            <ul>
              <li><NavLink to="/about/coa" onClick={onClose}>Certificate of Analysis</NavLink></li>
            </ul>
          </details>
          <NavLink to="/contact" onClick={onClose}>Contact</NavLink>
          <NavLink to="/blog" onClick={onClose}>Blog</NavLink>
        </nav>
      </aside>
    </div>
  );
}

/* === 카트 드로어 === */
function CartDrawer() {
  const { open, closeCart, items, removeItem, subtotal } = useCart();
  return (
    <div className={`cart ${open ? "show" : ""}`} role="dialog" aria-modal="true" aria-label="Cart drawer">
      <div className="cart-backdrop" onClick={closeCart} />
      <aside className="cart-panel">
        <div className="cart-topbar">
          <div className="cart-title">MY CART <span className="count">({items.length} items)</span></div>
          <button className="cart-x" onClick={closeCart} aria-label="Close">×</button>
        </div>
        <div className="cart-list">
          {items.length === 0 ? <p className="empty">Your cart is empty.</p> : items.map((it) => (
            <div key={it.id} className="cart-row">
              <img className="thumb" src={it.img} alt="" />
              <div className="info">
                <div className="name">{it.name}</div>
                <div className="meta">
                  <span className="price">${(it.price || 0).toFixed(2)}</span>
                  <div className="qty">
                    <button disabled aria-label="decrease">−</button>
                    <span>{it.qty || 1}</span>
                    <button disabled aria-label="increase">＋</button>
                  </div>
                </div>
              </div>
              <div className="line-total">${(((it.price || 0) * (it.qty || 1)) || 0).toFixed(2)}</div>
              <button className="remove" onClick={() => removeItem(it.id)} aria-label="Remove">🗑</button>
              {it.available === false && <div className="alert"><span>Sorry, this item is no longer available.</span></div>}
            </div>
          ))}
        </div>
        <div className="cart-promo"><button type="button" className="promo-link">Enter a promo code</button></div>
        <div className="cart-est"><span>Estimated total</span><strong>${subtotal.toFixed(2)}</strong></div>
        <button className="cart-cta">View Cart</button>
      </aside>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open, openCart } = useCart();

  // 로그인 상태
  const [user, setUser] = useState(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const offAuth = onAuth(u => setUser(u || null));
    const offAdmin = watchIsAdmin(setIsAdmin);
    return () => { offAuth && offAuth(); offAdmin && offAdmin(); };
  }, []);

  // 오버레이 열릴 때 스크롤 잠금
  useEffect(() => {
    const modalOpen = menuOpen || open;
    document.body.style.overflow = modalOpen ? "hidden" : "";
    const onKey = (e) => { if (e.key === "Escape" && menuOpen) setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [menuOpen, open]);

  const onLogout = () => signOutUser();

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="left" end><Logo /></NavLink>

          {/* 데스크톱 내비 */}
          <nav className="nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/eatables">Eatables</NavLink>
            <NavLink to="/wearables">Wearables</NavLink>
            <div className="nav-item has-sub">
              <NavLink to="/about" className="about-link">About</NavLink>
              <div className="dropdown">
                <NavLink to="/certificate">Certificate of Analysis</NavLink>
              </div>
            </div>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </nav>

          <div className="right">
            {/* 로그인 컨트롤(데스크톱): 계정 페이지 링크 사용 */}
            {!user ? (
              <NavLink to="/account" className="login-link" aria-label="Log In" style={{ display:"inline-flex", alignItems:"center" }}>
                <UserIcon /><span style={{ marginLeft: 6 }}>Log In</span>
              </NavLink>
            ) : (
              <div className="auth-controls" style={{ display:"flex", alignItems:"center", gap:8 }}>
                {user.photoURL && <img src={user.photoURL} alt="" style={{ width:24, height:24, borderRadius:"50%" }} />}
                <span style={{ fontSize:14 }}>
                  {user.displayName || user.email}
                  {isAdmin && <span style={{ color:"#10b981", marginLeft:6 }}>(Admin)</span>}
                </span>
                <button className="btn-ghost" onClick={onLogout}>Log Out</button>
              </div>
            )}

            {/* 전역 카트 열기 */}
            <button className="icon-btn cart-btn" aria-label="cart" onClick={openCart}>
              <BagIcon />
            </button>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* 오버레이들 */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        isAdmin={isAdmin}
        onLogout={onLogout}
      />
      <CartDrawer />
    </>
  );
}
