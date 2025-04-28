# 📷 Gallery App

A simple Next.js application that displays images fetched from a Google Drive folder.

# 🚀 Features

- Fetches and displays images from a Google Drive folder.
- Built with Next.js (React + Server Side Rendering / Static Generation).
- Responsive and lightweight gallery layout.

# 🛠️ Prerequisites

- Node.js version 22.5.1 (or later)
- Have pnpm installed

# 🛠️ Setup Instructions

1. Enable Google Drive API from Google Cloud Console

2. Configure environment variables

- Create a .env.local file in the root of your project

```
NEXT_PUBLIC_GOOGLE_DRIVE_PRIVATE_KEY=xxxxx
NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_EMAIL=xxxxx
NEXT_PUBLIC_TBL07=1Th-S4jiEL_BIJpZsEak7sNL5sS92vBSj
NEXT_PUBLIC_TBL08=1mIdK_QcGe9hdD9CotmHgJs0BhcR6VImA
```

3. Install dependencies

   > pnpm install

4. Run the development server
   > pnpm run dev
