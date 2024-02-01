//anchors
const anchors = document.querySelectorAll('a[href*="#"]'); //лист ссылок
const mainAncorse = document.querySelectorAll('a[href*="../index.html#"]');

for (let anchor of mainAncorse) {
  anchor.addEventListener("click", function (e) {
    const blockID = anchor.getAttribute("href").substring(13);

    window.location = "../index.html" + blockID;
  });
}

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); //отменяет действие по умолчанию (удаляет переход по ссылке)

    const blockID = anchor.getAttribute("href").substr(1); //собирает href без #

    document.getElementById(blockID).scrollIntoView({
      //скролит до blockID
      behavior: "smooth",
      block: "start",
    });
  });
}

//burger-menu

const headerList = document.querySelector(".header__list");
const headerItem = document.querySelectorAll(".header__link");
const headerBurger = document.querySelector(".header__burger");
let isOpen = false;

for (let item of headerItem) {
  item.addEventListener("click", () => {
    openMenu();
  });
}

headerBurger.addEventListener("click", () => {
  openMenu();
});

function openMenu() {
  if(isOpen) {
    headerList.classList.toggle("header__is-active-list-transform");
    setTimeout(() => {
      headerList.classList.toggle("header__is-active-list");
    }, 500)
    headerBurger.classList.toggle("header__burger-is-active");
    document.body.style.overflow = "visible";
    isOpen = false
  } else {
    headerList.classList.toggle("header__is-active-list");
    headerBurger.classList.toggle("header__burger-is-active");
    setTimeout(() =>{
      headerList.classList.toggle("header__is-active-list-transform");
    }, 1)
    document.body.style.overflow = "hidden";
    isOpen = true;
  }
}

//Carousel
const leftBtn = document.querySelector(".swiper__left-btn");
const rightBtn = document.querySelector(".swiper__right-btn");
const wallpaper = document.querySelector(".swiper__wallpaper-block");

let bullets = document.querySelectorAll(".swiper__bullet");

let swiperTransform = 0;
let startTimer = 0;
let pauseTimer = 0;
let swiperSlideIndex = 0;
let widthWindow = document.documentElement.clientWidth;

leftBtn.addEventListener("click", () => {
  swipeLeft();
});

rightBtn.addEventListener("click", () => {
  swipeRight();
});

bullets[0].classList.add("is-active-bullet"); //первая анимация у bullets

let bulletsAnimation = setInterval(swipeRight, 5000); // запускаем таймер для bullets
startTimer = Date.now();

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  let eventStart = 0;
  let eventEnd = 0;
  //Вы используете мобильное устройство (телефон или планшет).
  wallpaper.addEventListener("touchstart", (e) => {
    eventStart = e.changedTouches[0].clientX;

    pauseTimer = Date.now();
    clearInterval(bulletsAnimation); // перезапускаем таймер
  });

  wallpaper.addEventListener("touchend", (e) => {
    eventEnd = e.changedTouches[0].clientX;

    if (eventStart - eventEnd < 0) {
      swipeLeft();
    } else if (eventStart - eventEnd > 0) {
      swipeRight();
    } else {
      bulletsAnimation = setInterval(
        swipeRight,
        5000 - (pauseTimer - startTimer)
      );
    }
  });
} else {
  //Вы используете ПК.
  wallpaper.addEventListener("mouseover", () => {
    pauseTimer = Date.now();
    clearInterval(bulletsAnimation); // перезапускаем таймер
  });

  wallpaper.addEventListener("mouseout", () => {
    bulletsAnimation = setInterval(
      swipeRight,
      5000 - (pauseTimer - startTimer)
    );
  });
}

function swipeLeft() {
  clearInterval(bulletsAnimation); // перезапускаем таймер
  bulletsAnimation = setInterval(swipeRight, 5000);
  startTimer = Date.now();
  if (widthWindow <= 560) {
    let slide = Number(getComputedStyle(
      wallpaper.querySelector(".swiper__slides")
    ).width.slice(0, 3));

    swiperSlideIndex -= 1;

    swiperTransform += slide;

      console.log(swiperTransform)

    if (swiperTransform === slide) {
      swiperSlideIndex = 2;
      swiperTransform = -slide*2;
    }
  } else {
    swiperSlideIndex -= 1;

    swiperTransform += 500;

    if (swiperTransform === 500) {
      swiperSlideIndex = 2;
      swiperTransform = -1000;
    }
  }

  wallpaper.style.transform = `translateX(${swiperTransform}px)`;

  changeActiveBullets();
}

function swipeRight() {
  clearInterval(bulletsAnimation);
  bulletsAnimation = setInterval(swipeRight, 5000);
  startTimer = Date.now();

  if (widthWindow <= 560) {
    let slide = Number(getComputedStyle(
      wallpaper.querySelector(".swiper__slides")
    ).width.slice(0, 3));

    swiperSlideIndex += 1;

    swiperTransform -= slide;

    if (swiperTransform === -slide * 3) {
      swiperSlideIndex = 0;
      swiperTransform = 0;
    }
  } else {
    swiperSlideIndex += 1;

    swiperTransform -= 500;

    if (swiperTransform === -1500) {
      swiperSlideIndex = 0;
      swiperTransform = 0;
    }
  }

  wallpaper.style.transform = `translateX(${swiperTransform}px)`;

  changeActiveBullets();
}

function changeActiveBullets() {
  for (bullet of bullets) {
    if (bullet.classList.contains("is-active-bullet")) {
      bullet.classList.remove("is-active-bullet");
      break;
    }
  }

  for (bullet of bullets) {
    if (swiperSlideIndex.toString() === bullet.dataset.bulletIndex) {
      bullet.classList.add("is-active-bullet");
      break;
    }
  }
}
