<template>
  <div class="home-page">
    <!-- Background Image -->
    <div class="background-image"></div>
    <div class="background-overlay"></div>

    <!-- Navigation -->
    <nav class="navbar" v-motion :initial="{ y: -100, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200 } }">
      <div class="nav-container">
        <div class="nav-brand" v-motion :hover="{ scale: 1.05 }">
          <Crown class="brand-icon" />
          <span class="brand-text">Marlima Chess</span>
        </div>
        <div class="nav-links">
          <ThemeToggle />
          <router-link to="/participants" class="nav-link participants-link" v-motion :hover="{ scale: 1.05, y: -2 }">
            <Users class="link-icon" />
            Participants
          </router-link>
          <router-link to="/admin" class="nav-link admin-link" v-motion :hover="{ scale: 1.05, y: -2 }">
            <Shield class="link-icon" />
            Admin
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title" v-motion 
              :initial="{ opacity: 0, y: 50 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }">
            <span class="title-line">Marlima Chess</span>
            <span class="title-line">Tournament 2025</span>
          </h1>
          
          <p class="hero-subtitle" v-motion 
             :initial="{ opacity: 0, y: 30 }" 
             :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 600 } }">
            Join us for an exclusive chess tournament hosted by Emmanuel Anokwuru at Marlima
          </p>
          
          <div class="tournament-details" v-motion 
               :initial="{ opacity: 0, scale: 0.8 }" 
               :enter="{ opacity: 1, scale: 1, transition: { delay: 800, duration: 600 } }">
            <div class="detail-item" v-for="(detail, index) in tournamentDetails" :key="index"
                 v-motion :hover="{ scale: 1.02, x: 4 }">
              <component :is="detail.icon" class="detail-icon" />
              <span class="detail-text">{{ detail.text }}</span>
            </div>
          </div>
          
          <div class="hero-actions" v-motion 
               :initial="{ opacity: 0, y: 50 }" 
               :enter="{ opacity: 1, y: 0, transition: { delay: 1000, duration: 600 } }">
            <GlowingButton variant="primary" @click="goToRegister">
              <Play class="btn-icon" />
              Register Now
            </GlowingButton>
            <GlowingButton variant="secondary" @click="scrollToFeatures">
              <Info class="btn-icon" />
              Learn More
            </GlowingButton>
          </div>
        </div>
        
        <div class="hero-visual" v-motion 
             :initial="{ opacity: 0, scale: 0.8 }" 
             :enter="{ opacity: 1, scale: 1, transition: { delay: 1200, duration: 1000 } }">
          <div class="chess-piece-display">
            <div class="piece-container">
              <Crown class="chess-piece king" />
              <div class="piece-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" ref="featuresSection">
      <div class="features-container">
        <h2 class="features-title" v-motion 
            :initial="{ opacity: 0, y: 50 }" 
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }">
          Tournament Highlights
        </h2>
        
        <div class="features-grid">
          <div v-for="(feature, index) in features" :key="index" 
               class="feature-card"
               v-motion 
               :initial="{ opacity: 0, y: 50, scale: 0.9 }" 
               :visible-once="{ 
                 opacity: 1, 
                 y: 0, 
                 scale: 1, 
                 transition: { 
                   delay: index * 200, 
                   duration: 600
                 } 
               }"
               :hover="{ y: -8, scale: 1.02 }">
            <component :is="feature.icon" class="feature-icon" />
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <!-- <section class="stats-section">
      <div class="stats-container">
        <div class="stats-grid">
          <div v-for="(stat, index) in stats" :key="index" 
               class="stat-item"
               v-motion 
               :initial="{ opacity: 0, scale: 0 }" 
               :visible-once="{ 
                 opacity: 1, 
                 scale: 1, 
                 transition: { 
                   delay: index * 150, 
                   duration: 500
                 } 
               }">
            <div class="stat-number" ref="statNumbers" :data-target="stat.number">0</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useIntersectionObserver } from '@vueuse/core'
import { Crown, Shield, Calendar, MapPin, User, Trophy, Target, Award, Play, Info, Users } from 'lucide-vue-next'
import ThemeToggle from '../components/ThemeToggle.vue'
import GlowingButton from '../components/GlowingButton.vue'
import { useMotion } from '@vueuse/motion'

const router = useRouter()
const featuresSection = ref(null)
const statNumbers = ref([])

const tournamentDetails = [
  { icon: Calendar, text: 'August 2nd, 2025' },
  { icon: MapPin, text: 'Marlima Venue' },
  { icon: User, text: 'Hosted by Emmanuel Anokwuru(AirMa)' }
]

const features = [
  {
    icon: Trophy,
    title: 'Competitive Excellence',
    description: 'Experience high-level chess competition with players from diverse skill backgrounds'
  },
  {
    icon: Target,
    title: 'Skill-Based Categories',
    description: 'Beginner, Intermediate, and Advanced divisions ensure balanced and fair competition'
  },
  {
    icon: Award,
    title: 'Recognition & Rewards',
    description: 'Champions receive prestigious trophies and certificates of achievement'
  }
]

const stats = [
  { number: 150, label: 'Expected Participants' },
  { number: 3, label: 'Skill Categories' },
  { number: 5000, label: 'Prize Pool (USD)' },
  { number: 1, label: 'Grand Champion' }
]

const goToRegister = () => {
  router.push('/register')
}

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' })
}

// Animate numbers when they come into view
const animateNumbers = () => {
  statNumbers.value.forEach((el) => {
    if (!el) return
    
    const target = parseInt(el.dataset.target)
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0
    
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      el.textContent = Math.floor(current).toLocaleString()
    }, 16)
  })
}

// Intersection observer for stats animation
useIntersectionObserver(
  statNumbers,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      setTimeout(animateNumbers, 500)
    }
  },
  { threshold: 0.5 }
)
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
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
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.8) 100%
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

.admin-link {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.admin-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.link-icon {
  width: 18px;
  height: 18px;
}

.hero {
  padding: 120px 32px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 32px;
  color: white;
  letter-spacing: -1px;
}

.title-line {
  display: block;
}

.hero-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  line-height: 1.6;
  font-weight: 400;
}

.tournament-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-weight: 500;
}

.detail-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.hero-actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chess-piece-display {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.piece-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
}

.chess-piece {
  width: 120px;
  height: 120px;
  color: rgba(255, 255, 255, 0.9);
  z-index: 2;
  position: relative;
}

.piece-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
}

.features {
  padding: 80px 32px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.features-title {
  text-align: center;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 64px;
  color: white;
  letter-spacing: -0.5px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 40px 32px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.feature-icon {
  width: 48px;
  height: 48px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 auto 24px;
}

.feature-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: white;
}

.feature-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 16px;
}

.stats-section {
  padding: 80px 32px;
  background: rgba(0, 0, 0, 0.4);
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
}

.stat-item {
  text-align: center;
  color: white;
}

.stat-number {
  font-size: 56px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 48px;
  }
  
  .hero-title {
    font-size: 40px;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  .stat-number {
    font-size: 40px;
  }
  
  .nav-container {
    padding: 0 16px;
  }
  
  .hero {
    padding: 100px 16px 60px;
  }
  
  .features {
    padding: 60px 16px;
  }
  
  .stats-section {
    padding: 60px 16px;
  }
}

.participants-link {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.participants-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}
</style>
