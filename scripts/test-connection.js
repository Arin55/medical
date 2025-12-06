// Test MongoDB Connection Script
// Run: node scripts/test-connection.js

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local file!')
  console.log('\n📝 Please create .env.local file with:')
  console.log('MONGODB_URI=your_connection_string_here\n')
  process.exit(1)
}

console.log('🔄 Connecting to MongoDB...')
console.log('Connection string:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'))

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!')
    console.log('📊 Database:', mongoose.connection.name)
    console.log('🌐 Host:', mongoose.connection.host)
    mongoose.connection.close()
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message)
    console.log('\n💡 Troubleshooting:')
    console.log('1. Check if MONGODB_URI is correct in .env.local')
    console.log('2. Verify MongoDB Atlas cluster is running')
    console.log('3. Check Network Access settings in MongoDB Atlas')
    console.log('4. Ensure password in connection string is correct\n')
    process.exit(1)
  })

