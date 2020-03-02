<template>
  <div class="location" :key="this.$router.history.current.name" v-loading="loading">
    <div class="container" v-if="week">
      <h2>
        <i class="el-icon-location"></i>
        {{ week.locationName }}
      </h2>

      <h3>{{ week.weatherElement[10].time[0].elementValue[0].value }}</h3>
      <!-- 今明預報 -->
      <div class="section">
        <table class="block" v-if="sort">
          <caption>今明預報</caption>
          <thead>
            <tr>
              <th class="time">
                <i class="el-icon-time"></i> 時間
              </th>
              <th class="degree">溫度 (&deg;C)</th>
              <th class="description">天氣概況</th>
              <th class="feel">舒適度</th>
              <th class="rain">
                <i class="el-icon-light-rain"></i> 降雨機率
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- 第一時間 -->
            <tr>
              <td class="time">
                <span class="txt">
                  {{
                  sort.weatherElement[0].time[0].startTime | time2
                  }}
                </span>
                {{ sort.weatherElement[0].time[0].startTime | time }} ~
                {{ sort.weatherElement[0].time[0].endTime | time }}
              </td>
              <td class="degree">
                {{ sort.weatherElement[2].time[0].parameter.parameterName }} ~
                {{ sort.weatherElement[4].time[0].parameter.parameterName }}
              </td>
              <td class="description">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    sort.weatherElement[0].time[0].parameter.parameterName
                  "
                  placement="bottom"
                >
                  <i
                    :class="{
                      'el-icon-cloudy':
                        sort.weatherElement[0].time[0].parameter.parameterName.indexOf(
                          '雲'
                        ) !== -1 ||
                        sort.weatherElement[0].time[0].parameter.parameterName.indexOf(
                          '陰'
                        ) !== -1,
                      'el-icon-sunny':
                        sort.weatherElement[0].time[0].parameter.parameterName.indexOf(
                          '晴'
                        ) !== -1,
                      'el-icon-heavy-rain':
                        sort.weatherElement[0].time[0].parameter.parameterName.indexOf(
                          '雨'
                        ) !== -1
                    }"
                  ></i>
                </el-tooltip>
              </td>
              <td class="feel">{{ sort.weatherElement[3].time[0].parameter.parameterName }}</td>
              <td class="rain">{{ sort.weatherElement[1].time[0].parameter.parameterName }} %</td>
            </tr>
            <!-- 第二時間 -->
            <tr>
              <td class="time">
                <span class="txt">
                  {{
                  sort.weatherElement[0].time[1].startTime | time3
                  }}
                </span>
                {{ sort.weatherElement[0].time[1].startTime | time }} ~
                {{ sort.weatherElement[0].time[1].endTime | time }}
              </td>
              <td class="degree">
                {{ sort.weatherElement[2].time[1].parameter.parameterName }} ~
                {{ sort.weatherElement[4].time[1].parameter.parameterName }}
              </td>
              <td class="description">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    sort.weatherElement[0].time[1].parameter.parameterName
                  "
                  placement="bottom"
                >
                  <i
                    :class="{
                      'el-icon-cloudy':
                        sort.weatherElement[0].time[1].parameter.parameterName.indexOf(
                          '雲'
                        ) !== -1 ||
                        sort.weatherElement[0].time[1].parameter.parameterName.indexOf(
                          '陰'
                        ) !== -1,
                      'el-icon-sunny':
                        sort.weatherElement[0].time[1].parameter.parameterName.indexOf(
                          '晴'
                        ) !== -1,
                      'el-icon-heavy-rain':
                        sort.weatherElement[0].time[1].parameter.parameterName.indexOf(
                          '雨'
                        ) !== -1
                    }"
                  ></i>
                </el-tooltip>
              </td>
              <td class="feel">{{ sort.weatherElement[3].time[1].parameter.parameterName }}</td>
              <td class="rain">{{ sort.weatherElement[1].time[1].parameter.parameterName }} %</td>
            </tr>
            <!-- 第三時間 -->
            <tr>
              <td class="time">
                <span class="txt">
                  {{
                  sort.weatherElement[0].time[2].startTime | time4
                  }}
                </span>
                {{ sort.weatherElement[0].time[2].startTime | time }} ~
                {{ sort.weatherElement[0].time[2].endTime | time }}
              </td>
              <td class="degree">
                {{ sort.weatherElement[2].time[2].parameter.parameterName }} ~
                {{ sort.weatherElement[4].time[2].parameter.parameterName }}
              </td>
              <td class="description">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    sort.weatherElement[0].time[2].parameter.parameterName
                  "
                  placement="bottom"
                >
                  <i
                    :class="{
                      'el-icon-cloudy':
                        sort.weatherElement[0].time[2].parameter.parameterName.indexOf(
                          '雲'
                        ) !== -1 ||
                        sort.weatherElement[0].time[2].parameter.parameterName.indexOf(
                          '陰'
                        ) !== -1,
                      'el-icon-sunny':
                        sort.weatherElement[0].time[2].parameter.parameterName.indexOf(
                          '晴'
                        ) !== -1,
                      'el-icon-heavy-rain':
                        sort.weatherElement[0].time[2].parameter.parameterName.indexOf(
                          '雨'
                        ) !== -1
                    }"
                  ></i>
                </el-tooltip>
              </td>
              <td class="feel">{{ sort.weatherElement[3].time[2].parameter.parameterName }}</td>
              <td class="rain">{{ sort.weatherElement[1].time[2].parameter.parameterName }} %</td>
            </tr>
          </tbody>
        </table>
        <div class="item"></div>
      </div>
      <!-- 一週預報 -->
      <div class="section">
        <table class="block week">
          <caption>一週預報</caption>
          <thead>
            <tr>
              <th></th>
              <th
                v-for="i in 7"
                :key="i"
              >{{ week.weatherElement[11].time[i * 2 - 1].startTime | date }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowspan="2">
                <el-tooltip class="item" effect="dark" content="06:00 ~ 18:00" placement="bottom">
                  <i class="el-icon-sunrise"></i>
                </el-tooltip>
              </th>
              <td v-for="i in 7" :key="i">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    week.weatherElement[6].time[i * 2 - 2].elementValue[0].value
                  "
                  placement="bottom"
                >
                  <i
                    :class="{
                      'el-icon-cloudy':
                        week.weatherElement[6].time[
                          i * 2 - 2
                        ].elementValue[0].value.indexOf('雲') !== -1 ||
                        week.weatherElement[6].time[
                          i * 2 - 2
                        ].elementValue[0].value.indexOf('陰') !== -1,
                      'el-icon-sunny':
                        week.weatherElement[6].time[
                          i * 2 - 2
                        ].elementValue[0].value.indexOf('晴') !== -1,
                      'el-icon-heavy-rain':
                        week.weatherElement[6].time[
                          i * 2 - 2
                        ].elementValue[0].value.indexOf('雨') !== -1
                    }"
                  ></i>
                </el-tooltip>
              </td>
            </tr>
            <tr>
              <td v-for="i in 7" :key="i">
                {{
                week.weatherElement[8].time[i * 2 - 2].elementValue[0].value
                | degreec
                }}
                ~
                {{
                week.weatherElement[12].time[i * 2 - 2].elementValue[0].value
                | degreec
                }}
              </td>
            </tr>
            <tr>
              <th rowspan="2" class="night">
                <el-tooltip class="item" effect="dark" content="18:00 ~ 06:00" placement="bottom">
                  <i class="el-icon-moon"></i>
                </el-tooltip>
              </th>
              <td v-for="i in 7" :key="i">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    week.weatherElement[6].time[i * 2 - 1].elementValue[0].value
                  "
                  placement="bottom"
                >
                  <i
                    :class="{
                      'el-icon-cloudy':
                        week.weatherElement[6].time[
                          i * 2 - 1
                        ].elementValue[0].value.indexOf('雲') !== -1 ||
                        week.weatherElement[6].time[
                          i * 2 - 1
                        ].elementValue[0].value.indexOf('陰') !== -1,
                      'el-icon-sunny':
                        week.weatherElement[6].time[
                          i * 2 - 1
                        ].elementValue[0].value.indexOf('晴') !== -1,
                      'el-icon-heavy-rain':
                        week.weatherElement[6].time[
                          i * 2 - 1
                        ].elementValue[0].value.indexOf('雨') !== -1
                    }"
                  ></i>
                </el-tooltip>
              </td>
            </tr>
            <tr>
              <td v-for="i in 7" :key="i">
                {{
                week.weatherElement[8].time[i * 2 - 1].elementValue[0].value
                | degreec
                }}
                ~
                {{
                week.weatherElement[12].time[i * 2 - 1].elementValue[0].value
                | degreec
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 體感溫度和紫外線 -->
      <div class="section">
        <table class="block">
          <caption>體感溫度和紫外線</caption>
          <thead>
            <tr>
              <th></th>
              <th
                v-for="i in 7"
                :key="i"
              >{{ week.weatherElement[11].time[i * 2 - 1].startTime | date }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>體感溫度</th>
              <td v-for="i in 7" :key="i">
                {{
                week.weatherElement[11].time[i * 2 - 1].elementValue[0].value
                | degreec
                }}
                ~
                {{
                week.weatherElement[5].time[i * 2 - 1].elementValue[0].value
                | degreec
                }}
              </td>
            </tr>
            <tr>
              <th>紫外線指數</th>
              <td v-for="i in 7" :key="i">
                <span
                  class="uv"
                  :data-level="week.weatherElement[9].time[i - 1].elementValue[0].value | level"
                >
                  {{
                  week.weatherElement[9].time[i - 1].elementValue[0].value
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Location",
  computed: {
    ...mapGetters(["loading"]),
    sort() {
      let tmp = this.$store.state.weathers.filter(item => {
        if (item.locationName === this.$store.state.location) return item;
      });
      return tmp[0];
    },
    week() {
      return this.$store.state.weathersWeek[0];
    }
  },
  created() {
    this.$store.commit("SORT", this.$router.history.current.name);
    this.$store.dispatch("getWeathersWeek", this.$router.history.current.name);
    scroll(0, 0);
  }
};
</script>
<style lang="scss" scoped>
.location {
  max-width: 1200px;
  margin: 0 auto;
  color: #606266;
  font-size: 14px;
  > .container {
    min-width: 320px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    > h2 {
      width: 90%;
      margin: 0 auto 16px;
      font-size: 18px;
      line-height: 30px;
      font-weight: 800;
      position: relative;
      color: #303133;
    }
    > h3 {
      width: 80%;
      margin: 0 auto 16px;
      line-height: 20px;
      padding: 8px;
      border: 1px solid #fde2e2;
      align-self: center;
      border-radius: 3px;
    }
    > .section {
      margin: 0 0 40px;
      > .block {
        width: 100%;
        font-size: 13px;
        line-height: 18px;
        text-align: center;
        caption {
          font-size: 16px;
          line-height: 32px;
          background-color: #d9ecff;
          border-radius: 3px;
          color: #303133;
        }
        thead {
          > tr {
            border-bottom: 1px solid #dcdfe6;
          }
        }
        td i {
          font-size: 20px;
        }
        th {
          color: #909399;
          font-size: 14px;
        }
        tbody th i {
          font-size: 24px;
        }
        td,
        th {
          padding: 16px 4px;
          vertical-align: middle;
        }
        tbody {
          > tr {
            border-bottom: 1px solid #ebeef5;
            > th {
              position: relative;
            }
            > td.time {
              > .txt {
                color: #79bbff;
                font-weight: 600;
              }
            }
          }
        }
      }
      > .week {
        tbody {
          > tr {
            border-bottom: none;
          }
          > tr:nth-child(even) {
            border-bottom: 1px solid #ebeef5;
          }
          th {
            border-bottom: 1px solid #ebeef5 !important;
          }
          tr:nth-child(odd) {
            td {
              padding: 16px 4px 8px !important;
            }
          }
          tr:nth-child(even) {
            td {
              padding: 0px 4px 16px !important;
            }
          }
        }
      }
      .uv {
        width: 30px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        border-radius: 50%;
        color: white;
        position: relative;
      }
      .uv[data-level="低量級"] {
        background-image: url(../assets/uv0.png);
      }
      .uv[data-level="中量級"] {
        background-image: url(../assets/uv3.png);
      }
      .uv[data-level="高量級"] {
        background-image: url(../assets/uv6.png);
      }
      .uv[data-level="過量級"] {
        background-image: url(../assets/uv8.png);
      }
      .uv[data-level="危險級"] {
        background-image: url(../assets/uv11.png);
      }
    }
  }
}
@media screen and (min-width: 660px) {
  .location {
    > .container {
      > .section {
        width: 80%;
        min-width: 600px;
        margin: 0 auto 40px;
      }
    }
  }
}
@media screen and (min-width: 960px) {
  .location {
    > .container {
      > .section {
        .uv:after {
          content: attr(data-level);
          position: absolute;
          bottom: -16px;
          z-index: 100;
          visibility: hidden;
          opacity: 0;
          right: -48px;
          width: 48px;
          font-size: 12px;
          line-height: 12px;
          padding: 6px 2px;
          color: white;
          background-color: rgba(0, 0, 0, 0.8);
          border-radius: 4px;
          transition: opacity 1s 0.3s;
        }
        .uv:hover:after {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
}
</style>
