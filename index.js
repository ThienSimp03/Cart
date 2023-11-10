const listProduct = [
    {
        id: 1,
        img: 'image/img1.jpg',
        name: 'Product 1',
        price: 100000
    },
    {
        id: 2,
        img: 'image/img2.jpg',
        name: 'Product 2',
        price: 200000
    },
    {
        id: 3,
        img: 'image/img2.jpg',
        name: 'Product 3',
        price: 300000
    }
]

let cart_list = []

const list = document.querySelector('.product_list')
const cart = document.querySelector('.cart_container')
const total = document.querySelector('.cart_container--totalPrice')
let totalPrice = 0

const renderProduct = (listProduct) => {
    let htmls = listProduct.map((item) => {
        return `
            <div class="product_item">
                <div class="product_img">
                    <img src="${item.img}" alt="" />
                </div>
                <div class="product_title">Tên: ${item.name}</div>
                <div class="product_price">Giá: ${item.price}</div>
                <div class="product_btn">
                    <button onClick="addListProductToCart(${item.id})">Mua hàng</button>
                </div>
            </div>
        `
    })
    list.innerHTML = htmls.join('')
}

const renderCart = () => {
    totalPrice = 0
    let htmls = cart_list.map((item) => {
        totalPrice += item.quantity * item.price
        return `
            <div class="cart_item">
                <div class="cart_item--name">${item.name}</div>
                <div class="cart_item--quantity">
                    <input type="number" value="${item.quantity}" onChange="changeNumberCart(event, ${item.id})">
                </div>
                <div class="cart_item--price">${item.price}</div>
                <div class="cart_item--totalPrice">${item.quantity * item.price}</div>
                <div class="cart_item--remove" onClick="removeItemCart(${item.id})">Xóa</div>
            </div>
        `
    })
    cart.innerHTML = htmls.join('')
    total.innerHTML = totalPrice
}

const changeNumberCart = (e, id) => {
    cart_list.map((item) => {
        if (item.id === id) {
            item.quantity = Number(e.target.value)
        }
    })
    renderCart(cart_list)
}

const removeItemCart = (id) => {
    const newCartList = cart_list.filter((item) => item.id !== id)
    cart_list = [...newCartList]
    renderCart()
}

const addListProductToCart = (id) => {
    if (cart_list.find((item) => item.id === id)) {
        cart_list.map((item) => {
            if (item.id === id) {
                item.quantity += 1
            }
        })
    } else {
        const product = listProduct.find((item) => item.id === id)
        cart_list.push({ ...product, quantity: 1 })
    }
    renderCart(cart_list)
}

renderProduct(listProduct)
renderCart(cart_list)
