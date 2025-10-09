// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
  onAuthStateChanged, setPersistence, browserLocalPersistence, signOut
} from "firebase/auth";
import {
  getFirestore, serverTimestamp, doc, onSnapshot
} from "firebase/firestore";
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0gLPhGIFtMwq7Lp12Vf4RVcSDghEfz40",
  authDomain: "okpj-967fe.firebaseapp.com",
  projectId: "okpj-967fe",
  storageBucket: "okpj-967fe.appspot.com",   // ← 반드시 appspot.com
  messagingSenderId: "330124541334",
  appId: "1:330124541334:web:1b9a1dfc3f363e0c8831b7",
  measurementId: "G-HNXLVM2RER",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const ts = serverTimestamp;

// 로그인 보장
export async function ensureSignIn() {
  if (auth.currentUser) return auth.currentUser;
  await setPersistence(auth, browserLocalPersistence);
  try {
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  } catch (e) {
    if (
      e?.code === "auth/popup-blocked" ||
      e?.code === "auth/cancelled-popup-request" ||
      e?.code === "auth/popup-closed-by-user"
    ) {
      await signInWithRedirect(auth, provider);
      return;
    }
    console.warn("signInWithPopup error:", e?.code, e?.message);
    throw e;
  }
}

// 로그인 상태 구독
export function onAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// 관리자 여부 구독 (규칙에 match /meta/roles { allow read: if true; } 필요)
export function watchIsAdmin(setter) {
  const ref_ = doc(db, "meta", "roles");
  return onSnapshot(
    ref_,
    (snap) => {
      const admins = snap.exists() ? snap.data().admins || [] : [];
      const uid = auth.currentUser?.uid;
      setter(!!uid && admins.includes(uid));
    },
    () => setter(false)
  );
}

// 로그아웃
export async function signOutUser() {
  await signOut(auth);
}

/* ------- Storage 유틸 (이미지 업로드용) ------- */
const storage = getStorage(app);

export async function uploadImage(file, onProgress) {
  await ensureSignIn();
  const uid = auth.currentUser.uid;
  const path = `uploads/${uid}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file, { contentType: file.type });

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snap) => {
        if (onProgress) {
          const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          onProgress(pct);
        }
      },
      (err) => {
        console.error("[uploadImage] error:", err?.code, err?.message);
        alert(`업로드 에러: ${err?.code || err}`);
        reject(err);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({ url, path });
      }
    );
  });
}

export async function deleteFileAt(path) {
  if (!path) return;
  try {
    const r = ref(storage, path);
    await deleteObject(r);
  } catch (e) {
    console.warn("deleteFileAt:", e?.code || e);
  }
}
