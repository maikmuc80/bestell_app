const menu = [
  // Burger & Sandwiches
  {
    category: "Burger & Sandwiches",
    image: "./assets/img/Veggie_mushroom_black_burger.jpg",
    name: "Veggie mushroom black burger",
    description: "Mixed green salad, Tomatoes, Edamame, Mushrooms",
    price: 16.90,
    amount: 0
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

function init(){
  renderCategory();
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
                    <button onclick="addToBasket(${index})">add to basket</button>
                </div>
            </div>
        </article>
    `;
}

