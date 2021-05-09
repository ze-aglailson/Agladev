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
        let items = document.querySelectorAll('.item-menu')
        
        items.forEach(item=>{
            
            item.addEventListener('click', function(){

                abrirSubmenu(item)

            })

        })
    
    }())

    function abrirSubmenu(item){

        let submenu = item.nextElementSibling?item.nextElementSibling:false
        let alturaSubmenu = 0
        if(submenu){
            alturaSubmenu = !!submenu.style.maxHeight
        }
        if(alturaSubmenu){
            submenu.style.maxHeight = null
            item.classList.toggle('item-menu-active')
        }else{
        
            let submenus = document.querySelectorAll('.submenu')
            submenus.forEach(e =>{
                let altura = e.style.maxHeight
                if(altura){
                    e.style.maxHeight = null
                    let btnSubmenuAberto = e.previousElementSibling
                    btnSubmenuAberto.classList.toggle('item-menu-active')
                }
            })
            submenu.style.maxHeight = submenu.scrollHeight+'px'
            item.classList.toggle('item-menu-active')
        }
        /*

        */
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
            url:'http://agladev.com/selecionaCatProjeto.php',
            method:'GET',
            dataType: 'json'

        }).done(function(result){

            for (let i = 0; i < result.length; i++) {
                

                submenu.prepend('<li><a class="item-submenu" href="#">'+result[i].categoriaProjetoNome+'</a></li>')
                
            }
            console.log(result, submenu)
        })
    }())

    
}