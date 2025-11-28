# Deployment Guide

This app can be deployed to both **GitHub Pages** and **Vercel**. Both platforms are configured and ready to use.

## 🚀 GitHub Pages Deployment

### Option 1: Automatic Deployment (Recommended)

1. Go to your repository on GitHub: `https://github.com/UGilfoyle/Algorithm-visualizer`
2. Click on **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow (`.github/workflows/deploy.yml`) will automatically deploy on every push to `main` branch
5. Your site will be available at: `https://ugilfoyle.github.io/Algorithm-visualizer/`

### Option 2: Manual Deployment

1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose **main** branch and **/ (root)** folder
4. Click **Save**
5. Your site will be available at: `https://ugilfoyle.github.io/Algorithm-visualizer/`

## ⚡ Vercel Deployment

### Option 1: Deploy via GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **Add New Project**
4. Import your repository: `UGilfoyle/Algorithm-visualizer`
5. Vercel will auto-detect the configuration from `vercel.json`
6. Click **Deploy**
7. Your site will be available at: `https://algorithm-visualizer.vercel.app` (or your custom domain)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## 📝 Notes

- **Service Worker**: Automatically detects if running on GitHub Pages (with subdirectory) or root domain
- **Caching**: Both platforms have optimized caching headers configured
- **HTTPS**: Both platforms provide HTTPS by default
- **Custom Domain**: You can add a custom domain on both platforms

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow
- `sw.js` - Service Worker (auto-detects base path)

## ✅ What's Configured

- ✅ Service Worker with path detection
- ✅ Caching headers for static assets
- ✅ Icon caching (1 year)
- ✅ CSS/JS caching (1 month)
- ✅ HTML no-cache
- ✅ SPA routing support (Vercel)

## 🎯 Recommended: Vercel

Vercel is recommended because:
- Faster deployment
- Better performance (CDN)
- Automatic HTTPS
- Custom domains
- Better developer experience
- No subdirectory path issues

