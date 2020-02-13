export default function(time) {
  return time.replace(/-/g, "/").slice(5, 10);
}
