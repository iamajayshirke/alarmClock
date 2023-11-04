document.getElementById("getTime").addEventListener("click", setAlarm);
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const alarmContainer = document.querySelector("#alarms-container");
const list = document.getElementById("alarmList");
const alarmRing = new Audio("./assets/sounds/alarmClock.mp3");
document.getElementById("stopAlarm").addEventListener("click", stopAlarm);

// Update the clock every second
setInterval(tickTok, 1000);

function tickTok() {
  const clockElement = document.getElementById("clock");
  let date = new Date();
  let [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  var ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  const timeString = `${hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })}:${minutes.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })}:${seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })} ${ampm}`;
  clockElement.textContent = timeString;
  return timeString;
}

// Adding Hours, Minutes, Seconds in DropDown Menu
window.addEventListener("DOMContentLoaded", (event) => {
  dropDownMenu(1, 12, setHours);
  dropDownMenu(0, 59, setMinutes);
  dropDownMenu(0, 59, setSeconds);
});
// Dropdown Function using for loop For Selecting Hrs, Mins and Seconds
function dropDownMenu(start, end, element) {
  for (let i = start; i <= end; i++) {
    const dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}
// Alarm Setter Functionality
function setAlarm() {
  const hours = document.getElementById("hours").value;
  const minutes = document.getElementById("minutes").value;
  const seconds = document.getElementById("seconds").value;
  const ampm = document.getElementById("ampm").value;
  let time = `${hours}:${minutes}:${seconds} ${ampm}`;
  const intervalId = setInterval(() => {
    if (time === tickTok()) {
      alarmRing.play();
      alarmRing.loop = true;
    }
  }, 500);

  //console.log("Alarm Set", alarms.map(e=>e.time));
  const alarms = document.createElement("div");
  alarms.classList.add(
    "alarms",
    "mb",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  alarms.innerHTML = `
  <div class="alarm-list d-flex my-2">
  <h2 class="alarm-title me-3 time">${time}</h2>
    <button type="button" class="btn delete-alarm btn-danger float-end data-id=${intervalId}">Delete</button>
  </div>
  `;
  const deleteButton = alarms.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmContainer.prepend(alarms);
}
// Deleting the Alarm from List on Click of Delete Button
function deleteAlarm(event) {
  const self = event.target;
  const alarm = self.parentElement;
  alarm.remove();
}
function stopAlarm() {
  alarmRing.pause();
}