// src/components/HeaderLoginControls.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  auth,
  ensureSignIn,
  signOutUser,
  onAuth,
  watchIsAdmin,
} from "../firebase";

export default function HeaderLoginControls() {
  const [user, setUser] = useState(auth.currentUser);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const offAuth = onAuth((u) => setUser(u || null));
    const offAdmin = watchIsAdmin(setIsAdmin);
    return () => {
      offAuth && offAuth();
      offAdmin && offAdmin();
    };
  }, []);

  if (!user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* 이미 회원가입 화면이 있다면 그 경로로 링크 연결 */}
        <Link
          to="/signup"
          style={{
            fontSize: 14,
            padding: "6px 10px",
            border: "1px solid #ddd",
            borderRadius: 10,
            background: "white",
          }}
        >
          Sign Up
        </Link>
        <button
          onClick={ensureSignIn}
          style={{
            fontSize: 14,
            padding: "6px 12px",
            borderRadius: 10,
            background: "#111",
            color: "white",
            border: "1px solid #111",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="avatar"
          style={{ width: 24, height: 24, borderRadius: "50%" }}
        />
      )}
      <span style={{ fontSize: 14 }}>
        {user.displayName || user.email}
        {isAdmin && (
          <span style={{ color: "#10b981", marginLeft: 6 }}>(Admin)</span>
        )}
      </span>
      <button
        onClick={signOutUser}
        style={{
          marginLeft: 6,
          padding: "4px 10px",
          borderRadius: 8,
          border: "1px solid #ddd",
          background: "white",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        Log Out
      </button>
    </div>
  );
}
