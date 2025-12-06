// Helper functions to use MongoDB instead of localStorage
// Replace localStorage calls with these functions

export async function saveAppointment(appointmentData: any) {
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  } catch (error) {
    console.error('Error saving appointment:', error)
    // Fallback to localStorage if API fails
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
    appointments.push({ ...appointmentData, id: 'APT-' + Date.now() })
    localStorage.setItem('appointments', JSON.stringify(appointments))
    return appointments[appointments.length - 1]
  }
}

export async function getAppointments(userId?: string) {
  try {
    const url = userId ? `/api/appointments?userId=${userId}` : '/api/appointments'
    const response = await fetch(url)
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  } catch (error) {
    console.error('Error fetching appointments:', error)
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('appointments') || '[]')
  }
}

export async function saveOrder(orderData: any) {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  } catch (error) {
    console.error('Error saving order:', error)
    // Fallback to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push({ ...orderData, id: 'ORD-' + Date.now() })
    localStorage.setItem('orders', JSON.stringify(orders))
    return orders[orders.length - 1]
  }
}

export async function getOrders(userId?: string) {
  try {
    const url = userId ? `/api/orders?userId=${userId}` : '/api/orders'
    const response = await fetch(url)
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('orders') || '[]')
  }
}

export async function saveReport(reportData: any) {
  try {
    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  } catch (error) {
    console.error('Error saving report:', error)
    // Fallback to localStorage
    const reports = JSON.parse(localStorage.getItem('reports') || '[]')
    reports.push({ ...reportData, id: 'RPT-' + Date.now() })
    localStorage.setItem('reports', JSON.stringify(reports))
    return reports[reports.length - 1]
  }
}

export async function getReports(userId?: string) {
  try {
    const url = userId ? `/api/reports?userId=${userId}` : '/api/reports'
    const response = await fetch(url)
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error)
    }
    return data.data
  } catch (error) {
    console.error('Error fetching reports:', error)
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('reports') || '[]')
  }
}

