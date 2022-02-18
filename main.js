let mainColors = localStorage.getItem("colors_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

let backgroundOption = true;
let backgroundInterval;
let backgroundlocalItem = localStorage.getItem("background_option");

if (backgroundlocalItem !== null) {
  if (backgroundlocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundlocalItem === "true") {
    document.querySelector(".random-background .yas").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}
// start settings
document.querySelector(".fa-gear").onclick = function () {
  document.querySelector(".settings-box").classList.toggle("open");
};
//end settings
//start change color
let colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("colors_option", e.target.dataset.color);

    handleActive(e);
  });
});
//start landing
//start change random background
let randomBackEl = document.querySelectorAll(".random-background span");

randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yas") {
      backgroundOption = true;
      randomImg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
let landing = document.querySelector(".landing");

let landingImg = [
  "download (6).jpg",
  "images (1).jpg",
  "images (2).jpg",
  "images (3).jpg",
  "images.jpg",
];

function randomImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * landingImg.length);
      landing.style.backgroundImage =
        'url("./images/' + landingImg[randomNumber] + '")';
    }, 2000);
  }
}

randomImg();
//end landing
//end change color
// start skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;

  let skillsOuterHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowscrollTOP = this.pageYOffset;

  if (windowscrollTOP > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.widths;
    });
  }
};
// end skills
// create popup with img

let ourGalary = document.querySelectorAll(".galary img");

ourGalary.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overly = document.createElement("div");

    overly.className = "popup-overly";

    document.body.appendChild(overly);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");

      let imgText = document.createTextNode(img.alt);

      imgHeading.appendChild(imgText);

      popupBox.appendChild(imgHeading);
    }
    let popupImg = document.createElement("img");

    popupImg.src = img.src;

    popupBox.appendChild(popupImg);

    document.body.appendChild(popupBox);

    let closeBotton = document.createElement("span");

    let closeBottonText = document.createTextNode("x");

    closeBotton.appendChild(closeBottonText);

    closeBotton.className = "close-botton";

    popupBox.appendChild(closeBotton);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-botton") {
    e.target.parentNode.remove();

    document.querySelector(".popup-overly").remove();
  }
});

//select all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

function scrolltoClickedplace(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrolltoClickedplace(allLinks);
scrolltoClickedplace(allBullets);

//add active class on self

function handleActive(act) {
  act.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  act.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletslocalItem = localStorage.getItem("bullets_opption");

if (bulletslocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletslocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-opption .yas").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-opption .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-opption", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-opption", "none");
    }
    handleActive(e);
  });
});

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("colors_option");
  localStorage.removeItem("background_option");
  window.location.reload();
};

//togell menu

let toggleButton = document.querySelector(".toggle-menu");

let tyLinks = document.querySelector(".links");

toggleButton.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");

  tyLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== tyLinks) {
    if (tyLinks.classList.contains("open")) {
      toggleButton.classList.toggle("menu-active");

      tyLinks.classList.toggle("open");
    }
  }
});

tyLinks.onclick = function (e) {
  e.stopPropagation();
};
