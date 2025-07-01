<template>
  <div class="participants-page">
    <!-- Background Image -->
    <div class="background-image"></div>
    <div class="background-overlay"></div>

    <!-- Navigation -->
    <nav class="navbar" v-motion :initial="{ y: -100, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200 } }">
      <div class="nav-container">
        <router-link to="/" class="nav-brand" v-motion :hover="{ scale: 1.05 }">
          <Crown class="brand-icon" />
          <span class="brand-text">Marlima Chess</span>
        </router-link>
        <div class="nav-links">
          <ThemeToggle />
          <router-link to="/register" class="nav-link register-link" v-motion :hover="{ scale: 1.05, y: -2 }">
            <UserPlus class="link-icon" />
            Register
          </router-link>
          <router-link to="/admin" class="nav-link admin-link" v-motion :hover="{ scale: 1.05, y: -2 }">
            <Shield class="link-icon" />
            Admin
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header Section -->
      <section class="header-section">
        <div class="header-content" v-motion 
             :initial="{ opacity: 0, y: 50 }" 
             :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }">
          <h1 class="page-title">
            <Trophy class="title-icon" />
            Tournament Participants
          </h1>
          <p class="page-subtitle">
            Meet the verified players competing in the Marlima Chess Tournament 2025
          </p>
          
          <div class="stats-summary" v-motion 
               :initial="{ opacity: 0, scale: 0.9 }" 
               :enter="{ opacity: 1, scale: 1, transition: { delay: 600, duration: 600 } }">
            <div class="stat-item">
              <Users class="stat-icon" />
              <div class="stat-info">
                <div class="stat-number">{{ verifiedPlayers.length }}</div>
                <div class="stat-label">Verified Players</div>
              </div>
            </div>
            <div class="stat-item">
              <Target class="stat-icon" />
              <div class="stat-info">
                <div class="stat-number">{{ skillDistribution.beginner }}</div>
                <div class="stat-label">Beginners</div>
              </div>
            </div>
            <div class="stat-item">
              <Zap class="stat-icon" />
              <div class="stat-info">
                <div class="stat-number">{{ skillDistribution.intermediate }}</div>
                <div class="stat-label">Intermediate</div>
              </div>
            </div>
            <div class="stat-item">
              <Award class="stat-icon" />
              <div class="stat-info">
                <div class="stat-number">{{ skillDistribution.advanced }}</div>
                <div class="stat-label">Advanced</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Filters Section -->
      <section class="filters-section" v-motion 
               :initial="{ opacity: 0, y: 30 }" 
               :enter="{ opacity: 1, y: 0, transition: { delay: 800, duration: 600 } }">
        <div class="filters-container">
          <div class="search-box">
            <Search class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search players by name..."
              class="search-input"
            />
          </div>
          
          <div class="filter-buttons">
            <button
              v-for="filter in filters"
              :key="filter.value"
              :class="['filter-btn', { active: activeFilter === filter.value }]"
              @click="setActiveFilter(filter.value)"
              v-motion :hover="{ scale: 1.02, y: -1 }"
            >
              <component :is="filter.icon" class="filter-icon" />
              {{ filter.label }}
            </button>
          </div>
        </div>
      </section>

      <!-- Players Grid -->
      <section class="players-section">
        <div class="players-container">
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading participants...</p>
          </div>
          
          <div v-else-if="filteredPlayers.length === 0" class="empty-state">
            <Users class="empty-icon" />
            <h3 class="empty-title">No participants found</h3>
            <p class="empty-text">
              {{ searchQuery ? 'Try adjusting your search criteria' : 'No verified players yet' }}
            </p>
          </div>
          
          <div v-else class="players-grid">
            <div
              v-for="(player, index) in filteredPlayers"
              :key="player._id"
              class="player-card"
              v-motion
              :initial="{ opacity: 0, y: 30, scale: 0.9 }"
              :enter="{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: index * 100,
                  duration: 500,
                  type: 'spring',
                  stiffness: 100
                }
              }"
              :hover="{ y: -8, scale: 1.02 }"
            >
              <div class="player-header">
                <div class="player-avatar">
                  <User class="avatar-icon" />
                </div>
                <div class="player-basic-info">
                  <h3 class="player-name">{{ player.fullName }}</h3>
                  <p class="player-department">{{ player.Department }}</p>
                </div>
              </div>
              
              <div class="player-details">
                <div class="detail-row">
                  <span class="detail-label">Rating</span>
                  <span class="detail-value rating">{{ player.rating }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Skill Level</span>
                  <span :class="['skill-badge', player.level()]">
                    <component :is="getSkillIcon(player.level)" class="skill-icon" />
                    {{ player.level }}
                  </span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Lichess</span>
                  <a 
                    :href="`https://lichess.org/@/${player.lichessUsername}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="lichess-link"
                  >
                    <ExternalLink class="external-icon" />
                    {{ player.lichessUsername }}
                  </a>
                </div>
              </div>
              
              <div class="player-footer">
                <div class="verified-badge">
                  <CheckCircle class="verified-icon" />
                  Verified Participant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta-section" v-motion 
               :initial="{ opacity: 0, y: 50 }" 
               :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Join the Competition?</h2>
          <p class="cta-subtitle">Register now to become a verified participant</p>
          <GlowingButton variant="primary" @click="goToRegister">
            <UserPlus class="btn-icon" />
            Register Now
          </GlowingButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import {
  Crown, Shield, Trophy, Users, Target, Zap, Award, Search, User, CheckCircle,
  ExternalLink, UserPlus
} from 'lucide-vue-next'
import { getVerifiedPlayers } from '../services/api'
import ThemeToggle from '../components/ThemeToggle.vue'
import GlowingButton from '../components/GlowingButton.vue'

const router = useRouter()

// State
const verifiedPlayers = ref([])
const loading = ref(true)
const searchQuery = ref('')
const activeFilter = ref('all')

// Filters
const filters = [
  { value: 'all', label: 'All Players', icon: Users },
  { value: 'beginner', label: 'Beginner', icon: Target },
  { value: 'intermediate', label: 'Intermediate', icon: Zap },
  { value: 'advanced', label: 'Advanced', icon: Award }
]

// Computed properties
const skillDistribution = computed(() => {
  const distribution = { beginner: 0, intermediate: 0, advanced: 0 }
  const players = Array.isArray(verifiedPlayers.value) ? verifiedPlayers.value : []
  players.forEach(player => {
    const level = player.level()
    if (distribution.hasOwnProperty(level)) {
      distribution[level]++
    }
  })
  return distribution
})

const filteredPlayers = computed(() => {
  const filteredSource = Array.isArray(verifiedPlayers.value)
    ? verifiedPlayers.value
    : []
  let filtered = filteredSource

  // Filter by skill level
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(player => 
      player.level() === activeFilter.value
    )
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value().trim()
    filtered = filtered.filter(player =>
      player.fullName().includes(query) ||
      player.Department().includes(query) ||
      player.lichessUsername().includes(query)
    )
  }

  // Sort by rating (highest first)
  return filtered.sort((a, b) => b.rating - a.rating)
})

