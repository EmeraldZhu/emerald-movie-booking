<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="greeting">
          <h1>Hello Afshin!</h1>
          <p>Book your favorite movie</p>
        </div>
        <div class="profile-pic">
          <img src="../assets/profile.jpg" alt="Profile" />
        </div>
      </div>
      <div class="search-bar">
        <input type="text" v-model="search" placeholder="Search" />
        <i class="search-icon">🔍</i>
      </div>
    </header>

    <main>
      <h2>Feature Movies</h2>
      <splide :options="splideOptions">
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
        <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Explore</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Tickets</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Profile</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, watch, nextTick, onMounted } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import gsap from 'gsap';
import { getPopularMovies } from '../apiService';

export default {
  name: 'MovieList',
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    const movies = ref([]);
    const slidesRefs = ref([]);
    const splideRef = ref(null);

    async function loadMovies() {
      try {
        const data = await getPopularMovies();
        movies.value = data;
        await nextTick(); // Ensure DOM updates are completed
        splideRef.value.refresh(); // Assuming splideRef is bound to the Splide instance
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(async () => {
      await loadMovies();
      nextTick(() => {
        if (splideRef.value) {
          splideRef.value.refresh();
        }
      });
    });

    return { movies, slidesRefs, splideRef };
  },
  data() {
    return {
      search: '',
      splideOptions: {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        pagination: false,
        arrows: true,
        drag: 'free',
        width: '72vw', // Ensuring card width is 72% of the viewport width
        padding: { left: '14%', right: '14%' }, // Adjusting for centralization
        snap: true, // Assuming snap-to functionality is desired
      },
    };
  },
  methods: {
    setSlideRef(el) {
      if (el) this.slidesRefs.push(el);
    },
    getPosterUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    },
    handleScroll() {
    // Assuming you have a way to reference all movie cards, e.g., this.slidesRefs
    this.slidesRefs.forEach((ref) => {
      const card = ref.$el; // Direct DOM element reference
      const scrollPosition = window.scrollY;
      const cardPosition = card.getBoundingClientRect().top + scrollPosition;
      const distanceToCenter = Math.abs(window.innerHeight / 2 - (cardPosition + card.offsetHeight / 2));

      // Example calculation for opacity based on distance to center of viewport
      const opacity = Math.max(0, 1 - distanceToCenter / (window.innerHeight / 2));

      // Apply dynamic styles
      card.style.opacity = opacity.toString();

      // For rotation, you might want a subtle effect based on proximity to the center
      const rotation = distanceToCenter / (window.innerHeight / 2) * 10; // Max rotation of 10 degrees
      card.style.transform = `rotateZ(${rotation}deg)`;
    });
  }
  },
  mounted() {
  window.addEventListener('scroll', this.handleScroll);
},
beforeUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
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
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-card.active {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5); /* Enhanced shadow for active card */
}

.splide__slide {
  display: flex;
  justify-content: center; /* Helps with centering the card */
}

/* Transition for entering and leaving animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
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
