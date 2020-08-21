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

export const getDate = (dateString) => {
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
