const list = [
  {
    id: "0",
    title: "星晴",
    singer: "周杰伦",
    url: "music/星晴-周杰伦.mp3",
    cover: "cover/星晴.jpg",
  },
  {
    id: "1",
    title: "虎口脱险",
    singer: "老狼",
    url: "music/虎口脱险-老狼.mp3",
    cover: "cover/虎口脱险.jpg",
  },
  {
    id: "2",
    title: "干杯",
    singer: "五月天",
    url: "music/干杯-五月天.mp3",
    cover: "cover/干杯.jpg",
  },
  {
    id: "3",
    title: "流沙",
    singer: "陶喆",
    url: "music/流沙-陶喆.mp3",
    cover: "cover/流沙.jpg",
  },
  {
    id: "4",
    title: "Every Breath You Take",
    singer: "The Police",
    url: "music/Every Breath You Take-The Police.mp3",
    cover: "cover/Every_Breath_You_Take.jpg",
  },
  {
    id: "5",
    title: "Hotel California",
    singer: "Eagles",
    url: "music/Hotel California-Eagles.mp3",
    cover: "cover/Hotel_California.jpg",
  },
  {
    id: "6",
    title: "Tequila Sunrise",
    singer: "Eagles",
    url: "music/Tequila Sunrise-Eagles.mp3",
    cover: "cover/Tequila_Sunrise.jpg",
  },
  {
    id: "7",
    title: "New Boy",
    singer: "朴树",
    url: "music/New Boy-朴树.mp3",
    cover: "cover/New_Boy.jpg",
  },
  {
    id: "8",
    title: "我爱的人",
    singer: "陈小春",
    url: "music/我爱的人-陈小春.mp3",
    cover: "cover/我爱的人.jpg",
  },
  {
    id: "9",
    title: "明天的明天的明天",
    singer: "动力火车",
    url: "music/明天的明天的明天-动力火车.mp3",
    cover: "cover/明天的明天的明天.jpg",
  },
  {
    id: "10",
    title: "珊瑚海",
    singer: "周杰伦",
    url: "music/珊瑚海-周杰伦.mp3",
    cover: "cover/珊瑚海.jpg",
  },
];

const title = document.querySelector(".title");
const singer = document.querySelector(".singer");
const cover = document.querySelector(".cover");
const musicCover = document.querySelector('.musicCover');
const currentTime = document.querySelector(".currentTime");
const restTime = document.querySelector(".restTime");
const bar = document.querySelector(".bar");
const barContainer = document.querySelector('.bar-container');
const circle = document.querySelector('.circle');
const panel = document.querySelector('.panel');

const playBtn = document.querySelector(".icon-play");
const pauseBtn = document.querySelector(".icon-pause");
const preBtn = document.querySelector(".icon-pre");
const nextBtn = document.querySelector(".icon-next");

let clock = null;
let index = 0;

const audioObj = new Audio();
setAudio(0);

audioObj.addEventListener("canplay", function () {
  currentTime.textContent = parseTime(audioObj.currentTime);
  restTime.textContent = parseTime(audioObj.duration);
});

playBtn.onclick = function () {
  play();
};

pauseBtn.onclick = function () {
  pause();
};

preBtn.onclick = function () {
  index -= 1;
  if (index < 0) {
    index = list.length - 1;
  }
  setAudio(index);
  play();
};

nextBtn.onclick = function () {
  index += 1;
  if (index >= list.length) {
    index = 0;
  }
  setAudio(index);
  play();
};

barContainer.onclick = function(event) {
  let percentage = event.offsetX / this.offsetWidth;
  bar.style.width = percentage * 100 + '%';
  audioObj.currentTime = percentage * audioObj.duration;
}

let isDrag = false;

circle.onmousedown = function() {
  isDrag = true;
}

circle.onmouseup = function() {
  isDrag = false;
}



function parseTime(time) {
  seconds = Math.floor(time);
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  sec = sec >= 10 ? "" + sec : "0" + sec;
  return `${min}:${sec}`;
}

function changeProgress() {
  currentTime.textContent = parseTime(audioObj.currentTime);
  restTime.textContent = parseTime(audioObj.duration);
  bar.style.width = (audioObj.currentTime / audioObj.duration) * 100 + "%";
}

function setAudio(index = 0) {
  let currentAudio = list[index];
  audioObj.src = currentAudio.url;
  title.textContent = currentAudio.title;
  singer.textContent = currentAudio.singer;
  cover.style.backgroundImage = `url(${currentAudio.cover})`;
  musicCover.style.backgroundImage = `url(${currentAudio.cover})`;
}

function play() {
  audioObj.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
  clock = setInterval(changeProgress, 60);
}

function pause() {
  audioObj.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  clearInterval(clock);
}

