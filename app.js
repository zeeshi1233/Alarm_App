var time = document.getElementById("time-display");
var hr = document.getElementById("hr");
var mn = document.getElementById("mn");
var alt = document.getElementById("alarm-time");
var hours;
var min;
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
time.innerHTML =  h + " : " + m + " : " + s;
  setInterval(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
startTime()


var show = "";
var alarms = [];
function addAlarm() {
  var hrValue = document.getElementById("hr").value;
  var minValue = document.getElementById("mn").value;

  if (!hrValue || !minValue) {
    return;
  }

  var alarmId = "alarm-" + alarms.length;
  var audioId = "audio-" + alarms.length;

  var newAlarm = `
    <div class="start-alarm" id="${alarmId}">
      <div class="div1 d-flex mt-3 align-items-center">
        <div><span class="st-hr">${hrValue}</span>:<span class="st-min">${minValue}</span></div>
      </div>
      <div class="div2">
        <input type="checkbox" name="tm" onclick="toggleAlarm(${alarms.length})" id="${alarmId}-checkbox">
        <button onclick="del(${alarms.length})" class="fa-solid fa-trash ms-2 text-primary" style="border: none; background-color: white;"></button>
      </div>
    </div>
  `;

  var newAudio = `<audio id="${audioId}" src="kullu-nafsin-zaikatul-maut.mp3" loop></audio>`;

  alarms.push({
    id: alarmId,
    audioId: audioId,
    hour: hrValue,
    minute: minValue,
  });

  show = ""; // Clear the existing alarm elements
  show += newAlarm + newAudio;

  document.getElementById("main2").innerHTML = show;
}

function toggleAlarm(index) {
  var alarm = alarms[index];
  var checkbox = document.getElementById(`${alarm.id}-checkbox`);
  var audio = document.getElementById(alarm.audioId);
  var hour = parseInt(alarm.hour);
  var minute = parseInt(alarm.minute);

  if (hours >= hour && min >= minute && checkbox.checked) {
    audio.play();
    console.log("Ring!");
  } else {
    audio.pause();
  }
}

setInterval(() => {
  for (var i = 0; i < alarms.length; i++) {
    toggleAlarm(i);
    console.log("i" + i);
  }
}, 1000);

function del(index) {
  var alarm = alarms[index];
  var alarmElement = document.getElementById(alarm.id);
  var audioElement = document.getElementById(alarm.audioId);

  if (alarmElement) {
    alarmElement.parentNode.removeChild(alarmElement);
  }

  if (audioElement) {
    audioElement.parentNode.removeChild(audioElement);
  }

  alarms.splice(index, 1);
}
