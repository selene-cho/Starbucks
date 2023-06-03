// css input:focus만으로 돋보기 클릭했을 때 input 늘어나지 않는 것 자바스크립트로 해결

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
