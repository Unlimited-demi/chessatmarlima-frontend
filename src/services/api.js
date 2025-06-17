import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
 
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
  try {
    const response = await api.post("/api/register", participantData)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get registered players (admin only)
export const getRegisteredPlayers = async () => {
  try {
    const response = await api.get("/api/getPlayers")
    return response.data
  } catch (error) {
    throw error
  }
}

// Get verified players (admin only)
export const getVerifiedPlayers = async () => {
  try {
    const response = await api.get("/api/getVerifiedPlayers")
    return response.data
  } catch (error) {
    throw error
  }
}

// Verify a player (admin only)
export const verifyPlayerById = async (playerId, email) => {
  try {
    const payload = { playerId }
    if (email) payload.email = email           // include email
    const response = await api.post("/api/verifyPlayer", payload)
    return response.data
  } catch (error) {
    throw error
  }
}

// Delete a player (admin only)
export const deletePlayerById = async (playerEmail) => {
  try {
    const response = await api.delete(`/deletePlayer/`, { email: { playerEmail  } })
    return response.data
  } catch (error) {
    throw error
  }
}

// Generate API key (admin only)
export const generateApiKey = async () => {
  try {
    const response = await api.get("/admin/generate-apikey")
    return response.data
  } catch (error) {
    throw error
  }
}

export default api
