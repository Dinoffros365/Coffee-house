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

//Menu
let coffeeCategories = document.querySelectorAll(".section-menu__btn-category");
const coffeeList = document.querySelectorAll(".section-menu__list-coffee");
const btnAddItems = document.querySelector(".section-menu__btn");

for (let coffeeBtn of coffeeCategories) {
  coffeeBtn.addEventListener("click", (e) => {
    for (let coffeeBtnTwo of coffeeCategories) {
      if (coffeeBtnTwo.classList.contains("is-active-category")) {
        coffeeBtnTwo.classList.remove("is-active-category");
        let indexOfClass = coffeeBtnTwo.className.indexOf(
          "section-menu__btn-category_"
        );
        let delItem = coffeeBtnTwo.className.substr(indexOfClass + 27);
        let creatItem = coffeeBtn.className.substr(indexOfClass + 27);
        replaceItem(delItem, creatItem);
      }
    }
    coffeeBtn.classList.add("is-active-category");
  });
}

btnAddItems.addEventListener("click", () => {
  for (let coffeeItem of coffeeList) {
    if (window.getComputedStyle(coffeeItem).display === "flex")
      coffeeItem.classList.add("is-active-item-coffee");
  }
  btnAddItems.style.display = "none";
});

function replaceItem(categoryDisplay, categoryActive) {
  for (let coffeeItem of coffeeList) {
    if (
      coffeeItem.className.includes(
        "section-menu__list-coffee_" + categoryDisplay
      )
    ) {
      coffeeItem.style.display = "none";
      coffeeItem.classList.remove("is-active-item-coffee");
    }
    if (
      coffeeItem.className.includes(
        "section-menu__list-coffee_" + categoryActive
      )
    ) {
      coffeeItem.style.display = "flex";
      if (coffeeItem.children.length <= 4) {
        btnAddItems.style.display = "none";
      } else {
        btnAddItems.style.display = "block";
      }
    }
  }
}

//Card
const menuItems = document.querySelectorAll(".section-menu__item-coffee");
const cards = document.querySelectorAll(".section-menu__card");

for (let item of menuItems) {
  item.addEventListener("click", () => {
    document.body.style.overflow = "hidden";
    for (let card of cards) {
      if (item.dataset.itemMenu === card.dataset.cardIndex) {
        card.style.display = "flex";

        const closeBtn = card.querySelector(".card__btn");
        const itemsOfSize = card.querySelectorAll(".card__item-size");
        const price = card.querySelector(".card__price-dollar");
        const addItems = card.querySelectorAll(".card__item-add");
        const startPrice = Number(price.innerHTML.slice(1));

        for (let addItem of addItems) {
          if(addItem.getAttribute('data-set-listener') === null){
            addItem.addEventListener("click", () => {
              if (addItem.classList.contains("is-active-card")) {
                price.innerHTML =
                "$" + (Number(price.innerHTML.slice(1)) - 0.5).toFixed(2);
              } else {
                price.innerHTML =
                "$" + (Number(price.innerHTML.slice(1)) + 0.5).toFixed(2);
              }
              addItem.classList.toggle("is-active-card");
            });
          }
          addItem.setAttribute('data-set-listener', 'true')
        }

        closeBtn.addEventListener("click", () => {
          if (!itemsOfSize[0].classList.contains("is-active-card")) {
            for (let i = 0; i < itemsOfSize.length; i++) {
              if (i === 0) {
                itemsOfSize[i].classList.add("is-active-card");
                i++;
              }
              itemsOfSize[i].classList.remove("is-active-card");
            }
          }

          for (let deleteAddItem of addItems) {
            deleteAddItem.classList.remove("is-active-card");
          }

          price.innerHTML = "$" + startPrice.toFixed(2);
          document.body.style.overflow = "visible";
          closeBtn.parentElement.parentElement.style.display = "none";
        });

        card.addEventListener("click", (e) => {
          if (document.elementFromPoint(e.x, e.y) === card) {
            if (!itemsOfSize[0].classList.contains("is-active-card")) {
              for (let i = 0; i < itemsOfSize.length; i++) {
                if (i === 0) {
                  itemsOfSize[i].classList.add("is-active-card");
                  i++;
                }
                itemsOfSize[i].classList.remove("is-active-card");
              }
            }

            for (let deleteAddItem of addItems) {
              deleteAddItem.classList.remove("is-active-card");
            }

            price.innerHTML = "$" + startPrice.toFixed(2);
            document.body.style.overflow = "visible";
            card.style.display = "none";
          }
        });

        for (let itemSize of itemsOfSize) {
          itemSize.addEventListener("click", () => {
            for (let itemSearch of itemsOfSize)
              if (itemSearch.classList.contains("is-active-card"))
                itemSearch.classList.remove("is-active-card");

            itemSize.classList.add("is-active-card");

            if (
              itemSize.classList.contains("card__item-size_200ml") ||
              itemSize.classList.contains("card__item-size_50g")
            ) {
              price.innerHTML = "$" + startPrice.toFixed(2);
            } else if (
              itemSize.classList.contains("card__item-size_300ml") ||
              itemSize.classList.contains("card__item-size_100g")
            ) {
              price.innerHTML = "$" + (startPrice + 0.5).toFixed(2);
            } else if (
              itemSize.classList.contains("card__item-size_400ml") ||
              itemSize.classList.contains("card__item-size_200g")
            ) {
              price.innerHTML = "$" + (startPrice + 1).toFixed(2);
            }
          });
        }
        break;
      }
    }
  });
}
