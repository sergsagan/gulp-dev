let isScrolling = false;

window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
    if (isScrolling === false) {
        window.requestAnimationFrame(function() {
            scrolling(e);
            isScrolling = false;
        });
    }
    isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

let listItems = document.querySelectorAll("#services-steps .step");

function scrolling(e) {

    for (let i = 0; i < listItems.length; i++) {
        let listItem = listItems[i];

        if (isPartiallyVisible(listItem)) {
            listItem.classList.add("viewport");
        } else {
            listItem.classList.remove("viewport");
        }
    }
}

function isPartiallyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;
    let height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

$(function() {

    $('.slider').slick({
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    $("#form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $('#form')[0].reset(
                setTimeout(function () {}, 1000)
            );
        });
        return false;
    });
});

let smm = document.getElementById('smm');
let design = document.getElementById('design');
let branding = document.getElementById('branding');
let production = document.getElementById('production');
let team = document.getElementById('team');
let contact = document.getElementById('contact');

smm.onmouseover = function(){
    smm.innerHTML = '[смм]';
};
smm.onmouseout = function(){
    smm.innerHTML = 'smm';
};

design.onmouseover = function(){
    design.innerHTML = '[дизайн]';
};
design.onmouseout = function(){
    design.innerHTML = 'design';
};

branding.onmouseover = function(){
    branding.innerHTML = '[брандинг]';
};
branding.onmouseout = function(){
    branding.innerHTML = 'branding';
};

production.onmouseover = function(){
    production.innerHTML = '[продакшн]';
};
production.onmouseout = function(){
    production.innerHTML = 'production';
};

team.onmouseover = function(){
    team.innerHTML = '[команда]';
};
team.onmouseout = function(){
    team.innerHTML = 'team';
};

contact.onmouseover = function(){
    contact.innerHTML = '[контакты]';
};
contact.onmouseout = function(){
    contact.innerHTML = 'contact';
};

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    })
};