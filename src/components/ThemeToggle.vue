<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :class="{ 'dark': isDark }"
    v-motion
    :initial="{ scale: 0, rotate: -180 }"
    :enter="{ scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }"
    :hover="{ scale: 1.1 }"
  >
    <Sun v-if="!isDark" class="icon" />
    <Moon v-else class="icon" />
  </button>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { Sun, Moon } from 'lucide-vue-next'

const isDark = useDark()
const toggleTheme = useToggle(isDark)
</script>

<style scoped>
.theme-toggle {
  position: relative;
  width: 48px;
  height: 48px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.5);
}

.icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.theme-toggle:hover .icon {
  color: white;
}
</style>
