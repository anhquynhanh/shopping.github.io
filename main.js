let iconCart = document.querySelector('.iconCart')
let cart = document.querySelector('.cart')
let container = document.querySelector('.container')
let close = document.querySelector('.close')

iconCart.addEventListener('click', () => {
    if(cart.style.right == '-100%') {
        cart.style.right = '0'
        container.style.transform = 'translateX(-400px)'
    } else {
        cart.style.right = '-100%'
        container.style.transform = 'translateX(0)'
    }
})
close.addEventListener('click', () => {
    cart.style.right = '-100%'
    container.style.transform = 'translateX(0)'
})

let products = null
fetch('product.json')
.then(response => response.json())
.then(data => {
    products = data
    addDataToHTML()
})

function addDataToHTML() {
    let listProductHTML = document.querySelector('.listProduct')
    listProductHTML.innerHTML = ''

    if(products != null) {
        products.forEach(product => {
            let newProduct = document.createElement('div')
            newProduct.classList.add('item')
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">${product.price}VNĐ</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>`
            listProductHTML.appendChild(newProduct)
        });
    }
}
let listCart = []
function checkCart() {
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart = '))
    if(cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1])
    }
}

checkCart()
function addCart($idProduct) {
    let productCopy = JSON.parse(JSON.stringify(products))
    if(!listCart[$idProduct]) {
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0]
        listCart[$idProduct] = dataProduct
        listCart[$idProduct].quantity = 1
    } else {
        listCart[$idProduct].quantity++
    }
    let timeSave = "epires=Thu, 31 Dec 2025 23:59:59 UTC"
    document.cookie = "listCart = " + JSON.stringify(listCart) + "; " + timeSave + "; path =/;"
    addCartToHTML()
}
addCartToHTML()
function addCartToHTML() {
    let listCartHTML = document.querySelector('.listCart')
    listCartHTML.innerHTML = ''

    let totalHTML = document.querySelector('.totalQuantity')
    let toalQuantity = 0

    if(listCart) {
        listCart.forEach(product => {
            if(product) {
                let newCart = document.createElement('div')
                newCart.classList.add('item')
                newCart.innerHTML =
                `<img src="${product.image}" alt="">
                <div class="content">
                    <div class="name">
                        ${product.name}
                    </div>
                    <div class="price">
                        ${product.price}VNĐ/product
                    </div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>`
                listCartHTML.appendChild(newCart)
                toalQuantity = toalQuantity + product.quantity
            }
        })
    }
    totalHTML.innerText = toalQuantity
}

function changeQuantity($idProduct, $type) {
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++
            break
        case '-':
            listCart[$idProduct].quantity--
            if(listCart[$idProduct].quantity <= 0) {
                delete listCart[$idProduct]
            }
            break
        default:
            break
    }
    let timeSave = "epires=Thu, 31 Dec 2025 23:59:59 UTC"
    document.cookie = "listCart = " + JSON.stringify(listCart) + "; " + timeSave + "; path =/;"
    addCartToHTML()
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('listCart')
    if (storedCart) {
        listCart = JSON.parse(storedCart)
    }
}

loadCartFromLocalStorage()
addCartToHTML()

const picturesLink = document.querySelector("main h1[id='#image-container']");
const aboutLink = document.querySelector(".main-header a[href='#content-container']");
const contactLink = document.querySelector(".main-header a[href='#main-contact']");
const productsLink = document.querySelector(".main-header a[href='#listProduct']");

picturesLink.addEventListener("click", () => {
document.getElementById("image-container").scrollIntoView({ behavior: "smooth" });
});

aboutLink.addEventListener("click", () => {
document.getElementById("content-container").scrollIntoView({ behavior: "smooth" });
});

contactLink.addEventListener("click", () => {
document.getElementById("main-contact").scrollIntoView({ behavior: "smooth" });
});

productsLink.addEventListener("click", () => {
document.getElementById("listProduct").scrollIntoView({ behavior: "smooth" });
});