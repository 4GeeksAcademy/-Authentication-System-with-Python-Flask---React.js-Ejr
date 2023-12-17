const menu = document.querySelector('#mobile-menu')
const menuLinks = documents.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
})