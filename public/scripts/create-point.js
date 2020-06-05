function populateUfs () {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {
            
            for( state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
            
        }
    )

}

populateUfs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value>Selecione a Cidade<option>'
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            
            for( city of cities){
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            
            citySelect.disabled = false
        }
    )
}

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities )


// itens de coleta

// pegar todos os li
const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect){
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // adicionar ou remover uma class no elemento com JS
    itemLi.classList.toggle('selected')
    
    const itemId = event.target.dataset.id
    
    // verificar se existem intes selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId // isso já esta verdadeiro ou falso
        return itemFound
    })

    // se já estiver selecionado,
    if(alreadySelected >=0 ){
        // tirar da seleção
        const filteredItens = selectedItens.filter(item =>{
            const itemDifferent = item != itemId // false
            return itemDifferent
        })
        
        selectedItens = filteredItens
    } else {
        // se não tiver selecionado, adicionar à seleção
        selectedItens.push(itemId)
    }
    
    
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItens
}