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


