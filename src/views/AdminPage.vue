<template>
  <div class="admin-page">
    <!-- Background Image -->
    <div class="background-image"></div>
    <div class="background-overlay"></div>

    <!-- Login Modal -->
    <div v-if="!isAuthenticated" class="login-overlay">
      <div class="login-modal" v-motion 
           :initial="{ opacity: 0, scale: 0.9 }" 
           :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }">
        <div class="login-header">
          <h2 class="login-title">
            <Shield class="admin-icon" />
            Admin Access
          </h2>
          <p class="login-subtitle">Tournament Administration Portal</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="loginForm.email"
              type="email"
              class="form-input"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              class="form-input"
              placeholder="Enter password"
              required
            />
          </div>
          
          <GlowingButton variant="primary" :loading="isLoggingIn" @click="handleLogin">
            <LogIn v-if="!isLoggingIn" class="btn-icon" />
            {{ isLoggingIn ? 'Authenticating...' : 'Access Dashboard' }}
          </GlowingButton>
        </form>
        
        <div class="login-footer">
          <router-link to="/" class="back-home">
            <ArrowLeft class="back-icon" />
            Back to Home
          </router-link>
        </div>
      </div>
    </div>

    <!-- Admin Dashboard -->
    <div v-else class="admin-dashboard">
      <header class="admin-header">
        <div class="header-content">
          <h1 class="dashboard-title">
            <Crown class="title-icon" />
            Tournament Administration
          </h1>
          <div class="header-actions">
            <button @click="refreshData" class="action-btn refresh-btn">
              <RefreshCw class="btn-icon" />
              Refresh
            </button>
            <button @click="logout" class="action-btn logout-btn">
              <LogOut class="btn-icon" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div class="dashboard-content">
        <div class="stats-grid">
          <div class="stat-card" v-motion 
               :initial="{ opacity: 0, y: 20 }" 
               :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }">
            <Users class="stat-icon" />
            <div class="stat-info">
              <div class="stat-number">{{ registeredPlayers.length }}</div>
              <div class="stat-label">Registered</div>
            </div>
          </div>
          <div class="stat-card" v-motion 
               :initial="{ opacity: 0, y: 20 }" 
               :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
            <CheckCircle class="stat-icon verified" />
            <div class="stat-info">
              <div class="stat-number">{{ verifiedPlayers.length }}</div>
              <div class="stat-label">Verified</div>
            </div>
          </div>
          <div class="stat-card" v-motion 
               :initial="{ opacity: 0, y: 20 }" 
               :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }">
            <Clock class="stat-icon pending" />
            <div class="stat-info">
              <div class="stat-number">{{ registeredPlayers.length - verifiedPlayers.length }}</div>
              <div class="stat-label">Pending</div>
            </div>
          </div>
        </div>

        <div class="tables-container">
          <!-- Registered Players Table -->
          <div class="table-section" v-motion 
               :initial="{ opacity: 0, y: 30 }" 
               :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }">
            <div class="table-header">
              <h2 class="table-title">
                <Users class="table-icon" />
                Registered Players
              </h2>
            </div>
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Level</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in registeredPlayers" :key="player.id" class="table-row">
                    <td class="player-name">{{ player.fullName }}</td>
                    <td class="player-department">{{ player.Department }}</td>
                    <td>
                      <span :class="['level-badge', player.level.toLowerCase()]">
                        {{ player.level }}
                      </span>
                    </td>
                    <td class="player-rating">{{ player.rating }}</td>
                    <td class="actions-cell">
                      <button @click="viewPlayer(player)" class="action-btn view-btn">
                        <Eye class="btn-icon" />
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="registeredPlayers.length === 0" class="empty-state">
                <Users class="empty-icon" />
                <p class="empty-text">No registered players yet</p>
              </div>
            </div>
          </div>

          <!-- Verified Players Table -->
          <div class="table-section" v-motion 
               :initial="{ opacity: 0, y: 30 }" 
               :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }">
            <div class="table-header">
              <h2 class="table-title">
                <CheckCircle class="table-icon" />
                Verified Players
              </h2>
            </div>
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Level</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in verifiedPlayers" :key="player.id" class="table-row">
                    <td class="player-name">{{ player.fullName }}</td>
                    <td class="player-department">{{ player.Department }}</td>
                    <td>
                      <span :class="['level-badge', player.level.toLowerCase()]">
                        {{ player.level }}
                      </span>
                    </td>
                    <td class="player-rating">{{ player.rating }}</td>
                    <td class="actions-cell">
                      <button @click="viewPlayer(player)" class="action-btn view-btn">
                        <Eye class="btn-icon" />
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="verifiedPlayers.length === 0" class="empty-state">
                <CheckCircle class="empty-icon" />
                <p class="empty-text">No verified players yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Player Detail Modal -->
    <div v-if="selectedPlayer" class="modal-overlay" @click="closeModal">
      <div class="player-modal" @click.stop v-motion 
           :initial="{ opacity: 0, scale: 0.9 }" 
           :enter="{ opacity: 1, scale: 1, transition: { duration: 300 } }">
        <div class="modal-header">
          <h3 class="modal-title">Player Details</h3>
          <button @click="closeModal" class="close-btn">
            <X class="close-icon" />
          </button>
        </div>
        
        <div class="modal-content">
          <div class="player-info">
            <div class="info-row">
              <span class="info-label">Full Name:</span>
              <span class="info-value">{{ selectedPlayer.fullName }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">{{ selectedPlayer.email }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Lichess Username:</span>
              <span class="info-value">{{ selectedPlayer.lichessUsername }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Rating:</span>
              <span class="info-value">{{ selectedPlayer.rating }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Department:</span>
              <span class="info-value">{{ selectedPlayer.Department }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Skill Level:</span>
              <span :class="['level-badge', selectedPlayer.level.toLowerCase()]">
                {{ selectedPlayer.level }}
              </span>
            </div>
          </div>
          
          <div class="modal-actions">
            <GlowingButton 
              v-if="!isPlayerVerified(selectedPlayer)"
              variant="success"
              :loading="isProcessing"
              @click="verifyPlayer(selectedPlayer)"
            >
              <CheckCircle v-if="!isProcessing" class="btn-icon" />
              {{ isProcessing ? 'Verifying...' : 'Verify Player' }}
            </GlowingButton>
            <GlowingButton 
              variant="danger"
              :loading="isProcessing"
              @click="confirmDelete(selectedPlayer)"
            >
              <Trash2 class="btn-icon" />
              Delete Player
            </GlowingButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click="cancelDelete">
      <div class="confirm-modal" @click.stop v-motion 
           :initial="{ opacity: 0, scale: 0.9 }" 
           :enter="{ opacity: 1, scale: 1, transition: { duration: 300 } }">
        <div class="confirm-header">
          <AlertTriangle class="warning-icon" />
          <h3 class="confirm-title">Confirm Deletion</h3>
        </div>
        <div class="confirm-content">
          <p class="confirm-text">
            Are you sure you want to delete <strong>{{ playerToDelete?.fullName }}</strong>?
          </p>
          <p class="confirm-warning">This action cannot be undone.</p>
        </div>
        <div class="confirm-actions">
          <GlowingButton variant="secondary" @click="cancelDelete">
            Cancel
          </GlowingButton>
          <GlowingButton variant="danger" :loading="isProcessing" @click="deletePlayer">
            <Trash2 v-if="!isProcessing" class="btn-icon" />
            {{ isProcessing ? 'Deleting...' : 'Delete' }}
          </GlowingButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { 
  Shield, Crown, LogIn, LogOut, RefreshCw, ArrowLeft, Users, CheckCircle, 
  Clock, Eye, X, Trash2, AlertTriangle 
} from 'lucide-vue-next'
import { getRegisteredPlayers, getVerifiedPlayers, verifyPlayerById, deletePlayerById } from '../services/api'
import GlowingButton from '../components/GlowingButton.vue'

const router = useRouter()

// Authentication state
const isAuthenticated = ref(false)
const isLoggingIn = ref(false)
const loginForm = reactive({
  email: '',
  password: ''
})

// Data state
const registeredPlayers = ref([])
const verifiedPlayers = ref([])
const selectedPlayer = ref(null)
const isProcessing = ref(false)

// Delete confirmation
const showDeleteConfirm = ref(false)
const playerToDelete = ref(null)

// Admin credentials (frontend only)
const ADMIN_EMAIL = 'unlimiteddemi@gmail.com'
const ADMIN_PASSWORD = 'Amaniel+4'

const handleLogin = () => {
  isLoggingIn.value = true
  
  setTimeout(() => {
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      isAuthenticated.value = true
      localStorage.setItem('chess_admin_auth', 'true')
      toast.success('Welcome, Administrator')
      loadData()
    } else {
      toast.error('Invalid credentials', {
        description: 'Please check your email and password.'
      })
    }
    isLoggingIn.value = false
  }, 1000)
}

const logout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('chess_admin_auth')
  toast.success('Logged out successfully')
}

const loadData = async () => {
  try {
    const [registered, verified] = await Promise.all([
      getRegisteredPlayers(),
      getVerifiedPlayers()
    ])
    
    registeredPlayers.value = registered
    verifiedPlayers.value = verified
  } catch (error) {
    console.error('Error loading data:', error)
    toast.error('Failed to load data', {
      description: 'Please try refreshing the page.'
    })
  }
}

const refreshData = () => {
  toast.success('Refreshing data...')
  loadData()
}

const viewPlayer = (player) => {
  selectedPlayer.value = player
}

const closeModal = () => {
  selectedPlayer.value = null
}

const isPlayerVerified = (player) => {
  return verifiedPlayers.value.some(vp => vp.id === player.id)
}

const verifyPlayer = async (player) => {
  isProcessing.value = true
  
  try {
    await verifyPlayerById(player.id)
    toast.success(`${player.fullName} has been verified`)
    await loadData()
    closeModal()
  } catch (error) {
    console.error('Error verifying player:', error)
    toast.error('Failed to verify player', {
      description: 'Please try again.'
    })
  } finally {
    isProcessing.value = false
  }
}

const confirmDelete = (player) => {
  playerToDelete.value = player
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  playerToDelete.value = null
  showDeleteConfirm.value = false
}

const deletePlayer = async () => {
  if (!playerToDelete.value) return
  
  isProcessing.value = true
  
  try {
    await deletePlayerById(playerToDelete.value.id)
    toast.success(`${playerToDelete.value.fullName} has been deleted`)
    await loadData()
    closeModal()
    cancelDelete()
  } catch (error) {
    console.error('Error deleting player:', error)
    toast.error('Failed to delete player', {
      description: 'Please try again.'
    })
  } finally {
    isProcessing.value = false
  }
}

onMounted(() => {
  // Check if already authenticated
  if (localStorage.getItem('chess_admin_auth') === 'true') {
    isAuthenticated.value = true
    loadData()
  }
})
</script>


<style scoped>
.admin-page {
  min-height: 100vh;
  position: relative;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets../assets/chess-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -2;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: -1;
}

/* Login Modal Styles */
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.login-modal {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 48px;
  width: 100%;
  max-width: 400px;
  margin: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.admin-icon {
  width: 24px;
  height: 24px;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 600;
  color: white;
  font-size: 14px;
}

.form-input {
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  backdrop-filter: blur(10px);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
}

.login-footer {
  text-align: center;
  margin-top: 24px;
}

.back-home {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.back-home:hover {
  color: white;
}

.back-icon {
  width: 16px;
  height: 16px;
}

/* Dashboard Styles */
.admin-dashboard {
  min-height: 100vh;
}

.admin-header {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.9);
}

.header-actions {
  display: flex;
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  backdrop-filter: blur(10px);
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.8);
}

.stat-icon.verified {
  color: #22c55e;
}

.stat-icon.pending {
  color: #f59e0b;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.tables-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.table-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.table-header {
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.table-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-icon {
  width: 20px;
  height: 20px;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: rgba(255, 255, 255, 0.05);
  padding: 16px 32px;
  text-align: left;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
}

.table-row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.data-table td {
  padding: 16px 32px;
  color: white;
}

.player-name {
  font-weight: 600;
}

.player-department {
  color: rgba(255, 255, 255, 0.7);
}

.player-rating {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.level-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.level-badge.beginner {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.level-badge.intermediate {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.level-badge.advanced {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.actions-cell {
  text-align: center;
}

.view-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.empty-state {
  text-align: center;
  padding: 64px 32px;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: rgba(255, 255, 255, 0.4);
}

.empty-text {
  font-size: 16px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.player-modal {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  margin: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  padding: 24px 32px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.close-icon {
  width: 20px;
  height: 20px;
}

.modal-content {
  padding: 32px;
}

.player-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.info-label {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.info-value {
  color: white;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

/* Confirmation Modal */
.confirm-modal {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  margin: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.confirm-header {
  padding: 24px 32px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
}

.warning-icon {
  width: 24px;
  height: 24px;
  color: #f59e0b;
}

.confirm-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.confirm-content {
  padding: 32px;
}

.confirm-text {
  margin-bottom: 16px;
  color: white;
}

.confirm-warning {
  color: #ef4444;
  font-size: 14px;
}

.confirm-actions {
  padding: 16px 32px 32px;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding: 0 16px;
  }
  
  .dashboard-content {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .data-table {
    font-size: 14px;
  }
  
  .data-table th,
  .data-table td {
    padding: 12px 16px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .confirm-actions {
    flex-direction: column;
  }
  
  .login-modal {
    padding: 32px;
  }
}
</style>
