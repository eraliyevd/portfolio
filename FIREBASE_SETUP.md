# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project" → name it (e.g. `doniyor-portfolio`)
3. Disable Google Analytics (optional) → Create project

---

## 2. Enable Firestore

1. Console → Build → Firestore Database → Create database
2. Start in **test mode** (you can tighten rules later)
3. Choose a region (e.g. `us-central`)

### Create the initial document manually (optional):
- Collection: `site`
- Document ID: `settings`
- Fields:
  - `bg` (string): `#0e243d`
  - `section` (string): `#0a1e34`
  - `text` (string): `#e8edf2`
  - `accent` (string): `#5b9bd5`
  - `image` (string): *(leave empty)*

---

## 3. Enable Firebase Storage

1. Console → Build → Storage → Get started
2. Start in **test mode**

---

## 4. Get your Firebase config

1. Console → Project Settings (gear icon) → Your apps
2. Click `</>` (Web) → Register app → name it
3. Copy the `firebaseConfig` object values

---

## 5. Set environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 6. Firestore Security Rules (Production)

In Firebase Console → Firestore → Rules, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /site/settings {
      allow read: if true;
      allow write: if false; // only via Admin SDK or loosen temporarily
    }
  }
}
```

> For the admin panel to write, set write to `true` during setup,
> then add proper auth rules once you add Firebase Authentication.

---

## 7. Storage Security Rules (Production)

In Firebase Console → Storage → Rules, paste:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile/{allPaths=**} {
      allow read: if true;
      allow write: if true; // tighten after adding Firebase Auth
    }
  }
}
```

---

## 8. Netlify Deployment

Add all `NEXT_PUBLIC_FIREBASE_*` variables in:
Netlify → Site → Site configuration → Environment variables

---

## 9. Run locally

```bash
npm install
npm run dev
```

Admin panel: http://localhost:3000/admin-portfolio-secret
- Username: `doniyor`
- Password: `portfolio2024`
