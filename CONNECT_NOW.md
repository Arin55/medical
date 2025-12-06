# 🔌 Connect Database - Quick Steps

## ✅ Step 1: MongoDB Atlas Setup (5 minutes)

### A. Create Account
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"**
3. Sign up (Google account works)
4. Verify email

### B. Create Cluster
1. Click **"Build a Database"**
2. Select **FREE (M0)** tier
3. Choose region: **Mumbai** or nearest
4. Click **"Create"** (wait 2-3 minutes)

### C. Create Database User
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Username: `medical-user` (or anything)
4. Password: Click **"Autogenerate Secure Password"** → **SAVE THIS PASSWORD!**
5. Privileges: **"Read and write to any database"**
6. Click **"Add User"**

### D. Network Access
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. Click **"Confirm"**

### E. Get Connection String
1. Go to **"Database"** → Click **"Connect"**
2. Select **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy connection string:
   ```
   mongodb+srv://medical-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## ✅ Step 2: Create .env.local File

1. Copy `env.local.example` to `.env.local`:
   ```bash
   copy env.local.example .env.local
   ```
   (Windows PowerShell: `Copy-Item env.local.example .env.local`)

2. Open `.env.local` file

3. Replace the connection string:
   - Replace `<password>` with your actual password
   - Add `/medical` before `?retryWrites`
   
   **Final format:**
   ```
   MONGODB_URI=mongodb+srv://medical-user:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/medical?retryWrites=true&w=majority
   ```

## ✅ Step 3: Test Connection

Run this command:
```bash
npm run test-db
```

**Success?** You'll see: ✅ "Successfully connected to MongoDB!"

**Error?** Check:
- Password is correct in `.env.local`
- Network Access is allowed in MongoDB Atlas
- Connection string format is correct

## ✅ Step 4: Start Server

```bash
npm run dev
```

Now your website will use MongoDB! 🎉

## 🧪 Test It

1. Open: http://localhost:3001
2. Book an appointment
3. Go to MongoDB Atlas → "Browse Collections"
4. You should see `appointments` collection with your data!

## 🆘 Troubleshooting

**"MONGODB_URI not found"**
- Make sure `.env.local` file exists (not `.env.local.txt`)
- Check file is in project root

**"Authentication failed"**
- Password in connection string is wrong
- Make sure you replaced `<password>` with actual password

**"Connection timeout"**
- Network Access not allowed
- Go to MongoDB Atlas → Network Access → Allow from anywhere

**"Invalid connection string"**
- Make sure `/medical` is added before `?retryWrites`
- No extra spaces in connection string

---

## 📝 Quick Copy-Paste Commands

```bash
# Create .env.local file
Copy-Item env.local.example .env.local

# Test connection
npm run test-db

# Start server
npm run dev
```

---

**Need help? Check `CONNECT_DB.md` for detailed guide!**

