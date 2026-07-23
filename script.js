// ── 스크롤 시 요소 등장 ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 5, 4) * 70}ms`;
  observer.observe(el);
});

// 안전장치: 어떤 이유로든 관찰자가 동작하지 않으면 전부 보이게 한다
setTimeout(() => {
  if (!document.querySelector('.reveal.in')) {
    revealEls.forEach((el) => el.classList.add('in'));
  }
}, 1500);

// ── 스크롤 시 네비게이션 테두리 ──
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── 푸터 연도 자동 갱신 ──
document.getElementById('year').textContent = new Date().getFullYear();
