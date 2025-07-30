import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
 
  headers: {
    "Content-Type": "application/json",
  },
})
console.log('API Base URL:', api.defaults.baseURL)
// Add request interceptor for admin routes
api.interceptors.request.use((config) => {
  // Add bearer token for admin routes
  
    config.headers.Authorization = "Bearer eaf609b775a882a69ff553f5a59f85ac"

  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

// Participant registration
export const registerParticipant = async (participantData) => {
  const response = await api.post("/api/register", participantData)
  return response.data
}

// Get registered players (admin only)
export const getRegisteredPlayers = async () => {
  const response = await api.get("/api/getPlayers")
  return response.data
}

// Get verified players (admin only)
export const getVerifiedPlayers = async () => {
 
    const response = await api.get("/api/getVerifiedPlayers")
    return response.data
  
}

// Get transaction status by reference
export const getTransactionStatus = async (reference) => {
  const response = await api.get(`/api/transactionStatus?reference=${encodeURIComponent(reference)}`)
  return response.data
}

// Verify a player (admin only)
export const verifyPlayerById = async (email) => {

    const payload = { email }
    if (email) payload.email = email           // include email
    const response = await api.post("/api/verifyPlayer", payload)
    return response.data
  }

// Delete a player (admin only)
export const deletePlayerById = async (playerEmail) => {
  
    const response = await api.delete(`/deletePlayer/`, { email: { playerEmail  } })
    return response.data
 
}

// Generate API key (admin only)
export const generateApiKey = async () => {
  const response = await api.get("/admin/generate-apikey")
  return response.data
}

export default api
