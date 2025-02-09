// utils/routeDistance.js
export async function getRealDistance(lat1, lon1, lat2, lon2) {
  const apiKey = 'YOUR_OPENROUTESERVICE_API_KEY' // Replace with your API key
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${lon1},${lat1}&end=${lon2},${lat2}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data.routes && data.routes.length > 0) {
      return data.routes[0].summary.distance / 1000 // Convert meters to km
    }
    return null
  } catch (error) {
    console.error('Error fetching distance:', error)
    return null
  }
}
