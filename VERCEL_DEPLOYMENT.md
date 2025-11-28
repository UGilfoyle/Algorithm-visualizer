# Vercel Deployment Troubleshooting

## Check These in Vercel Dashboard:

1. **Project Connection**
   - Go to https://vercel.com/dashboard
   - Check if your project is connected to: `UGilfoyle/Algorithm-visualizer`
   - If not connected, click "Add New Project" and connect to GitHub repo

2. **Git Integration**
   - Settings → Git
   - Ensure "Production Branch" is set to `main`
   - Check if "Auto-deploy" is enabled

3. **Build Settings**
   - Settings → General
   - Framework Preset: **Other** (or leave blank)
   - Build Command: Leave empty or `echo 'No build step required'`
   - Output Directory: `.` (current directory)
   - Install Command: Leave empty
   - Root Directory: `.` (current directory)

4. **Environment Variables**
   - Settings → Environment Variables
   - Make sure `DATABASE_URL` is set for Production, Preview, and Development

5. **Manual Deployment**
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment
   - Or click "Deploy" button to trigger new deployment

6. **Check Deployment Logs**
   - Click on any deployment
   - Check "Build Logs" for errors
   - Check "Function Logs" for API errors

## Common Issues:

- **No auto-deploy**: Check Git webhook in Vercel settings
- **Build fails**: Check build logs for errors
- **API not working**: Check environment variables are set
- **404 errors**: Check vercel.json rewrites are correct

## Force Redeploy:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Deployments tab
4. Click "..." on latest deployment
5. Click "Redeploy"

