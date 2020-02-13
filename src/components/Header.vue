<template>
  <div class="header">
    <div class="container">
      <h1>天氣預報</h1>
      <select @change="changeSort()" v-model="selected">
        <option disabled>----- 請選擇縣市 -----</option>
        <option>全部</option>
        <option disabled>----- 北部 -----</option>
        <option v-for="item in sort.north" :key="item.locationName">{{ item.locationName }}</option>
        <option disabled>----- 中部 -----</option>
        <option v-for="item in sort.central" :key="item.locationName">{{ item.locationName }}</option>
        <option disabled>----- 東部 -----</option>
        <option v-for="item in sort.east" :key="item.locationName">{{ item.locationName }}</option>
        <option disabled>----- 南部 -----</option>
        <option v-for="item in sort.south" :key="item.locationName">{{ item.locationName }}</option>
        <option disabled>----- 外島 -----</option>
        <option v-for="item in sort.offshore" :key="item.locationName">{{ item.locationName }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sort"]),
    selected: {
      get() {
        return this.$store.state.selected;
      },
      set(value) {
        this.$store.commit("SELECTED", value);
      }
    }
  },
  methods: {
    changeSort() {
      this.$store.dispatch("changeSort", this.selected);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  > .container {
    font-family: Microsoft JhengHei;
    background: center/cover no-repeat url("../assets/header.jpg");
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > h1 {
      font-size: 40px;
      line-height: 72px;
      font-weight: 700;
    }
    > select {
      width: auto;
      text-align: center;
      text-align-last: center;
      padding: 0 2%;
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      border: 1px solid brown;
    }
  }
}
@media screen and (min-width: 660px) {
  .header {
    > .container {
      height: 300px;
    }
  }
}
@media screen and (min-width: 960px) {
  .header {
    > .container {
      height: 400px;
    }
  }
}
</style>