import { menuArray } from '/data.js'

const modal = document.getElementById('modal')
const checkout = document.getElementById('checkout')
const thanksMessage = document.getElementById('thanks-container')
const ordersList = document.getElementById('list')

const dollarSign = '$'
let totalPrice = 0

document.addEventListener('click', function(e){
    if (e.target.dataset.add) {
        addOrder(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    } else if (e.target.id === 'complete-order') {
        showModal()
    } else if (e.target.id === 'modal-btn') {
        showThanksMessage(e)
    }
})

function showThanksMessage(e) {
    e.preventDefault()
    const formData = new FormData(form)
    const fullName = formData.get('fullName')
    
    thanksMessage.innerHTML = `<p>Thanks, ${fullName}. Your order is on its way!</p>`
    thanksMessage.style.display = 'flex'
    modal.classList.add('hidden')
    checkout.classList.add('hidden')
    ordersList.innerHTML = ''
}

function showModal() {
    modal.classList.remove('hidden')
}

function removeItem(itemId){
    document.getElementById(`remove${itemId}`).remove()
    let targetItem = menuArray.find(item => {
        return item.id == itemId
    })
    totalPrice -= targetItem.price
    if (totalPrice > 0) {
        renderTotalPrice()
    } else {
        checkout.classList.add('hidden')
    }
}

function addOrder(itemId) {
    thanksMessage.style.display = 'none'
    checkout.classList.remove('hidden')
    let targetItem = menuArray.find(item => {
        return item.id == itemId
    })
    
    let feed = ''
    totalPrice += targetItem.price
    
    feed = `<div class="items-list" id='remove${targetItem.id}'>
                <p class="food-name">${targetItem.name}</p>
                <p class="ingredients" data-remove="${targetItem.id}">remove</p>
                <p class="chosen-price">${dollarSign}${targetItem.price}</p>
            </div>`

    ordersList.innerHTML += feed
    renderTotalPrice()
}

function renderTotalPrice() {
    document.getElementById('total-price').innerText = dollarSign + totalPrice
}

function feedMenu() {
    let feed = ''

    menuArray.forEach(item => {    
        feed += `<div class="food-container">
                    <p class="food-icon">${item.emoji}</p>
                    <div>
                        <p class="food-name">${item.name}</p>
                        <p class="ingredients">${item.ingredients}</p>
                        <p class="price">${dollarSign}${item.price}</p>
                    </div>
                    <i class="fa-solid fa-plus" data-add='${item.id}'></i>
                </div>`
    })
    return feed
}

function renderMenu(){
    document.getElementById('menu').innerHTML = feedMenu()
}

window.onload = renderMenu()