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

let secondLink = document.getElementById('secondLink');
let thirdLink = document.getElementById('thirdLink');
let fourthLink = document.getElementById('fourthLink');
let fifthLink = document.getElementById('fifthLink');
let sixthLink = document.getElementById('sixthLink');

secondLink.onmouseover = function(){
    secondLink.innerHTML = '[шоурил]';
};
secondLink.onmouseout = function(){
    secondLink.innerHTML = 'showreel';
};

thirdLink.onmouseover = function(){
    thirdLink.innerHTML = '[услуги]';
};
thirdLink.onmouseout = function(){
    thirdLink.innerHTML = 'what we do';
};

fourthLink.onmouseover = function(){
    fourthLink.innerHTML = '[кейсы]';
};
fourthLink.onmouseout = function(){
    fourthLink.innerHTML = 'cases';
};

fifthLink.onmouseover = function(){
    fifthLink.innerHTML = '[команда]';
};
fifthLink.onmouseout = function(){
    fifthLink.innerHTML = 'team';
};

sixthLink.onmouseover = function(){
    sixthLink.innerHTML = '[контакты]';
};
sixthLink.onmouseout = function(){
    sixthLink.innerHTML = 'contact';
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

$(window).load(function() {
    $('.marquee').marquee({
        duration: 15000,
        startVisible: true,
        duplicated: true
    });
});

