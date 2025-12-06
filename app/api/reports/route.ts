import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Report from '@/models/Report'

// GET - Fetch all reports (or user-specific)
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    
    let reports
    if (userId) {
      reports = await Report.find({ userId }).sort({ createdAt: -1 })
    } else {
      reports = await Report.find().sort({ createdAt: -1 })
    }
    
    return NextResponse.json({ 
      success: true, 
      data: reports 
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// POST - Upload new report
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const report = await Report.create(body)
    
    return NextResponse.json(
      { success: true, data: report },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

// DELETE - Delete report
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Report ID required' },
        { status: 400 }
      )
    }
    
    await Report.findByIdAndDelete(id)
    
    return NextResponse.json({ success: true, message: 'Report deleted' })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}

