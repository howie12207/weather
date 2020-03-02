export default function(time) {
  return time.replace(/-/g, "/").slice(5, 10);
  // 返回日期 => 月/日
}
