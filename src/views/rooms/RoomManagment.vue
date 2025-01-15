<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-card class="mx-auto my-10">
      <v-card-item>
        <v-card-title>
          <h2>Administrar habitaciones de {{ hotel.name }}</h2>
        </v-card-title>
      </v-card-item>
      <v-container>
        <v-table class="text-caption" density="comfortable">
          <tbody>
            <tr align="right">
              <th>Ciudad:</th>

              <td>{{ hotel.city }}</td>
            </tr>

            <tr align="right">
              <th>Dirección:</th>

              <td>{{ hotel.address }}</td>
            </tr>

            <tr align="right">
              <th>Nit:</th>

              <td>{{ hotel.nit }}</td>
            </tr>

            <tr align="right">
              <th>Cantidad de habitaciones:</th>

              <td>{{ hotel.number_rooms }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-card>

    <v-btn color="primary" class="mb-4" @click="openRoomForm()">Agregar Habitacion</v-btn>

    <v-data-table :headers="headers" :items="rooms" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn icon variant="flat" class="me-2" @click="openRoomForm(item)">
          <v-icon color="warning">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon variant="flat" @click="deleteRoom(item.id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Room Form Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ selectedRoom.id ? 'Edit Room' : 'Add Room' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="roomForm" v-model="valid">
            <v-select
              label="Tipo de habitación"
              :items="roomTypes"
              v-model="selectedRoom.id_type_room"
              item-title="name"
              item-value="id"
              :rules="[rules.required]"
              @update:modelValue="filterAccommodations"
            />
            <v-select
              label="Acomodación"
              :items="filteredAccommodations"
              v-model="selectedRoom.id_accommodation"
              item-title="name"
              item-value="id"
              :rules="[rules.required]"
            />
            <v-text-field
              label="Cantidad"
              type="number"
              v-model="selectedRoom.quantity"
              :rules="[rules.required, rules.positive]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="saveRoom">Guardar</v-btn>
          <v-btn color="secondary" text @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      hotel: {},
      rooms: [],
      roomTypes: [],
      accommodations: [],
      filteredAccommodations: [],
      dialog: false,
      selectedRoom: {
        id_hotel: this.$route.params.id,
        id_type_room: null,
        id_accommodation: null,
        quantity: 1,
      },
      valid: false,
      rules: {
        required: (value) => !!value || 'This field is required',
        positive: (value) => value > 0 || 'Quantity must be greater than 0',
      },
      headers: [
        {
          title: 'Tipo de habitación',
          value: 'type_room.name',
        },
        { title: 'Acomodación', value: 'accommodation.name' },
        { title: 'Cantidad', value: 'quantity' },
        { title: 'Acciones', value: 'actions', sortable: false },
      ],
    }
  },
  methods: {
    fetchHotel() {
      this.axios.get(`/hotels/${this.$route.params.id}`).then((response) => {
        this.hotel = response.data
      })
    },
    fetchRooms() {
      this.axios.get(`/rooms/${this.$route.params.id}/hotel`).then((response) => {
        this.rooms = response.data
      })
    },
    fetchCatalogs() {
      this.axios.get('/catalog/room-types').then((response) => {
        this.roomTypes = response.data
      })
      this.axios.get('/catalog/accommodations').then((response) => {
        this.accommodations = response.data
      })
    },
    filterAccommodations() {
      const typeRoom = this.roomTypes.find((type) => type.id === this.selectedRoom.id_type_room)

      if (!typeRoom) {
        this.filteredAccommodations = []
        return
      }
      switch (typeRoom.name) {
        case 'Estándar':
          this.filteredAccommodations = this.accommodations.filter((accommodation) =>
            ['Sencilla', 'Doble'].includes(accommodation.name),
          )
          break
        case 'Junior':
          this.filteredAccommodations = this.accommodations.filter((accommodation) =>
            ['Triple', 'Cuádruple'].includes(accommodation.name),
          )
          break
        case 'Suite':
          this.filteredAccommodations = this.accommodations.filter((accommodation) =>
            ['Sencilla', 'Doble', 'Triple'].includes(accommodation.name),
          )
          break
        default:
          this.filteredAccommodations = []
      }
    },
    openRoomForm(room = null) {
      if (room) {
        this.selectedRoom = { ...room }
      } else {
        this.selectedRoom = {
          id_hotel: this.$route.params.id,
          id_type_room: null,
          id_accommodation: null,
          quantity: 1,
        }
      }
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    saveRoom() {
      const endpoint = this.selectedRoom.id ? `/rooms/${this.selectedRoom.id}` : `/rooms/create`
      const method = this.selectedRoom.id ? 'put' : 'post'

      this.axios[method](endpoint, this.selectedRoom)
        .then(() => {
          this.closeDialog()
          this.fetchRooms()
        })
        .catch((error) => {
          alert(error.response.data.message || error.response.data.error || 'Error en el sistema.')
          console.error(error.response.data)
        })
    },
    deleteRoom(id) {
      this.axios.delete(`/rooms/${id}`).then(() => {
        this.fetchRooms()
      })
    },
  },
  created() {
    this.fetchHotel()
    this.fetchRooms()
    this.fetchCatalogs()
  },
}
</script>
