<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="greeting">
          <h1>Hello Afshin!</h1>
          <p>Book your favorite movie</p>
        </div>
        <div class="profile-pic">
          <!-- The profile picture should be placed here -->
          <img src="path-to-your-profile-pic.jpg" alt="Afshin" />
        </div>
      </div>
      <div class="search-bar">
        <input type="text" v-model="search" placeholder="Search" />
        <i class="search-icon">🔍</i> <!-- Replace with actual icon -->
      </div>
    </header>

    <main>
      <h2>Feature Movies</h2>
      <div class="movie-list">
        <div class="movie-card" v-for="movie in movies" :key="movie.id">
          <div class="movie-image" :style="{ backgroundImage: 'url(' + movie.poster + ')' }">
            <div class="movie-rating">{{ movie.rating }}</div>
          </div>
          <div class="movie-title">{{ movie.title }}</div>
          <div class="movie-genre">{{ movie.genre }}</div>
        </div>
      </div>
    </main>

    <nav class="navigation">
    <ul class="nav-list">
      <li class="nav-item">
        <a href="#" class="nav-link active">
          <span class="icon home-icon">🏠</span>
          <span class="nav-label">Home</span>
          <span class="indicator"></span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">
          <span class="icon explore-icon">🔍</span>
          <span class="nav-label">Explore</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">
          <span class="icon tickets-icon">🎟️</span>
          <span class="nav-label">Tickets</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">
          <span class="icon profile-icon">👤</span>
          <span class="nav-label">Profile</span>
        </a>
      </li>
    </ul>
  </nav>
  </div>
</template>
  
<script>
import { getPopularMovies } from '../apiService';

export default {
    name: 'EventList',
    data() {
      return {
        search: '',
        movies: []
      };
    },
    async created() {
        try {
            this.movies = await getPopularMovies();
        } catch (error) {
            // Handle error
        }
    },
    methods: {
        // define methods, e.g., refreshing movie list, searching
    }
};
</script>
  
<style scoped>
.app-container {
  font-family: 'Arial', sans-serif;
  color: white;
  background-color: #121212; /* Dark background */
  min-height: 100vh; /* Full height */
}

.app-header {
  padding: 1rem;
  background: linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(18,18,18,0) 100%);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.greeting h1 {
  font-size: 1.5rem;
  margin: 0;
}

.greeting p {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.7;
}

.profile-pic img {
  width: 50px; /* Adjust as needed */
  height: 50px;
  border-radius: 50%;
}

.search-bar {
  position: relative;
  margin-bottom: 2rem;
}

.search-bar input {
  width: 100%;
  background-color: #262626; /* Darker background */
  border: none;
  border-radius: 30px;
  padding: 0.75rem 1rem;
  color: white;
}

.search-bar .search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #626262;
}

main h2 {
  padding: 0 1rem;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.movie-list {
  display: flex;
  overflow-x: scroll;
  padding: 0 1rem;
}

.movie-card {
  min-width: 200px;
  margin-right: 1rem;
}

.movie-image {
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  position: relative;
}

.movie-rating {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: #FFC107; /* Rating background */
  border-radius: 3px;
  padding: 2px 4px;
  font-weight: bold;
}

.movie-title {
  margin-top: 0.5rem;
}

.movie-genre {
  font-size: 0.8rem;
  opacity: 0.8;
}

.navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #2c2c2e; /* Dark background */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 10px 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
  text-align: center;
}

.nav-link.active .indicator {
  content: '';
  display: block;
  width: 5px;
  height: 5px;
  background-color: #ffffff;
  border-radius: 50%;
  margin-top: 5px;
}

.icon {
  font-size: 24px; /* Adjust icon size as needed */
}

.nav-label {
  display: none; /* Hide labels by default, show if needed */
}

/* Add responsive adjustments as needed */
</style>