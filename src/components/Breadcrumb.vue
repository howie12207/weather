<template>
  <div class="breadcrumb">
    <ul>
      <i class="el-icon-s-home"></i>
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
        this.$store.commit("SELECTED", "");
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
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  color: #606266;
  font-size: 14px;
  > ul {
    display: flex;
    line-height: 32px;
    > i {
      margin: 0 4px 0 0;
      line-height: 32px;
      color: #909399;
    }
    > li {
      cursor: pointer;
    }
    > li:not(:last-child):hover {
      color: #a0cfff;
    }
    > li:last-child {
      cursor: default;
      color: #67c23a;
    }
    > li:not(:last-child):after {
      content: "/";
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
