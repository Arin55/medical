# Backend Setup Guide (Hindi/English)

## Current Situation (Abhi Kya Ho Raha Hai)

**Abhi data kahan save ho raha hai:**
- ❌ Browser ke **localStorage** mein (temporary)
- ❌ Sirf same browser mein dikhega
- ❌ Browser clear karne par sab delete ho jayega

## Proper Backend Setup (Database)

### Option 1: MongoDB (Recommended - Easy)

1. **MongoDB Atlas (Free Cloud Database)**
   - Website: https://www.mongodb.com/cloud/atlas
   - Free tier available
   - Setup guide:
     ```bash
     npm install mongodb mongoose
     ```

2. **Create API Routes in Next.js**
   - Create `app/api/` folder
   - Create routes for:
     - `/api/appointments` - Save appointments
     - `/api/orders` - Save orders
     - `/api/reports` - Save reports
     - `/api/users` - User management

### Option 2: PostgreSQL + Prisma

1. **Install Prisma**
   ```bash
   npm install @prisma/client prisma
   npx prisma init
   ```

2. **Setup Database Schema**
   - Define models in `prisma/schema.prisma`
   - Run migrations

### Option 3: Firebase (Google - Very Easy)

1. **Firebase Setup**
   ```bash
   npm install firebase
   ```

2. **Features:**
   - Real-time database
   - Authentication
   - File storage (for reports)
   - Free tier available

## Quick Setup: MongoDB Example

### Step 1: Install Dependencies
```bash
npm install mongodb mongoose
```

### Step 2: Create `.env.local` file
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medical
```

### Step 3: Create Database Connection
Create `lib/mongodb.ts`:
```typescript
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
```

### Step 4: Create API Routes

**Example: `app/api/appointments/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const appointment = new Appointment(body)
    await appointment.save()
    
    return NextResponse.json({ success: true, data: appointment })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const appointments = await Appointment.find()
    return NextResponse.json({ success: true, data: appointments })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
```

### Step 5: Create Models

**Example: `models/Appointment.ts`**
```typescript
import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema({
  doctorId: String,
  doctorName: String,
  date: String,
  time: String,
  patientName: String,
  phone: String,
  symptoms: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  userId: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema)
```

## Current Data Storage Locations

### Browser localStorage Keys:
1. `currentUser` - Logged in user info
2. `appointments` - All appointments
3. `orders` - All medicine orders
4. `reports` - Uploaded medical reports
5. `cart` - Shopping cart items

### How to Check localStorage:
1. Open browser (Chrome/Firefox)
2. Press F12 (Developer Tools)
3. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
4. Click on "Local Storage" → `http://localhost:3001`
5. You'll see all saved data there

## Migration from localStorage to Database

1. **Export current localStorage data**
2. **Create API endpoints**
3. **Replace localStorage calls with API calls**
4. **Import old data to database**

## Recommended: Start with MongoDB Atlas

**Why MongoDB Atlas?**
- ✅ Free tier (512MB)
- ✅ Easy setup
- ✅ Cloud-based (no server needed)
- ✅ Good for beginners

**Steps:**
1. Sign up at mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `.env.local`
5. Create API routes (as shown above)

---

**Note:** Abhi jo code hai, wo demo ke liye hai. Production mein database use karna zaroori hai!

