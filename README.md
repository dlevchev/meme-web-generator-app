# Meme Web Generator - Frontend

React + Vite frontend application for creating custom meme websites.

## Overview

This is the frontend application that provides:
- Template browsing and selection
- Visual configuration editor
- Solana wallet integration
- Payment processing
- Website preview and download

## Prerequisites

- Node.js 18+
- npm or yarn

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API URL - Update this to point to your backend server
VITE_API_URL=http://localhost:3001

# Disable payments for testing (set to false for production)
VITE_DISABLE_PAYMENTS=false
```

For production deployment, set `VITE_API_URL` to your backend server URL (e.g., `https://your-server.vercel.app`)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

App will run on `http://localhost:5173`

## Building

```bash
npm run build
```

Build output will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel

1. Import project to Vercel
2. Set root directory to the project root
3. Add environment variable:
   - `VITE_API_URL`: Your backend server URL
4. Deploy

### Other Platforms

Build the project and serve the `dist/` directory as static files.

## Project Structure

```
app/
├── src/
│   ├── components/      # React components
│   │   ├── sections/    # Config editor sections
│   │   └── helpers/     # Helper functions
│   ├── services/        # API and wallet services
│   ├── constants/       # Constants and defaults
│   ├── config/          # App configuration
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── vite.config.ts       # Vite configuration
```

## Features

### Template System
- Browse available templates
- Preview templates
- Select and customize templates

### Configuration Editor
- Visual editor for all template settings
- Upload custom images, videos, and music
- Configure social links with icons
- Customize colors and text
- Add memes and videos

### Wallet Integration
- Solana wallet connection
- Phantom, Solflare, and other wallet support
- Payment processing with discount tiers

### Build System
- Build websites from templates
- Download as ZIP files
- Ready-to-deploy static sites

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Solana Wallet Adapter** - Wallet integration
- **Axios** - HTTP client

## License

MIT
