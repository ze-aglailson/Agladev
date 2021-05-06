window.onload = function(){
    //btn-menu
    var btnMenu = $('.btn-menu')

    btnMenu.on('click', function(){

        let linha02 = $(".linha02")

        if(!btnMenu.hasClass("btn-menu-open")){

            btnMenu.addClass("btn-menu-open")
            openMenu();

        }else{
            btnMenu.removeClass("btn-menu-open")
        }
    })

    function openMenu(){
        let contentMenu = $('.content-menu')
        if(!contentMenu.hasClass('content-menu-open')){

            contentMenu.addClass('content-menu-open')

        }else{
            contentMenu.removeClass('content-menu-open')
        }
    }
}