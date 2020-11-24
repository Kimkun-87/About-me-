'use strict';

// navbar 높이 만큼 내려가면 navbar 배경색이 나타남
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
        navbarMenu.classList.remove('open');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});


// 홈 화면이 navbar 위로 올라갈시 자연스럽게 사라지도록 opacity 값 준다.
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;

});


// navbar 의 toggle btn 클릭시 작은 메뉴 스크린 나타나기 
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');

});




// 핸들 스크롤링 메뉴 클릭시 그 위치로 
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);

});

// 콘택트 이동 버튼
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {

    scrollIntoView('#contact');

});

// 스크롤링 될때 화살표 보이게 하기 
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2){
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
});

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});



// 스크롤 뷰 이벤트 & 스무스 하게 이동하는 함수
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
        // {behavior:"smooth"} 스크롤뷰 움직임을 부드럽게 해줌.

}



// 프로젝트 버튼 누르면 해당하는 항목만 뜨게 한다
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }


    // 셀렉터 되는 버튼 색 이동 
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);

    
});


