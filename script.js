// Constantes com as variáveis das referencias HTML.
const transUl = document.querySelector('#transactions')
const exibirReceitas = document.querySelector('#money-plus')
const exibirDespesas = document.querySelector('#money-minus')
const exibirBalanca = document.querySelector('#balance')
const formulario = document.querySelector('#form')
const transNomeInput = document.querySelector('#text')
const transValorInput = document.querySelector('#amount')


//Array com as despesas e receitas fictícias
// let trans = [
//     { id: 1, nome: 'Bolo de brigadeiro', valor: -20 },
//     { id: 2, nome: 'Salário', valor: 300 },
//     { id: 3, nome: 'Torta de frango', valor: -10 },
//     { id: 4, nome: 'Violão', valor: 150 }
// ]


//manipulando dados no localStorage
const transLocalStorage = JSON.parse(localStorage.getItem('transaction'))

let trans = localStorage.getItem('transaction') !== null ? transLocalStorage : []



//Função para remover as transações pelo ID
const removerTrans = (ID) => {

    trans = trans.filter(trans => trans.id !== ID)
    atualizarLocalStorage()
    init()
}

//adicionando uma li dentro do documento com as referencias
const addTransDentroDOM = (trans) => {

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


//atualizando os dados da balança
const atualizarBalanca = () => {
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


//função para iniciar o projeto, passando o for para cada elemento.
const init = () => {
    transUl.innerHTML = ''
    trans.forEach(addTransDentroDOM)
    atualizarBalanca();
}

init();

const atualizarLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(trans))
}




//Checando se os campos do formulário foram preenchidos

const gerarID = () => Math.round(Math.random() * 100)

//Função para adicionar os elementos digitados nos campos de referencia oa array que será exibido
const addTransdentroArray = (nomeTrans, valorTrans) => {
    trans.push({
        id: gerarID(),
        nome: nomeTrans,
        valor: Number(valorTrans)
    })
}

//Função para definir as váriaveis dos campos vazios.
const transVazio = () => {
    transNomeInput.value = ''
    transValorInput.value = ''
}


//função executada antes de enviar o submit.
const form = (event) => {
    event.preventDefault()
    const nomeTrans = transNomeInput.value.trim()
    const valorTrans = transValorInput.value.trim()
    const refCampoVazio = nomeTrans === '' || valorTrans === ''

    if (refCampoVazio) {
        alert('Ambos os campos devem estar preenchidos!')
        return
    }

    addTransdentroArray(nomeTrans, valorTrans)
    init()
    atualizarLocalStorage()
    transVazio()
}


formulario.addEventListener('submit', form)