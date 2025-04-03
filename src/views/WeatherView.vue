<template>
  <v-container>
    <h1 class="text-h4 mb-4">Weather Updates</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Current Weather</v-card-title>
          <v-card-text>
            <div v-if="loading" class="d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
            <div v-else-if="error" class="text-error">
              {{ error }}
            </div>
            <div v-else-if="weather" class="text-center">
              <h2 class="text-h3">{{ Math.round(weather.main.temp - 273.15) }}°C</h2>
              <p class="text-h6">{{ weather.weather[0].description }}</p>
              <div class="mt-4">
                <p>Humidity: {{ weather.main.humidity }}%</p>
                <p>Wind Speed: {{ weather.wind.speed }} m/s</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface WeatherData {
  main: {
    temp: number
    humidity: number
  }
  weather: Array<{
    description: string
  }>
  wind: {
    speed: number
  }
}

const weather = ref<WeatherData | null>(null)
const loading = ref(true)
const error = ref('')

const API_KEY = '557ca703399bb138d6dc30a5bea2cdaf'

onMounted(async () => {
  try {
    // Get user's location
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const { latitude, longitude } = position.coords
    const response = await axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    )
    weather.value = response.data
  } catch (e) {
    error.value = 'Failed to load weather data. Please try again later.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.text-error {
  color: red;
}
</style>
