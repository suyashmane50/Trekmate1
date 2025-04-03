<template>
  <div class="home-container">
    <v-parallax
      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000"
      height="400"
    >
      <div class="hero-overlay"></div>
      <v-container class="hero-content">
        <v-row class="text-center">
          <v-col cols="12">
            <h1 class="text-h2 font-weight-bold mb-4 text-white">Welcome to TreakMate</h1>
            <p class="text-h5 mb-6 text-white">Your Ultimate Trekking Companion</p>
            <v-btn
              size="x-large"
              color="primary"
              variant="elevated"
              :to="{ name: 'routes' }"
              class="mt-4 explore-btn"
            >
              <v-icon start>mdi-compass</v-icon>
              Explore Routes
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <v-container class="features-section">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold">Our Features</h2>
          <div class="feature-divider mx-auto"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(feature, index) in features" :key="index" cols="12" md="6" lg="3">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              v-bind="props"
              :to="feature.route"
              height="280"
              class="feature-card d-flex flex-column align-center justify-center"
              :elevation="isHovering ? 8 : 2"
              :class="{ 'on-hover': isHovering }"
            >
              <div class="feature-icon-wrapper mb-4" :class="`bg-${feature.color}`">
                <v-icon size="32" color="white">{{ feature.icon }}</v-icon>
              </div>
              <div class="text-h5 font-weight-bold text-center mb-2">{{ feature.title }}</div>
              <div class="text-body-1 text-center px-4 text-medium-emphasis">{{ feature.description }}</div>
              <v-btn
                variant="text"
                :color="feature.color"
                class="mt-4"
                :to="feature.route"
              >
                Learn More
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Trekking Routes',
    description: 'Discover amazing trekking routes near you with detailed information and maps',
    icon: 'mdi-map-marker-path',
    route: '/routes',
    color: 'green'
  },
  {
    title: 'Weather Updates',
    description: 'Get real-time weather information and forecasts for your trek',
    icon: 'mdi-weather-partly-cloudy',
    route: '/weather',
    color: 'blue'
  },
  {
    title: 'Emergency SOS',
    description: 'Quick access to emergency services with location sharing',
    icon: 'mdi-alert-circle',
    route: '/sos',
    color: 'red'
  },
  {
    title: 'Packing Checklist',
    description: 'Generate smart packing lists based on your trek details',
    icon: 'mdi-format-list-checks',
    route: '/checklist',
    color: 'orange'
  }
];
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.explore-btn {
  transition: transform 0.3s ease;
}

.explore-btn:hover {
  transform: translateY(-2px);
}

.features-section {
  padding-top: 64px;
  padding-bottom: 64px;
}

.feature-divider {
  width: 80px;
  height: 4px;
  background: rgb(var(--v-theme-primary));
  margin-top: 16px;
}

.feature-card {
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
}

.feature-card.on-hover {
  transform: translateY(-8px);
}

.feature-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon-wrapper {
  transform: scale(1.1);
}

.bg-green {
  background: rgb(76, 175, 80);
}

.bg-blue {
  background: rgb(33, 150, 243);
}

.bg-red {
  background: rgb(244, 67, 54);
}

.bg-orange {
  background: rgb(255, 152, 0);
}
</style>