const menu = document.getElementById('menu');
menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    document.getElementById('navbar').classList.toggle('active');
});