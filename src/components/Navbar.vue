<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <router-link tag="a" class="navbar-brand" :to="{ name: 'Home' }" aria-current="page">MySimpleTools</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link tag="a" class="nav-link" :to="{ name: 'Home' }" aria-current="page">Home</router-link>
          </li>
          <!-- <li class="nav-item"><a class="nav-link" href="#">Link</a></li> -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Tools
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-for="(item, i) in toolItems" :key="i"><router-link tag="a" class="dropdown-item" :to="{ name: item.link }">{{ item.text }}</router-link></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a href="https://github.com/viandwi24" class="nav-link">@viandwi24</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup () {
    const toolItems = reactive([
      { text: 'Team Generator', link: 'TeamGenerator', description: 'Alat untuk mengacak data agar dapat di kelompokan menjadi kelompok team atau grup.' },
      { text: 'Polling', link: 'Polling', description: 'Alat untuk membuat polling sederhana.' }
    ])

    return {
      toolItems
    }
  }
}
</script>