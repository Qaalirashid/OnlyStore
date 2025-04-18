let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let closeBtn = document.querySelector('.closeBtn');
let continue1 = document.querySelector('.continue1');
let signup = document.querySelector('.signup');
let code = document.querySelector('.code');
let continue2 = document.querySelector('.continue2');
let location1 = document.querySelector('.location1');
let continueAccount = document.querySelector('.continueAccount');
let checkout = document.querySelector('.checkout')
let menuIcon  = document.querySelector('.menuIcon');
let sidebar = document.querySelector('.sidebar');


checkout.addEventListener('click', function(){
    if(signup.style.left = '-150%'){
        signup.style.left = '50%';
    }else{
        signup.style.left = '-150%';
    }
})

closeBtn.addEventListener('closeBtn', function() {
    if(signup.style.left = '50%'){
        signup.style.left ='150%';
    }
})


continue1.addEventListener('click', function(){
    if(signup.style.left = '50%'){
        signup.style.left = '-130%';
        signup.style.display = 'none';
        code.style.left = '50%';
    }
})


    continue2.addEventListener('click', function(){
    if(code.style.left = '50%'){
        code.style.left = '-140%';
        location1.style.left = '50%'
    }
})



 continueAccount.addEventListener('click', function(){
    if(location1.style.left = '50%'){
        location1.style.left = '-150%';
    }
 })

 menuIcon.addEventListener('click', function(){
    if(sidebar.style.left = '-100%'){
        sidebar.style.left = '0';
    }else{
        sidebar.style.left = '-100%'
    }
})

close.addEventListener('click', function(){
    if(sidebar.style.left = '0'){
        sidebar.style.left = '-100%';
        container.style.padding = '';
    }
})



let products = null;
// get data from file json
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})

//show datas product in list 
function addDataToHTML(){
    // remove datas default from HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // add new datas
    if(products != null) // if has data
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<a href="/detail.html?id=${product.id}">
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
//use cookie so the cart doesn't get lost on refresh page


let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    //// If this product is not in the cart
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        //If this product is already in the cart.
        //I just increased the quantity
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');

    let totalQuantity = 0;

    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
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
                totalQuantity = totalQuantity + product.quantity;
               
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}




