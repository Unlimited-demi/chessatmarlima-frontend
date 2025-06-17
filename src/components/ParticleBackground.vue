<template>
  <div class="particle-container">
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="particleOptions"
    />
  </div>
</template>

<script setup>
import { loadFull } from "tsparticles"
import { useDark } from '@vueuse/core'
import { computed, ref } from 'vue'

const isDark = useDark()

const particleOptions = ref({
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: isDark.value ? "#ffffff" : "#667eea",
    },
    links: {
      color: isDark.value ? "#ffffff" : "#667eea",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.3,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
})

const particlesInit = async (engine) => {
  await loadFull(engine)
}
</script>

<style scoped>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>
