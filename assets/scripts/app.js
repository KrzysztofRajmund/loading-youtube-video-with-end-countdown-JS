//getting DOM elements
const sendBtn = document.getElementById('send-btn');
const playerBackground = document.getElementById("playerBackground")



const sendHandler = () => {
  let inputBtn = document.getElementById('input-btn').value;
  console.log(inputBtn,'inputBtn clicked')
if(inputBtn){
  onYouTubeIframeAPIReady(inputBtn)
}
}

var player;
      const onYouTubeIframeAPIReady = (inputBtn) => {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: `${inputBtn}`,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        console.log(player,"player")
      }



      function onPlayerReady(event) {
        event.target.playVideo();
      }

      var done = false;
      function onPlayerStateChange(event) {
      
        let startAnimation = (event.target.getDuration() * 1000)-10000

        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(playAnimation, startAnimation);
            
          done = true;
        }
      }

      let counter = 10
          function playAnimation (){
            let interval =  setInterval(function(){
              console.log(counter);
              playerBackground.setAttribute("class","playerBackground")
              counter--
              if (counter === -1){
                console.log("animation finished")
                clearInterval(interval);
              }
            }, 1000);
          }


     
      
      
      


  //event listeners
  sendBtn.addEventListener('click', sendHandler);