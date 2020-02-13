<template>
  <div class="location" :key="this.$router.history.current.name">
    <div class="container" v-if="week">
      <h2>{{ week.locationName }}</h2>
      <h3>{{ week.weatherElement[10].time[0].elementValue[0].value }}</h3>
      <div class="section">
        <table class="block" v-if="sort">
          <caption>今明預報</caption>
          <thead>
            <tr>
              <th class="time">時間</th>
              <th class="degree">溫度 (&deg;C)</th>
              <th class="description">天氣概況</th>
              <th class="description">舒適度</th>
              <th class="rain">降雨機率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="time">
                <span class="txt">{{ sort.weatherElement[0].time[0].startTime | time2 }}</span>
                {{ sort.weatherElement[0].time[0].startTime | time }} ~ {{ sort.weatherElement[0].time[0].endTime | time}}
              </td>
              <td class="degree">
                {{ sort.weatherElement[2].time[0].parameter.parameterName }} ~
                {{ sort.weatherElement[4].time[0].parameter.parameterName }}
              </td>
              <td class="description">{{ sort.weatherElement[0].time[0].parameter.parameterName }}</td>
              <td>{{ sort.weatherElement[3].time[0].parameter.parameterName }}</td>
              <td class="rain">{{ sort.weatherElement[1].time[0].parameter.parameterName }} %</td>
            </tr>
            <tr>
              <td class="time">
                <span class="txt">{{ sort.weatherElement[0].time[1].startTime | time3 }}</span>
                {{ sort.weatherElement[0].time[1].startTime | time }} ~ {{ sort.weatherElement[0].time[1].endTime | time}}
              </td>
              <td class="degree">
                {{ sort.weatherElement[2].time[1].parameter.parameterName }} ~
                {{ sort.weatherElement[4].time[1].parameter.parameterName }}
              </td>
              <td class="description">{{ sort.weatherElement[0].time[1].parameter.parameterName }}</td>
              <td>{{ sort.weatherElement[3].time[1].parameter.parameterName }}</td>
              <td class="rain">{{ sort.weatherElement[1].time[1].parameter.parameterName }} %</td>
            </tr>
            <tr>
              <td class="time">
                <span class="txt">{{ sort.weatherElement[0].time[2].startTime | time4 }}</span>
                {{ sort.weatherElement[0].time[2].startTime | time }} ~ {{ sort.weatherElement[0].time[2].endTime | time}}
              </td>
              <td class="degree">
                {{ sort.weatherElement[2].time[2].parameter.parameterName }} ~
                {{ sort.weatherElement[4].time[2].parameter.parameterName }}
              </td>
              <td class="description">{{ sort.weatherElement[0].time[2].parameter.parameterName }}</td>
              <td>{{ sort.weatherElement[3].time[2].parameter.parameterName }}</td>
              <td class="rain">{{ sort.weatherElement[1].time[2].parameter.parameterName }} %</td>
            </tr>
          </tbody>
        </table>
        <div class="item"></div>
      </div>
      <div class="section">
        <table class="block week">
          <caption>一週預報</caption>
          <thead>
            <tr>
              <th></th>
              <th v-for="i in 7" :key="i">{{ week.weatherElement[11].time[i*2-1].startTime | date}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowspan="2">白天</th>
              <td
                v-for="i in 7"
                :key="i"
              >{{ week.weatherElement[6].time[i*2-2].elementValue[0].value }}</td>
            </tr>
            <tr>
              <td
                v-for="i in 7"
                :key="i"
              >{{ week.weatherElement[8].time[i*2-2].elementValue[0].value | degreec }} ~ {{ week.weatherElement[12].time[i*2-2].elementValue[0].value | degreec}}</td>
            </tr>
            <tr>
              <th rowspan="2" class="night">晚上</th>
              <td
                v-for="i in 7"
                :key="i"
              >{{ week.weatherElement[6].time[i*2-1].elementValue[0].value }}</td>
            </tr>
            <tr>
              <td
                v-for="i in 7"
                :key="i"
              >{{ week.weatherElement[8].time[i*2-1].elementValue[0].value | degreec }} ~ {{ week.weatherElement[12].time[i*2-1].elementValue[0].value | degreec}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="section">
        <table class="block">
          <caption>體感溫度和紫外線</caption>
          <thead>
            <tr>
              <th></th>
              <th v-for="i in 7" :key="i">{{ week.weatherElement[11].time[i*2-1].startTime | date}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>體感溫度</th>
              <td
                v-for="i in 7"
                :key="i"
              >{{ week.weatherElement[11].time[i*2-1].elementValue[0].value | degreec}} ~ {{ week.weatherElement[5].time[i*2-1].elementValue[0].value | degreec}}</td>
            </tr>
            <tr>
              <th>紫外線指數</th>
              <td v-for="i in 7" :key="i">
                <span
                  class="uv"
                  :class="{'uv0':week.weatherElement[9].time[i-1].elementValue[0].value<=2,
                  'uv3':week.weatherElement[9].time[i-1].elementValue[0].value>2 && week.weatherElement[9].time[i-1].elementValue[0].value<=5,
                  'uv6':week.weatherElement[9].time[i-1].elementValue[0].value>5 && week.weatherElement[9].time[i-1].elementValue[0].value<=7,
                  'uv8':week.weatherElement[9].time[i-1].elementValue[0].value>7 && week.weatherElement[9].time[i-1].elementValue[0].value<=10,
                  'uv11':week.weatherElement[9].time[i-1].elementValue[0].value>10}
                  "
                >{{ week.weatherElement[9].time[i-1].elementValue[0].value }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Location",
  computed: {
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
  > .container {
    min-width: 320px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    > h2 {
      width: 90%;
      margin: 0 auto 16px;
      font-size: 20px;
      line-height: 30px;
      font-weight: 800;
      position: relative;
      color: green;
    }
    > h2:before {
      content: "";
      position: relative;
      display: inline-block;
      margin: 0 8px 0 0;
      left: 0;
      top: 5px;
      height: 22px;
      width: 4px;
      background-color: brown;
    }
    > h3 {
      width: 80%;
      margin: 0 auto 16px;
      font-size: 14px;
      line-height: 20px;
      padding: 8px;
      border: 1px solid chocolate;
      align-self: center;
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
          background-color: #f7ead3;
          font-weight: 600;
          color: #0054ba;
        }
        thead {
          > tr {
            border-bottom: 1px solid #8297d6;
            border-top: 1px solid #8297d6;
          }
        }
        th {
          color: brown;
          font-size: 14px;
        }
        td,
        th {
          padding: 16px 4px;
          vertical-align: middle;
        }
        tbody {
          > tr {
            border-bottom: 1px solid #ccc;
            > th {
              position: relative;
            }
            > th:after {
              content: "06:00 ~ 18:00";
              position: absolute;
              bottom: -16px;
              z-index: 100;
              visibility: hidden;
              opacity: 0;
              right: -48px;
              width: 80px;
              font-size: 12px;
              line-height: 18px;
              padding: 6px 2px;
              color: white;
              background-color: rgba(0, 0, 0, 0.8);
              border-radius: 4px;
              transition: opacity 1s 0.3s;
            }
            > .night:first-child:after {
              content: "18:00 ~ 06:00";
            }
            > th:hover:after {
              visibility: visible;
              opacity: 1;
            }
            > td.time {
              > .txt {
                color: darkcyan;
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
            border-bottom: 1px solid #ccc;
          }
          th {
            border-bottom: 1px solid #ccc !important;
          }
          tr:nth-child(odd) {
            td {
              padding: 16px 4px 0 !important;
            }
          }
          tr:nth-child(even) {
            td {
              padding: 0 4px 16px !important;
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
      .uv0 {
        background-image: url(../assets/uv0.png);
      }
      .uv3 {
        background-image: url(../assets/uv3.png);
      }
      .uv6 {
        background-image: url(../assets/uv6.png);
      }
      .uv8 {
        background-image: url(../assets/uv8.png);
      }
      .uv11 {
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
          content: "";
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
        .uv0:after {
          content: "輕量級";
        }
        .uv3:after {
          content: "中量級";
        }
        .uv6:after {
          content: "高量級";
        }
        .uv8:after {
          content: "過量級";
        }
        .uv8:after {
          content: "危險級";
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