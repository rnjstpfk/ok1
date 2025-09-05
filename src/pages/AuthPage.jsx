// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AuthModal.scss";

// 🔐 Firebase Auth
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function AuthPage({ defaultTab = "login" }) {
  const [tab, setTab] = useState(defaultTab); // "login" | "signup"
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (tab === "login") {
        // 로그인
        await signInWithEmailAndPassword(auth, form.email.trim(), form.password);
      } else {
        // 회원가입
        const cred = await createUserWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );
        const displayName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
        if (displayName) {
          await updateProfile(cred.user, { displayName });
        }
      }
      // 성공 → 돌아갈 곳 결정 (직전 페이지 or /blog)
      const back = (location.state && location.state.from) || "/blog";
      navigate(back, { replace: true });
    } catch (e) {
      setErr(humanizeAuthError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f6eadd",
        position: "relative",
      }}
    >
      {/* 닫기(X) → 홈으로 */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "transparent",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        ✕
      </button>

      <div className="auth-panel" style={{ margin: 0 }}>
        <div className="tabs">
          <button
            className={`tab ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
          >
            Log In
          </button>
          <button
            className={`tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>

        <h2 className="title">{tab === "login" ? "Log In" : "Sign Up"}</h2>

        {!!err && (
          <div
            style={{
              marginBottom: 8,
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #fda4af",
              background: "#fff1f2",
              color: "#991b1b",
              fontSize: 14,
            }}
          >
            {err}
          </div>
        )}

        <form className="auth-form" onSubmit={submit}>
          {tab === "signup" && (
            <>
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={onChange}
                required
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={onChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
            autoComplete={tab === "login" ? "current-password" : "new-password"}
          />

          <button type="submit" className="submit" disabled={busy}>
            {busy ? (tab === "login" ? "Logging in..." : "Signing up...") : tab === "login" ? "Log In" : "Sign up"}
          </button>
        </form>

        <p className="switch">
          {tab === "login" ? (
            <>
              New here?{" "}
              <button className="link" onClick={() => setTab("signup")}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already a member?{" "}
              <button className="link" onClick={() => setTab("login")}>
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function humanizeAuthError(e) {
  const code = e?.code || "";
  switch (code) {
    case "auth/invalid-email":
      return "이메일 형식이 올바르지 않습니다.";
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/weak-password":
      return "비밀번호를 더 복잡하게 설정하세요.";
    default:
      return e?.message || String(e);
  }
}
