const url = "http://localhost:3000"
const corpo = document.querySelector("#corpo")
var dados = []

function carregar() {
    fetch(url + '/vendedores/listar', { method: 'GET' })
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
        for (let i = 0; i < 3; i++) {
            td.push(document.createElement("td"))
        }
        td[0].innerHTML = e.id
        td[0].setAttribute("contenteditable", "true")
        td[1].innerHTML = e.nome
        td[1].setAttribute("contenteditable", "true")
        td[2].innerHTML = e.matricula
        td[2].setAttribute("contenteditable", "true")

        for (let i = 0; i < 3; i++)
            linha.appendChild(td[i])
            
        corpo.appendChild(linha)
    })
}

function alterar(id) {
    let linha = document.querySelector(`#linha${id}`)
        const body = {
            "id":id,
            "nome": linha.childNodes[1].innerHTML,
            "matricula": number(linha.childNodes[2].innerHTML),
           
        }

        console.log(body);

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };

        options.body = JSON.stringify(body)

        fetch(url + '/vendedores/alterar', options)
            .then(resp => resp.status)
            .then(resp => {
                if (resp == 202) window.location.reload()
                else alert('Erro ao alterar dados')
            })
}