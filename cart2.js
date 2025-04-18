// Elements
const iconCart = document.querySelector('.iconCart');
const cart = document.querySelector('.cart');
const container = document.querySelector('.container');
const close = document.querySelector('.close');

const continue1 = document.querySelector('.continue1');
const signup = document.querySelector('.signup');
const code = document.querySelector('.code');
const continue2 = document.querySelector('.continue2');
const location1 = document.querySelector('.location1');
const continueAccount = document.querySelector('.continueAccount');
const checkout = document.querySelector('.checkout');

// Show signup when checkout is clicked
checkout.addEventListener('click', function () {
    signup.style.display = 'block';
    signup.style.left = '50%';
});

// Step 1: Signup -> Code
continue1.addEventListener('click', function () {
    if (signup.style.left === '50%') {
        signup.style.left = '-130%';
        signup.style.display = 'none';
        code.style.display = 'block';
        code.style.left = '50%';
    }
});

// Step 2: Code -> Location
continue2.addEventListener('click', function () {
    if (code.style.left === '50%') {
        code.style.left = '-140%';
        code.style.display = 'none';
        location1.style.display = 'block';
        location1.style.left = '50%';
    }
});

// Step 3: Location -> Done/Hide All
continueAccount.addEventListener('click', function () {
    if (location1.style.left === '50%') {
        location1.style.left = '-150%';
        location1.style.display = 'none';
        // You can show a "Thank You" or confirmation here
    }
});

// Cart open/close toggle
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


function addCartToHTML() {
    const listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';
    const totalPriceHTML = document.querySelector('.totalPrice');
    const totalHTML = document.querySelector('.totalQuantity');

    let totalQuantity = 0;
    let totalPrice = 0;

    if (listCart) {
        listCart.forEach(product => {
            if (product) {
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
                    </div>`;
                listCartHTML.appendChild(newCart);

                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        });
    }

    totalHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'Ksh ' + totalPrice.toFixed(2);
}
