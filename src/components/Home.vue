<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item v-for="(ad) in promoAds" :src="ad.imageSrc" :key="ad.id">
              <div class="car-link">
                <v-btn class="error" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs12 sm6 md4
          v-for="ad in ads"
          :key="ad.id"
        >
          <v-card>
            <v-img :src="ad.imageSrc" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ad.title}}</h3>
                <div>{{ad.description}}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat :to="'/ad/' + ad.id">Open</v-btn>
              <app-buy-modal v-if="ad.ownerId !== userId" :ad="ad"></app-buy-modal>
              <app-edit-ad-modal v-else :ad="ad"></app-edit-ad-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5">
          <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import buyModal from './Shared/buyModal'
  import EditAdModal from './Ads/EditAdModal'
  export default {
    components: {
      appBuyModal: buyModal,
      appEditAdModal: EditAdModal
    },
    computed: {
      promoAds () {
        return this.$store.getters.promoAds
      },
      ads () {
        return this.$store.getters.ads
      },
      loading () {
        return this.$store.getters.loading
      },
      userId () {
        return this.$store.getters.user !== null ? this.$store.getters.user.id : undefined
      }
    }
  }
</script>

<style scoped>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0,0,0, .5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-radius: 5px 5px 0 0;
  }
</style>
