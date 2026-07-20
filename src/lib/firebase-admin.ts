import { existsSync, readFileSync } from "fs";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let app: App | undefined;
let db: Firestore | undefined;

function loadServiceAccount(): Record<string, string> | null {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) {
    return JSON.parse(inline) as Record<string, string>;
  }
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (filePath && existsSync(filePath)) {
    return JSON.parse(readFileSync(filePath, "utf8")) as Record<string, string>;
  }
  return null;
}

export function isAdminConfigured(): boolean {
  return Boolean(
    loadServiceAccount() || process.env.GOOGLE_APPLICATION_CREDENTIALS,
  );
}

export function getAdminApp(): App {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0]!;
    return app;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const sa = loadServiceAccount();

  if (sa) {
    app = initializeApp({
      credential: cert(sa as Parameters<typeof cert>[0]),
      projectId: sa.project_id || projectId,
    });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    app = initializeApp({ projectId });
  } else {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH in .env.local",
    );
  }
  return app;
}

export function getAdminDb(): Firestore {
  if (!db) {
    db = getFirestore(getAdminApp());
  }
  return db;
}
