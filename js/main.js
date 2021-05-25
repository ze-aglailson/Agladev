window.onload = function(){

    var btnMenu = document.querySelector('.btn-menu');
    var cabecalho = document.getElementById('content-logo-btn-menu');
    var alturaCabecalho = cabecalho.offsetHeight;
    console.log("Altura cabeçalho:"+alturaCabecalho);
    var btnsSubmenus = document.querySelectorAll('.item-menu')
    var contentMenu = document.getElementById('content-menu');
    var menu = document.querySelector('.menu');
    var contentListaItensMenu = document.querySelector('.section-itens');

    //Start classe passa os parametros
    (function start(){
        menu = new Menu(btnMenu, contentMenu,btnsSubmenus)
        menu.carregaItensMenu(contentListaItensMenu)
        menu.toggleBtnSubmenu()
        
        btnMenu.addEventListener('click',function(){
            menu.toggleBtnMenu()
        })
        contentMenu.addEventListener('click', function(e){
            menu.contentMenuClose(e)
        })

        //starta o scroll de cada item menu
        var itemsMenu = document.querySelectorAll('.item-menu')
        itemsMenu.forEach(item => {
            item.addEventListener("click", function(e){
                e.preventDefault()
                itemsMenuScroll(item, alturaCabecalho)
                menu.toggleBtnMenu()
            })
        });

        //Muda cor cabecalho
        window.addEventListener('scroll', function(){
            var posicaoAtual = window.scrollY;

            menu.mudaCorCabecalho(cabecalho, alturaCabecalho,posicaoAtual)
            
        })
    }());

    (function ajustes(){
        //espaçando a logo das midias do menu
        let alturaContentLogo = document.getElementById('content-logo-btn-menu').offsetHeight
        let menu = document.querySelector('.menu')
        menu.style.paddingTop = alturaContentLogo+"px"
        //Espaçando a main da altura do cabecalho
        //var main = document.querySelector('.main')
        //main.style.marginTop = alturaCabecalho+"px"
        //descontando o tamanho do cabecalho na home
        var gridPrincipal = document.querySelector('.grid-principal')
        if(gridPrincipal){

            gridPrincipal.style.marginTop = -alturaCabecalho+"px"
        }
        //Toggle botão volta topo

        window.addEventListener('scroll', function(){
            var posicaoAtual = window.scrollY;
            if(posicaoAtual > (alturaCabecalho + 200)){
                btnVoltaTopo.style.opacity = 0.5
            }else{
                btnVoltaTopo.style.opacity = 0
            }  
        })

        //Animação volta topo
        var btnVoltaTopo = document.querySelector('.btn-volta-topo');
        var posiScrollY;

        btnVoltaTopo.addEventListener('click',function(){
            posiScrollY = window.scrollY
            time = 30
            var intervalo = setInterval(function(){

                if(posiScrollY > 0){
                    posiScrollY-=time;
                    window.scrollTo(0,posiScrollY)
                    if(window.scrollY === 0){
                        posiScrollY = window.scrollY
                    }
                }else{
                    clearInterval(intervalo)
                }

            },4)
        })
        //itemsMenuScroll()

    }());

    //Funções
    function itemsMenuScroll(itemMenu, alturaCabecalho){
        
        var seletor = $(itemMenu).attr("href")
        var posicao = $(seletor).offset().top
        $("html, body").animate({
            scrollTop:posicao-(alturaCabecalho+10)
        },500)
        
    }


    //Formulario de login

    var flogin = document.querySelector('.form-login')

    function verificaCampos(campos){
        let result = false

        for(let i = 0; i < campos.length; i++){
            let campo = campos[i]

            if(campo.type !== "submit"){
                
                if(campo.value == ""){
                    campo.classList.add('ipt-vazio')
                    result = false
                }else{
                    campo.classList.remove('ipt-vazio')
                    result = true
                }
            }

        }

        return result
    }

    $(flogin).submit(function(e){
        e.preventDefault()

        var msg = $(".msg-retorno") ?msg = $(".msg-retorno"):""

        if(verificaCampos(this.elements)){
            
            email = $('#ipt-email').val()
            senha = $('#ipt-senha').val()
            
            $.ajax({
                url: 'https://agladev.com/login.php',
                method:'POST',
                data:{email:email,senha:senha},
                dataType: 'json', 
                beforeSend : function(data){
                    console.log("enviando...")
                },
                success: function(response)
                {
                    
                    let load = $("#load-login")
                    if(response.login.status){
                        msg.css('background-color','rgb(0, 255, 85)')
                        $(function(){
                            load.fadeIn(700, function(){
                                window.setTimeout(function(){
                                    load.fadeOut()
                                },2000)
                                window.location.href = 'painel/index.php'
                            })
                        })
                    }
                },
                error:function(data, xhr, throwError){
                    console.log("Erro ao fazer login, tente novamente!")
                }
                
            }).done(function(response){
                
                msg.html("<p>"+response.login.mensagem+"</p>")
                $(function(){
                    msg.fadeIn(700, function(){
                        window.setTimeout(function(){
                            msg.fadeOut()
                        },2000)
                    })
                })
            })

        }else{
            
            msg.html("<p>Preencha todos os campos!</p>")
            $(function(){
                msg.fadeIn(700, function(){
                    window.setTimeout(function(){
                        msg.fadeOut()
                    },2000)
                })
            })

        }
       

    })
    
    
}



