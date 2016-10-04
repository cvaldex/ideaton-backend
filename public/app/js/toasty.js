$('document').ready(function () {
    $('#team').on('click', function () {
        toasty();
    });

});

var easter_egg = new Konami(function () {
    console.log('toasty');
    $("#donfran").removeClass('hide').addClass('slideInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('#sound')[0].play();
        $("#donfran").removeClass("slideInRight").addClass('slideOutRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass("slideOutRight").addClass('hide');
        });
    });
});

