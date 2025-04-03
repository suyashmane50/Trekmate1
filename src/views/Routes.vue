<template>
  <v-container>
    <h1 class="text-h4 mb-4">Trekking Routes</h1>
    <v-row>
      <v-col v-for="route in routes" :key="route.id" cols="12" md="6" lg="4">
        <v-card class="route-card">
          <v-img 
            :src="route.image" 
            height="200" 
            cover
            class="route-image"
            :gradient="'to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8)'"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title>{{ route.name }}</v-card-title>
          <v-card-text>
            <div class="mb-2">
              <v-icon>mdi-map-marker</v-icon>
              {{ route.location }}
            </div>
            <div class="mb-2">
              <v-icon>mdi-clock-outline</v-icon>
              Duration: {{ route.duration }}
            </div>
            <div class="mb-2">
              <v-icon>mdi-stairs</v-icon>
              Difficulty: {{ route.difficulty }}
            </div>
            <p>{{ route.description }}</p>

            <!-- Weather Information -->
            <v-divider class="my-4"></v-divider>
            <div v-if="route.weather" class="weather-info">
              <h3 class="text-h6 mb-2">
                <v-icon>mdi-weather-partly-cloudy</v-icon>
                Current Weather
              </h3>
              <v-row align="center" class="weather-details">
                <v-col cols="6">
                  <div class="d-flex align-center">
                    <img :src="route.weather.icon" :alt="route.weather.description" class="weather-icon" />
                    <span class="text-h5">{{ route.weather.temperature }}°C</span>
                  </div>
                  <div class="text-caption text-capitalize">{{ route.weather.description }}</div>
                </v-col>
                <v-col cols="6">
                  <div class="mb-1">
                    <v-icon size="small">mdi-water-percent</v-icon>
                    Humidity: {{ route.weather.humidity }}%
                  </div>
                  <div>
                    <v-icon size="small">mdi-weather-windy</v-icon>
                    Wind: {{ route.weather.windSpeed }} km/h
                  </div>
                </v-col>
              </v-row>
            </div>
            <v-progress-circular
              v-else
              indeterminate
              color="primary"
              class="ma-4"
            ></v-progress-circular>
          </v-card-text>
          <v-card-actions>
            <v-btn 
              color="primary" 
              :to="{ 
                name: 'checklist', 
                query: { 
                  difficulty: route.difficulty,
                  duration: route.duration,
                  tripName: route.name
                }
              }"
            >
              Generate Packing List
            </v-btn>
            <v-btn color="secondary" :href="route.mapLink" target="_blank" class="ml-2">
              View on Map
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getWeather, type WeatherData } from '../services/weather'

// Use placeholder images for now
const getPlaceholderImage = (name: string, difficulty: 'Easy' | 'Moderate' | 'Challenging') => {
  const colors = {
    Easy: '4CAF50',
    Moderate: 'FF9800',
    Challenging: 'F44336'
  };
  return `https://via.placeholder.com/800x400/${colors[difficulty]}/FFFFFF?text=${name.replace(' ', '+')}`;
}

interface TrekkingRoute {
  id: number
  name: string
  location: string
  duration: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  description: string
  image: string
  mapLink: string
  coordinates: {
    lat: number
    lon: number
  }
  weather?: WeatherData
}

const fetchWeather = async (route: TrekkingRoute) => {
  try {
    const weatherData = await getWeather(route.coordinates.lat, route.coordinates.lon);
    route.weather = weatherData;
  } catch (error) {
    console.error(`Error fetching weather for ${route.name}:`, error);
  }
};

onMounted(async () => {
  // Fetch weather data for all routes
  for (const route of routes.value) {
    await fetchWeather(route);
  }
});

