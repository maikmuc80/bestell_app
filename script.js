const menu = [
  // Burger & Sandwiches
  {
    category: "Burger & Sandwiches",
    image: "./assets/img/Veggie_mushroom_black_burger.jpg",
    name: "Veggie mushroom black burger",
    description: "Mixed green salad, Tomatoes, Edamame, Mushrooms",
    price: 16.90,
    amount: 1
  },
  {
    category: "Burger & Sandwiches",
    image: "./assets/img/All_meat_burger.jpg",
    name: "All meat burger",
    description: "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce",
    price: 15.90,
    amount: 0
  },
  {
    category: "Burger & Sandwiches",
    image: "./assets/img/Beef_red_burger.jpg",
    name: "Beef red burger",
    description: "Beef, Cheese, Tomatoes, Lettuce, Onion",
    price: 14.90,
    amount: 0
  },
  {
    category: "Burger & Sandwiches",
    image: "./assets/img/BIg_chicken_burger.jpg",
    name: "Big chicken burger",
    description: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper",
    price: 15.90,
    amount: 0
  },

  // Pizza (30cm)
  {
    category: "Pizza",
    image: "./assets/img/Pizza_Margherita.jpg",
    name: "Pizza Margherita",
    description: "Tomato Sauce, Mozzarella",
    price: 11.90,
    amount: 0
  },
  {
    category: "Pizza",
    image: "./assets/img/Pizza_Chorizo.jpg",
    name: "Pizza Chorizo",
    description: "Tomato slices, Mozzarella, Chorizo",
    price: 13.90,
    amount: 0
  },
  {
    category: "Pizza",
    image: "./assets/img/Funghi.jpg",
    name: "Funghi",
    description: "Red onion, Olives, Button Mushrooms, Mozzarella",
    price: 12.90,
    amount: 0
  },
  {
    category: "Pizza",
    image: "./assets/img/Quattro_Formaggi_with_Chicken.jpg",
    name: "Quattro Formaggi with Chicken",
    description: "Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
    price: 15.90,
    amount: 0
  },

  // Salad
  {
    category: "Salad",
    image: "./assets/img/Warm_beef_arugula_salad.jpg",
    name: "Warm beef arugula salad",
    description: "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Sun-dried Tomatoes, Balsamic-vinegar dressing",
    price: 16.90,
    amount: 0
  },
  {
    category: "Salad",
    image: "./assets/img/Mini_green_Salad.jpg",
    name: "Mini green Salad",
    description: "Green salad, Cucumber, Carrots, Parsley, Radishes",
    price: 7.90,
    amount: 0
  },
  {
    category: "Salad",
    image: "./assets/img/Green_Salad_with_sea_food.jpg",
    name: "Green Salad with sea food",
    description: "Mixed greens, Cherry tomatoes, Red onion, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing with dill",
    price: 16.90,
    amount: 0
  },
  {
    category: "Salad",
    image: "./assets/img/Vegan_green_salad_with_tofu.jpg",
    name: "Vegan green salad with tofu",
    description: "Green salad, Cherry tomatoes, Cucumber, Baby spinach, Edamame, Radishes, Bittercress, Tofu, Peanuts",
    price: 14.90,
    amount: 0
  }
];

const categoryRef = document.getElementById('category');

const categoryIcons = {
    "Burger & Sandwiches": "./assets/icon/burger.png",
    "Pizza": "./assets/icon/pizza.png",
    "Salad": "./assets/icon/salad.png"
};

const basketRef = document.getElementById('basket');
const DELIVERY_FEE = 4.99;

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
            <div>
                <img class="article_picture" src="${item.image}" alt="${item.name}">
            </div>
            <div class="article_description_price">
                <div>
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
        basketRef.innerHTML = templateBasketEmpty();
        return;
    }
    basketRef.innerHTML = articlesHtml + templateBasketSummary(subtotal);
}

function templateBasketEmpty() {
    return `<p class="basket_empty">Your basket is empty.</p>`;
}

function templateBasketArticle(item, index) {
    const lineTotal = item.price * item.amount;
    return `
        <article class="article_basket">
            <div class="article_basket_description">
                <h3>${item.name}</h3>
                <button onclick="deleteItem(${index})"><img src="./assets/icon/delete.png" alt=""></button>
            </div>
            <div class="article_basket_price">
                <div>
                    <button onclick="decrease(${index})">-</button>
                    ${item.amount}
                    <button onclick="increase(${index})">+</button>
                </div>
                <div>${formatPrice(lineTotal)}</div>
            </div>
        </article>
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