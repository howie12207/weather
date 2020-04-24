import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { getDayWeather, getWeekWeather } from "@/api/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    weathers: [],
    weathersWeek: [],
    time: 0,
    sort: "",
    location: "",
    selected: "",
    city: "",
    loading: false,
  },
  mutations: {
    LOADING(state, status) {
      state.loading = status;
    },
    WEATHERS(state, payload) {
      state.weathers = payload;
    },
    WEATHERSWEEK(state, payload) {
      state.weathersWeek = payload;
    },
    TIME(state, payload) {
      state.time = payload;
    },
    SORT(state, payload) {
      state.sort = payload;
    },
    LOCATION(state, payload) {
      state.location = payload;
    },
    SELECTED(state, payload) {
      state.selected = payload;
    },
    CITY(state, payload) {
      state.city = payload;
    },
  },
  actions: {
    // 取得兩天天氣資料
    getWeathers(context) {
      getDayWeather().then((res) => {
        context.commit("WEATHERS", res.records.location);
      });
    },
    // 取得一周天氣資料
    getWeathersWeek(context, payload) {
      let tmp = {};
      context.dispatch("transform", payload);
      getWeekWeather().then((res) => {
        tmp = res.records.locations[0].location.filter((item) => {
          if (item.locationName === context.state.location) {
            return item;
          }
        });
        context.commit("WEATHERSWEEK", tmp);
      });
    },
    // 更換分類
    changeSort(context, payload) {
      context.dispatch("transformE", payload);
      let sort = context.state.sort;
      if (router.history.current.name === sort) return;
      if (sort == "" && router.history.current.name == "Main") return;
      router.push(`./${sort}`);
      context.dispatch("getWeathersWeek", sort);
    },
    transformE(context, payload) {
      if (payload == "全部") context.commit("SORT", "");
      if (payload == "基隆市") context.commit("SORT", "keelung");
      if (payload == "臺北市") context.commit("SORT", "taipei");
      if (payload == "新北市") context.commit("SORT", "newtaipei");
      if (payload == "桃園市") context.commit("SORT", "taoyuan");
      if (payload == "新竹市") context.commit("SORT", "hsinchucity");
      if (payload == "新竹縣") context.commit("SORT", "hsinchu");
      if (payload == "苗栗縣") context.commit("SORT", "miaoli");
      if (payload == "臺中市") context.commit("SORT", "taichung");
      if (payload == "彰化縣") context.commit("SORT", "changhua");
      if (payload == "南投縣") context.commit("SORT", "nantou");
      if (payload == "雲林縣") context.commit("SORT", "yunlin");
      if (payload == "嘉義市") context.commit("SORT", "chiayicity");
      if (payload == "嘉義縣") context.commit("SORT", "chiayi");
      if (payload == "宜蘭縣") context.commit("SORT", "yilan");
      if (payload == "花蓮縣") context.commit("SORT", "hualien");
      if (payload == "臺東縣") context.commit("SORT", "taitung");
      if (payload == "臺南市") context.commit("SORT", "tainan");
      if (payload == "高雄市") context.commit("SORT", "kaohsiung");
      if (payload == "屏東縣") context.commit("SORT", "pingtung");
      if (payload == "連江縣") context.commit("SORT", "lienchiang");
      if (payload == "金門縣") context.commit("SORT", "kinmen");
      if (payload == "澎湖縣") context.commit("SORT", "penghu");
    },
    transform(context, payload) {
      if (payload == "全部") context.commit("LOCATION", "");
      if (payload == "keelung") context.commit("LOCATION", "基隆市");
      if (payload == "taipei") context.commit("LOCATION", "臺北市");
      if (payload == "newtaipei") context.commit("LOCATION", "新北市");
      if (payload == "taoyuan") context.commit("LOCATION", "桃園市");
      if (payload == "hsinchucity") context.commit("LOCATION", "新竹市");
      if (payload == "hsinchu") context.commit("LOCATION", "新竹縣");
      if (payload == "miaoli") context.commit("LOCATION", "苗栗縣");
      if (payload == "taichung") context.commit("LOCATION", "臺中市");
      if (payload == "changhua") context.commit("LOCATION", "彰化縣");
      if (payload == "nantou") context.commit("LOCATION", "南投縣");
      if (payload == "yunlin") context.commit("LOCATION", "雲林縣");
      if (payload == "chiayicity") context.commit("LOCATION", "嘉義市");
      if (payload == "chiayi") context.commit("LOCATION", "嘉義縣");
      if (payload == "yilan") context.commit("LOCATION", "宜蘭縣");
      if (payload == "hualien") context.commit("LOCATION", "花蓮縣");
      if (payload == "taitung") context.commit("LOCATION", "臺東縣");
      if (payload == "tainan") context.commit("LOCATION", "臺南市");
      if (payload == "kaohsiung") context.commit("LOCATION", "高雄市");
      if (payload == "pingtung") context.commit("LOCATION", "屏東縣");
      if (payload == "lienchiang") context.commit("LOCATION", "連江縣");
      if (payload == "kinmen") context.commit("LOCATION", "金門縣");
      if (payload == "penghu") context.commit("LOCATION", "澎湖縣");
    },
    // 啟用
    active(context, payload) {
      context.commit("CITY", payload);
      let span = document.createElement("span");
      let node = document.createTextNode(payload);
      span.appendChild(node);
      let element = document.querySelector(".taiwan");
      element.appendChild(span);
      element.querySelectorAll("span").forEach((item) => {
        item.style.setProperty("position", "absolute");
        item.style.setProperty("top", `${event.pageY + 20}px`);
        item.style.setProperty("left", `${event.pageX + 20}px`);
        item.style.setProperty("background-color", "black");
        item.style.setProperty("color", "white");
        item.style.setProperty("padding", "0px 8px");
        item.style.setProperty("line-height", "30px");
        item.style.setProperty("font-size", "13px");
        item.style.setProperty("border-radius", "3px");
      });
    },
    // 關閉啟用
    inactive(context) {
      context.commit("CITY", "");
      let element = document.querySelector(".taiwan");
      let span = element.querySelectorAll("span");
      span.forEach((item) => {
        element.removeChild(item);
      });
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    sort(state) {
      let tmp = {};
      tmp.north = [];
      tmp.central = [];
      tmp.east = [];
      tmp.south = [];
      tmp.offshore = [];
      state.weathers.forEach((element) => {
        if (element.locationName === "基隆市") tmp.north.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "臺北市") tmp.north.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "新北市") tmp.north.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "桃園市") tmp.north.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "新竹市") tmp.north.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "新竹縣") tmp.north.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "苗栗縣") tmp.north.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "臺中市") tmp.central.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "彰化縣") tmp.central.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "南投縣") tmp.central.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "雲林縣") tmp.central.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "嘉義市") tmp.central.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "嘉義縣") tmp.central.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "宜蘭縣") tmp.east.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "花蓮縣") tmp.east.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "臺東縣") tmp.east.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "臺南市") tmp.south.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "高雄市") tmp.south.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "屏東縣") tmp.south.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "連江縣") tmp.offshore.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "金門縣") tmp.offshore.push(element);
      });
      state.weathers.forEach((element) => {
        if (element.locationName === "澎湖縣") tmp.offshore.push(element);
      });
      return tmp;
    },
  },
  modules: {},
});
