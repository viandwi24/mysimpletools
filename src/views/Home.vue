<template>
  <div class="container pt-4">
    <div class="row">
      <div class="col-12">
        <h2>Alat - Alat</h2><hr>
        <div class="card mb-2" v-for="(item, i) in menuItems" :key="i">
          <div class="card-body">
            <h5 class="card-title">{{ item.text }}</h5>
            <p class="card-text">
              {{ item.description }}
            </p>
            <router-link tag="a" class="card-link" :to="{ name: item.link }">
              Coba sekarang
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup () {
    const menuItems = reactive([
      { text: 'Team Generator', link: 'TeamGenerator', description: 'Alat untuk mengacak data agar dapat di kelompokan menjadi kelompok team atau grup.' },
      { text: 'Polling', link: 'Polling', description: 'Alat untuk membuat polling sederhana.' }
    ])

    return {
      menuItems
    }
  }
}
</script>