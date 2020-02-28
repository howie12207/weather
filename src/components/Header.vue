<template>
  <div class="header">
    <div class="container">
      <h1>
        <i class="el-icon-cloudy"></i> 天氣預報
      </h1>
      <el-select filterable @change="changeSort()" v-model="selected" placeholder="請選擇或輸入縣市">
        <el-option-group label="北部">
          <el-option
            v-for="item in sort.north"
            :key="item.locationName"
            :label="item.locationName"
            :value="item.locationName"
          ></el-option>
        </el-option-group>
        <el-option-group label="中部">
          <el-option
            v-for="item in sort.central"
            :key="item.locationName"
            :label="item.locationName"
            :value="item.locationName"
          ></el-option>
        </el-option-group>
        <el-option-group label="東部">
          <el-option
            v-for="item in sort.east"
            :key="item.locationName"
            :label="item.locationName"
            :value="item.locationName"
          ></el-option>
        </el-option-group>
        <el-option-group label="南部">
          <el-option
            v-for="item in sort.south"
            :key="item.locationName"
            :label="item.locationName"
            :value="item.locationName"
          ></el-option>
        </el-option-group>
        <el-option-group label="外島">
          <el-option
            v-for="item in sort.offshore"
            :key="item.locationName"
            :label="item.locationName"
            :value="item.locationName"
          ></el-option>
        </el-option-group>
      </el-select>
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
  color: #606266;
  > .container {
    font-family: Microsoft JhengHei;
    background: center/cover no-repeat url("../assets/header.jpg");
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > h1 {
      font-size: 30px;
      line-height: 50px;
      font-weight: 700;
      color: #303133;
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
