export default function(time) {
  if (time.slice(11, 13) == "18") {
    return "明日晚上";
  } else {
    return "明日白天";
  }
}
