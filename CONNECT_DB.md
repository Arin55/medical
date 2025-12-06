# 🔌 Database Connection Guide

## Quick Setup (3 Steps)

### Step 1: MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free" → Sign up (Google account works)
3. Verify your email

### Step 2: Create Free Cluster

1. Click "Build a Database"
2. Select **FREE (M0)** tier
3. Choose region: **Mumbai** or nearest
4. Click "Create" (takes 2-3 minutes)

### Step 3: Get Connection String

1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `medical-user` (or anything)
4. Password: Click "Autogenerate Secure Password" → **SAVE THIS PASSWORD!**
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

7. Click "Network Access" (left sidebar)
8. Click "Add IP Address"
9. Click "Allow Access from Anywhere" (for development)
10. Click "Confirm"

11. Go to "Database" → Click "Connect"
12. Select "Connect your application"
13. Driver: **Node.js**, Version: **5.5 or later**
14. Copy the connection string:
    ```
    mongodb+srv://medical-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
    ```

15. **Replace `<password>` with your actual password**
16. **Add database name at the end**: `/medical`
    
    Final string should look like:
    ```
    mongodb+srv://medical-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medical?retryWrites=true&w=majority
    ```

### Step 4: Create .env.local File

Create `.env.local` file in project root:

```env
MONGODB_URI=mongodb+srv://medical-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medical?retryWrites=true&w=majority
```

**Replace `YOUR_PASSWORD` with your actual password!**

### Step 5: Test Connection

Run this command:
```bash
node scripts/test-connection.js
```

If you see ✅ "Successfully connected to MongoDB!" → You're done!

## 🎯 Alternative: Local MongoDB (If you have it installed)

If you have MongoDB installed locally:

```env
MONGODB_URI=mongodb://localhost:27017/medical
```

## 🆘 Troubleshooting

**Error: MONGODB_URI not found**
- Make sure `.env.local` file exists in project root
- Check file name is exactly `.env.local` (not `.env.local.txt`)

**Error: Authentication failed**
- Check password in connection string is correct
- Make sure you replaced `<password>` with actual password

**Error: Connection timeout**
- Check Network Access in MongoDB Atlas
- Make sure "Allow Access from Anywhere" is enabled

**Error: Invalid connection string**
- Make sure database name `/medical` is added at the end
- Check there are no extra spaces

## ✅ Verify Connection

After setup, test by:
1. Run: `node scripts/test-connection.js`
2. Or start server: `npm run dev`
3. Book an appointment on website
4. Check MongoDB Atlas → "Browse Collections" → `appointments` collection

## 📝 Important Notes

- `.env.local` file is already in `.gitignore` (won't be committed)
- Never share your connection string publicly
- Free tier gives 512MB storage (enough for development)

---

**Need help? Check the connection string format carefully!**

