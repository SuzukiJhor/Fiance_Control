const transUl = document.querySelector('#transactions')
console.log(transUl)

const transFicticias = [
    { id: 1, nome: 'Bolo de brigadeiro', valor: -20 },
    { id: 2, nome: 'Salário', valor: 300 },
    { id: 3, nome: 'Torta de frango', valor: -10 },
    { id: 4, nome: 'Violão', valor: 150 }
]

const addTransDentroDOM = (trans) => {
    const operador = trans.valor < 0 ? '-' : '+';
    const CSSclass = trans.valor < 0 ? 'minus' : 'plus';
    const li = document.createElement('li');

    li.classList.add(CSSclass);
    li.innerHTML = `
        ${trans.nome} <span>R$ ${trans.valor}</span><button class="delete-btn"></button>
    `

    console.log(li)
}

addTransDentroDOM(transFicticias[2]);