window.onload = function(){
    (function ajustes(){
        //espaçando a logo das midias do menu
        let alturaContentLogo = document.getElementById('content-logo-btn-menu').offsetHeight
        let menu = document.querySelector('.menu')
        menu.style.paddingTop = alturaContentLogo+"px"

        console.log(menu)

    }())
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
            logoClaro()
        }else{
            contentMenu.addClass('content-menu-open')
            logoEscuro()
        }
    }
    //Muda cor logo
    function logoEscuro(){
        let logoSpan = $('.logo #logo-span')
        logoSpan.css("color","#333")
    }
    function logoClaro(){
        let logoSpan = $('.logo #logo-span')
        logoSpan.css("color","#fff")
    }
    
}