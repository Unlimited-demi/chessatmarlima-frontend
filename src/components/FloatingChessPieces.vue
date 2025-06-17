<template>
  <div class="floating-pieces-container">
    <div
      v-for="piece in chessPieces"
      :key="piece.id"
      :class="['floating-piece', piece.type]"
      :style="pieceStyle(piece)"
      v-motion
      :initial="{ opacity: 0, scale: 0, y: 100 }"
      :enter="{ 
        opacity: piece.opacity, 
        scale: 1, 
        y: 0,
        transition: { 
          delay: piece.delay * 200,
          duration: 1000,
          type: 'spring',
          stiffness: 100
        }
      }"
      :hover="{ 
        scale: 1.2, 
        rotate: 360,
        transition: { duration: 500 }
      }"
    >
      {{ piece.symbol }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useMouseInElement, useWindowSize } from '@vueuse/core'

const props = defineProps({
  density: {
    type: Number,
    default: 12
  }
})

const { width, height } = useWindowSize()
const chessPieces = ref([])

const pieceSymbols = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟']
const pieceTypes = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn']

const generatePieces = () => {
  chessPieces.value = Array.from({ length: props.density }, (_, i) => ({
    id: i,
    symbol: pieceSymbols[Math.floor(Math.random() * pieceSymbols.length)],
    type: pieceTypes[Math.floor(Math.random() * pieceTypes.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.3 + 0.1,
    delay: Math.random() * 5,
    speed: Math.random() * 2 + 1,
    direction: Math.random() * 360
  }))
}

const pieceStyle = (piece) => ({
  left: `${piece.x}%`,
  top: `${piece.y}%`,
  fontSize: `${piece.size}rem`,
  opacity: piece.opacity,
  animationDelay: `${piece.delay}s`,
  animationDuration: `${piece.speed * 10}s`
})

let animationId = null

const animatePieces = () => {
  chessPieces.value.forEach(piece => {
    piece.x += Math.cos(piece.direction) * 0.1
    piece.y += Math.sin(piece.direction) * 0.1
    
    // Wrap around screen
    if (piece.x > 100) piece.x = -5
    if (piece.x < -5) piece.x = 100
    if (piece.y > 100) piece.y = -5
    if (piece.y < -5) piece.y = 100
    
    // Slight direction change
    piece.direction += (Math.random() - 0.5) * 0.1
  })
  
  animationId = requestAnimationFrame(animatePieces)
}

generatePieces() // Call generatePieces at the top level
onMounted(() => {
  animatePieces()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.floating-pieces-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.floating-piece {
  position: absolute;
  color: rgba(102, 126, 234, 0.15);
  font-weight: bold;
  animation: gentleFloat 20s ease-in-out infinite;
  user-select: none;
  transition: all 0.3s ease;
}

.dark .floating-piece {
  color: rgba(255, 255, 255, 0.1);
}

@keyframes gentleFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  25% { 
    transform: translateY(-20px) rotate(90deg); 
  }
  50% { 
    transform: translateY(-10px) rotate(180deg); 
  }
  75% { 
    transform: translateY(-30px) rotate(270deg); 
  }
}

.floating-piece.king { color: rgba(255, 215, 0, 0.2); }
.floating-piece.queen { color: rgba(138, 43, 226, 0.2); }
.floating-piece.rook { color: rgba(255, 69, 0, 0.2); }
.floating-piece.bishop { color: rgba(0, 191, 255, 0.2); }
.floating-piece.knight { color: rgba(50, 205, 50, 0.2); }
.floating-piece.pawn { color: rgba(255, 20, 147, 0.2); }
</style>
