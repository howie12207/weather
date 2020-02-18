<template>
  <div class="main">
    <div class="time">
      <div class="choose" v-if="sort.north[0]">
        <a
          href="#"
          @click.prevent="changeTime(0)"
          class="first"
          :class="{'active':this.$store.state.time===0}"
        >{{ sort.north[0].weatherElement[0].time[0].startTime | time2 }}</a>
        <a
          href="#"
          @click.prevent="changeTime(1)"
          class="second"
          :class="{'active':this.$store.state.time===1}"
        >{{ sort.north[0].weatherElement[0].time[1].startTime | time3 }}</a>
        <a
          href="#"
          @click.prevent="changeTime(2)"
          class="third"
          :class="{'active':this.$store.state.time===2}"
        >{{ sort.north[0].weatherElement[0].time[2].startTime | time4 }}</a>
      </div>
      <div
        class="showtime"
        v-if="sort.north[0]"
      >{{ sort.north[0].weatherElement[0].time[time].startTime | time}} ~ {{ sort.north[0].weatherElement[0].time[time].endTime | time}}</div>
    </div>
    <div class="section">
      <!-- 左區塊 -->
      <div class="sectionLeft">
        <!-- 北部 -->
        <div class="block">
          <h2>北部</h2>
          <div
            class="item"
            v-for="item in sort.north"
            :key="item.locationName"
            :class="{'active':$store.state.city===item.locationName}"
            @mouseover="active(item.locationName)"
            @mouseout="active('')"
          >
            <a href="#" @click.prevent="changeSort(item.locationName)" class="content">
              <span class="location">{{ item.locationName }}</span>
              <span class="degree">
                {{ item.weatherElement[2].time[time].parameter.parameterName }} ~
                {{
                item.weatherElement[4].time[time].parameter.parameterName | degreec
                }}
              </span>
              <span class="rain">
                {{
                item.weatherElement[1].time[time].parameter.parameterName
                }}%
              </span>
              <span class="description">
                {{
                item.weatherElement[3].time[time].parameter.parameterName
                }}
              </span>
            </a>
          </div>
        </div>
        <!-- 中部 -->
        <div class="block">
          <h2>中部</h2>
          <div
            class="item"
            v-for="item in sort.central"
            :key="item.locationName"
            :class="{'active':$store.state.city===item.locationName}"
            @mouseover="active(item.locationName)"
            @mouseout="active('')"
          >
            <a href="#" @click.prevent="changeSort(item.locationName)" class="content">
              <span class="location">{{ item.locationName }}</span>
              <span class="degree">
                {{ item.weatherElement[2].time[time].parameter.parameterName }} ~
                {{
                item.weatherElement[4].time[time].parameter.parameterName | degreec
                }}
              </span>
              <span class="rain">
                {{
                item.weatherElement[1].time[time].parameter.parameterName
                }}%
              </span>
              <span class="description">
                {{
                item.weatherElement[3].time[time].parameter.parameterName
                }}
              </span>
            </a>
          </div>
        </div>
      </div>
      <Taiwan class="taiwan" />
      <!-- 右區塊 -->
      <div class="sectionRight">
        <!-- 東部 -->
        <div class="block">
          <h2>東部</h2>
          <div
            class="item"
            v-for="item in sort.east"
            :key="item.locationName"
            :class="{'active':$store.state.city===item.locationName}"
            @mouseover="active(item.locationName)"
            @mouseout="active('')"
          >
            <a href="#" @click.prevent="changeSort(item.locationName)" class="content">
              <span class="location">{{ item.locationName }}</span>
              <span class="degree">
                {{ item.weatherElement[2].time[time].parameter.parameterName }} ~
                {{
                item.weatherElement[4].time[time].parameter.parameterName | degreec
                }}
              </span>
              <span class="rain">
                {{
                item.weatherElement[1].time[time].parameter.parameterName
                }}%
              </span>
              <span class="description">
                {{
                item.weatherElement[3].time[time].parameter.parameterName
                }}
              </span>
            </a>
          </div>
        </div>
        <!-- 南部 -->
        <div class="block">
          <h2>南部</h2>
          <div
            class="item"
            v-for="item in sort.south"
            :key="item.locationName"
            :class="{'active':$store.state.city===item.locationName}"
            @mouseover="active(item.locationName)"
            @mouseout="active('')"
          >
            <a href="#" @click.prevent="changeSort(item.locationName)" class="content">
              <span class="location">{{ item.locationName }}</span>
              <span class="degree">
                {{ item.weatherElement[2].time[time].parameter.parameterName }} ~
                {{
                item.weatherElement[4].time[time].parameter.parameterName | degreec
                }}
              </span>
              <span class="rain">
                {{
                item.weatherElement[1].time[time].parameter.parameterName
                }}%
              </span>
              <span class="description">
                {{
                item.weatherElement[3].time[time].parameter.parameterName
                }}
              </span>
            </a>
          </div>
        </div>
        <!-- 外島 -->
        <div class="block">
          <h2>外島</h2>
          <div
            class="item"
            v-for="item in sort.offshore"
            :key="item.locationName"
            :class="{'active':$store.state.city===item.locationName}"
            @mouseover="active(item.locationName)"
            @mouseout="active('')"
          >
            <a href="#" @click.prevent="changeSort(item.locationName)" class="content">
              <span class="location">{{ item.locationName }}</span>
              <span class="degree">
                {{ item.weatherElement[2].time[time].parameter.parameterName }} ~
                {{
                item.weatherElement[4].time[time].parameter.parameterName | degreec
                }}
              </span>
              <span class="rain">
                {{
                item.weatherElement[1].time[time].parameter.parameterName
                }}%
              </span>
              <span class="description">
                {{
                item.weatherElement[3].time[time].parameter.parameterName
                }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Taiwan from "./Taiwan.vue";
import { mapGetters } from "vuex";
export default {
  name: "Main",
  components: { Taiwan },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sort"]),
    time() {
      return this.$store.state.time;
    }
  },
  methods: {
    changeTime(time) {
      this.$store.commit("TIME", time);
    },
    changeSort(location) {
      this.$store.dispatch("changeSort", location);
    },
    active(city) {
      this.$store.commit("CITY", city);
    }
  },
  mounted() {
    scroll(0, 0);
  }
};
</script>

