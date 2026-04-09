# Eraliyev Doniyor — Academic Portfolio

A premium Next.js academic portfolio website with a hidden admin panel CMS.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000
```

---

## 📁 Project Structure

```
portfolio/
├── data/
│   └── portfolio.json          ← All your content lives here
├── public/
│   ├── images/                 ← Profile image goes here (profile.jpg)
│   └── certificates/           ← Certificate images
├── src/
│   ├── app/
│   │   ├── page.tsx            ← Main portfolio page
│   │   ├── layout.tsx          ← Root layout
│   │   ├── globals.css         ← Global styles
│   │   ├── admin-portfolio-secret/
│   │   │   └── page.tsx        ← Hidden admin panel
│   │   └── api/admin/          ← API routes for CMS
│   ├── components/
│   │   ├── sections/           ← Hero, About, Projects, etc.
│   │   └── ui/                 ← Navbar, Footer, Reveal animations
│   └── lib/
│       └── data.ts             ← JSON read/write utilities
├── netlify.toml
└── package.json
```

---

## 🎨 Customization

### Update Your Info
Edit `data/portfolio.json` to change all content:
- Profile info (name, bio, email, telegram)
- Education history
- Projects
- Certificates
- Skills

### Add Profile Photo
Place your photo at: `public/images/profile.jpg`  
(Recommended: square, at least 600×600px)

### Add Certificate Images
Place certificate images in: `public/certificates/`  
Then update the `image` field in `portfolio.json` (e.g. `/certificates/deeplearning.jpg`)

---

## 🔐 Admin Panel

**URL:** `/admin-portfolio-secret`

**Default credentials:**
- Username: `doniyor`
- Password: `portfolio2024`

⚠️ **Change the password before deploying!**  
Open `src/app/admin-portfolio-secret/page.tsx` and update the `CREDS` constant:

```ts
const CREDS = { username: 'your_username', password: 'your_strong_password' }
```

### Admin Features
- Upload / change profile image
- Add, edit, delete projects
- Add, edit, delete certificates
- All changes persist to `data/portfolio.json`

---

## 🌐 Deploy on Netlify

### Option 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

### Option 2: Netlify UI (recommended)

1. Push your project to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Add plugin: install `@netlify/plugin-nextjs` (already in `netlify.toml`)
6. Click **Deploy site**

### ⚠️ Important Note for Netlify
The JSON file storage works perfectly in **development** and **self-hosted** environments. On Netlify's serverless environment, the filesystem is **read-only** after deployment — meaning the admin panel can read data but cannot write changes back to JSON.

**For production CMS functionality, use one of these:**
- Deploy on a **VPS** (DigitalOcean, Railway, Render) where the filesystem is writable
- Or replace JSON storage with a lightweight DB like **PlanetScale**, **Supabase**, or **Upstash Redis**

For a university portfolio (primarily read), Netlify works perfectly since you can edit `data/portfolio.json` directly and redeploy.

---

## 🛠 Tech Stack

- **Next.js 14** — App Router, Server Components
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations
- **Local JSON** — Simple CMS storage

---

## 📝 Fonts Used

- **Playfair Display** — Elegant display/heading font
- **DM Sans** — Clean body font  
- **DM Mono** — Technical/code labels

---

## 📄 License

Personal use. All content belongs to Eraliyev Doniyor.
