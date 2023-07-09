const iconContainer = document.querySelector(".icon-container")
const menuIcon = document.querySelector(".menu-manager");
const navMenu = document.querySelector(".header-nav");
const header = document.querySelector("header");
const contactLink = document.querySelector(".contact-link");

const manageMenu = () => {
  const currentStatus = (menuIcon.dataset.active === "true");

  menuIcon.dataset.active = !currentStatus;
  navMenu.dataset.active = !currentStatus;
}

iconContainer.addEventListener("click", manageMenu);
iconContainer.addEventListener("keydown", (e) => {
  if (e.key === "Enter") manageMenu();
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('blur-nav');
  } else {
    header.classList.remove('blur-nav');
  }
});


const expandButtons = document.querySelectorAll(".chevron-button");

const manageArticle = (e) => {
  const chevronImg = e.currentTarget.querySelector(".chevron-img");
  const expandableContent = e.currentTarget.parentNode.children[1];
  const currentStatus = (expandableContent.dataset.expanded === "true");

  if (currentStatus) {
    expandableContent.dataset.expanded = false;
    chevronImg.style.transform = "rotate(0deg)";
  } else {
    expandableContent.dataset.expanded = true;
    chevronImg.style.transform = "rotate(180deg)";
  }

}

expandButtons.forEach(button => button.addEventListener("click", (e) => manageArticle(e)));



const modalBg = document.querySelector(".modal-bg");
const hireButtons = document.querySelectorAll("article > button");
const serviceInput = document.querySelector(".non-editable-row > input");

const openModal = (e) => {
  const chosenService = e.currentTarget.parentNode.querySelector("h3").innerText;
  const currentStatus = (modalBg.dataset.active === "true");

  if (!currentStatus) {
    serviceInput.value = chosenService;
    modalBg.dataset.active = true;
    document.body.classList.add("disable-scroll");
  }
}

const closeModal = (e) => {
  const currentStatus = (modalBg.dataset.active === "true");

  if (currentStatus) {
    serviceInput.value = "";
    modalBg.dataset.active = false;
    document.body.classList.remove("disable-scroll");
  }
}

hireButtons.forEach(button => button.addEventListener("click", (e) => openModal(e)));


const closeButton = document.querySelector(".modal-leftside > img");

closeButton.addEventListener("click", () => {
  closeModal();
});

modalBg.addEventListener("click", (e) => {
  if (e.target === modalBg) closeModal();
});


const searchBar = document.querySelector(".search-container > input");
const searchIcon = document.querySelector(".search-container > img");
const gridContainer = document.querySelector(".grid-container");
const services = [...document.querySelector(".grid-container").children];
const tagContainer = document.querySelector(".tag-container");


searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    filterServices(e.target.value);

    e.target.value = "";
  }
});

searchIcon.addEventListener("click", () => filterServices(searchBar.value));

const filterServices = (searchTerm) => {
  const filteredServices = services.filter(service => {
    const jobHeading = service.querySelector("h3").innerText;
    const words = jobHeading.split(" ");
    let found = false;

    const shortenedWord = jobHeading.slice(0, searchTerm.length);
    if (searchTerm.toLowerCase() === shortenedWord.toLowerCase()) found = true;

    if (!found) {
      words.forEach(word => {
        const shortenedWord = word.slice(0, searchTerm.length);
  
        if (searchTerm.toLowerCase() === shortenedWord.toLowerCase()) found = true;
      })
    }

    if (found) return service;
  });

  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  filteredServices.forEach(service => {
    service.querySelector(".article-details").dataset.expanded = "false";
    gridContainer.appendChild(service);
  });

  if (searchTerm !== "") {
    tagContainer.querySelector("span").innerText = searchTerm;
    tagContainer.dataset.active = "true";
  } else {
    tagContainer.dataset.active = "false";
  }
}

tagContainer.querySelector("img").addEventListener("click", () => {
  tagContainer.dataset.active = "false";

  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  services.forEach(service => {
    service.querySelector(".article-details").dataset.expanded = "false";
    gridContainer.appendChild(service);
  });
});

