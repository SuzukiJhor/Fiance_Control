const transUl = document.querySelector('#transactions')
const exibirReceitas = document.querySelector('#money-plus')
const exibirDespesas = document.querySelector('#money-minus')
const exibirBalanca = document.querySelector('#balance')
const transactionForm = document.querySelector('#form')
const transNameInput = document.querySelector('#text')
const transValueInput = document.querySelector('#amount')

const transLocalStorage = JSON.parse(localStorage.getItem('transaction'))

let trans = localStorage.getItem('transaction') !== null ? transLocalStorage : []

const form = event => {
    event.preventDefault()
    const nomeTrans = transNameInput.value.trim()
    const valorTrans = transValueInput.value.trim()
    const refCampoVazio = nomeTrans === '' || valorTrans === ''

    if (refCampoVazio) {
        alert()
        return
    }
    addTransIntoArray(nomeTrans, valorTrans)
    init()
    atualizarLocalStorage()
    transVazio()
}

const addTransIntoArray = (nomeTrans, valorTrans) => {
    trans.push({
        id: gerarID(),
        nome: nomeTrans,
        valor: Number(valorTrans)
    })
}

const init = () => {
    transUl.innerHTML = ''
    trans.forEach(addTransIntoDOM)
    updateScale();
}

const atualizarLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(trans))
    
}

const removerTrans = ID => {

    trans = trans.filter(trans => trans.id !== ID)
    atualizarLocalStorage()
    init()
}


const addTransIntoDOM = trans => {

    const CSSclass = trans.valor < 0 ? 'minus' : 'plus';
    const li = document.createElement('li');

    li.classList.add(CSSclass);
    li.innerHTML = `
        ${trans.nome} 
        <span>
        R$  ${trans.valor}
        </span>
        <button class="delete-btn"  onclick='removerTrans(${trans.id})'>
        x
        </button>
    `
    transUl.append(li)
}

const updateScale = () => {
    const transValores = trans
        .map(trans => trans.valor);

    const total = transValores
        .reduce((acumulador, valor) => acumulador + valor, 0)
        .toFixed(2);

    const receitas = transValores
        .filter(valor => valor > 0)
        .reduce((acumulador, valor) => acumulador + valor, 0)
        .toFixed(2);

    const despesas = Math.abs(transValores
            .filter(valor => valor < 0)
            .reduce((acumulador, valor) => acumulador + valor, 0))
        .toFixed(2);


    exibirBalanca.textContent = ` R$ ${total}`;
    exibirReceitas.textContent = ` R$ ${receitas}`;
    exibirDespesas.textContent = ` R$ ${despesas}`;

}

const gerarID = () => Math.round(Math.random() * 100)

const transVazio = () => {
    transNameInput.value = ''
    transValueInput.value = ''
}

const alert = ()=>{
    const modal = document.querySelector('.modal')
    modal.style.display = 'flex'
    setTimeout(function(){
        modal.style.display = 'none'
    }, 3000)
    
}

transactionForm.addEventListener('submit', form)
init()