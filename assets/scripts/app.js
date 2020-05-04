//getting DOM elements
const sendBtn = document.getElementById("send-btn");
const inputBtn = document.getElementById("input-btn");
const playerBackground = document.getElementById("playerBackground");

const keyPressHandler = (event) => {
  let x = event.keyCode;
  if (x == 13) {
    sendHandler();
  }
};

const sendHandler = () => {
  let inputValue = document.getElementById("input-btn").value;
  if (inputValue) {
    onYouTubeIframeAPIReady(inputValue);

    const inputClear = inputBtn
    const btnClear = document.getElementById("send-btn");
    [inputClear,btnClear].forEach((element) =>
    addEventListener("focusout",()=>{
      inputClear.value = "";
    }))
  }
}


var player;

const onYouTubeIframeAPIReady = (inputValue) => {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: `${inputValue}`,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

const onPlayerReady = (event) => {
  event.target.playVideo();
}

var done = false;

const onPlayerStateChange = (event) => {
  let startAnimation = event.target.getDuration() * 1000 - 10000;

  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(playAnimation, startAnimation);

    done = true;
  }
}


let counter = 10;

const playAnimation = () => {
  const countElement = document.createElement("div");
  countElement.setAttribute("class", "countElement");

  let interval = setInterval(function () {
    counter--;
    let playerElement = document.getElementsByTagName("iframe")[0];
    playerElement.setAttribute("class", "overlay");
    countElement.innerText = counter;

    if (counter === 0) {
      countElement.style.display = "none"
      playerElement.style.filter = "none";
      clearInterval(interval);
    }
  }, 1000);

  playerBackground.appendChild(countElement);
}

//event listeners
sendBtn.addEventListener("click", sendHandler);
inputBtn.addEventListener("keyup", () => keyPressHandler(event));
