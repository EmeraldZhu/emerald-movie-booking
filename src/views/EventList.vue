<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Hello, Afshin!</h1>
      <div class="profile-pic">Profile</div>
    </header>

    <div class="search-bar">
      <input v-model="search" placeholder="Search" />
    </div>

    <div class="movies-container">
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <div class="movie-image" :style="{ backgroundImage: 'url(' + movie.poster + ')' }"></div>
        <div class="movie-info">
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.genre }}</p>
          <div class="movie-rating"><span>⭐</span>{{ movie.rating }}</div>
          <button class="details-btn">Details</button>
        </div>
      </div>
    </div>
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
  padding: 20px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  margin: 20px 0;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.movie-card {
  width: calc(25% - 20px);
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.movie-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.movie-info {
  padding: 10px;
}

.movie-info h2 {
  font-size: 20px;
  margin: 10px 0;
}

.movie-info p {
  font-size: 16px;
  color: #666;
}

.movie-rating {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.details-btn {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .movie-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .movie-card {
    width: 100%;
  }
}
</style>