import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    getAdById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id, imageSrc}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.description = description
      ad.imageSrc = imageSrc
    },
    deleteAd (state, payload) {
      for (let i = 0; i < state.ads.length; i++) {
        if (state.ads[i].id === payload) {
          state.ads.splice(i, 1)
          break
        }
      }
    }
  },
  actions: {
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []
      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.ownerId,
              ad.imageSrc,
              ad.promo,
              key
            )
          )
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
      }
    },

    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo
        )
        const ad = await firebase.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        await firebase.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)

        const imageSrc = await firebase.storage().ref().child(`ads/${ad.key}.${imageExt}`).getDownloadURL()
        await firebase.database().ref('ads').child(ad.key).update({imageSrc})

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    },

    async updateAd ({commit}, {title, description, id, image}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        let imageSrc = null
        if (typeof image !== 'string') {
          const imageExt = image.name.slice(image.name.lastIndexOf('.'))
          await firebase.storage().ref(`ads/${id}.${imageExt}`).put(image)
          imageSrc = await firebase.storage().ref().child(`ads/${id}.${imageExt}`).getDownloadURL()
        } else {
          imageSrc = image
        }

        await firebase.database().ref('ads').child(id).update({title, description, imageSrc})
        commit('updateAd', {title, description, id, imageSrc})
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e)
        commit('setLoading', false)
        throw e
      }
    },

    async deleteAd ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('ads').child(payload).remove()
        commit('deleteAd', payload)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e)
        commit('setLoading', false)
        throw e
      }
    }
  }
}
