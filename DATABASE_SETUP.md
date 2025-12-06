# MongoDB Database Setup Guide (Hindi/English)

## 🎯 Best Option: MongoDB Atlas (Cloud Database)

**Kyun MongoDB Atlas?**
- ✅ **Free tier** - 512MB storage (kaafi hai shuru ke liye)
- ✅ **Cloud-based** - Server ki zarurat nahi
- ✅ **Easy setup** - 5 minutes mein setup
- ✅ **Scalable** - Baad mein easily upgrade kar sakte hain
- ✅ **Secure** - Automatic backups

## 📋 Setup Steps (Step-by-Step)

### Step 1: MongoDB Atlas Account Banayein

1. Website kholo: https://www.mongodb.com/cloud/atlas
2. "Try Free" button click karo
3. Sign up karo (Google account se bhi kar sakte hain)
4. Email verify karo

### Step 2: Free Cluster Create Karo

1. "Build a Database" click karo
2. **Free (M0)** tier select karo
3. Cloud provider: **AWS** (default)
4. Region: **Mumbai** ya apne paas wala select karo
5. Cluster name: `medical-cluster` (ya kuch bhi)
6. "Create" button click karo
7. 2-3 minutes wait karo (cluster ban raha hai)

### Step 3: Database User Create Karo

1. "Database Access" (left sidebar) click karo
2. "Add New Database User" click karo
3. Authentication: **Password**
4. Username: `medical-user` (ya kuch bhi)
5. Password: Strong password generate karo (save kar lo!)
6. Database User Privileges: **Read and write to any database**
7. "Add User" click karo

### Step 4: Network Access Setup Karo

1. "Network Access" (left sidebar) click karo
2. "Add IP Address" click karo
3. "Allow Access from Anywhere" click karo (development ke liye)
   - Ya apna IP address add karo
4. "Confirm" click karo

### Step 5: Connection String Copy Karo

1. "Database" (left sidebar) → "Connect" click karo
2. "Connect your application" select karo
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Connection string copy karo:
   ```
   mongodb+srv://medical-user:<password>@medical-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. `<password>` ko apne password se replace karo
7. Database name add karo:
   ```
   mongodb+srv://medical-user:YOUR_PASSWORD@medical-cluster.xxxxx.mongodb.net/medical?retryWrites=true&w=majority
   ```

### Step 6: Project Mein Setup Karo

1. `.env.local` file create karo (project root mein)
2. Connection string add karo:
   ```env
   MONGODB_URI=mongodb+srv://medical-user:YOUR_PASSWORD@medical-cluster.xxxxx.mongodb.net/medical?retryWrites=true&w=majority
   ```
3. Dependencies install karo:
   ```bash
   npm install
   ```

### Step 7: Test Karo

1. Server restart karo:
   ```bash
   npm run dev
   ```
2. Website kholo: http://localhost:3001
3. Appointment book karo
4. MongoDB Atlas mein check karo:
   - "Database" → "Browse Collections"
   - `appointments` collection dikhni chahiye

## 📁 Database Collections (Tables)

Ye collections automatically ban jayengi:

1. **appointments** - Sabhi appointments
2. **orders** - Sabhi medicine orders
3. **reports** - Sabhi medical reports
4. **users** - Sabhi users

## 🔄 Migration: localStorage se MongoDB

### Current (localStorage):
```javascript
localStorage.setItem('appointments', JSON.stringify(appointments))
```

### New (MongoDB):
```javascript
await fetch('/api/appointments', {
  method: 'POST',
  body: JSON.stringify(appointmentData)
})
```

## 🛠️ API Endpoints

Ab ye APIs available hain:

- `POST /api/appointments` - Appointment save karo
- `GET /api/appointments?userId=123` - Appointments fetch karo
- `PUT /api/appointments` - Appointment update karo
- `DELETE /api/appointments?id=123` - Appointment delete karo

- `POST /api/orders` - Order save karo
- `GET /api/orders?userId=123` - Orders fetch karo
- `PUT /api/orders` - Order status update karo

- `POST /api/reports` - Report upload karo
- `GET /api/reports?userId=123` - Reports fetch karo
- `DELETE /api/reports?id=123` - Report delete karo

- `POST /api/users` - User signup
- `GET /api/users` - All users (admin only)
- `PUT /api/users` - User update

- `POST /api/auth/login` - User login

## 🔒 Security Notes

1. **Password Hashing**: Abhi simple password check hai. Production mein `bcrypt` use karo
2. **Environment Variables**: `.env.local` ko git mein commit mat karo
3. **API Authentication**: JWT tokens add karo production ke liye

## 📊 MongoDB Atlas Dashboard

MongoDB Atlas mein ye features milte hain:
- Real-time data view
- Database size monitoring
- Performance metrics
- Automatic backups (paid tier)
- Data export/import

## 🆘 Troubleshooting

**Connection Error?**
- Check karo `.env.local` file sahi hai
- Password sahi hai?
- Network Access mein IP address allowed hai?

**Data nahi dikh raha?**
- Browser console check karo
- MongoDB Atlas mein "Browse Collections" check karo
- API routes test karo: http://localhost:3001/api/appointments

## ✅ Next Steps

1. MongoDB Atlas setup karo (steps above)
2. `.env.local` file create karo
3. Code update karo (main kar chuka hoon)
4. Test karo

**Note**: Abhi code ready hai, bas MongoDB Atlas setup karna hai!

