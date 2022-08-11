// Constantes com as variáveis das referencias HTML.
const transUl = document.querySelector('#transactions')
const exibirReceitas = document.querySelector('#money-plus')
const exibirDespesas = document.querySelector('#money-minus')
const exibirBalanca = document.querySelector('#balance')
const formulario = document.querySelector('#form')
const transNomeInput = document.querySelector('#text')
const transValorInput = document.querySelector('#amount')


//Array com as despesas e receitas 
// let trans = [
//     { id: 1, nome: 'Bolo de brigadeiro', valor: -20 },
//     { id: 2, nome: 'Salário', valor: 300 },
//     { id: 3, nome: 'Torta de frango', valor: -10 },
//     { id: 4, nome: 'Violão', valor: 150 }
// ]


//manipulando o localStorage
const transLocalStorage = JSON.parse(localStorage.getItem('transaction'))

let trans = localStorage.getItem('transaction') !== null ? transLocalStorage : []



//Função para remover as transações pelo ID
const removerTrans = (ID) => {

    trans = trans.filter(trans => trans.id !== ID)
    console.log(trans)

    atualizarLocalStorage()
    init()
}

//adicionando uma li dentro do documento com as referencias
const addTransDentroDOM = (trans) => {
    const operador = trans.valor < 0 ? '-' : '+';
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
    console.log(trans.id)
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
    console.log(trans.id)
    trans.forEach(addTransDentroDOM)
    atualizarBalanca();
}

init();

const atualizarLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(trans))
}

const gerarID = () => Math.round(Math.random() * 100)



//Checando se os campos do formulário foram preenchidos
formulario.addEventListener('submit', event => {
    event.preventDefault()

    const nomeTrans = transNomeInput.value.trim()
    const valorTrans = transValorInput.value.trim()

    if (nomeTrans === '' || valorTrans === '') {
        alert('Ambos os campos devem estar preenchidos!')
        return
    }

    const transacao = {
        id: gerarID(),
        nome: nomeTrans,
        valor: Number(valorTrans)
    }

    trans.push(transacao)

    init()
    atualizarLocalStorage()

    transNomeInput.value = ''
    transValorInput.value = ''

})