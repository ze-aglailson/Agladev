window.onload = function(){
    var btnMenu = $('.btn-menu');
    var contentMenu = document.querySelector('.content-menu');
   
    (function ajustes(){
        //espaçando a logo das midias do menu
        let alturaContentLogo = document.getElementById('content-logo-btn-menu').offsetHeight
        let menu = document.querySelector('.menu')
        menu.style.paddingTop = alturaContentLogo+"px"

        console.log(menu)

    }());

    //btn-menu
    btnMenu.on('click', function(){
        toggleBtnMenu()
    })

    function toggleBtnMenu(){
    
        if(!btnMenu.hasClass("btn-menu-open")){
            
            btnMenu.addClass("btn-menu-open")
            openMenu();
            
        }else{
            btnMenu.removeClass("btn-menu-open")
            openMenu();
        }
    }

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
    //subemenus
    (function toggleBtnSubmenu(){
        let btns = document.querySelectorAll('.btn-submenu')
        
        btns.forEach(e=>{
            
            e.addEventListener('click', function(){

                abrirSubmenu(e)

            })

        })
    
    }())

    function abrirSubmenu(btn){

        let submenu = btn.nextElementSibling

        let alturaSubmenu = !!submenu.style.maxHeight

        if(alturaSubmenu){
            submenu.style.maxHeight = null
            btn.classList.toggle('btn-submenu-active')
        }else{
            let submenus = document.querySelectorAll('.submenu')
            submenus.forEach(e =>{
                let altura = e.style.maxHeight
                if(altura){
                    e.style.maxHeight = null
                    let btnSubmenuAberto = e.previousElementSibling
                    btnSubmenuAberto.classList.toggle('btn-submenu-active')
                }
            })

            submenu.style.maxHeight = submenu.scrollHeight+'px'
            btn.classList.toggle('btn-submenu-active')
        }
    }

    //fecha meu ao clicar no content-menu
    contentMenu.addEventListener('click', (e)=>{
        if(e.target.id === 'content-menu'){

            toggleBtnMenu();
        
        }
    })

    //chamadas ajax
    (function getCategoriaProjeto(){
        let submenu = $('.submenu-cat-projetos')
        $.ajax({
            url:'http://localhost/Projetos/AglaDev/selecionaCatProjeto.php',
            method:'GET',
            dataType: 'jsonp',
            crossDomain:true

        }).done(function(result){

            for (let i = 0; i < result.length; i++) {
                

                submenu.prepend('<li><a class="item-submenu" href="#">'+result[i].categoriaProjetoNome+'</a></li>')
                
            }
            console.log(result, submenu)
        })
    }())

    
}