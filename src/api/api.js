import { get } from "@/utils/request.js";

export const getDayWeather = () => {
  return get(
    "F-C0032-001?Authorization=CWB-AE8477B0-C3E4-45FB-8B8F-2070C1B03DE4"
  );
};
export const getWeekWeather = () => {
  return get(
    "F-D0047-091?Authorization=CWB-AE8477B0-C3E4-45FB-8B8F-2070C1B03DE4"
  );
};
