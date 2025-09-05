import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection, getDocs, orderBy, query,
  addDoc, serverTimestamp
} from "firebase/firestore";
import { db, ensureSignIn, watchIsAdmin, auth } from "../firebase";
import LoginButton from "../components/LoginButton";
import "./Blog.scss";

export default function BlogList() {
  const [qv, setQv] = useState("");
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => watchIsAdmin(setIsAdmin), []);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "posts"), orderBy("createdAt", "desc"))
        );
        setRows(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        setErr(e.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const list = useMemo(() => {
    const s = qv.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(p =>
      [p.title, p.excerpt, p.author].some(v => (v || "").toLowerCase().includes(s))
    );
  }, [qv, rows]);

  async function seedOne() {
    try {
      await ensureSignIn();
      await addDoc(collection(db, "posts"), {
        title: "What is CBD?",
        excerpt: "CBD is becoming more and more popular in the market…",
        content: `<p>여기에 본문 HTML을 넣어요</p>`,
        author: auth.currentUser?.displayName || "anonymous",
        date: new Date().toLocaleDateString(),
        read: "2 min read",
        image: "/assets/blog/5c2bcb_42a0cfae21b74ea8a758cadca6275f9f~mv2.avif",
        views: 0, likesCount: 0, commentsCount: 0,
        createdAt: serverTimestamp(),
      });
      location.reload();
    } catch (e) {
      alert("시드 실패: " + (e.message || e));
    }
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>All Posts {isAdmin && <small style={{marginLeft:8, color:"#10b981"}}>(Admin)</small>}</h1>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          {auth.currentUser && (
            <Link to="/blog/write" className="like-btn" style={{textDecoration:"none"}}>
              글 쓰기
            </Link>
          )}
          <LoginButton />
        </div>

        <div className={`search ${open || qv ? "open" : ""} ${qv ? "filled" : ""}`}>
          <button className="icon-left" onClick={() => { setOpen(true); requestAnimationFrame(() => inputRef.current?.focus()); }}>🔍</button>
          <input
            ref={inputRef}
            placeholder="Search"
            value={qv}
            onChange={e => setQv(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => { if (!qv) setOpen(false); }}
          />
          <button className="clear" onClick={() => { setQv(""); inputRef.current?.focus(); }} style={{ visibility: qv ? "visible" : "hidden" }}>
            ✕
          </button>
        </div>
      </div>

      {loading && <p style={{ padding: 24 }}>불러오는 중…</p>}
      {!!err && <div style={{ padding: 24, color: "crimson" }}>Firestore 에러: {err}</div>}

      {!loading && !err && list.length === 0 && (
        <div style={{ padding: 24 }}>
          <p>아직 게시글이 없어요.</p>
          <button onClick={seedOne} className="like-btn">데모 글 1개 넣기</button>
        </div>
      )}

      <ul className="post-list">
        {list.map(p => (
          <li className="post-card" key={p.id}>
            <div className="thumb"><img src={p.image} alt="" /></div>
            <div className="body">
              <div className="meta">
                <span className="avatar" aria-hidden>●</span>
                <span>{p.author}</span>
                <span>· {p.date}</span>
                <span>· {p.read}</span>
              </div>
              <Link to={`/blog/${p.id}`} className="title hover-accent">
                {(p.title || "").toUpperCase()}
              </Link>
              <p className="excerpt">{p.excerpt}</p>
              <div className="foot">
                <span>{(p.views || 0).toLocaleString()} views</span>
                <span>{p.commentsCount || 0} comments</span>
                <span>{p.likesCount || 0} ♥</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
