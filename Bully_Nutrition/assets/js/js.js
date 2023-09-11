
var bnt = document.getElementById('bnt')

if (bnt) {
    bnt.addEventListener('click', function(){
        var nome_cliente = document.getElementById('cliente')
     
        if (nome_cliente.value == ""){
            alert('Digite algo!')
        }else{
            var info = {
                "nome": nome_cliente.value,
                "concluido": false,
                "lixeira":false
            }
        
            var itens = JSON.parse(localStorage.getItem("lista")) || []
        
            itens.push(info)
        
            localStorage.setItem("lista", JSON.stringify(itens))
        
            var itens_fora = JSON.parse(localStorage.getItem("nova_lista")) || []
        
            localStorage.setItem("nova_lista", JSON.stringify(itens_fora))
        
            nome_cliente.value = ''
           
    
            atualiza()
        }


        
    })
    
    function atualiza() {
        var itens = JSON.parse(localStorage.getItem("lista")) || []
        var div = document.getElementById('conteudo')
    
        div.innerHTML = ""
        var html = ""
    
        for (var x of itens) {
            html += ``; 
            
            if("lixeira" in x && x.lixeira == true){
                html += ` <div id="clientes" style="display:none;">`
            }else{
                html += `<div id="clientes">`
            }
            html +=` <p>   - `
    
                        if("concluido" in x && x.concluido == true) {
                            html += `<strike>${x.nome}</strike></p>`
                        } else {
                            html += ` ${x.nome} </p>`
                        }
                        
           
               html+= ` <div id="img">
                    <img id="lixeira" onclick="removerElemento(${itens.indexOf(x)})" src="./assets/img/lixeira.png" alt=""> `;
    
                    if("concluido" in x && x.concluido == true) {
                        html += `<img id="check" onclick="concluido(${itens.indexOf(x)})" src="./assets/img/check.png" alt="">`
                    } else {
                        html += `<img id="check" onclick="concluido(${itens.indexOf(x)})" src="./assets/img/checkver.png" alt="">`
                    }
    
                    html += `
                </div>
                </div> `
                
        }
        div.innerHTML += html
    }
    
    function concluido(indice) {
        var itens = JSON.parse(localStorage.getItem("lista"))
        itens[indice].concluido = true 
    
        localStorage.setItem("lista", JSON.stringify(itens))
    
        atualiza()
    }
    
    function removerElemento(indice){
        
        var itens = JSON.parse(localStorage.getItem("lista"))
        itens[indice].lixeira = true
        localStorage.setItem("lista", JSON.stringify(itens))
        atualiza()
    
        var itens_fora = JSON.parse(localStorage.getItem("nova_lista")) 
        itens_fora.push(itens[indice])
        localStorage.setItem("nova_lista", JSON.stringify(itens_fora))
        atualiza()
    
    }
    
    
    
    atualiza()
} else {
    function atualiza() {
        var itens = JSON.parse(localStorage.getItem("nova_lista")) || []
        var div = document.getElementById('lista_excluido')
        var div_dois = document.getElementById('lista_concluido')
    
        div.innerHTML = ""
        var html = ""
    
        for (var x of itens) {
            
            if (x.concluido == false){
                html += `<p><span class="span">Cliente:</span> ${x.nome} </p> `
            }else{
                div_dois.innerHTML += `<p><span class="span">Cliente:</span> ${x.nome} </p> `
            }
        }
    
        div.innerHTML += html
}

    

    var bnt_historico = document.getElementById('bnt_historico')

    bnt_historico.addEventListener('click', function(){
        localStorage.removeItem("nova_lista")
        localStorage.removeItem("lista")
        atualiza()
    })

    atualiza()
}