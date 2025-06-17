<template>
  <button
    :class="['glowing-btn', variant, { 'loading': loading }]"
    :disabled="disabled || loading"
    v-motion
    :initial="{ scale: 0.9, opacity: 0 }"
    :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300 } }"
    :hover="{ scale: 1.02, y: -1 }"
    :tap="{ scale: 0.98 }"
    @click="$emit('click')"
  >
    <div class="btn-content">
      <div v-if="loading" class="loading-spinner"></div>
      <slot v-else></slot>
    </div>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.glowing-btn {
  position: relative;
  padding: 14px 32px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  color: white;
  min-width: 160px;
  height: 52px;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.glowing-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
}

/* Primary variant */
.glowing-btn.primary {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-color: rgba(255, 255, 255, 0.3);
}

.glowing-btn.primary:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
}

/* Secondary variant */
.glowing-btn.secondary {
  background: rgba(0, 0, 0, 0.6);
  border-color: rgba(255, 255, 255, 0.2);
}

.glowing-btn.secondary:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Success variant */
.glowing-btn.success {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
  border-color: rgba(34, 197, 94, 0.4);
}

.glowing-btn.success:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.2));
  border-color: rgba(34, 197, 94, 0.6);
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.2);
}

/* Danger variant */
.glowing-btn.danger {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1));
  border-color: rgba(239, 68, 68, 0.4);
}

.glowing-btn.danger:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.2));
  border-color: rgba(239, 68, 68, 0.6);
  box-shadow: 0 8px 32px rgba(239, 68, 68, 0.2);
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
