$(function() {

    $("head").append("<link rel='stylesheet' type='text/css' href='css/vendor.css' />");

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


    $('.rf').each(function(){
        // Объявляем переменные (форма и кнопка отправки)
        var form = $(this),
            btn = form.find('.btn_submit');

        // Добавляем каждому проверяемому полю, указание что поле пустое
        form.find('.rfield').addClass('empty_field');

        // Функция проверки полей формы
        function checkInput(){
            form.find('.rfield').each(function(){
                if($(this).val() != ''){
                    // Если поле не пустое удаляем класс-указание
                    $(this).removeClass('empty_field');
                } else {
                    // Если поле пустое добавляем класс-указание
                    $(this).addClass('empty_field');
                }
            });
        }

        // Функция подсветки незаполненных полей
        function lightEmpty(){
            form.find('.empty_field').css({'border-color':'#d8512d'});
            // Через полсекунды удаляем подсветку
            setTimeout(function(){
                form.find('.empty_field').removeAttr('style');
            },500);
        }

        // Проверка в режиме реального времени
        setInterval(function(){
            // Запускаем функцию проверки полей на заполненность
            checkInput();
            // Считаем к-во незаполненных полей
            var sizeEmpty = form.find('.empty_field').size();
            // Вешаем условие-тригер на кнопку отправки формы
            if(sizeEmpty > 0){
                if(btn.hasClass('disabled')){
                    return false
                } else {
                    btn.addClass('disabled')
                }
            } else {
                btn.removeClass('disabled')
            }
        },500);

        // Событие клика по кнопке отправить
        btn.click(function(){
            if($(this).hasClass('disabled')){
                // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
                lightEmpty();
                return false
            } else {
                // Все хорошо, все заполнено, отправляем форму
                form.submit();
            }
        });
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
