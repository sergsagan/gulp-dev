$(function() {

    $("head").append("<link rel='stylesheet' type='text/css' href='css/vendor.css' />");

    $("head").append("<link href='https://fonts.googleapis.com/css?family=Noto+Sans:400,400italic' rel='stylesheet' type='text/css'>");

    $("head").append("<link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' />");

    $('.fade').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    $('.responsive').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $('a[href^="#"]').click(function(){
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top}, 1000);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
    $('nav li a').click(function () {
        $('nav li').removeClass('active');
        $(this).parent().addClass('active');
        return true;
    });

    $("#phone").mask("+38 (999) 999-99-99");

    //Аякс отправка форм
    //Документация: http://api.jquery.com/jquery.ajax/
    $("#form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            setTimeout(function() {

                $("#form").trigger("reset");
            }, 1000);
        });
        return false;
    });
});
