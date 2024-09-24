export const formatScheduleTime = (scheduleTime) => {
  const [hours, minutes, seconds] = scheduleTime.split(":").map(Number);
  const now = new Date();
  const scheduleDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds
  );

  const displayHour = scheduleDate.getHours() % 12 || 12;
  const displayMinute = String(scheduleDate.getMinutes()).padStart(2, "0");
  const period = scheduleDate.getHours() >= 12 ? "PM" : "AM";

  return { displayHour, displayMinute, period };
};

export const calculateAdjustedTime = (scheduleTime, isDeparture) => {
  const [hours, minutes, seconds] = scheduleTime.split(":").map(Number);
  const now = new Date();
  const scheduleDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds
  );

  const adjustment = isDeparture ? 1 : -1; // Departure için +1, Arrival için -1
  const adjustedTime = new Date(
    scheduleDate.getTime() + adjustment * (2 * 60 * 60 * 1000 + 25 * 60 * 1000)
  );

  return adjustedTime;
};