const routes = ref<TrekkingRoute[]>([
  {
    id: 1,
    name: 'Harishchandragad Trek',
    location: 'Ahmednagar, Maharashtra',
    duration: '2 days',
    difficulty: 'Moderate',
    description: 'Ancient hill fort featuring the famous Konkan Kada cliff, Kedareshwar cave, and Temple of Harishchandreshwar. Known for its challenging rock-cut steps and breathtaking valley views.',
    image: getPlaceholderImage('Harishchandragad', 'Moderate'),
    mapLink: 'https://www.google.com/maps?q=19.3833,73.7667',
    coordinates: {
      lat: 19.3833,
      lon: 73.7667
    }
  },
  {
    id: 2,
    name: 'Kalsubai Peak Trek',
    location: 'Ahmednagar, Maharashtra',
    duration: '1 day',
    difficulty: 'Moderate',
    description: 'Highest peak in Maharashtra (5,400 ft) offering panoramic views of surrounding forts and the Bhandardara dam. Features iron ladders and chains for steep sections.',
    image: getPlaceholderImage('Kalsubai', 'Moderate'),
    mapLink: 'https://www.google.com/maps?q=19.6012,73.7062',
    coordinates: {
      lat: 19.6012,
      lon: 73.7062
    }
  },
  {
    id: 3,
    name: 'Rajgad Fort Trek',
    location: 'Pune, Maharashtra',
    duration: '2 days',
    difficulty: 'Moderate',
    description: 'Former capital of the Maratha Empire, featuring three distinct machis (plateaus), ancient water cisterns, and stunning views of the Sahyadri range.',
    image: getPlaceholderImage('Rajgad', 'Moderate'),
    mapLink: 'https://www.google.com/maps?q=18.2447,73.6847',
    coordinates: {
      lat: 18.2447,
      lon: 73.6847
    }
  },
  {
    id: 4,
    name: 'Torna Fort Trek',
    location: 'Pune, Maharashtra',
    duration: '1 day',
    difficulty: 'Challenging',
    description: 'First fort captured by Shivaji Maharaj, featuring steep rock-cut steps, ancient temples, and commanding views of surrounding valleys.',
    image: getPlaceholderImage('Torna', 'Challenging'),
    mapLink: 'https://www.google.com/maps?q=18.2767,73.6233',
    coordinates: {
      lat: 18.2767,
      lon: 73.6233
    }
  },
  {
    id: 5,
    name: 'Raigad Fort Trek',
    location: 'Raigad, Maharashtra',
    duration: '1 day',
    difficulty: 'Easy',
    description: 'Capital of the Maratha Empire, accessible by steps or cable car. Features grand architecture, royal structures, and panoramic views of the Sahyadri range.',
    image: getPlaceholderImage('Raigad', 'Easy'),
    mapLink: 'https://www.google.com/maps?q=18.2333,73.4500',
    coordinates: {
      lat: 18.2333,
      lon: 73.4500
    }
  },
  {
    id: 6,
    name: 'Sinhagad Fort Trek',
    location: 'Pune, Maharashtra',
    duration: '1 day',
    difficulty: 'Easy',
    description: 'Popular fort near Pune with rich history, featuring steep cliffs, ancient gates, and temples. Famous for local food and sunset views.',
    image: getPlaceholderImage('Sinhagad', 'Easy'),
    mapLink: 'https://www.google.com/maps?q=18.3664,73.7547',
    coordinates: {
      lat: 18.3664,
      lon: 73.7547
    }
  },
  {
    id: 7,
    name: 'Lohagad Fort Trek',
    location: 'Pune, Maharashtra',
    duration: '1 day',
    difficulty: 'Easy',
    description: 'Well-preserved fort connected to Visapur Fort, featuring four gates, scenic views of Pavana reservoir, and beautiful architecture.',
    image: getPlaceholderImage('Lohagad', 'Easy'),
    mapLink: 'https://www.google.com/maps?q=18.7089,73.4789',
    coordinates: {
      lat: 18.7089,
      lon: 73.4789
    }
  },
  {
    id: 8,
    name: 'Pratapgad Fort Trek',
    location: 'Satara, Maharashtra',
    duration: '1 day',
    difficulty: 'Moderate',
    description: 'Historic fort known for the Battle of Pratapgad, featuring temples, viewpoints, and a bronze statue of Shivaji Maharaj.',
    image: getPlaceholderImage('Pratapgad', 'Moderate'),
    mapLink: 'https://www.google.com/maps?q=17.9373,73.5806',
    coordinates: {
      lat: 17.9373,
      lon: 73.5806
    }
  },
  {
    id: 9,
    name: 'Sandhan Valley Trek',
    location: 'Ahmednagar, Maharashtra',
    duration: '2 days',
    difficulty: 'Challenging',
    description: 'Known as the Valley of Shadows, this water-carved valley offers rappelling, camping, and unique rock formations.',
    image: getPlaceholderImage('Sandhan', 'Challenging'),
    mapLink: 'https://www.google.com/maps?q=19.5833,73.7167',
    coordinates: {
      lat: 19.5833,
      lon: 73.7167
    }
  },
  {
    id: 10,
    name: 'Bhimashankar Trek',
    location: 'Pune, Maharashtra',
    duration: '2 days',
    difficulty: 'Moderate',
    description: 'Trek through dense forests to reach one of the 12 Jyotirlingas, featuring ancient temple, wildlife sanctuary, and beautiful waterfalls.',
    image: getPlaceholderImage('Bhimashankar', 'Moderate'),
    mapLink: 'https://www.google.com/maps?q=19.0722,73.5358',
    coordinates: {
      lat: 19.0722,
      lon: 73.5358
    }
  }
])
</script>

<style scoped>
.route-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
  border-radius: 12px;
  overflow: hidden;
}

.route-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.25);
}

.route-image {
  position: relative;
  overflow: hidden;
}

.v-card-text {
  flex-grow: 1;
}

.v-icon {
  margin-right: 8px;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.v-card-text p {
  color: rgba(0, 0, 0, 0.6);
  line-height: 1.6;
}

.weather-info {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 16px;
}

.weather-icon {
  width: 50px;
  height: 50px;
  margin-right: 8px;
}

.weather-details {
  margin: 0;
}
</style>
