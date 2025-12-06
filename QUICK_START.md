# 🚀 Quick Start - MongoDB Setup (5 Minutes)

## ✅ Step 1: MongoDB Atlas Account

1. Jao: https://www.mongodb.com/cloud/atlas
2. "Try Free" click karo
3. Sign up karo
4. Email verify karo

## ✅ Step 2: Free Cluster

1. "Build a Database" → **Free (M0)** select karo
2. Region: **Mumbai** ya apne paas wala
3. "Create" click karo
4. 2-3 minutes wait karo

## ✅ Step 3: Database User

1. "Database Access" → "Add New Database User"
2. Username: `medical-user`
3. Password: Strong password (save kar lo!)
4. "Add User" click karo

## ✅ Step 4: Network Access

1. "Network Access" → "Add IP Address"
2. "Allow Access from Anywhere" click karo
3. "Confirm" click karo

## ✅ Step 5: Connection String

1. "Database" → "Connect" → "Connect your application"
2. Connection string copy karo
3. `<password>` ko apne password se replace karo
4. End mein `/medical` add karo:
   ```
   mongodb+srv://medical-user:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/medical?retryWrites=true&w=majority
   ```

## ✅ Step 6: Project Setup

1. Project root mein `.env.local` file create karo
2. Ye add karo:
   ```env
   MONGODB_URI=mongodb+srv://medical-user:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/medical?retryWrites=true&w=majority
   ```
3. Server restart karo:
   ```bash
   npm run dev
   ```

## ✅ Step 7: Test

1. Website kholo: http://localhost:3001
2. Appointment book karo
3. MongoDB Atlas → "Browse Collections" mein check karo
4. `appointments` collection dikhni chahiye! 🎉

## 📝 Important Notes

- `.env.local` file ko git mein commit **mat** karo
- Password ko safe rakho
- Free tier mein 512MB storage hai (kaafi hai shuru ke liye)

## 🆘 Problem?

- Connection error? → Password sahi hai? Network access allowed hai?
- Data nahi dikh raha? → Browser console check karo
- API error? → MongoDB Atlas dashboard check karo

---

**Setup complete! Ab data MongoDB mein save hoga! 🎊**

