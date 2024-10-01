<template>
    <div class="container">
        <div class="header">
            <h1>WEATHER APP</h1>
            <div class="search-bar">
                <input 
                    type="text" 
                    v-model="city" 
                    placeholder="Enter city name" 
                    class="search-input"
                />
                <button @click="searchByCity" class="search-button">Search</button>
            </div>
        </div>
    </div>
    <main>  
        <div v-if="weatherData" class="weather-info">
            <h2>
                {{ weatherData.name }}, {{ weatherData.sys.country }}
            </h2>
            <div>
                <img :src="iconUrl" alt="Weather Icon" />
                <p>{{ temperature }} °C</p>
            </div>
            <span>{{ weatherData.weather[0].description }}</span>
        </div>
    </main>
</template>

<script>
import axios from "axios";

const apikey = "58fc91cfd0aa0127dc0bb216f5ae9c69";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 25vh;
}

.header {
    text-align: center;
}

.search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.search-input {
    padding: 10px;
    font-size: 16px;
    width: 200px;
    margin-right: 10px;
}

.search-button {
    padding: 10px;
    font-size: 16px;
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
}

.weather-info {
    text-align: center;
}

.weather-info img {
    width: 100px;
    height: 100px;
}

.weather-info p {
    font-size: 24px;
    margin-top: 10px;
}
</style>
