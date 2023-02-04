fetch('/navigation.html')
    .then(response => response.text())
    .then(html => {
    let navContainer = document.getElementById("nav");
    navContainer.innerHTML = html;
    const currentPage = window.location.pathname;
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        }
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        if (!e.target.matches('a') && !e.target.matches('.sub-nav-item')) {
        this.classList.toggle('close');
        localStorage.setItem(`nav-item-${item.id}`, this.classList.contains('close') ? 'close' : '');
        }
    });

    const navItemState = localStorage.getItem(`nav-item-${item.id}`);
    if (navItemState === 'close') {
        item.classList.add('close');
    }
    });

    const subNavItems = document.querySelectorAll('.sub-nav-item');
    subNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
        if (!e.target.matches('a')) {
        this.classList.toggle('close');
        localStorage.setItem(`sub-nav-item-${item.id}`, this.classList.contains('close') ? 'close' : '');
        }
    });

    const subNavItemState = localStorage.getItem(`sub-nav-item-${item.id}`);
    if (subNavItemState === 'close') {
        item.classList.add('close');
    }
    });
})
    
.catch(error => {
    console.error(error);
});