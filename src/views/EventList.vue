<template>
    <v-container fluid>
      <v-app-bar color="indigo darken-4" dark>
        <v-toolbar-title>Hello, Afshin!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-avatar>
            <img src="" alt="Profile"> 
          </v-avatar>
        </v-btn>
      </v-app-bar>
  
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        placeholder="Search"
        dense
        flat
        solo-inverted
        hide-details
        class="my-2 mx-4"
      ></v-text-field>
  
      <v-row dense>
        <v-col
          v-for="movie in movies"
          :key="movie.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card color="grey darken-4" dark>
            <v-img :src="movie.poster" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
              <v-card-title>{{ movie.title }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">{{ movie.genre }}</v-card-subtitle>
            <v-card-text class="text--primary">
              <v-icon small class="mr-1">mdi-star</v-icon>
              {{ movie.rating }}
            </v-card-text>
            <v-card-actions>
              <v-btn text color="blue lighten-2">Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
  
<style>
  .v-card {
    transition: transform 0.2s;
    cursor: pointer;
  }
  
  .v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .v-app-bar {
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .v-avatar img {
    border-radius: 50%;
  }
  
  .v-img {
    transition: opacity 0.5s ease;
  }
  
  .v-img:hover {
    opacity: 0.85;
  }
  
  .v-card-title {
    font-size: 1.2rem !important;
  }
  
  .v-card-subtitle {
    margin-top: -4px !important;
  }
</style>
  