// Methods
const loadVerifiedPlayers = async () => {
  try {
    loading.value = true
    const { data } = await getVerifiedPlayers()
    verifiedPlayers.value = data
  } catch (error) {
    console.error('Error loading verified players:', error)
    toast.error('Failed to load participants', {
      description: 'Please try refreshing the page.'
    })
  } finally {
    loading.value = false
  }
}

const setActiveFilter = (filter) => {
  activeFilter.value = filter
}

const getSkillIcon = (level) => {
  const icons = {
    'Beginner': Target,
    'Intermediate': Zap,
    'Advanced': Award
  }
  return icons[level] || Target
}

const goToRegister = () => {
  router.push('/register')
}

// Lifecycle
onMounted(() => {
  loadVerifiedPlayers()
})
</script>

<style scoped>
.participants-page {
  min-height: 100vh;
  position: relative;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/chess-bg.png');
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
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: -1;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  padding: 16px 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 24px;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.brand-icon {
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.9);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.register-link,
.admin-link {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.register-link:hover,
.admin-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.link-icon {
  width: 18px;
  height: 18px;
}

.main-content {
  padding-top: 80px;
}

.header-section {
  padding: 80px 32px 60px;
  text-align: center;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 48px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  letter-spacing: -1px;
}

.title-icon {
  width: 48px;
  height: 48px;
  color: rgba(255, 255, 255, 0.9);
}

.page-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 48px;
  line-height: 1.6;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.stat-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 24px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.stat-icon {
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.8);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 14px;
}

.filters-section {
  padding: 0 32px 40px;
}

.filters-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.search-box {
  position: relative;
  max-width: 400px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.5);
}

.search-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
}

.filter-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.filter-btn.active {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  color: white;
}

.filter-icon {
  width: 16px;
  height: 16px;
}

.players-section {
  padding: 0 32px 80px;
}

.players-container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 80px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  color: rgba(255, 255, 255, 0.4);
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.empty-text {
  font-size: 16px;
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.player-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.player-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.player-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.player-avatar {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.avatar-icon {
  width: 28px;
  height: 28px;
  color: rgba(255, 255, 255, 0.8);
}

.player-name {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.player-department {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.player-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
}

.detail-value {
  color: white;
  font-weight: 500;
}

.rating {
  font-size: 16px;
  font-weight: 600;
}

.skill-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.skill-badge.beginner {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.skill-badge.intermediate {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.skill-badge.advanced {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.skill-icon {
  width: 12px;
  height: 12px;
}

.lichess-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.lichess-link:hover {
  color: white;
}

.external-icon {
  width: 14px;
  height: 14px;
}

.player-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #22c55e;
  font-size: 14px;
  font-weight: 500;
}

.verified-icon {
  width: 16px;
  height: 16px;
}

.cta-section {
  padding: 80px 32px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.cta-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
  line-height: 1.6;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
    flex-direction: column;
    gap: 16px;
  }
  
  .nav-links {
    gap: 16px;
  }
  
  .main-content {
    padding-top: 120px;
  }
  
  .header-section {
    padding: 60px 16px 40px;
  }
  
  .page-title {
    font-size: 32px;
    flex-direction: column;
    gap: 12px;
  }
  
  .stats-summary {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filters-section {
    padding: 0 16px 32px;
  }
  
  .filter-buttons {
    gap: 8px;
  }
  
  .filter-btn {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .players-section {
    padding: 0 16px 60px;
  }
  
  .players-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .cta-section {
    padding: 60px 16px;
  }
  
  .cta-title {
    font-size: 28px;
  }
}
</style>
