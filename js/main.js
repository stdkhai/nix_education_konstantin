let numArticle = 0;
let current = 0;
let prev = -1;
let slides = document.getElementsByClassName("slide");
let itemsNum = items.length
let cart = []

setInterval(function () {
    current = current < slides.length - 1 ? current + 1 : 0;
    slides[current].style.opacity = 1;
    if (prev != -1) {
        slides[prev].style.opacity = 0;
    } else {
        slides[prev + 1].style.opacity = 0;
    }
    prev = current;
    $('.slideshow-title').html(slides[current].attributes["alt"].nodeValue)
    id = slides[current].attributes["class"].nodeValue.split(" ")[1]
    $('#adds').attr('class', `add-to-cart slideshow ${id}`)
}, 3000);



for (let i = 0; i < itemsNum; i++) {
    var div = document.createElement("div");
    let enabled = items[i].orderInfo.inStock
    if (enabled > 0) {
        enabled = "fa-circle-check"
        btnEnabled = ""
    } else {
        enabled = "fa-circle-xmark"
        btnEnabled = " disabled"
    }
    div.className = `card ${items[i].id}`;
    div.innerHTML = `<div class="product-photo">
    <img src="img/${items[i].imgUrl}" width="200" height="200" alt="product">
</div>
<div class="product-title">
${items[i].name}
</div>
<div class="stock-status">
    <i class="fa-solid ${enabled}"></i>
    <div class="stock-count"><span>${items[i].orderInfo.inStock}</span>left in stock</div>
</div>
<div class="product-price">
    Price: <span>${items[i].price}</span>$
</div>
<button class='add-to-cart${btnEnabled}'${btnEnabled}>Add to cart</button>
<div class="product-stats">
    <div class="stats-left">
        <i class="fa-solid fa-heart"></i>
        <div class="reviews">
            <span>${items[i].orderInfo.reviews}%</span> Positive reviews <br> Above avarage
        </div>
    </div>
    <div class="orders">
        <span>${getRandomInt(300, 1000)}</span><br>orders
    </div>
</div>`;
    document.getElementById("container-cards").appendChild(div)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var a = document.getElementsByClassName('add-to-cart');
for (let i = 0; i < a.length; i++) {
    a[i].onclick = function () {
        numArticle++;
        setTimeout(function () {
            $('.cart span').html(numArticle);
        }, 100);
        id = a[i].parentElement.className.split(" ")[a[i].parentElement.className.split(" ").length - 1];
        console.log(id);
        if (id == "text-container") {
            id = a[i].attributes["class"].nodeValue.split(" ")[2];
        }
        addToCart(id);
    };
}

function addToCart(id) {
    items.forEach(e => {
        if (e.id == id) {
            cart.push(e);
        }
    });
}