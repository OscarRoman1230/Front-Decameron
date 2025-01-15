<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-btn color="primary" @click="$router.push('/hotel/create')">Agregar Hotel</v-btn>
    <v-data-table :headers="headers" :items="hotels" class="mt-4">
      <template v-slot:item.rooms="{ item }">
        <v-btn variant="flat" @click="manageRooms(item.id)">
          <v-icon color="success" class="me-2" size="large"> mdi-bed </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon variant="flat" class="me-2" @click="editHotel(item.id)">
          <v-icon color="warning"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn variant="flat" @click="deleteHotel(item.id)">
          <v-icon color="red"> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      hotels: [],
      headers: [
        { title: 'Nombre', key: 'name', align: 'start' },
        { title: 'Ciudad', key: 'city', align: 'start' },
        { title: 'Administrar habitaciones', key: 'rooms', sortable: false, align: 'center' },
        { title: 'Acciones', key: 'actions', sortable: false, align: 'center' },
      ],
    }
  },
  methods: {
    fetchHotels() {
      this.axios.get('/hotels').then((response) => {
        this.hotels = response.data
      })
    },
    editHotel(id) {
      this.$router.push(`/hotel/edit/${id}`)
    },
    manageRooms(id) {
      this.$router.push(`/hotel/${id}/rooms`)
    },
    deleteHotel(id) {
      if (!confirm('¿Estas seguro de eliminar este hotel?')) return
      this.axios.delete(`/hotels/${id}`).then(() => {
        this.fetchHotels()
      })
    },
  },
  created() {
    this.fetchHotels()
  },
}
</script>
