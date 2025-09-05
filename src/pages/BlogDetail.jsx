// src/pages/BlogDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db, ensureSignIn, auth, watchIsAdmin } from "../firebase";
import {
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  increment,
  collection,
  addDoc,
  deleteDoc,
  orderBy,
  query,
  onSnapshot as onSnapshotCol,
  setDoc,
} from "firebase/firestore";
import "./BlogDetail.scss";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [busyLike, setBusyLike] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // 관리자 여부 구독
  useEffect(() => watchIsAdmin(setIsAdmin), []);

  // 게시글 실시간 구독 (조회수 증가는 제거)
  useEffect(() => {
    const ref = doc(db, "posts", id);
    const unsubDoc = onSnapshot(ref, (snap) => {
      if (snap.exists()) setPost({ id: snap.id, ...snap.data() });
    });
    return () => unsubDoc();
  }, [id]);

  // 내 좋아요 여부
  useEffect(() => {
    const u = auth.currentUser;
    if (!u) { setLiked(false); return; }
    const likeRef = doc(db, "posts", id, "likes", u.uid);
    getDoc(likeRef).then((s) => setLiked(s.exists()));
  }, [id, auth.currentUser?.uid]);

  // 댓글 실시간 구독
  useEffect(() => {
    const qy = query(collection(db, "posts", id, "comments"), orderBy("createdAt", "asc"));
    const unsub = onSnapshotCol(qy, (snap) => {
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [id]);

  // 좋아요 토글 (낙관적 UI)
  async function toggleLike() {
    if (busyLike) return;
    setBusyLike(true);
    try {
      await ensureSignIn();
      const u = auth.currentUser;
      const postRef = doc(db, "posts", id);
      const likeRef = doc(db, "posts", id, "likes", u.uid);
      const has = (await getDoc(likeRef)).exists();

      setLiked(!has);
      setPost((p) => p ? { ...p, likesCount: (p.likesCount || 0) + (has ? -1 : 1) } : p);

      if (has) {
        await deleteDoc(likeRef);
        await updateDoc(postRef, { likesCount: increment(-1) });
      } else {
        await setDoc(likeRef, { uid: u.uid, createdAt: new Date() });
        await updateDoc(postRef, { likesCount: increment(1) });
      }
    } catch (e) {
      setLiked((prev) => !prev);
      setPost((p) => p ? { ...p, likesCount: (p.likesCount || 0) + (liked ? 1 : -1) } : p);
      alert(e.message || String(e));
    } finally {
      setBusyLike(false);
    }
  }

  // 댓글 작성
  async function submitComment(e) {
    e.preventDefault();
    if (!text.trim()) return;
    await ensureSignIn();
    const u = auth.currentUser;
    await addDoc(collection(db, "posts", id, "comments"), {
      text: text.trim(),
      uid: u.uid,
      author: u.displayName || "anonymous",
      createdAt: new Date(),
    });
    setText("");
    await updateDoc(doc(db, "posts", id), { commentsCount: increment(1) }).catch(() => {});
  }

  // 댓글 삭제(관리자 또는 작성자)
  async function removeComment(cid, uid) {
    await ensureSignIn();
    if (!isAdmin && auth.currentUser?.uid !== uid) {
      alert("본인 또는 관리자만 삭제할 수 있어요.");
      return;
    }
    await deleteDoc(doc(db, "posts", id, "comments", cid));
    await updateDoc(doc(db, "posts", id), { commentsCount: increment(-1) }).catch(() => {});
  }

  // 글 삭제(관리자 또는 글쓴이)
  async function deletePost() {
    await ensureSignIn();
    const me = auth.currentUser;
    const mine = post?.uid && me && post.uid === me.uid;
    if (!isAdmin && !mine) {
      alert("관리자 또는 작성자만 삭제할 수 있어요.");
      return;
    }
    if (!confirm("이 게시글을 삭제할까요?")) return;
    await deleteDoc(doc(db, "posts", id));
    navigate("/blog", { replace: true });
  }

  const html = useMemo(() => post?.content || "", [post]);
  if (!post) return <div className="blog-detail"><p>Loading…</p></div>;

  return (
    <div className="blog-detail">
      <div className="detail-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <Link className="back-list" to="/blog">All Posts</Link>
        {(isAdmin || (auth.currentUser && post?.uid === auth.currentUser.uid)) && (
          <button className="back-btn" style={{ marginLeft: "auto" }} onClick={deletePost}>
            글 삭제
          </button>
        )}
      </div>

      {post.image && <img className="detail-hero" src={post.image} alt="" />}
      <h1 className="detail-title">{post.title}</h1>

      <div className="detail-meta">
        <span className="dot" aria-hidden>●</span>
        <span>{post.author}</span>
        <span>· {post.date}</span>
        <span>· {post.read}</span>
        <span>· {(post.views || 0).toLocaleString()} views</span>
        <button className={`like-pill ${liked ? "on" : ""}`} onClick={toggleLike} disabled={busyLike}>
          {liked ? "♥" : "♡"} {post.likesCount || 0}
        </button>
      </div>

      <article className="detail-content" dangerouslySetInnerHTML={{ __html: html }} />

      <section className="detail-comments">
        <h3>Comments ({post.commentsCount || comments.length || 0})</h3>
        <form className="comment-form" onSubmit={submitComment}>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="댓글 입력" />
          <button className="btn-primary" type="submit">댓글 달기</button>
        </form>

        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              <div className="comment-head">
                <strong>{c.author}</strong>
                <span className="time">
                  {c.createdAt?.toDate?.()?.toLocaleString?.() || new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="comment-body">{c.text}</p>
              {(isAdmin || auth.currentUser?.uid === c.uid) && (
                <button className="comment-delete" onClick={() => removeComment(c.id, c.uid)}>삭제</button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
