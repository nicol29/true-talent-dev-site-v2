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


const navigateToContactSection = () => {
  manageMenu();
  const contactSection = document.querySelector(".contact-container");

  if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
}

contactLink.addEventListener("click", navigateToContactSection);
contactLink.addEventListener("keydown", (e) => {
  if (e.key === "Enter") navigateToContactSection();
});


window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('blur-nav');
  } else {
    header.classList.remove('blur-nav');
  }
});
