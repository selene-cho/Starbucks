/** css input:focus만으로 돋보기 클릭했을 때 input 늘어나지 않는 것 자바스크립트로 해결 */
const searchEl = document.querySelector('.search');
// '.search input'으로 작성하지 않고 위에 변수 지정하여 찾은것 사용하여 최적화
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

// input focus 되었을 때 .search에 'focused' class 추가
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색'); // html 속성 지정
});

// blur = focus 해제 되었을 때 'focused' class 제거
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', ''); // html 속성 지정
});

/** 전역배지 */
const badgeEl = document.querySelector('header .badges');

window.addEventListener(
  'scroll',
  _.throttle(function () {
    console.log(window.scrollY);
    if (window.scrollY > 500) {
      // 배지 숨기기
      // gsap.to(요소, 지속시간, 옵션)
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: 'none',
      });
    } else {
      // 배지 보이기
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: 'block',
      });
    }
  }, 300) // 1000ms = 1s -> 300 = 0.3s 단위로 부하를 줘서, 함수가 한꺼번에 실행되는 것 막음
);
//_.throttle(실행할 함수, ms단위 시간) : 일정시간에 한번씩만 실행되도록 함 // scroll 이벤트를 통해 작업할 때 많이 사용
// window.scrollY : 위에서 부터 화면이 몇 px 지점에 위치하는지 알 수 있음

// 자연스럽게 애니메이션 보이게

/** VISUAL SECTION image 순차적 애니메이션 */
const fadeEls = document.querySelectorAll('.visual .fade-in');
// fadeEls 순차적으로 하나씩 반복되면서 함수 실행 (여기서는 4개)
fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7,
    // index 0부터 시작하니까 (index + 1) -> 0.7, 1.4, 2.1, 2.8초 뒤에 딜레이되며 시작
    opacity: 1,
  });
});

/** Swiper */

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
});

new Swiper('.promotion .swiper', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000, // ms단위, 5초 뒤에 자동으로 넘어가도록
    // pauseOnMouseEnter: true, // 마우스 올려놓으면 일시정지
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev', // 이전 슬라이드 보는 버튼
    nextEl: '.promotion .swiper-next', // 다음 슬라이드 보는 버튼
  },
});

new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next',
  },
});

/** NOTICE SECTION promotion 토글 */

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    // 숨김 처리! isHidePromotion = true
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리! isHidePromotion = false
    promotionEl.classList.remove('hide');
  }
});

/** YOUTUBE VIDEO SECTION floating */

// 범위 랜덤 함수 (소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자데이터를
  // `parseFloat()`를 통해 소수점을 가지는 숫자데이터로 반환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      // 옵션
      y: size, // y축 20px 만큼 내려옴
      repeat: -1, // -1을 사용하면 무한반복
      yoyo: true, // 한번 재생된 애니메이션 뒤로 다시 재생
      ease: Power1.easeInOut, // gsap easing
      delay: random(0, delay), // 몇초뒤에 애니메이션 실행할 것인지
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);

/** ScrollMagic cdn 특정 구간 보이기 시작하면 애니메이션 시작하는 외부 라이브러리 */

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  // 찾은 요소 반복
  new ScrollMagic.Scene({
    // ScrollMagic 라이브러리에 메소드체이닝 방식으로 추가
    // Scene(): 특정 요소 감시하는 옵션 지정해주는 메소드
    triggerElement: spyEl, // 보여지는지 아닌지 감시할 요소를 지정
    triggerHook: 0.8, // 감시하다가 해당 요소 0.8 지점에(뷰포트 맨위: 0, 맨밑: 1) 걸리면 다음 메소드(setClassToggle()) 실행
  })
    .setClassToggle(spyEl, 'show')
    /* HTML class 속성을 넣었다 뺐다(Toggle) 제어해주는 역할
     * spyEl: class toggle할 요소 지정
     * 'show': toggle할 class 이름 지정 (무슨 클래스 넣었다 뺐다 할건지)
     */
    .addTo(new ScrollMagic.Controller());
  /*
   * addTo(): ScrollMagic 라이브러리가 필요한 '컨트롤러'라는 개념 추가하기 위해 메소드 사용
   * new ScrollMagic.Controller(): 추가한 옵션들을 내부의 컨트롤러에 내용을 할당해서 실제로 동작할 수 있는 구조를 만들어주는 용도로 사용됨
   */
});
