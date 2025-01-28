const getFormatedCurrentDate = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = now.toLocaleString("default", { month: "short" });
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const period = now.getHours() >= 12 ? "PM" : "AM";

  return `${day} ${date} ${month} ${hours}:${minutes}:${seconds}${period}`;
};

export { getFormatedCurrentDate };