//Classes

function Menu(btnMenu, contentMenu){
    this.contentMenu = contentMenu
    this.btnMenu = btnMenu
    this.btnsSubmenus = []
    this.menuItems = []
    this.submenus = []
    this.menuAberto = false
    this.cabecalhoBranco = false
    this.menuListaitens = [
        {
            nome:'Home',
            link:'#home',
            subItens:[],
            classe:'Home',
        },
        {
            nome:'Serviços',
            link:'#servicos',
            subItens:[],
            classe:'Servico'
        },
        {
            nome:'Clientes',
            link:'#clientes',
            subItens:[],
            classe:'Cliente'
        },
        {
            nome:'Projetos',
            link:'#projetos',
            subItens:[],
            classe:'Projeto'
        },
        /* {
            nome:'Cases',
            link:'#cases',
            subItens:[],
            classe:'Case'
        },
        {
            nome:'Portfólio',
            link:'#portfolio',
            subItens:[],
            classe:'Portfolio'
        },
        {
            nome:'Categoria',
            link:'#categoria',
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
            link:'#sobre',
            subItens:[],
            classe:'Sobre'
        },
        {
            nome:'Contato',
            link:'#contato',
            subItens:[],
            classe:'Contato'
        } */
    ]


    this.carregaItensMenu = (contentLista)=>{
        let listaItens = []
        this.menuListaitens.forEach(e=>{
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
                    console.log(dados)
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
                        console.log('aqui')
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
        var body = document.querySelector('body')
        if(this.contentMenu.classList.contains('content-menu-open')){
            this.contentMenu.classList.remove('content-menu-open')
            body.classList.remove('paralisa-body');

            this.menuAberto = false;

            if(this.cabecalhoBranco){
                this.logoEscuro()
            }else{
                this.logoClaro()
            }
            

        }else{
            this.contentMenu.classList.add('content-menu-open')
            body.classList.add('paralisa-body');
            
            this.menuAberto = true
            
            this.logoEscuro()
        }
    }

    this.mudaCorCabecalho = (cabecalho,alturaCabecalho, posAtual)=>{

        if(posAtual>alturaCabecalho){

            this.cabecalhoBranco = true
            cabecalho.style.backgroundColor = "#fff"
            this.btnEscuro()
            this.logoEscuro()
            
            
        }else{
            this.cabecalhoBranco = false
            cabecalho.style.backgroundColor = "initial"
            
            this.btnClaro()
            this.logoClaro()

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
    //Muda cor btnMenu
    this.btnEscuro = ()=>{
        let linhasBtn = $('.btn-menu .linha')
        linhasBtn.css("background-color","#333333")
    }
    this.btnClaro = ()=>{
        let linhasBtn = $('.btn-menu .linha')
        linhasBtn.css("background-color","#ffffff")
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
