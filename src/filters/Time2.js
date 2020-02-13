export default function(time) {
  if (time.slice(11, 13) == "18") {
    return "今晚明晨";
  } else {
    return "今日白天";
  }
}
