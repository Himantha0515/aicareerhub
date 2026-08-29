import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth";
import { getFirebaseApp } from "./firebase";

let auth: ReturnType<typeof getAuth> | undefined;

export function getFirebaseAuth() {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export async function signInWithGoogle() {
  const a = getFirebaseAuth();
  const result = await signInWithPopup(a, googleProvider);
  return result.user;
}

export async function signInWithEmail(email: string, password: string) {
  const a = getFirebaseAuth();
  const result = await signInWithEmailAndPassword(a, email, password);
  return result.user;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
) {
  const a = getFirebaseAuth();
  const result = await createUserWithEmailAndPassword(a, email, password);
  await updateProfile(result.user, { displayName });
  return result.user;
}

export async function firebaseSignOut() {
  await signOut(getFirebaseAuth());
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), cb);
}

export type { User };
