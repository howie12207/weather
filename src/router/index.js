import Vue from "vue";
import VueRouter from "vue-router";
import Weather from "../components/Weather.vue";
import Main from "../components/Main.vue";
import Location from "../components/Location.vue";
import Taiwan from "../components/Taiwan.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Weather,
    children: [
      {
        path: "",
        name: "Main",
        component: Main,
        meta: {
          breadcrumb: [{ name: "首頁" }]
        }
      },
      {
        path: "/keelung",
        name: "keelung",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "基隆市" }]
        }
      },
      {
        path: "/taipei",
        name: "taipei",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "臺北市" }]
        }
      },
      {
        path: "/newtaipei",
        name: "newtaipei",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "新北市" }]
        }
      },
      {
        path: "/taoyuan",
        name: "taoyuan",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "桃園市" }]
        }
      },
      {
        path: "/hsinchucity",
        name: "hsinchucity",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "新竹市" }]
        }
      },
      {
        path: "/hsinchu",
        name: "hsinchu",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "新竹縣" }]
        }
      },
      {
        path: "/miaoli",
        name: "miaoli",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "苗栗縣" }]
        }
      },
      {
        path: "/taichung",
        name: "taichung",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "臺中市" }]
        }
      },
      {
        path: "/changhua",
        name: "changhua",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "彰化縣" }]
        }
      },
      {
        path: "/nantou",
        name: "nantou",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "南投縣" }]
        }
      },
      {
        path: "/yunlin",
        name: "yunlin",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "雲林縣" }]
        }
      },
      {
        path: "/chiayicity",
        name: "chiayicity",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "嘉義市" }]
        }
      },
      {
        path: "/chiayi",
        name: "chiayi",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "嘉義縣" }]
        }
      },
      {
        path: "/yilan",
        name: "yilan",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "宜蘭縣" }]
        }
      },
      {
        path: "/hualien",
        name: "hualien",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "花蓮縣" }]
        }
      },
      {
        path: "/taitung",
        name: "taitung",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "臺東縣" }]
        }
      },
      {
        path: "/tainan",
        name: "tainan",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "臺南市" }]
        }
      },
      {
        path: "/kaohsiung",
        name: "kaohsiung",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "高雄市" }]
        }
      },
      {
        path: "/pingtung",
        name: "pingtung",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "屏東縣" }]
        }
      },
      {
        path: "/lienchiang",
        name: "lienchiang",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "連江縣" }]
        }
      },
      {
        path: "/kinmen",
        name: "kinmen",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "金門縣" }]
        }
      },
      {
        path: "/penghu",
        name: "penghu",
        component: Location,
        meta: {
          breadcrumb: [{ name: "首頁", link: "/" }, { name: "澎湖縣" }]
        }
      }
    ]
  },
  {
    path: "/taiwan",
    name: "Taiwan",
    component: Taiwan
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
