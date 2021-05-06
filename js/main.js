window.onload = function(){
    //btn-menu
    var btnMenu = $('.btn-menu')

    btnMenu.on('click', function(){

        if(!btnMenu.hasClass("btn-menu-open")){

            btnMenu.addClass("btn-menu-open")
            openMenu();

        }else{
            btnMenu.removeClass("btn-menu-open")
            openMenu();
        }
    })

    function openMenu(){
        let contentMenu = $('.content-menu')
        if(contentMenu.hasClass('content-menu-open')){

            contentMenu.removeClass('content-menu-open')

        }else{
            contentMenu.addClass('content-menu-open')
        }
    }
}