window.onload = function(){
    var btnMenu = document.querySelector('.btn-menu');
    var btnsSubmenus = document.querySelectorAll('.item-menu')
    var contentMenu = document.getElementById('content-menu');
    var menu = document.querySelector('.menu');
    var contentListaItensMenu = document.querySelector('.section-itens');

    (function teste(){
        menu = new Menu(btnMenu, contentMenu,btnsSubmenus)
        menu.carregaItensMenu(contentListaItensMenu)
        menu.toggleBtnSubmenu()
        
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
    

    //chamadas 
    /*
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
    */
    
}

function Menu(btnMenu, contentMenu){
    this.contentMenu = contentMenu
    this.btnMenu = btnMenu
    this.btnsSubmenus = []
    this.submenus = []
    this.menuitens = [
        {
            nome:'Home',
            link:'#',
            subItens:[],
            classe:'Home'
        },
        {
            nome:'Serviços',
            link:'#',
            subItens:[],
            classe:'Servico'
        },
        {
            nome:'Projetos',
            link:'#',
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
            ],
            classe:'CategoriaProjeto'
        },
        {
            nome:'Cases',
            link:'#',
            subItens:[],
            classe:'Case'
        },
        {
            nome:'Portfólio',
            link:'#',
            subItens:[],
            classe:'Portfolio'
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
            ],
            classe:'Categoria'
        },
        {
            nome:'Sobre',
            link:'#',
            subItens:[],
            classe:'Sobre'
        },
        {
            nome:'Contato',
            link:'#',
            subItens:[],
            classe:'Contato'
        }
    ]


    this.carregaItensMenu = (contentLista)=>{
        let listaItens = []
        this.menuitens.forEach(e=>{
            listaItens.push(e)
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.setAttribute('href',`${e.link}`)
            a.classList.add('item-menu')
            a.innerHTML = e.nome
            a.setAttribute('classe',`${e.classe}`)
            this.btnsSubmenus.push(a)
            li.appendChild(a)
            let submenu = document.createElement('ul')
            submenu.classList.add('submenu')
            this.submenus.push(submenu)
            li.appendChild(submenu)
            contentLista.appendChild(li)
            
        })
        this.btnsSubmenus.forEach(e => {
            contentSubmenu = e.nextElementSibling
            this.carregaSubItemsMenu(contentSubmenu, e,e.getAttribute('classe'))
        });
    }

    this.carregaSubItemsMenu=(contentSubmenu,btnSubmenu,classe)=>{
        $.ajax({
            url:'https://agladev.com/api/v1/'+classe+'/listar',
            method:'GET',
            dataType:'json'
        }).done(function(result){
            let qtdDados = result['dados'][0].length
            if(qtdDados>0){

                let codigo = classe.toLowerCase()+'Cod'
                let nome = classe.toLowerCase()+'Nome'
                let link = classe.toLowerCase()+'Link'

                
                if(result['status'] != 'erro'){
                    let dados = result['dados'][0]
                    btnSubmenu.classList.add('btn-submenu')
                    let icon = document.createElement('span')
                    icon.classList.add('btn-submenu-icon')
                    icon.innerHTML+= '<i class="fas fa-chevron-right"></i>'
                    btnSubmenu.appendChild(icon)
                    
                    for (let i = 0; i < dados.length; i++) {
                        let li = document.createElement('li')
                        let a = document.createElement('a')
                        a.setAttribute('href','#')
                        a.classList.add('item-submenu')
                        a.innerHTML = dados[i][nome]
                        li.appendChild(a)
                        contentSubmenu.appendChild(li)
                    }
                    
                }
            }
        })    
    }
   

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

        btns.forEach(e => {
            e.addEventListener('click', ()=>{

                this.abrirSubmenus(e)

            })
        })
    }

    this.abrirSubmenus = function(item){

        let submenu = item.nextElementSibling?item.nextElementSibling:false
        let alturaSubmenu = 0
        if(submenu){
            alturaSubmenu = !!submenu.style.maxHeight
        }
        if(alturaSubmenu){
            submenu.style.maxHeight = null
            item.classList.toggle('item-menu-active')
        }else{
            this.submenus.forEach(e =>{
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
    }

    //fecha menu Ao clicar no contente
    this.contentMenuClose = (element)=>{
        
        if(element.target.id === 'content-menu'){

            this.toggleBtnMenu();

        }
        
    }

}
