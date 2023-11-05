const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#ampm");
const alarmContainer = document.querySelector("#alarms-container");
const alarmRing = new Audio("./assets/sounds/alarmClock.mp3");
document.getElementById("stopAlarm").addEventListener("click", stopAlarm);
document.getElementById("getTime").addEventListener("click", setAlarm);
var alarm_list = []
// Update the clock every second
setInterval(tickTok, 1000);
// TickTok Function is Returning Current Time
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
  const hours = setHours.value;
  const minutes = setMinutes.value;
  const seconds = setSeconds.value;
  const ampm = setAmPm.value;
  let time = `${hours}:${minutes}:${seconds} ${ampm}`;
  alarm_list.push(time)
  console.log(alarm_list)
  const intervalId = setInterval(() => {
    for(let i = 0;i<= alarm_list.length;i++){
      if (alarm_list[i] === tickTok()) {
        alert(`Alarm Wake Up`)
        alarm_list.pop(i)
        // alarmRing.play();
        // alarmRing.loop = true;
      }
    }
  },1000);

  const alarms = document.createElement("div");
  alarmContainer.prepend(alarms);
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
  
}
// Deleting the Alarm from List on Click of Delete Button
function deleteAlarm(event) {
  let selectedAlarm = event.target.parentElement.children[0].innerHTML
  const self = event.target;
  const alarm = self.parentElement;
  alarm.remove();
  alarm_list.pop(selectedAlarm)
}
function stopAlarm() {
  alarmRing.pause();
}