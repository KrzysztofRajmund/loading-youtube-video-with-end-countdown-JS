//getting DOM elements
const sendBtn = document.getElementById("send-btn");
const inputBtn = document.getElementById("input-btn");
const playerBackground = document.getElementById("playerBackground");

const keyPressHandler = (event) => {
  console.log(event)
  let x = event.keyCode;
  if (x === 13) {
    sendHandler();
  }
};
const sendHandler = () => {
  let inputValue = document.getElementById("input-btn").value;
  console.log("input", inputValue)
  let myReg = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/gim
  let inputArray = myReg.exec(inputValue);
  let movieId = inputArray[3];
  if (interval){
    clearInterval(interval);
  }
  if (movieId) {
    onYouTubeIframeAPIReady(movieId);
    document.querySelector("#player").textContent = "";
    const inputClear = inputBtn
    const btnClear = document.getElementById("send-btn");
    [inputClear,btnClear].forEach((element) =>
    element.addEventListener("click",()=>{
      inputClear.value = "";
    }))
  }
}
var player;
const onYouTubeIframeAPIReady = (movieId) => {
  if (player){
    player.loadVideoById(movieId);
    
  }
  else{
    player = new YT.Player("player", {
      height: "360",
      width: "640",
      videoId: `${movieId}`,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
};

const fFunction = () =>{
  console.log("function here")
}
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
let interval = null;
const playAnimation = () => {
  const countElement = document.createElement("div");
  countElement.setAttribute("class", "countElement");
  interval = setInterval(function () {
    counter--;
    let playerElement = document.getElementsByTagName("iframe")[0];
    playerElement.setAttribute("class", "overlay");
    countElement.innerText = counter;
    if (counter === 0) {
      // countElement.style.display = "none"
      // playerElement.style.filter = "none";
      countElement.remove();
      playerElement.classList.remove("overlay");
      clearInterval(interval);
     
    }
  }, 1000);
  playerBackground.appendChild(countElement);
}
//event listeners
sendBtn.addEventListener("click", sendHandler);
inputBtn.addEventListener("keyup", () => keyPressHandler(event));