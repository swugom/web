// DOM 요소 가져오기
const navItems = document.querySelectorAll('.nav-item');
const overlay = document.getElementById('overlay');
let activeDropdown = null; // 현재 표시된 서브 카테고리
let isClicked = false; // 클릭 상태 여부를 저장
let activeNavLink = null; // 현재 활성화된 메인 카테고리 링크

// 네비게이션 메뉴에 마우스를 올리면 서브 카테고리 표시
navItems.forEach(item => {
  const link = item.querySelector('.nav-link');
  const dropdown = item.querySelector('.dropdown');

  // 마우스 호버 시 이벤트
  link.addEventListener('mouseenter', () => {
    if (!isClicked) { // 클릭 상태가 아니면 동작
      hideActiveDropdown(); // 기존 서브 메뉴 숨김
      showDropdown(dropdown, link); // 새 서브 메뉴 표시 및 색상 변경
    }
  });

  // 마우스가 메뉴 항목 또는 서브 카테고리를 벗어나면 숨김
  item.addEventListener('mouseleave', () => {
    if (!isClicked) { // 클릭 상태가 아닐 때만 숨김
      hideActiveDropdown();
    }
  });

  // 클릭 이벤트: 서브 카테고리 고정
  link.addEventListener('click', (e) => {
    e.preventDefault(); // 링크 기본 동작 방지
    if (activeDropdown === dropdown && isClicked) {
      // 이미 클릭된 상태라면 다시 클릭 시 해제
      hideActiveDropdown();
      isClicked = false;
    } else {
      hideActiveDropdown();
      showDropdown(dropdown, link);
      isClicked = true; // 클릭 상태 활성화
    }
  });
});

// 빈 공간(overlay)을 클릭하면 서브 카테고리 숨김
overlay.addEventListener('click', () => {
  hideActiveDropdown();
  isClicked = false; // 클릭 상태 해제
});

// 서브 카테고리 표시 함수
function showDropdown(dropdown, link) {
  dropdown.style.display = 'block'; // 서브 카테고리 표시
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
  activeDropdown = dropdown;

  // 메인 카테고리 텍스트 색상 변경
  resetNavLinkColor(); // 이전 활성화된 링크 초기화
  link.style.color = '#ED700D'; // 현재 링크 색상 변경
  activeNavLink = link;
}

// 서브 카테고리 숨김 함수
function hideActiveDropdown() {
  if (activeDropdown) {
    activeDropdown.style.display = 'none';
    activeDropdown = null;
  }
  overlay.style.opacity = '0';
  overlay.style.visibility = 'hidden';
  resetNavLinkColor(); // 색상 초기화
  activeNavLink = null;
}

// 메인 카테고리 텍스트 색상 초기화 함수
function resetNavLinkColor() {
  if (activeNavLink) {
    activeNavLink.style.color = ''; // 기본 색상으로 초기화
  }
}