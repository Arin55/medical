import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'

// GET - Fetch all orders (or user-specific)
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    
    let orders
    if (userId) {
      orders = await Order.find({ userId }).sort({ createdAt: -1 })
    } else {
      orders = await Order.find().sort({ createdAt: -1 })
    }
    
    return NextResponse.json({ 
      success: true, 
      data: orders 
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const order = await Order.create(body)
    
    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// PUT - Update order status
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { id, status } = body
    
    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: order })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

