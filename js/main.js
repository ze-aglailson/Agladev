window.onload = function(){
    var btnMenu = document.querySelector('.btn-menu');
    var btnsSubmenus = document.querySelectorAll('.item-menu')
    var contentMenu = document.getElementById('content-menu');
    var menu = document.querySelector('.menu');

    (function teste(){
        menu = new Menu(btnMenu, contentMenu,btnsSubmenus)

        menu.toggleBtnSubmenu()
        
        console.log(contentMenu)
        btnMenu.addEventListener('click',function(){
            menu.toggleBtnMenu()
        })
        contentMenu.addEventListener('click', function(e){
            menu.contentMenuClose(e)
        })
        
    }());

    (function ajustes(){
        //espaçando a logo das midias do menu
        let alturaContentLogo = document.getElementById('content-logo-btn-menu').offsetHeight
        let menu = document.querySelector('.menu')
        menu.style.paddingTop = alturaContentLogo+"px"

    }());
    

    //chamadas ajax
    (function getCategoriaProjeto(){
        let submenu = $('.submenu-cat-projetos')
        $.ajax({
            url:'http://localhost/Projetos/AglaDev/api/v1/CategoriaProjeto/listar',
            method:'GET',
            dataType: 'json'

        }).done(function(result){
            let qtdDados = result['dados'][0].length
            for (let i = 0; i < qtdDados; i++) {
                
                let dados = result['dados'][0][i]

                submenu.prepend('<li><a class="item-submenu" href="#">'+dados.categoriaProjetoNome+'</a></li>')
                
            }
        })
    }())

    
}

function Menu(btnMenu, contentMenu,btnsSubmenus,menuItems){
    this.contentMenu = contentMenu
    this.btnMenu = btnMenu
    this.btnsSubmenus = btnsSubmenus
    this.menuitens = [
        {
            nome:'Home',
            link:'#',
            subItens:[]
        },
        {
            nome:'Serviços',
            link:'#',
            subItens:[]
        },
        {
            nome:'Projetos',
            link:'',
            subItens:[
                {
                    nome:'LandingPage',
                    link:'#',
                },
                {
                    nome:'E-commerce',
                    link:'#',
                },
                {
                    nome:'Institucional',
                    link:'#',
                },
            ]
        },
        {
            nome:'Cases',
            link:'#',
            subItens:[]
        },
        {
            nome:'Portfólio',
            link:'#',
            subItens:[]
        },
        {
            nome:'Categoria',
            link:'#',
            subItens:[
                {
                    nome:'FrontEnd',
                    link:'#'
                },
                {
                    nome:'BackEnd',
                    link:'#'
                }
            ]
        },
        {
            nome:'Sobre',
            link:'',
            subItens:[]
        },
        {
            nome:'Contato',
            link:'',
            subItens:[]
        }
    ]

    /*/Eventos do menu
    this.btnMenu.on('click', function(){

        this.toggleBtnSubmenu();

    })
    */

    this.toggleBtnMenu = ()=>{
        if(!this.btnMenu.classList.contains("btn-menu-open")){
            this.btnMenu.classList.add("btn-menu-open")
            this.openMenu();
        }else{
            this.btnMenu.classList.remove("btn-menu-open")
            this.openMenu();
        }
    }

    this.openMenu = ()=>{
        console.log(this.contentMenu)
        if(this.contentMenu.classList.contains('content-menu-open')){
            this.contentMenu.classList.remove('content-menu-open')
            this.logoClaro()
        }else{
            this.contentMenu.classList.add('content-menu-open')
            this.logoEscuro()
        }
    }

    //Muda cor logo
    this.logoEscuro = ()=>{
        let logoSpan = $('.logo #logo-span')
        logoSpan.css("color","#333")
    }
    this.logoClaro=()=>{
        let logoSpan = $('.logo #logo-span')
        logoSpan.css("color","#fff")
    }

    //Eventos do menu
    this.toggleBtnSubmenu=()=>{
        let btns = this.btnsSubmenus
        this.abrirSubmenus(btns)
    }

    this.abrirSubmenus = function(btnsSubmenus){
        console.log('me achou')
        btnsSubmenus.forEach(function(btnSubmenu){

            btnSubmenu.addEventListener('click', function(){

                let submenu = btnSubmenu.nextElementSibling?btnSubmenu.nextElementSibling:false
                let alturaSubmenu = 0
                if(submenu){
                    alturaSubmenu = !!submenu.style.maxHeight
                }
                if(alturaSubmenu){
                    submenu.style.maxHeight
                    btnSubmenu.classList.toggle('item-menu-active')
                }else{
                    let submenus = document.querySelectorAll('.submenu')
                    submenus.forEach(e=>{
                        let altura = e.style.maxHeight
                        if(altura){
                            e.style.maxHeight = null
                            let btnSubmenuAberto = e.previousElementSibling
                            btnSubmenuAberto.classList.toggle('item-menu-active')
                        }
                    })
                    submenu.style.maxHeight = submenu.scrollHeight+"px"
                    btnSubmenu.classList.toggle('item-menu-active')
        
                }


            })

        })
        /*

        */
    }

    //fecha menu Ao clicar no content
    this.contentMenuClose = (element)=>{
        
        if(element.target.id === 'content-menu'){

            this.toggleBtnMenu();

        }
        
    }

}
