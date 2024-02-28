<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="greeting">
          <h1>Hello Afshin!</h1>
          <p>Book your favorite movie</p>
        </div>
        <div class="profile-pic">
          <!-- Assume there's a profile picture path -->
          <img src="../assets/profile.JPG" alt="Profile" />
        </div>
      </div>
      <div class="search-bar">
        <input type="text" v-model="search" placeholder="Search" />
        <i class="search-icon">🔍</i>
      </div>
    </header>

    <main>
      <h2>Feature Movies</h2>
      <splide :options="splideOptions" @splide:mounted="setupAnimations" @splide:moved="animateCards">
        <splide-slide v-for="(movie, index) in movies" :key="movie.id" :ref="setSlideRef">
          <div class="movie-card">
            <div class="movie-image" :style="{ backgroundImage: 'url(' + getPosterUrl(movie.poster_path) + ')' }">
              <div class="movie-rating">{{ movie.vote_average }}</div>
            </div>
            <div class="movie-title">{{ movie.title }}</div>
            <div class="movie-genre">{{ movie.genre_ids.join(', ') }}</div>
          </div>
        </splide-slide>
      </splide>
    </main>

    <nav class="navigation">
      <ul class="nav-list">
        <!-- Navigation items -->
        <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Explore</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Tickets</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Profile</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { getPopularMovies } from '../apiService'; // Ensure this service is correctly implemented
import gsap from 'gsap';

export default {
  name: 'MovieList',
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    const slidesRefs = ref([]);
    const setSlideRef = el => {
      if (el) slidesRefs.value.push(el);
    };

    return { slidesRefs, setSlideRef };
  },
  data() {
    return {
      search: '',
      movies: [],
      splideOptions: {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '1rem',
        pagination: false,
        arrows: true,
        drag: 'free',
        breakpoints: {
          640: {
            perPage: 1,
          },
        },
      },
    };
  },
  async created() {
    this.movies = await getPopularMovies();
  },
  methods: {
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
    setupAnimations() {
      this.animateCards(0); // Initial animation setup
    },
    animateCards(currentIndex) {
      this.slidesRefs.value.forEach((slide, index) => {
        const card = slide.querySelector('.movie-card');
        const isActive = index === currentIndex;

        if (isActive) {
          gsap.to(card, {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        } else {
          gsap.to(card, {
            scale: 0.8,
            opacity: 0.5,
            rotateY: '+=10', // Slight rotation for inactive cards
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });
    },
  },
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

.movie-card {
  width: 72vw; /* Adjust based on ITEM_WIDTH logic */
  transform-origin: center center;
  transform: scale(0.8);
  opacity: 0.5;
  transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  background-color: #FFC107; /* Yellow background for visibility */
  border-radius: 3px;
  padding: 2px 4px;
  font-weight: bold;
  color: black; /* Ensures readability */
}

.movie-title {
  margin-top: 0.5rem;
  color: #ffffff;
  font-size: 18px; /* Larger for readability */
  font-weight: bold;
  text-align: center; /* Centers the title below the image */
}

.movie-genre {
  font-size: 14px; /* Slightly smaller than the title for hierarchy */
  color: #ffffff;
  opacity: 0.8; /* Slightly muted to differentiate from the title */
  text-align: center; /* Aligns with the title */
  margin-top: 5px; /* Spacing from the title */
}

/* Navigation styling */
.navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #2c2c2e;
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
  color: white;
  text-align: center;
}
</style>
