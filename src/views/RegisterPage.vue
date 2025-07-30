<template>
  <div class="register-page">
    <!-- Background Image -->
    <div class="background-image"></div>
    <div class="background-overlay"></div>

    <div class="register-container">
      <div class="register-card" v-motion 
           :initial="{ opacity: 0, scale: 0.9, y: 30 }" 
           :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 600 } }">
        
        <div class="register-header">
          <router-link to="/" class="back-link" v-motion :hover="{ x: -4, scale: 1.02 }">
            <ArrowLeft class="back-icon" />
            Back to Home
          </router-link>
          
          <h1 class="register-title" v-motion 
              :initial="{ opacity: 0, y: -20 }" 
              :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 500 } }">
            <Crown class="title-icon" />
            Tournament Registration
          </h1>
          
          <p class="register-subtitle" v-motion 
             :initial="{ opacity: 0 }" 
             :enter="{ opacity: 1, transition: { delay: 400, duration: 500 } }">
            Join the Marlima Chess Tournament 2025
          </p>
          <div class="payment-note" v-motion 
             :initial="{ opacity: 0 }" 
             :enter="{ opacity: 1, transition: { delay: 600, duration: 500 } }">
            <strong>Note:</strong> After registration, you will be redirected to complete your payment. Your registration is only confirmed after payment is successful.
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="form-group" v-motion 
               :initial="{ opacity: 0, x: -20 }" 
               :enter="{ opacity: 1, x: 0, transition: { delay: 500, duration: 400 } }">
            <label for="fullName" class="form-label">Full Name</label>
            <div class="input-wrapper">
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                class="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div class="form-group" v-motion 
               :initial="{ opacity: 0, x: 20 }" 
               :enter="{ opacity: 1, x: 0, transition: { delay: 600, duration: 400 } }">
            <label for="email" class="form-label">Email Address</label>
            <div class="input-wrapper">
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div class="form-group" v-motion 
               :initial="{ opacity: 0, x: -20 }" 
               :enter="{ opacity: 1, x: 0, transition: { delay: 700, duration: 400 } }">
            <label for="lichessUsername" class="form-label">Lichess Username</label>
            <div class="input-wrapper">
              <input
                id="lichessUsername"
                v-model="form.lichessUsername"
                type="text"
                class="form-input"
                placeholder="Your Lichess username"
                required
              />
            </div>
          </div>

          <div class="form-group" v-motion 
               :initial="{ opacity: 0, x: 20 }" 
               :enter="{ opacity: 1, x: 0, transition: { delay: 800, duration: 400 } }">
            <label for="department" class="form-label">Department</label>
            <div class="input-wrapper">
              <input
                id="department"
                v-model="form.Department"
                type="text"
                class="form-input"
                placeholder="Department"
                required
              />
            </div>
          </div>

          <div class="form-group" v-motion 
               :initial="{ opacity: 0, scale: 0.9 }" 
               :enter="{ opacity: 1, scale: 1, transition: { delay: 900, duration: 500 } }">
            <label for="phoneNumber" class="form-label">Phone Number</label>
            <div class="input-wrapper">
              <input
                id="phoneNumber"
                v-model="form.phoneNumber"
                type="tel"
                class="form-input"
                placeholder="e.g. 08012345678"
                required
              />
            </div>
          </div>

          <div class="submit-section" v-motion 
               :initial="{ opacity: 0, y: 30 }" 
               :enter="{ opacity: 1, y: 0, transition: { delay: 1000, duration: 500 } }">
            <GlowingButton 
              variant="primary" 
              :loading="isSubmitting"
              @click="handleSubmit"
              type="submit"
            >
              <Play v-if="!isSubmitting" class="btn-icon" />
              {{ isSubmitting ? 'Registering...' : 'Register for Tournament' }}
            </GlowingButton>
          </div>
        </form>
      </div>
    </div>

    <!-- Theme Toggle -->
    <div class="theme-toggle-container">
      <ThemeToggle />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { ArrowLeft, Crown, Play, Zap, Trophy, Target } from 'lucide-vue-next'
import { registerParticipant } from '../services/api'
import ThemeToggle from '../components/ThemeToggle.vue'
import GlowingButton from '../components/GlowingButton.vue'

const router = useRouter()

const form = reactive({
  fullName: '',
  email: '',
  lichessUsername: '',
  Department: '',
  phoneNumber: ''
})

const isSubmitting = ref(false)


const handleSubmit = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true

  try {
    const result = await registerParticipant(form)
    if (result && result.paymentUrl) {
      toast.success('Registration successful!', {
        description: 'Proceed to payment to complete your registration.',
        duration: 5000
      })
      // Redirect to payment page immediately
      window.location.href = result.paymentUrl
    } else {
      toast.success('Registration successful!', {
        description: 'You have been registered for the tournament. Check your email for confirmation.',
        duration: 5000
      })
      // Optionally redirect to home
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
    // Reset form
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
  } catch (error) {
    console.error('Registration error:', error)
    toast.error('Registration failed', {
      description: error.response?.data?.message || 'Please try again later.',
      duration: 5000
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
  .payment-note {
    background: rgba(255,255,255,0.08);
    color: #ffd700;
    padding: 12px 18px;
    border-radius: 8px;
    margin: 18px 0 0 0;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
  }
.register-page {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
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
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: -1;
}

.theme-toggle-container {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 1000;
}

.register-container {
  width: 100%;
  max-width: 600px;
  position: relative;
  z-index: 10;
}

.register-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.register-header {
  text-align: center;
  margin-bottom: 40px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 32px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.back-link:hover {
  color: white;
}

.back-icon {
  width: 16px;
  height: 16px;
}

.register-title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
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

.register-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  letter-spacing: 0.5px;
}

.input-wrapper {
  position: relative;
}

.form-input,
.form-select {
  width: 100%;
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

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
}

.level-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.level-option {
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.level-option:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
}

.level-option.active {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
}

.level-radio {
  display: none;
}

.level-content {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.level-icon {
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.8);
}

.level-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.level-name {
  font-weight: 600;
  color: white;
  font-size: 16px;
}

.level-description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.submit-section {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .register-card {
    padding: 32px;
    margin: 16px;
  }
  
  .register-title {
    font-size: 24px;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .level-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .level-text {
    text-align: left;
  }
  
  .theme-toggle-container {
    top: 16px;
    right: 16px;
  }
}
</style>
   
