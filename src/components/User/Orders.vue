<template>
  <v-container>
    <v-layout row>
      <v-flex v-if="loading" xs12 class="text-xs-center pt-5">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
      </v-flex>

      <v-flex v-else-if="!loading && orders.length !== 0" xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-flex xs12 class="mb-3">
          <v-btn-toggle
            v-model="filter"
            tile
            color="deep-purple accent-3"
            group
          >
            <v-btn value="all">All</v-btn>
            <v-btn value="new">New</v-btn>
            <v-btn value="done">Done</v-btn>
          </v-btn-toggle>
        </v-flex>

        <v-list two-line subheader>
          <v-list-tile
            avatar
            mb-3
            v-for="order in filteredOrders"
            :key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox
                color="success"
                :input-value="order.done"
                @change="markDone(order)"
                :disabled="order.done"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn class="primary" :to="'/ad/' + order.adId">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>

      <v-flex v-else xs12 class="text-xs-center">
        <h1 class="text--secondary">You have no orders yet</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        filter: 'all'
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      orders () {
        return this.$store.getters.orders
      },
      filteredOrders () {
        if (this.filter === 'all') {
          return this.orders
        }
        if (this.filter === 'done') {
          return this.orders.filter(order => {
            return order.done
          })
        }
        if (this.filter === 'new') {
          return this.orders.filter(order => {
            return !order.done
          })
        }
      }
    },
    methods: {
      markDone (order) {
        this.$store.dispatch('markOrderDone', order.id)
          .then(() => {
            order.done = true
          })
          .catch(() => {})
      }
    },
    created () {
      this.$store.dispatch('fetchOrders')
    }
  }
</script>

<style scoped>

</style>
