// Emergency service for handling SOS features
interface MedicalInfo {
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  emergencyContacts: EmergencyContact[];
}

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  isEmergencyService: boolean;
}

interface LocationData {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  timestamp: number;
}

class EmergencyService {
  private static instance: EmergencyService;
  private isTracking: boolean = false;
  private trackingInterval: number | null = null;
  private batteryLow: boolean = false;
  private offlineMode: boolean = false;

  private constructor() {
    // Initialize battery monitoring
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        battery.addEventListener('levelchange', () => {
          this.batteryLow = battery.level <= 0.2;
          if (this.batteryLow) {
            this.enableBatterySaver();
          }
        });
      });
    }

    // Monitor online/offline status
    window.addEventListener('online', () => {
      this.offlineMode = false;
      this.syncOfflineData();
    });
    window.addEventListener('offline', () => {
      this.offlineMode = true;
    });
  }

  static getInstance(): EmergencyService {
    if (!EmergencyService.instance) {
      EmergencyService.instance = new EmergencyService();
    }
    return EmergencyService.instance;
  }

  // Start live location tracking
  async startLocationTracking(): Promise<void> {
    if (this.isTracking) return;

    this.isTracking = true;
    this.trackingInterval = window.setInterval(async () => {
      try {
        const position = await this.getCurrentLocation();
        await this.sendLocationUpdate(position);
      } catch (error) {
        console.error('Error tracking location:', error);
      }
    }, this.batteryLow ? 60000 : 30000); // Reduce frequency in battery saver mode
  }

  // Stop location tracking
  stopLocationTracking(): void {
    if (this.trackingInterval) {
      window.clearInterval(this.trackingInterval);
      this.trackingInterval = null;
    }
    this.isTracking = false;
  }

  // Get current location
  private async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        reject,
        { enableHighAccuracy: true }
      );
    });
  }

  // Send location update to emergency contacts
  private async sendLocationUpdate(location: LocationData): Promise<void> {
    if (this.offlineMode) {
      await this.storeOfflineData(location);
      await this.sendOfflineSMS(location);
      return;
    }

    // Simulate sending location to emergency contacts
    console.log('Sending location update:', location);
  }

  // Store offline data for later sync
  private async storeOfflineData(data: LocationData): Promise<void> {
    const offlineData = JSON.parse(localStorage.getItem('offlineSOSData') || '[]');
    offlineData.push(data);
    localStorage.setItem('offlineSOSData', JSON.stringify(offlineData));
  }

  // Sync offline data when back online
  private async syncOfflineData(): Promise<void> {
    const offlineData = JSON.parse(localStorage.getItem('offlineSOSData') || '[]');
    if (offlineData.length === 0) return;

    try {
      // Simulate sending stored data
      console.log('Syncing offline data:', offlineData);
      localStorage.removeItem('offlineSOSData');
    } catch (error) {
      console.error('Error syncing offline data:', error);
    }
  }

  // Send SMS in offline mode
  private async sendOfflineSMS(location: LocationData): Promise<void> {
    // Simulate sending SMS
    console.log('Sending offline SMS with location:', location);
  }

  // Enable battery saver mode
  private enableBatterySaver(): void {
    // Reduce location update frequency
    if (this.trackingInterval) {
      window.clearInterval(this.trackingInterval);
      this.trackingInterval = window.setInterval(async () => {
        const position = await this.getCurrentLocation();
        await this.sendLocationUpdate(position);
      }, 60000); // Reduce to once per minute
    }

    // Disable non-essential features
    this.disableNonEssentialFeatures();
  }

  // Disable non-essential features to save battery
  private disableNonEssentialFeatures(): void {
    // Implement battery saving measures
    console.log('Battery saver mode enabled');
  }

  // Play emergency alarm sound
  async playAlarm(): Promise<void> {
    const audio = new Audio('/emergency-alarm.mp3');
    audio.loop = true;
    try {
      await audio.play();
    } catch (error) {
      console.error('Error playing alarm:', error);
    }
  }

  // Stop emergency alarm
  stopAlarm(): void {
    const audio = document.querySelector('audio');
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  // Store medical information
  storeMedicalInfo(info: MedicalInfo): void {
    localStorage.setItem('medicalInfo', JSON.stringify(info));
  }

  // Get medical information
  getMedicalInfo(): MedicalInfo | null {
    const info = localStorage.getItem('medicalInfo');
    return info ? JSON.parse(info) : null;
  }

  // Auto emergency call
  async autoEmergencyCall(contact: EmergencyContact): Promise<void> {
    try {
      window.location.href = `tel:${contact.phone}`;
    } catch (error) {
      console.error('Error making emergency call:', error);
    }
  }
}

export const emergencyService = EmergencyService.getInstance();