<style lang="scss" scoped>
.main {
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  > .time {
    > .choose {
      display: flex;
      line-height: 20px;
      font-size: 14px;
      > a:not(:last-child) {
        margin: 0 40px 0 0;
        position: relative;
      }
      > a:not(:last-child):after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: -20px;
        width: 2px;
        background-color: black;
      }
      > a:hover {
        color: cornflowerblue;
      }
      > a.active {
        color: green;
        font-weight: 900;
      }
    }
    > .showtime {
      line-height: 24px;
      margin: 16px 0;
    }
  }
  > .section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    > .taiwan {
      display: none;
    }
    > .sectionLeft,
    > .sectionRight {
      > .block {
        margin: 0 auto 16px;
        > h2 {
          line-height: 27px;
          text-align: center;
          background-color: #f7ead3;
        }
        > .item {
          display: flex;
          font-size: 14px;
          line-height: 36px;
          text-align: center;
          border-bottom: 1px solid #ccc;
          > .content {
            display: flex;
            align-items: center;
            position: relative;
            > span {
              display: inline-block;
            }
            > .location {
              width: 56px;
            }
            > .degree {
              width: 80px;
            }
            > .rain {
              width: 48px;
            }
            > .description {
              width: 126px;
            }
          }
        }
        > .item:hover {
          background-color: #eee;
        }
        > .item.active {
          background-color: #eee;
        }
      }
    }
  }
}
@media screen and (min-width: 660px) {
  .main {
    > .section {
      > .sectionLeft,
      .sectionRight {
        > .block {
          > .item {
            > .content:after {
              content: "點擊查看";
              position: absolute;
              bottom: -24px;
              z-index: 100;
              visibility: hidden;
              opacity: 0;
              right: -32px;
              width: 56px;
              font-size: 12px;
              line-height: 12px;
              padding: 6px 2px;
              color: white;
              background-color: rgba(0, 0, 0, 0.8);
              border-radius: 4px;
              transition: opacity 0.6s 0.3s;
            }
            > .content:hover:after {
              visibility: visible;
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 960px) {
  .main {
    > .section {
      > .taiwan {
        display: block;
      }
    }
  }
}
</style>
