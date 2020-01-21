<template>
  <v-container>
    <v-layout v-if="ad" row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300px"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <template v-if="isOwner">
              <app-edit-ad-modal :ad="ad"></app-edit-ad-modal>
              <v-btn @click="deleteAd(ad.id)" class="error" flat>Delete</v-btn>
            </template>
            <app-buy-modal v-if="!isOwner" :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center">
          <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex class="text-xs-center">
        <h1 class="text--primary">This ad has been deleted</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import buyModal from '../Shared/buyModal'
  import EditAdModal from './EditAdModal'
  export default {
    components: {
      appEditAdModal: EditAdModal,
      appBuyModal: buyModal
    },
    props: ['id'],
    computed: {
      ad () {
        return this.$store.getters.getAdById(this.id)
      },
      loading () {
        return this.$store.getters.loading
      },
      isOwner () {
        return this.$store.getters.user && this.ad.ownerId === this.$store.getters.user.id
      }
    },
    methods: {
      deleteAd (id) {
        this.$store.dispatch('deleteAd', id)
          .then(() => {
            this.$router.go(-1)
          })
          .catch(() => {})
      }
    }
  }
</script>

<style scoped>

</style>
