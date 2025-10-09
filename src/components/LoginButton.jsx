import { useEffect, useState } from "react";
import { ensureSignIn, onAuth, auth } from "../firebase";

export default function LoginButton() {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => onAuth(setUser), []);

  return (
    <button onClick={ensureSignIn} className="like-btn" style={{ marginLeft: 12 }}>
      {user ? `로그인됨: ${user.displayName}` : "Google 로그인"}
    </button>
  );
}
