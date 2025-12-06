// Example: How to replace localStorage with MongoDB
// This is just an example - actual implementation will be in API routes

/*
CURRENT (localStorage):
localStorage.setItem('appointments', JSON.stringify(appointments))

FUTURE (MongoDB):
await fetch('/api/appointments', {
  method: 'POST',
  body: JSON.stringify(appointmentData)
})
*/

// Example API call function
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
    return data
  } catch (error) {
    console.error('Error saving appointment:', error)
    throw error
  }
}

export async function getAppointments() {
  try {
    const response = await fetch('/api/appointments')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching appointments:', error)
    throw error
  }
}

// Similar functions for:
// - saveOrder()
// - getOrders()
// - saveReport()
// - getReports()
// - etc.

