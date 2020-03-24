$(function() {
	
    $("head").append("<link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' />");

    

    $('.slider').slick({
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    $("#feadback-form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $('#feadback-form')[0].reset(
                setTimeout(function () {}, 1000)
            );
        });
        return false;
    });

});
