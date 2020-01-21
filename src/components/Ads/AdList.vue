<template>
  <v-container>
    <v-layout v-if="!loading && myAds.length !== 0" row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">My ads</h1>
        <v-card
          class="elevation-10 mb-4"
          v-for="ad of myAds"
          :key="ad.id"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img :src="ad.imageSrc" height="175px"></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="info mr-2" flat :to="'/ad/' + ad.id">Open</v-btn>
                  <app-edit-ad-modal :ad="ad"><v-icon>delete</v-icon></app-edit-ad-modal>
                  <v-btn @click="deleteAd(ad.id)" class="error" icon flat><v-icon>delete</v-icon></v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myAds.length === 0">
      <v-flex class="text-xs-center">
        <h1 class="text--primary">You have no ads</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12 class="text-sm-center">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import EditAdModal from './EditAdModal'
  export default {
    components: {
      appEditAdModal: EditAdModal
    },
    computed: {
      myAds () {
        return this.$store.getters.myAds
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      deleteAd (id) {
        this.$store.dispatch('deleteAd', id)
      }
    }
  }
</script>

<style scoped>

</style>
