import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'

// GET - Fetch all appointments (or user-specific)
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    
    let appointments
    if (userId) {
      appointments = await Appointment.find({ userId }).sort({ createdAt: -1 })
    } else {
      appointments = await Appointment.find().sort({ createdAt: -1 })
    }
    
    return NextResponse.json({ 
      success: true, 
      data: appointments 
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// POST - Create new appointment
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const appointment = await Appointment.create(body)
    
    return NextResponse.json(
      { success: true, data: appointment },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// PUT - Update appointment status
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { id, status } = body
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
    
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, data: appointment })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// DELETE - Delete appointment
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Appointment ID required' },
        { status: 400 }
      )
    }
    
    await Appointment.findByIdAndDelete(id)
    
    return NextResponse.json({ success: true, message: 'Appointment deleted' })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

