export default function(level) {
  if (parseInt(level) <= 2) return "低量級";
  else if (parseInt(level) <= 5) return "中量級";
  else if (parseInt(level) <= 7) return "高量級";
  else if (parseInt(level) <= 10) return "過量級";
  else return "危險級";
}
