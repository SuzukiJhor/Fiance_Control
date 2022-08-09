const transUl = document.querySelector('#transactions')

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
        ${trans.nome} <span>R$  ${trans.valor}</span><button class="delete-btn"></button>
    `
    transUl.append(li)
}

const atualizarBalanca = () => {
    const transValores = transFicticias.map(trans => trans.valor)
    const total = transValores.reduce((acumulador, trans) => acumulador + trans, 0).toFixed(2)
    console.log(total)
}

const init = () => {
    transFicticias.forEach(addTransDentroDOM)
    atualizarBalanca();
}

init();