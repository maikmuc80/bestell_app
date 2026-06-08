const categoryRef = document.getElementById('category');

const categoryIcons = {
    "Burger & Sandwiches": "./assets/icon/burger.png",
    "Pizza": "./assets/icon/pizza.png",
    "Salad": "./assets/icon/salad.png"
};

const basketRef = document.getElementById('basket');
const DELIVERY_FEE = 4.99;
const basketDialogRef = document.getElementById('basketDialog');

function init(){
  renderCategory();
  renderBasket();
}

function order() {
    for (let index = 0; index < menu.length; index++) {
        menu[index].amount = 0;
    }
    renderCategory();
    renderBasket();
    showOrderMessage();
}

function formatPrice(value) {
    return value.toFixed(2).replace('.', ',') + '€';
}

function renderCategory() {
    const categories = [...new Set(menu.map(item => item.category))];
    let html = '';
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        html += templateCategory(category, renderArticle(category));
    }
    categoryRef.innerHTML = html;
}

function renderArticle(category) {
    let html = '';
    for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        if (item.category === category) {
            html += templateArticle(item, index);
        }
    }
    return html;
}

function templateCategory(category, articlesHtml) {
    return `
        <div class="category_heading">
            <img src="${categoryIcons[category]}" alt="${category}">
            <h2>${category}</h2>
        </div>
        ${articlesHtml}
    `;
}

function templateArticle(item, index) {
    const price = item.price.toFixed(2).replace('.', ',');
    return `
        <article class="article">
            <div class="article_item">
                <img class="article_picture" src="${item.image}" alt="${item.name}">
            </div>
            <div class="article_description_price">
                <div class="article_name">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="price_basket">
                    <p>${price} €</p>
                    ${templateArticleControl(item, index)}
                </div>
            </div>
        </article>
    `;
}

function templateArticleControl(item, index) {
    if (item.amount > 0) {
        return `
            <div>
                <button onclick="decrease(${index})">-</button>
                ${item.amount}
                <button onclick="increase(${index})">+</button>
            </div>
        `;
    }
    return `<button onclick="addToBasket(${index})">add to basket</button>`;
}

function renderBasket() {
    const html = buildBasketHtml();
    basketRef.innerHTML = html;

    const dialogContent = document.getElementById('basketDialogContent');
    if (dialogContent) {
        dialogContent.innerHTML = html;
    }
}

function templateBasketEmpty() {
    return `<p class="basket_empty">Your basket is empty.</p>`;
}

function templateBasketArticle(item, index) {
    const lineTotal = item.price * item.amount;
    return `
        <div class="article_basket">
            <div class="article_basket_description">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="article_basket_price">
                <div>
                    <button onclick="decrease(${index})">-</button>
                    ${item.amount}
                    <button onclick="increase(${index})">+</button>
                </div>
                <p>${formatPrice(lineTotal)}</p>
            </div>
            <button onclick="deleteItem(${index})">🗑</button>
        </div>
    `;
}

function templateBasketSummary(subtotal) {
    const total = subtotal + DELIVERY_FEE;
    return `
        <div class="basket_subtotal">
            <p>Subtotal</p>
            <p>${formatPrice(subtotal)}</p>
        </div>
        <div class="basket_delivery">
            <p>Delivery fee</p>
            <p>${formatPrice(DELIVERY_FEE)}</p>
        </div>
        <div class="basket-row"></div>
        <div class="basket_total">
            <p>Total</p>
            <p>${formatPrice(total)}</p>
        </div>
        <button class="basket_button" onclick="order()">Buy now (${formatPrice(total)})</button>
    `;
}

function increase(index) {
    menu[index].amount++;
    renderCategory();
    renderBasket();
}

function decrease(index) {
    if (menu[index].amount > 0) {
        menu[index].amount--;
    }
    renderCategory();
    renderBasket();
}

function deleteItem(index) {
    menu[index].amount = 0;
    renderCategory();
    renderBasket();
}

function addToBasket(index) {
    menu[index].amount++;
    renderCategory();
    renderBasket();
}

function showOrderMessage() {
    const messageRef = document.getElementById('orderMessage');
    messageRef.classList.add('show');
    setTimeout(() => messageRef.classList.remove('show'), 3000);
}

function mobileBarBasket() {
    document.getElementById('basketDialogContent').innerHTML = buildBasketHtml();
    basketDialogRef.showModal();
}

function templateMobileBarBasket() {
    return `
        <dialog>
            ${templateBasketArticle(item, index)};
        </dialog>
    `
}

function buildBasketHtml() {
    let articlesHtml = '';
    let subtotal = 0;
    for (let index = 0; index < menu.length; index++) {
        const item = menu[index];
        if (item.amount > 0) {
            subtotal += item.price * item.amount;
            articlesHtml += templateBasketArticle(item, index);
        }
    }
    if (subtotal === 0) {
        return templateBasketEmpty();
    }
    return articlesHtml + templateBasketSummary(subtotal);
}

function closeBasketDialog() {
    basketDialogRef.close();
}