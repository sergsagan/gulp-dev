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

let firstLink = document.getElementById('firstLink');
let secondLink = document.getElementById('secondLink');
let thirdLink = document.getElementById('thirdLink');
let fourthLink = document.getElementById('fourthLink');
let fifthLink = document.getElementById('fifthLink');

firstLink.onmouseover = function(){
    firstLink.innerHTML = '[шоурил]';
};
firstLink.onmouseout = function(){
    firstLink.innerHTML = 'showreel';
};

secondLink.onmouseover = function(){
    secondLink.innerHTML = '[услуги]';
};
secondLink.onmouseout = function(){
    secondLink.innerHTML = 'what we do';
};

thirdLink.onmouseover = function(){
    thirdLink.innerHTML = '[кейсы]';
};
thirdLink.onmouseout = function(){
    thirdLink.innerHTML = 'cases';
};

fourthLink.onmouseover = function(){
    fourthLink.innerHTML = '[команда]';
};
fourthLink.onmouseout = function(){
    fourthLink.innerHTML = 'team';
};

fifthLink.onmouseover = function(){
    fifthLink.innerHTML = '[контакты]';
};
fifthLink.onmouseout = function(){
    fifthLink.innerHTML = 'contact';
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

    $('.section-design__video').click(function(){
        let volume = $(this);
        volume.toggleClass('on');
        if (volume.is('.on')) $('#video').prop("volume", 1);
        else $('#video').prop("volume", 0);
    });
});