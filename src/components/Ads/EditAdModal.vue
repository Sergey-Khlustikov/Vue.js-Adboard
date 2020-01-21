<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="warning mr-2" flat icon slot="activator"><v-icon>settings</v-icon></v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>

              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                type="text"
                v-model="editedDescription"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-layout class="mb-3">
          <v-flex xs12>
            <v-btn class="warning" @click="triggerUpload">
              Change image
              <v-icon right dark>cloud_upload</v-icon>
              <input
                ref="fileInput"
                type="file"
                style="display: none;"
                accept="image/*"
                @change="onFileChange"
              >
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <img :src="currentImageSrc" height="100" v-if="currentImageSrc">
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mr-2" flat @click="onCancel">Cancel</v-btn>
              <v-btn class="success" flat @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
      props: ['ad'],
      data () {
        return {
          modal: false,
          editedTitle: this.ad.title,
          editedDescription: this.ad.description,
          image: null,
          changedImageSrc: null
        }
      },
      computed: {
        currentImageSrc () {
          return this.changedImageSrc ? this.changedImageSrc : this.ad.imageSrc
        }
      },
      methods: {
        onCancel () {
          this.editedDescription = this.ad.description
          this.editedTitle = this.ad.title
          this.modal = false
          this.changedImageSrc = null
        },
        onSave () {
          if (this.editedDescription !== '' && this.editedTitle !== '') {
            this.$store.dispatch('updateAd', {
              title: this.editedTitle,
              description: this.editedDescription,
              id: this.ad.id,
              image: this.image !== null ? this.image : this.ad.imageSrc
            })
            this.modal = false
          }
        },
        triggerUpload () {
          this.$refs.fileInput.click()
        },
        onFileChange (event) {
          const file = event.target.files[0]
          const reader = new FileReader()
          reader.onload = e => {
            this.changedImageSrc = reader.result
          }
          reader.readAsDataURL(file)
          this.image = file
        }
      }
    }
</script>

<style scoped>

</style>
