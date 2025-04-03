<template>
  <v-container>
    <h1 class="text-h4 mb-4">Packing Checklist Generator</h1>
    
    <!-- Trip Details Form -->
    <v-row v-if="!showChecklist">
      <v-col cols="12" md="8" lg="6" class="mx-auto">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">Enter Trip Details</v-card-title>
          <v-form @submit.prevent="handleSubmit" v-model="form.valid">
            <v-card-text>
              <v-select
                v-model="form.difficulty"
                :items="difficultyLevels"
                label="Trek Difficulty*"
                :rules="[v => !!v || 'Difficulty is required']"
                required
              ></v-select>

              <v-select
                v-model="form.duration"
                :items="durationOptions"
                label="Trip Duration*"
                :rules="[v => !!v || 'Duration is required']"
                required
                class="mt-4"
              ></v-select>

              <v-text-field
                v-model="form.tripName"
                label="Trip Name (Optional)"
                placeholder="e.g., Harishchandragad Trek"
                class="mt-4"
              ></v-text-field>

              <v-text-field
                v-model="form.startDate"
                type="date"
                label="Start Date*"
                :rules="[v => !!v || 'Start date is required']"
                required
                class="mt-4"
              ></v-text-field>
            </v-card-text>

            <v-card-actions class="mt-4">
              <v-spacer></v-spacer>
              <v-btn
                type="submit"
                color="primary"
                size="large"
                :loading="loading"
                :disabled="!form.valid"
              >
                Generate Checklist
                <v-icon end>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Generated Checklist -->
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary" prominent>
            <v-toolbar-title class="text-h6 text-white">
              {{ form.tripName || 'Your Trekking Checklist' }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              variant="outlined"
              color="white"
              @click="showChecklist = false"
            >
              Edit Details
              <v-icon end>mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="mt-4">
            <div class="d-flex align-center mb-6">
              <div class="text-subtitle-1 me-4">
                <v-icon>mdi-calendar</v-icon>
                Start Date: {{ new Date(form.startDate).toLocaleDateString() }}
              </div>
              <div class="text-subtitle-1 me-4">
                <v-icon>mdi-clock-outline</v-icon>
                Duration: {{ form.duration }}
              </div>
              <div class="text-subtitle-1">
                <v-icon>mdi-mountain</v-icon>
                Difficulty: {{ form.difficulty }}
              </div>
            </div>

            <v-expansion-panels variant="popout">
              <v-expansion-panel
                v-for="(category, index) in categories"
                :key="index"
                :value="index"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-icon :color="category.color" class="me-2">{{ category.icon }}</v-icon>
                    <span>{{ category.name }}</span>
                    <v-spacer></v-spacer>
                    <span class="text-caption text-medium-emphasis">
                      {{ getCheckedCount(category.items) }}/{{ category.items.length }} items
                    </span>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list>
                    <v-list-item v-for="(item, itemIndex) in category.items" :key="itemIndex">
                      <template v-slot:prepend>
                        <v-checkbox v-model="item.checked" color="success"></v-checkbox>
                      </template>
                      <v-list-item-title :class="{ 'text-decoration-line-through': item.checked }">
                        {{ item.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>

          <v-card-actions class="pa-4">
            <v-btn
              color="success"
              variant="tonal"
              prepend-icon="mdi-download"
              @click="downloadChecklist"
            >
              Download Checklist
            </v-btn>
            <v-btn
              color="primary"
              variant="tonal"
              prepend-icon="mdi-share-variant"
              @click="shareChecklist"
            >
              Share
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const showChecklist = ref(false)
const loading = ref(false)

const difficultyLevels = ['Easy', 'Moderate', 'Challenging']
const durationOptions = ['1-3 days', '4-7 days', '7+ days']

interface FormData {
  valid: boolean
  difficulty: string
  duration: string
  tripName: string
  startDate: string
}

const route = useRoute()

const form = ref<FormData>({
  valid: false,
  difficulty: route.query.difficulty as string || '',
  duration: route.query.duration as string || '',
  tripName: route.query.tripName as string || '',
  startDate: ''
})

interface ChecklistItem {
  name: string
  description: string
  checked: boolean
}

interface Category {
  name: string
  icon: string
  color: string
  items: ChecklistItem[]
}

const categories = ref<Category[]>([
  {
    name: 'Essential Gear',
    icon: 'mdi-bag-personal',
    color: 'primary',
    items: [
      { name: 'Backpack', description: 'A comfortable backpack suitable for your trip duration', checked: false },
      { name: 'Hiking Boots', description: 'Sturdy and waterproof hiking boots', checked: false },
      { name: 'Water Bottle', description: 'At least 1L capacity water bottle', checked: false },
      { name: 'Rain Gear', description: 'Waterproof jacket and pants', checked: false }
    ]
  },
  {
    name: 'Safety & Navigation',
    icon: 'mdi-compass',
    color: 'error',
    items: [
      { name: 'First Aid Kit', description: 'Basic first aid supplies', checked: false },
      { name: 'Navigation Tools', description: 'Map, compass, or GPS device', checked: false },
      { name: 'Headlamp', description: 'With extra batteries', checked: false },
      { name: 'Emergency Whistle', description: 'For signaling in emergencies', checked: false }
    ]
  },
  {
    name: 'Food & Water',
    icon: 'mdi-food-apple',
    color: 'success',
    items: [
      { name: 'Trail Mix', description: 'Energy-rich nuts and dried fruits', checked: false },
      { name: 'Energy Bars', description: 'Quick energy snacks', checked: false },
      { name: 'Water Filter', description: 'For safe drinking water', checked: false }
    ]
  }
])

const handleSubmit = async () => {
  loading.value = true
  
  // Add items based on duration
  if (form.value.duration === '4-7 days' || form.value.duration === '7+ days') {
    categories.value.push({
      name: 'Camping Gear',
      icon: 'mdi-tent',
      color: 'warning',
      items: [
        { name: 'Tent', description: 'Lightweight backpacking tent', checked: false },
        { name: 'Sleeping Bag', description: 'Suitable for the climate', checked: false },
        { name: 'Sleeping Pad', description: 'For insulation and comfort', checked: false }
      ]
    })
  }

  // Add items based on difficulty
  if (form.value.difficulty === 'Challenging') {
    categories.value.push({
      name: 'Technical Gear',
      icon: 'mdi-harddisk',
      color: 'info',
      items: [
        { name: 'Rope', description: '30m dynamic climbing rope', checked: false },
        { name: 'Harness', description: 'For safety on steep sections', checked: false },
        { name: 'Helmet', description: 'For protection from falling rocks', checked: false }
      ]
    })
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  showChecklist.value = true
}

const getCheckedCount = (items: ChecklistItem[]) => {
  return items.filter(item => item.checked).length
}

const downloadChecklist = () => {
  // Implementation for downloading checklist
  alert('Download feature coming soon!')
}

const shareChecklist = () => {
  // Implementation for sharing checklist
  alert('Share feature coming soon!')
}
</script>

<style scoped>
.v-expansion-panels {
  margin-top: 16px;
}

.v-list-item-title.text-decoration-line-through {
  color: rgba(0, 0, 0, 0.38);
}
</style>
