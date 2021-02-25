import { createWebHistory, createRouter } from "vue-router"
import Home from "./views/Home.vue"
import About from "./views/About.vue"
import TeamGenerator from "./views/TeamGenerator.vue"

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/team-generator", name: "TeamGenerator", component: TeamGenerator },
  { path: "/polling", name: "Polling", component: TeamGenerator },
  { path: "/about", name: "About", component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router