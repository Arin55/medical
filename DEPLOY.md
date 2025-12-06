# 🚀 Deploy to GitHub & Vercel Guide

## Step 1: Push to GitHub

### A. Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: `medical-website` (or any name)
3. Description: "Medical & Healthcare Website"
4. **Public** or **Private** (your choice)
5. **DON'T** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### B. Push Code to GitHub

Run these commands (GitHub will show you these after creating repo):

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Medical website with MongoDB"

# Add remote (REPLACE Arin55 with your GitHub username if different)
git remote add origin https://github.com/Arin55/medical-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** If you get authentication error, use GitHub Personal Access Token instead of password.

## Step 2: Deploy to Vercel

### A. Connect GitHub to Vercel

1. Go to: **https://vercel.com**
2. Sign up / Login (use GitHub account - easiest)
3. Click **"Add New Project"**
4. Import your GitHub repository: `Arin55/medical-website`
5. Click **"Import"**

### B. Configure Project

1. **Framework Preset:** Next.js (auto-detected)
2. **Root Directory:** `./` (default)
3. **Build Command:** `npm run build` (default)
4. **Output Directory:** `.next` (default)

### C. Add Environment Variables

**IMPORTANT:** Add your MongoDB connection string here!

1. In Vercel project settings, go to **"Environment Variables"**
2. Click **"Add New"**
3. Add:
   - **Name:** `MONGODB_URI`
   - **Value:** Your MongoDB connection string
     ```
     mongodb+srv://username:password@cluster.mongodb.net/medical?retryWrites=true&w=majority
     ```
4. Select environments: **Production, Preview, Development** (all three)
5. Click **"Save"**

### D. Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your website will be live! 🎉

## Step 3: Verify Deployment

1. Vercel will give you a URL like: `https://medical-website.vercel.app`
2. Open the URL
3. Test the website:
   - Book an appointment
   - Place an order
   - Check if data saves to MongoDB

## 🔒 Important: Environment Variables

**Never commit `.env.local` to GitHub!** (Already in .gitignore)

**Always add environment variables in Vercel dashboard:**
- Go to Project → Settings → Environment Variables
- Add `MONGODB_URI` there

## 🆘 Troubleshooting

**Build Failed?**
- Check if all dependencies are in `package.json`
- Check build logs in Vercel dashboard

**Database Connection Error?**
- Verify `MONGODB_URI` is added in Vercel environment variables
- Check MongoDB Atlas Network Access allows Vercel IPs
- Or allow "Access from Anywhere" in MongoDB Atlas

**Website Not Working?**
- Check Vercel deployment logs
- Check browser console for errors
- Verify MongoDB connection string is correct

## 📝 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variable `MONGODB_URI` added in Vercel
- [ ] Deployment successful
- [ ] Website tested and working

---

**Need help? Check Vercel docs: https://vercel.com/docs**

