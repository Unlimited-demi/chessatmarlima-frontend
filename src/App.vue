<template>
  <div id="app">
    <router-view />
    <Toaster />
  </div>
</template>

<script setup>
import { Toaster } from 'vue-sonner'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
}
</style>
