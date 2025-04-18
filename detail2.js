let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function () {
    if (cart.style.right === '-100%') {
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
});

close.addEventListener('click', function () {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
});

let products = null;
let listCart = {};

// Fetch data
fetch('allProduct.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    })
    .catch(error => {
        console.error('Failed to fetch product data:', error);
    });

// Show product details and related products
function addDataToHTML() {
    const idProduct = new URLSearchParams(window.location.search).get('id');
    const info = products.find(product => product.id == idProduct);

    if (!info) {
        window.location.href = '/404.html'; // Redirect to a "not found" page
        return;
    }

    const detail = document.querySelector('.detail');
    detail.querySelector('.image img').src = info.image;
    detail.querySelector('.name').innerText = info.name;
    detail.querySelector('.price').innerText = 'KSh ' + info.price;
    detail.querySelector('.description').innerText = info.description;
    detail.querySelector('.addCart').dataset.id = info.id;

    // Add event listener for Add to Cart button in detail view
    detail.querySelector('.addCart').addEventListener('click', function () {
        addCart(this.dataset.id);
    });

    // Remove default HTML
    const listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    if (products) {
        products
            .filter(product => product.id != idProduct)
            .forEach(product => {
                const newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.innerHTML = `
                    <a href="/detail.html?id=${product.id}">
                        <img src="${product.image}" />
                    </a>
                    <h2>${product.name}</h2>
                    <div class="price">Ksh ${product.price}</div>
                    <button class="addCart" onclick="addCart(${product.id})">Add To Cart</button>   
                `;
                listProductHTML.appendChild(newProduct);
            });
    }
}

// Check cart from cookie
function checkCart() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));

    if (cookieValue) {
        try {
            listCart = JSON.parse(cookieValue.split('=')[1]);
        } catch (e) {
            listCart = {};
        }
    }
}
checkCart();

// Add item to cart
function addCart(idProduct) {
    idProduct = idProduct.toString();
    const product = products.find(p => p.id == idProduct);
    if (!product) return;

    if (!listCart[idProduct]) {
        listCart[idProduct] = {
            ...product,
            quantity: 1
        };
    } else {
        listCart[idProduct].quantity++;
    }

    updateCartCookie();
    addCartToHTML();
}

// Update cart in cookie
function updateCartCookie() {
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
}

// Show cart in HTML
function addCartToHTML() {
    const listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    const totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    Object.values(listCart).forEach(product => {
        const newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML = `
            <img src="${product.image}">
            <div class="content">
                <div class="name">${product.name}</div>
                <div class="price">Ksh ${product.price} / 1 product</div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${product.id}, '-')">-</button>
                <span class="value">${product.quantity}</span>
                <button onclick="changeQuantity(${product.id}, '+')">+</button>
            </div>
        `;
        listCartHTML.appendChild(newCart);
        totalQuantity += product.quantity;
    });

    totalHTML.innerText = totalQuantity;
}

// Change product quantity
function changeQuantity(idProduct, type) {
    idProduct = idProduct.toString();

    if (type === '+') {
        listCart[idProduct].quantity++;
    } else if (type === '-') {
        listCart[idProduct].quantity--;
        if (listCart[idProduct].quantity <= 0) {
            delete listCart[idProduct];
        }
    }

    updateCartCookie();
    addCartToHTML();
}

// Initial render
addCartToHTML();
