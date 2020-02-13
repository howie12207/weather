<template>
  <div class="weather">
    <Header />
    <Breadcrumb />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Breadcrumb from "./Breadcrumb.vue";
import { mapActions } from "vuex";
export default {
  name: "Weather",
  components: { Header, Breadcrumb },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions(["getWeathers", "getStar"])
  },
  mounted() {
    this.getWeathers();
  }
};
</script>
