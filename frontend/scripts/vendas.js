const url = "http://localhost:3000"
const novo = document.querySelector("#novo")
const corpo = document.querySelector("#corpo")
var dados = []

function carregar() {
    fetch(url + '/vendas', { method: 'GET' })
        .then(resp => resp.json())
        .then(resp => {
            dados = resp
            preencherTabela()
        })
        .catch(err => alert(err));
}

function preencherTabela() {
    dados.forEach((e, index) => {
        let linha = document.createElement("tr")

        linha.setAttribute('id', 'linha' + e.id)
        let td = []
        for (let i = 0; i < 6; i++) {
            td.push(document.createElement("td"))
            // if (i < 8) td[i].setAttribute("data-label", Object.keys(e)[i].charAt(0).toUpperCase() + Object.keys(e)[i].substr(1)+":")
            // else if (i == 8) td[i].setAttribute("data-label", "Alterar:")
            // else td[i].setAttribute("data-label", "Excluir:")
        }
        td[0].innerHTML = `<input type="date" id="data" value="${e.data.split("T")[0]}">`
        td[1].innerHTML = e.quantidade
        td[1].setAttribute("contenteditable", "true")
        td[2].innerHTML = e.nomeProduto
        td[2].setAttribute("contenteditable", "true")
        td[3].innerHTML = e.nomeVendedor
        td[3].setAttribute("contenteditable", "true")

        let btUpdate = document.createElement('button')
        btUpdate.innerHTML = '*'
        btUpdate.setAttribute('onclick', `alterar(${e.id})`)
        td[4].appendChild(btUpdate)

        let btDel = document.createElement('button')
        btDel.innerHTML = '-'
        btDel.setAttribute('onclick', `excluir(${e.id})`)
        td[5].appendChild(btDel)

        for (let i = 0; i < 6; i++)
            linha.appendChild(td[i])
            
        corpo.appendChild(linha)
    })
}

novo.addEventListener('submit', e => {
    e.preventDefault()
    const body = {
        "quantidade": novo.quantidade.value,
        "produtoId": novo.produtoId.value,
        "vendedorId": novo.vendedorId.value,
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    options.body = JSON.stringify(body)

    fetch(url + '/vendas/criar', options)
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 201) window.location.reload()
            else alert('Erro ao enviar dados')
        })
})

function excluir(id) {
    fetch(url + '/vendas/excluir/' + id, { method: 'DELETE' })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 204)
                window.location.reload()
            else
                alert('Venda não encontrada')
        })
}

function alterar(id) {
    let linha = document.querySelector(`#linha${id}`)
    //if (!isNaN(linha.childNodes[3].innerHTML) && !isNaN(linha.childNodes[4].innerHTML)) {
        const body = {
            "id":id,
            "data": linha.querySelector("#data").value,
            "quantidade": Number(linha.childNodes[1].innerHTML),
            "produtoId": linha.childNodes[2].innerHTML,
            "vendedorId": linha.childNodes[3].innerHTML,
        }

        console.log(body);

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };

        options.body = JSON.stringify(body)

        fetch(url + '/vendas/alterar', options)
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 202) window.location.reload()
                else alert('Erro ao alterar dados')
            })
    // } else {
    //     alert("errado")
    // }
}