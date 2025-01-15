<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-text-field label="Nombre" v-model="hotel.name" :rules="[rules.required]" />
      <v-text-field label="Ciudad" v-model="hotel.city" :rules="[rules.required]" />
      <v-text-field label="Dirección" v-model="hotel.address" :rules="[rules.required]" />
      <v-text-field label="Nit" v-model="hotel.nit" :rules="[rules.required]" />
      <v-text-field
        label="Cantidad de habitaciones"
        v-model="hotel.number_rooms"
        :rules="[rules.required, rules.numberRule]"
      />
      <v-btn color="primary" @click="saveHotel">Guardar</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      hotel: { name: '', city: '', address: '', nit: '', number_rooms: 0 },
      rules: {
        required: (value) => !!value || 'This field is required',
        numberRule: (v) => {
          if (!v.trim()) return true
          if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true
          return 'Number has to be between 0 and 999'
        },
      },
    }
  },
  methods: {
    saveHotel() {
      const endpoint = this.$route.params.id ? `/hotels/${this.$route.params.id}` : '/hotels/create'
      const method = this.$route.params.id ? 'put' : 'post'

      this.axios[method](endpoint, this.hotel).then(() => {
        this.$router.push('/')
      })
    },
  },
  created() {
    if (this.$route.params.id) {
      this.axios.get(`/hotels/${this.$route.params.id}`).then((response) => {
        this.hotel = response.data
      })
    }
  },
}
</script>
