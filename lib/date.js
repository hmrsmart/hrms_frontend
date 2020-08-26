const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getDay = (dateString) => {
  return days[new Date(dateString).getDay()];
};

export const getDateDDMMYYYY = (dateString) => {
  var dd = dateString.getDate();
  var mm = dateString.getMonth() + 1; //January is 0

  var yyyy = dateString.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return `${dd}-${mm}-${yyyy}`;
};

export const getDateFormat = (dateString) => {
  var dd = dateString.getDate();
  var mm = dateString.getMonth() + 1; //January is 0

  var yyyy = dateString.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return `${yyyy}-${mm}-${dd}`;
};

const formatTime = (time) => {
  return time < 10 ? "0" + time : time;
};

export const getClockTime = () => {
  let midday = "AM";
  let date = new Date();
  let hour = formatTime(date.getHours());
  let min = formatTime(date.getMinutes());
  let sec = formatTime(date.getSeconds());
  midday = hour < 12 ? "AM" : "PM";
  hour = hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour}:${min}:${sec} ${midday}`;
};

// format given seconds in HHMMSS time format
export const secondsToTime = (e) => {
  let h = Math.floor(e / 3600)
      .toString()
      .padStart(2, "0"),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");

  return h + ":" + m + ":" + s;
};

// Get time difference b/w two dates in  Seconds
export const getMinutesSeconds = (dateString, seconds) => {
  let d = (new Date().getTime() - dateString.getTime()) / 1000;
  return d + seconds;
};
