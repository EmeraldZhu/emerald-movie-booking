<template>
    <v-container class="pa-0 fill-height" fluid>
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-app-bar-title>Hello, User!</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-text-field
        v-model="search"
        append-icon="mdi-microphone"
        label="Search"
        single-line
        hide-details
        outlined
        class="mx-4"
      ></v-text-field>
  
      <v-row>
        <v-col
          v-for="movie in movies"
          :key="movie.title"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mx-auto" max-width="344">
            <v-img :src="movie.image" height="194"></v-img>
            <v-card-title>{{ movie.title }}</v-card-title>
            <v-card-subtitle>{{ movie.subtitle }}</v-card-subtitle>
            <v-card-text>{{ movie.description }}</v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">Learn More</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon color="pink">mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
  <script>
  export default {
    name: 'EventList',
    data() {
      return {
        search: '',
        movies: [
          {
            title: 'Movie Title 1',
            subtitle: 'Subtitle 1',
            description: 'This is a description of the movie.',
            image: '/path-to-your-image.jpg',
          },
          // Add more dummy movie objects here
        ],
      };
    },
  };
  </script>
  
  <style>
  /* Add your CSS here */
  </style>
  