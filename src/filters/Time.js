export default function(time) {
  return time.replace(/-/g, "/").slice(5);
  // 去除年份
}
