<template>
  <div class="breadcrumb">
    <ul>
      <i class="fas fa-home"></i>
      <li
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="index"
        @click="routeTo(index)"
      >{{ breadcrumb.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.updateList();
  },
  watch: {
    $route() {
      this.updateList();
    }
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) {
        this.$router.push(`/product/${this.$store.state.sort}`);
        this.$store.commit("SELECTED", "----- 請選擇縣市 -----");
      }
    },
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  width: 95%;
  margin: 8px auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  > ul {
    display: flex;
    line-height: 32px;
    > i {
      margin: 0 4px 0 0;
      line-height: 32px;
      color: #666;
    }
    > li {
      cursor: pointer;
      // color: brown;
    }
    > li:last-child {
      cursor: default;
    }
    > li:not(:last-child):after {
      content: "-";
      margin: 8px;
      color: black;
    }
  }
}
@media screen and (min-width: 1200px) {
  .breadcrumb {
    max-width: 1200px;
    width: 100%;
  }
}
</style>