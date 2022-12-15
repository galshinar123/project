const activePage = window.location.pathname;

const navLinks = document.querySelectorAll('.topnav a').forEach(link => {    
   if(link.href.includes(`${activePage}`)){
     link.classList.add('active');
   }
 });

function validateEmail(email) {
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

