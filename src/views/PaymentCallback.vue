<template>
  <div class="payment-callback-page">
    <!-- Background Image -->
    <div class="background-image"></div>
    <div class="background-overlay"></div>

    <!-- Navigation -->
    <nav class="navbar" v-motion :initial="{ y: -100, opacity: 0 }" :enter="{ y: 0, opacity: 1, transition: { delay: 200 } }">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">
          <Crown class="brand-icon" />
          <span class="brand-text">Marlima Chess</span>
        </router-link>
        <div class="nav-links">
          <ThemeToggle />
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="main-content">
      <div class="callback-container" v-motion 
           :initial="{ opacity: 0, scale: 0.9, y: 30 }" 
           :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 600 } }">
        
        <div class="callback-header">
          <h1 class="callback-title" v-motion 
              :initial="{ opacity: 0, y: -20 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 500 } }">
            <CreditCard class="title-icon" />
            Payment Status
          </h1>
        </div>

        <div class="callback-content">
          <!-- Loading State -->
          <div v-if="loading" class="status-section loading" v-motion 
               :initial="{ opacity: 0, scale: 0.9 }" 
               :enter="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 500 } }">
            <div class="status-icon">
              <div class="loading-spinner"></div>
            </div>
            <h2 class="status-title">Verifying Payment</h2>
            <p class="status-message">Please wait while we check your payment status...</p>
          </div>

          <!-- Success State -->
          <div v-else-if="success" class="status-section success" v-motion 
               :initial="{ opacity: 0, scale: 0.9 }" 
               :enter="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 500 } }">
            <div class="status-icon">
              <CheckCircle class="success-icon" />
            </div>
            <h2 class="status-title">Payment Successful!</h2>
            <p class="status-message">
              Your registration payment has been confirmed. Welcome to the Marlima Chess Tournament 2024!
            </p>
            <div class="success-details">
              <div class="detail-item">
                <Trophy class="detail-icon" />
                <span>Tournament registration confirmed</span>
              </div>
              <div class="detail-item">
                <Mail class="detail-icon" />
                <span>Confirmation email sent</span>
              </div>
              <div class="detail-item">
                <Calendar class="detail-icon" />
                <span>Tournament date: August 2nd, 2025</span>
              </div>
            </div>
          </div>

          <!-- Failed State -->
          <div v-else class="status-section failed" v-motion 
               :initial="{ opacity: 0, scale: 0.9 }" 
               :enter="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 500 } }">
            <div class="status-icon">
              <XCircle class="failed-icon" />
            </div>
            <h2 class="status-title">Payment Not Completed</h2>
            <p class="status-message">
              Your payment could not be verified or was not completed successfully.
            </p>
            <div class="failed-details">
              <div class="detail-item">
                <AlertTriangle class="detail-icon" />
                <span>Payment verification failed</span>
              </div>
              <div class="detail-item">
                <RefreshCw class="detail-icon" />
                <span>You can try registering again</span>
              </div>
              <div class="detail-item">
                <HelpCircle class="detail-icon" />
                <span>Contact support if issues persist</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="callback-actions" v-motion 
             :initial="{ opacity: 0, y: 30 }" 
             :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 500 } }">
          <GlowingButton 
            v-if="success" 
            variant="primary" 
            @click="goToParticipants"
          >
            <Users class="btn-icon" />
            View Participants
          </GlowingButton>
          
          <GlowingButton 
            v-else-if="!loading" 
            variant="primary" 
            @click="goToRegister"
          >
            <RefreshCw class="btn-icon" />
            Try Again
          </GlowingButton>
          
          <GlowingButton 
            variant="secondary" 
            @click="goToHome"
          >
            <Home class="btn-icon" />
            Back to Home
          </GlowingButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { 
  Crown, CreditCard, CheckCircle, XCircle, AlertTriangle, RefreshCw, 
  HelpCircle, Trophy, Mail, Calendar, Users, Home 
} from 'lucide-vue-next'
import { getTransactionStatus } from '../services/api'
import ThemeToggle from '../components/ThemeToggle.vue'
import GlowingButton from '../components/GlowingButton.vue'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const success = ref(false)

const goToHome = () => {
  router.push('/')
}

const goToRegister = () => {
  router.push('/register')
}

const goToParticipants = () => {
  router.push('/participants')
}

onMounted(async () => {
  // Get reference from query params
  const reference = route.query.reference

  if (!reference) {
    loading.value = false
    success.value = false
    toast.error('No payment reference found')
    return
  }

  // Add delay before verifying payment
  await new Promise(resolve => setTimeout(resolve, 20000)) // 5 seconds

  try {
    const result = await getTransactionStatus(reference)
    success.value = result.status === 'success'
    
    if (success.value) {
      toast.success('Payment verified successfully!')
    } else {
      toast.error('Payment verification failed')
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    toast.error('Could not verify payment status', {
      description: 'Please contact support if this issue persists.'
    })
    success.value = false
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.payment-callback-page {
  min-height: 100vh;
  position: relative;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/chess-bg.png');
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

.main-content {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 32px 32px;
}

.callback-container {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.callback-header {
  margin-bottom: 40px;
}

.callback-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  letter-spacing: -0.5px;
}

.title-icon {
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.9);
}

.callback-content {
  margin-bottom: 40px;
}

.status-section {
  padding: 32px 0;
}

.status-icon {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-icon {
  width: 64px;
  height: 64px;
  color: #22c55e;
}

.failed-icon {
  width: 64px;
  height: 64px;
  color: #ef4444;
}

.status-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  color: white;
}

.status-message {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 32px;
}

.success-details,
.failed-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.success .detail-item {
  border-color: rgba(34, 197, 94, 0.2);
  background: rgba(34, 197, 94, 0.05);
}

.failed .detail-item {
  border-color: rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.05);
}

.detail-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.success .detail-icon {
  color: #22c55e;
}

.failed .detail-icon {
  color: #ef4444;
}

.callback-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
  }
  
  .main-content {
    padding: 100px 16px 32px;
  }
  
  .callback-container {
    padding: 32px;
  }
  
  .callback-title {
    font-size: 24px;
    flex-direction: column;
    gap: 8px;
  }
  
  .status-title {
    font-size: 24px;
  }
  
  .status-message {
    font-size: 16px;
  }
  
  .callback-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .callback-actions > * {
    width: 100%;
    max-width: 280px;
  }
}
</style>
