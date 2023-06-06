// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  // <div id="player"></div>
  new YT.Player('player', {
    // id 속성값 바로 찾음 (#player 쓰면 안됨)
    videoId: 'An6LvWQuj_8', // 최초 재생할 유튜브 영상 ID, 주소에서 watch?v= 이부분 복붙해야 영상 custom 가능
    playerVars: {
      // 영상 재생하기 위한 여러가지 옵션
      autoplay: true, // 자동재생 유무
      loop: true, // 반복재생 유무
      playlist: 'An6LvWQuj_8', // 반복 재생할 유튜브 영상 ID 목록
    },
    events: {
      onReady: function (event) {
        // 동영상 플레이어가 준비되면 이 함수 실행
        // 동영상이 플레이되는 상황 자체를 데이터로 인수로 넘겨줌
        event.target.mute(); // 음소거
      },
    },
  });
}
