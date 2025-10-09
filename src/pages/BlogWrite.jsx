// src/pages/BlogWrite.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db, ensureSignIn, auth, ts, uploadImage, deleteFileAt } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./BlogWrite.scss";

export default function BlogWrite() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  // 업로드 상태
  const [imgUrl, setImgUrl] = useState("");     // 업로드된 이미지 공개 URL
  const [imgPath, setImgPath] = useState("");   // 스토리지 경로(교체/삭제용)
  const [pct, setPct] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dropRef = useRef(null);
  const navigate = useNavigate();

  // 파일 처리 (드래그&드롭/파일선택 공용)
  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    try {
      setUploading(true);
      setPct(0);
      // 기존 업로드가 있으면 삭제(선택)
      if (imgPath) await deleteFileAt(imgPath);
      const { url, path } = await uploadImage(file, setPct);
      setImgUrl(url);
      setImgPath(path);
    } catch (e) {
      alert("이미지 업로드 실패: " + (e.message || e));
    } finally {
      setUploading(false);
    }
  }

  // 드래그 이벤트
  function onDrop(e) {
    e.preventDefault(); e.stopPropagation();
    dropRef.current?.classList.remove("dragover");
    handleFile(e.dataTransfer.files?.[0]);
  }
  function onDragOver(e) {
    e.preventDefault(); e.stopPropagation();
    dropRef.current?.classList.add("dragover");
  }
  function onDragLeave(e) {
    e.preventDefault(); e.stopPropagation();
    dropRef.current?.classList.remove("dragover");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요!"); return;
    }

    await ensureSignIn();
    const user = auth.currentUser;

    const docRef = await addDoc(collection(db, "posts"), {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content,
      image: imgUrl,                // ✅ 업로드된 이미지 URL 저장
      imagePath: imgPath,           // (선택) 나중에 교체/삭제시 사용
      author: user.displayName || "anonymous",
      uid: user.uid,
      date: new Date().toLocaleDateString(),
      read: "2 min read",
      views: 0,
      likesCount: 0,
      commentsCount: 0,
      createdAt: ts(),
    });

    navigate(`/blog/${docRef.id}`, { replace: true });
  }

  return (
    <div className="blog-write">
      <div className="write-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1>새 글 작성</h1>
      </div>

      {/* 드래그&드롭 존 */}
      <div
        ref={dropRef}
        className="dropzone"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnd={onDragLeave}
      >
        {imgUrl ? (
          <div className="preview">
            <img src={imgUrl} alt="preview" />
            <div className="preview-tools">
              <button type="button" onClick={() => { setImgUrl(""); setImgPath(""); }}>
                이미지 제거
              </button>
            </div>
          </div>
        ) : (
          <div className="drop-hint">
            <p>이미지를 여기로 드롭하거나</p>
            <label className="file-btn">
              파일 선택
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
            {uploading && <p className="progress">{pct}%</p>}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <input
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          placeholder="요약 (선택)"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={10}
          placeholder="내용 (HTML 가능)"
          required
        />
        <button type="submit" disabled={uploading}>저장</button>
      </form>
    </div>
  );
}
