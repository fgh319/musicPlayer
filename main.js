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
  {
    id: "11",
    title: "知足",
    singer: "五月天",
    url: "music/知足-五月天.mp3",
    cover: "cover/知足.jpg",
  },
];

const title = document.querySelector(".title");
const singer = document.querySelector(".singer");
const cover = document.querySelector(".cover");
const musicCover = document.querySelector(".musicCover");
const currentTime = document.querySelector(".currentTime");
const restTime = document.querySelector(".restTime");
const bar = document.querySelector(".bar");
const barContainer = document.querySelector(".bar-container");
const circle = document.querySelector(".circle");
const panel = document.querySelector(".panel");
const listPanel = document.querySelector(".list");

const playBtn = document.querySelector(".icon-play");
const pauseBtn = document.querySelector(".icon-pause");
const preBtn = document.querySelector(".icon-pre");
const nextBtn = document.querySelector(".icon-next");
const modeBtn = document.querySelector(".modes");
const listBtn = document.querySelector(".icon-list");
const pulldownBtn = document.querySelector('.pulldown');

let clock = null;
let clock2 = null; //用于优化播放拖动卡顿
let index = 0;
let modes = ["normal", "once", "shuffle"];
let modeIndex = 0;
// normal once shuffle
renderList();
const audioObj = new Audio();
setAudio(index);

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
  if (modes[modeIndex] === "shuffle") {
    playShuffle();
  } else {
    playPre();
  }
};

nextBtn.onclick = function () {
  if (modes[modeIndex] === "shuffle") {
    playShuffle();
  } else {
    playNext();
  }
};

// 进度条点击
barContainer.onclick = function (event) {
  let percentage = (event.clientX - barContainer.offsetLeft) / this.offsetWidth;
  bar.style.width = percentage * 100 + "%";
  audioObj.currentTime = percentage * audioObj.duration;
};

// 进度条拖动

circle.onmousedown = function () {
  function onMouseMove(event) {
    let percentage =
      (event.clientX - barContainer.offsetLeft) / barContainer.offsetWidth;
    bar.style.width = (percentage >= 1 ? 1 : percentage) * 100 + "%";
    if (clock2) {
      clearTimeout(clock2);
    }
    clock2 = setTimeout(() => {
      audioObj.currentTime = percentage * audioObj.duration;
    }, 100);
  }
  panel.addEventListener("mousemove", onMouseMove);
  panel.onmouseup = function () {
    panel.removeEventListener("mousemove", onMouseMove);
    panel.onmouseup = null;
  };
};

circle.ontouchstart = function () {
  function onTouchMove(event) {
    // console.log(event);
    let percentage =
      (event.touches[0].clientX - barContainer.offsetLeft) /
      barContainer.offsetWidth;
    bar.style.width = (percentage >= 1 ? 1 : percentage) * 100 + "%";
    if (clock2) {
      clearTimeout(clock2);
    }
    clock2 = setTimeout(() => {
      audioObj.currentTime = percentage * audioObj.duration;
    }, 100);
  }
  panel.addEventListener("touchmove", onTouchMove);
  panel.ontouchend = function () {
    panel.removeEventListener("touchmove", onTouchMove);
    panel.ontouchend = null;
  };
};

audioObj.onended = function () {
  if (modes[modeIndex] === "normal") {
    playNext();
  } else if (modes[modeIndex] === "once") {
    playOnce();
  } else if (modes[modeIndex] === "shuffle") {
    playShuffle();
  }
};

modeBtn.onclick = function () {
  modeIndex += 1;
  if (modeIndex >= modes.length) {
    modeIndex = 0;
  }

  Array.from(modeBtn.children).forEach((mode) => {
    mode.classList.remove("show");
  });
  modeBtn.children[modeIndex].classList.add("show");
};

listBtn.onclick = function () {
  listPanel.classList.add("out");
};

listPanel.onclick = function (event) {

  if (event.target.closest("li")) {
    let listPanelIndex = Array.from(event.target.closest("ul").children).indexOf(
      event.target.closest("li")
    );
    setAudio(listPanelIndex);
    play();
    index = listPanelIndex;
    this.classList.remove("out");
  } else if(event.target.closest('div').classList.contains('pulldown')) {
    this.classList.remove("out");
  }
  
};

/**
 * <li>
      <span class="title">歌曲名</span>
      <span class="singer">歌手</span>
    </li>
 */
function renderList() {
  const ul = document.createElement("ul");

  const songs = list.map((song) => {
    const li = document.createElement("li");
    const title = document.createElement("span");
    title.classList.add("title");
    title.append(song.title);
    const singer = document.createElement("span");
    singer.classList.add("singer");
    singer.append(song.singer);
    li.append(title, singer);
    return li;
  });
  ul.append(...songs);
  listPanel.append(ul);
}

function playNext() {
  index += 1;
  if (index >= list.length) {
    index = 0;
  }
  setAudio(index);
  play();
}

function playPre() {
  index -= 1;
  if (index < 0) {
    index = list.length - 1;
  }
  setAudio(index);
  play();
}

function playShuffle() {
  let indexShuffle = Math.floor(Math.random() * list.length);
  setAudio(indexShuffle);
  play();
}

function playOnce() {
  setAudio(index);
  play();
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

  Array.from(listPanel.children[1].children).forEach(function (li) {
    li.children[0].classList.remove("playing");
  });
  console.log();
  listPanel.children[1].children[index].children[0].classList.add("playing");
  // listUl.children[index].children[0].classList.add('playing');
}

function play() {
  audioObj.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
  clock = setInterval(changeProgress, 1000);
}

function pause() {
  audioObj.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
  clearInterval(clock);
}
