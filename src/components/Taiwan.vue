<template>
  <div>
    <div class="container" id="app">
      <div class="taiwan-map" ref="map">
        <div id="map">
          <svg id="svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" />
        </div>
      </div>
      <div class="shop-list">
        <h1>{{ h1 }}</h1>
        <h2>{{ h2 }}</h2>
      </div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
<script>
export default {
  data() {
    return {
      h1: "縣市中文",
      h2: "縣市英文"
    };
  },
  methods: {
    async getTaiwanMap() {
      const width = this.$refs.map.offsetWidth.toFixed(),
        height = this.$refs.map.offsetHeight.toFixed();
      console.log(width, height);
      // 判斷螢幕寬度，給不同放大值
      let mercatorScale,
        w = window.screen.width;
      if (w > 1366) {
        mercatorScale = 11000;
      } else if (w <= 1366 && w > 480) {
        mercatorScale = 9000;
      } else {
        mercatorScale = 6000;
      }

      // d3：svg path 產生器
      var path = await d3.geo.path().projection(
        // !important 座標變換函式
        d3.geo
          .mercator()
          .center([121, 23.5])
          .scale(18000)
          .translate([width / 2, height / 2.5])
      );

      // 讓d3抓svg，並寫入寬高
      var svg = await d3
        .select("#svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

      // 讓d3抓GeoJSON檔，並寫入path的路徑
      var url = "taiwan2.geojson";
      await d3.json(url, (error, geometry) => {
        if (error) throw error;

        svg
          .selectAll("path")
          .data(geometry.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr({
            // 設定id，為了click時加class用
            id: d => "city" + d.properties.COUNTYCODE
          })
          .on("click", d => {
            this.h1 = d.properties.COUNTYNAME; // 換中文名
            this.h2 = d.properties.COUNTYENG; // 換英文名
            // 有 .active 存在，就移除 .active
            if (document.querySelector(".active")) {
              document.querySelector(".active").classList.remove("active");
            }
            // 被點擊的縣市加上 .active
            document
              .getElementById("city" + d.properties.COUNTYCODE)
              .classList.add("active");
          });
      });
      return svg;
    }
  },
  mounted() {
    this.getTaiwanMap();
  }
};
</script>

<style lang="scss" scoped>
// $main: #ffca28;

// html,
// body,
// .container {
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
// }
// body {
//   letter-spacing: 1px;
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
//     Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
//     "微軟正黑體", "Microsoft JhengHei";
// }
// .container {
//   display: flex;
//   justify-content: space-around;
//   background: #232526;
//   background: linear-gradient(to right, #414345, #232526);
// }

// .taiwan-map,
// .shop-list {
//   width: 50%;
//   height: 100%;
// }
#map {
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 100%;
  width: 240px;
  height: 320px;
}
//   svg {
//     max-height: 100vh;
//   }
//   path {
//     fill: transparent;
//     stroke: #fff;
//     cursor: pointer;
//     transition: fill 0.2s ease, stroke 0.2s ease, transform 0.2s ease;
//     &:hover,
//     &.active {
//       fill: rgba($main, 0.5);
//       stroke: $main;
//       transform: translateY(-5px);
//     }
//   }
// }
// h1,
// h2 {
//   position: relative;
//   line-height: 2;
//   text-align: center;
//   font-weight: bold;
// }

// h1 {
//   font-size: 5vw;
//   color: #ffca28;
//   &::after {
//     content: "";
//     position: absolute;
//     left: 50%;
//     bottom: 0;
//     width: 80%;
//     height: 2px;
//     background: linear-gradient(
//       90deg,
//       rgba(255, 255, 255, 0) 0%,
//       rgba(255, 255, 255, 0.8) 30%,
//       rgba(255, 255, 255, 0.8) 50%,
//       rgba(255, 255, 255, 0.8) 70%,
//       rgba(255, 255, 255, 0) 100%
//     );
//     transform: translateX(-50%);
//   }
// }

// h2 {
//   font-size: 4vw;
//   color: rgba(#fff, 0.8);
// }

// .shop-list {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   align-content: center;
//   flex-wrap: wrap;
//   h1,
//   h2 {
//     width: 100%;
//   }
// }
@media screen and (max-width: 480px) {
  .container {
    flex-wrap: wrap;
    .taiwan-map,
    .shop-list {
      width: 100%;
      .taiwan-map {
        height: 80vh;
        .shop-list {
          height: 20vh;
          h1 {
            font-size: 8vw;
          }
          h2 {
            font-size: 6vw;
          }
        }
      }
    }
  }
}
</style>