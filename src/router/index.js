import { createRouter, createWebHistory } from 'vue-router'
import HotelList from '@/views/hotels/HotelsList.vue'
import HotelForm from '@/views/hotels/HotelForm.vue'
import RoomManagement from '@/views/rooms/RoomManagment.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HotelList', component: HotelList },
    { path: '/hotel/create', name: 'HotelCreate', component: HotelForm },
    { path: '/hotel/edit/:id', name: 'HotelEdit', component: HotelForm },
    { path: '/hotel/:id/rooms', name: 'RoomManagement', component: RoomManagement },
  ],
})

export default router
