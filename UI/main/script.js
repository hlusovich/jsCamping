const burgerMenu = document.querySelector(".mobile__burger-menu");
const profile = document.querySelector(".profile");
const  mobileSearch = document.querySelector(".mobile__search-toggle");
const filters = document.querySelector(".filters")
burgerMenu.addEventListener("click",()=>{
    burgerMenu.classList.toggle("mobile__burger-menu_active");
    profile.classList.toggle("profile-mobile_active");
    filters.classList.remove("filters-mobile_active");
});
mobileSearch.addEventListener("click", ()=>{
    filters.classList.toggle("filters-mobile_active");
    burgerMenu.classList.remove("mobile__burger-menu_active");
    profile.classList.remove("profile-mobile_active");
})