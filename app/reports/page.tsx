'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { FaUpload, FaFilePdf, FaFileImage } from 'react-icons/fa'

export default function ReportsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [reports, setReports] = useState<any[]>([])
  const [reportName, setReportName] = useState('')
  const [reportType, setReportType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)

    // Load reports from MongoDB API
    const loadReports = async () => {
      try {
        const response = await fetch(`/api/reports?userId=${currentUser.id}`)
        const data = await response.json()
        if (data.success) {
          setReports(data.data)
        } else {
          throw new Error('Failed to load reports')
        }
      } catch (error) {
        console.error('Error loading reports:', error)
        // Fallback to localStorage
        const savedReports = JSON.parse(localStorage.getItem('reports') || '[]')
        setReports(savedReports.filter((rpt: any) => rpt.userId === currentUser.id))
      }
    }

    loadReports()
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setSelectedFile(file)
      } else {
        alert('Please upload a PDF or image file (JPG, PNG)')
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reportName || !reportType || !selectedFile) {
      alert('Please fill all fields and select a file')
      return
    }

    try {
      // Create file URL (in production, upload to cloud storage)
      const fileUrl = URL.createObjectURL(selectedFile)

      // Save report to MongoDB
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          name: reportName,
          type: reportType,
          fileUrl: fileUrl,
          fileName: selectedFile.name
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        const newReport = data.data
        setReports([...reports, newReport])
        alert('Report uploaded successfully!')
        setReportName('')
        setReportType('')
        setSelectedFile(null)
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        throw new Error(data.error || 'Failed to upload report')
      }
    } catch (error: any) {
      console.error('Error uploading report:', error)
      // Fallback to localStorage
      const fileUrl = URL.createObjectURL(selectedFile)
      const newReport = {
        id: 'RPT-' + Date.now(),
        userId: user.id,
        name: reportName,
        type: reportType,
        date: new Date().toISOString(),
        file: fileUrl,
        fileUrl: fileUrl,
        fileName: selectedFile.name
      }
      const updatedReports = [...reports, newReport]
      setReports(updatedReports)
      localStorage.setItem('reports', JSON.stringify(updatedReports))
      alert('Report uploaded successfully!')
      setReportName('')
      setReportType('')
      setSelectedFile(null)
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    }
  }

  if (!user) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Medical Reports</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Report</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="input-field"
                placeholder="e.g., Blood Test Report"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Type</option>
                <option value="Blood Test">Blood Test</option>
                <option value="X-Ray">X-Ray</option>
                <option value="CT Scan">CT Scan</option>
                <option value="MRI">MRI</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="ECG">ECG</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload File (PDF/JPG)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-input"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {selectedFile ? (
                    <>
                      {selectedFile.type === 'application/pdf' ? (
                        <FaFilePdf className="text-4xl text-red-500 mb-2" />
                      ) : (
                        <FaFileImage className="text-4xl text-blue-500 mb-2" />
                      )}
                      <span className="text-sm text-gray-600">{selectedFile.name}</span>
                    </>
                  ) : (
                    <>
                      <FaUpload className="text-4xl text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                      <span className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 10MB)</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              <FaUpload className="inline mr-2" /> Upload Report
            </button>
          </form>
        </div>

        {/* Reports List */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Reports</h2>
          {reports.length === 0 ? (
            <p className="text-gray-500">No reports uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report._id || report.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{report.name}</h3>
                      <p className="text-sm text-gray-600">Type: {report.type}</p>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(report.createdAt || report.date).toLocaleDateString()}
                      </p>
                    </div>
                    <a
                      href={report.fileUrl || report.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm py-2 px-4"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

