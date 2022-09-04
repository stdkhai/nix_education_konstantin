let current = 0;
let prev = -1;
let slides = document.getElementsByClassName("slide");
let cart = []
let colorFilter = [];
let storageFilter = [];
let osFilter = [];
let displayFilter = [];
let currentFilter = [];


buildCart(localStorage)

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

function build(itemsArr) {
    while (document.getElementById("container-cards").firstChild) {
        document.getElementById("container-cards").removeChild(document.getElementById("container-cards").firstChild)
    }
    let itemsNum = itemsArr.length
    for (let i = 0; i < itemsNum; i++) {
        var div = document.createElement("div");
        let enabled = itemsArr[i].orderInfo.inStock
        if (enabled > 0) {
            enabled = "fa-circle-check"
            btnEnabled = ""
        } else {
            enabled = "fa-circle-xmark"
            btnEnabled = " disabled"
        }
        div.className = `card ${itemsArr[i].id}`;
        div.innerHTML = `<div class="product-photo">
    <img src="img/${itemsArr[i].imgUrl}" width="200" height="200" alt="product">
</div>
<div class="product-title">
${itemsArr[i].name}
</div>
<div class="stock-status">
    <i class="fa-solid ${enabled}"></i>
    <div class="stock-count"><span>${itemsArr[i].orderInfo.inStock}</span>left in stock</div>
</div>
<div class="product-price">
    Price: <span>${itemsArr[i].price}</span>$
</div>
<button class='add-to-cart${btnEnabled}'${btnEnabled}>Add to cart</button>
<div class="product-stats">
    <div class="stats-left">
        <i class="fa-solid fa-heart"></i>
        <div class="reviews">
            <span>${itemsArr[i].orderInfo.reviews}%</span> Positive reviews <br> Above avarage
        </div>
    </div>
    <div class="orders">
        <span>${getRandomInt(300, 1000)}</span><br>orders
    </div>
</div>`;
        document.getElementById("container-cards").appendChild(div)
    }

}

build(items)

items.forEach(e => {
    tempColor = e.color
    tempColor.forEach(i => {
        if (colorFilter[i] == null) {
            colorFilter[i] = []
        }
        colorFilter[i].push(e)
    });
    if (e.storage != null) {
        if (storageFilter[e.storage] == null) {
            storageFilter[e.storage] = []
        }
        storageFilter[e.storage].push(e)
    }

    if (e.os == null) {
        if (osFilter["other"] == null) {
            osFilter["other"] = []
        }
        osFilter["other"].push(e)
    } else {
        if (osFilter[e.os] == null) {
            osFilter[e.os] = []
        }
        osFilter[e.os].push(e)
    }
    if (e.display != null) {
        switch (true) {
            case Number(e.display) > 2 && Number(e.display) <= 5:
                val = "2-5"
                break;
            case Number(e.displaye) > 5 && Number(e.display) <= 7:
                val = "5-7"
                break;
            case Number(e.display) > 7 && Number(e.display) <= 12:
                val = "7-12"
                break;
            case Number(e.display) > 12 && Number(e.display) <= 16:
                val = "12-16"
                break;
            case Number(e.display) > 16:
                val = "16+"
                break;
            default:
                val = "other"
                break;
        }
        if (displayFilter[val] == null) {
            displayFilter[val] = []
        }
        displayFilter[val].push(e)
    }


});


Object.keys(colorFilter).forEach(e => {
    var li = document.createElement("li");
    li.className = `filter-attribute-item`;
    li.innerHTML = `<input type="checkbox" id="colour-attribute-${e}" class="filter-attribute-checkbox ib-m">
    <label for="colour-attribute-${e}" class="filter-attribute-label ib-m">
        ${e}
    </label>
    `;
    document.getElementById("filter-attribute-colour").appendChild(li)
});

Object.keys(storageFilter).forEach(e => {
    var li = document.createElement("li");
    li.className = `filter-attribute-item`;
    li.innerHTML = `<input type="checkbox" id="storage-attribute-${e}" class="filter-attribute-checkbox ib-m">
    <label for="storage-attribute-${e}" class="filter-attribute-label ib-m">
        ${e} ГБ
    </label>
    `;
    document.getElementById("filter-attribute-storage").appendChild(li)
});

Object.keys(osFilter).forEach(e => {
    var li = document.createElement("li");
    li.className = `filter-attribute-item`;
    li.innerHTML = `<input type="checkbox" id="os-attribute-${e}" class="filter-attribute-checkbox ib-m">
    <label for="os-attribute-${e}" class="filter-attribute-label ib-m">
        ${e}
    </label>
    `;
    document.getElementById("filter-attribute-os").appendChild(li)
});

Object.keys(displayFilter).forEach(e => {
    var li = document.createElement("li");
    li.className = `filter-attribute-item`;
    li.innerHTML = `<input type="checkbox" id="display-attribute-${e}" class="filter-attribute-checkbox ib-m">
    <label for="display-attribute-${e}" class="filter-attribute-label ib-m">
        ${e} inch
    </label>
    `;
    document.getElementById("filter-attribute-display").appendChild(li)
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
document.getElementById("adds").onclick=function (event) {
    let target = event.target;
    addToCart(target.className.split(" ")[2])
}
/* var a = document.getElementsByClassName('add-to-cart');
for (let i = 0; i < a.length; i++) {
    a[i].onclick = function (event) {
        let target=event.target;
        id = a[i].parentElement.className.split(" ")[a[i].parentElement.className.split(" ").length - 1];
        if (id == "text-container") {
            id = a[i].attributes["class"].nodeValue.split(" ")[2];
        }
        addToCart(id);
    };
} */

function addToCart(id) {
    val = localStorage.getItem(id)
    if (val==4) {
        alert("Неможливо додати більше 4 одиниць товару!");
        return;
    }
    if (val != null) {
        localStorage.setItem(id, Number(val) + 1)
    } else {
        localStorage.setItem(id, 1)
    }
    buildCart(localStorage)
}



//// filter accordion
function accordion(section, heading, list) {
    $(section).each(function () {
        var that = this,
            listHeight = $(this).find(list).height();

        $(this).find(heading).click(function () {
            $(this).toggleClass("plus");
            $(that).find(list).toggle({
                "height": "0"
            }, 250);
        });
    });
};

accordion('.filter-item', '.filter-item-inner-heading', '.filter-attribute-list');

document.getElementById("filter").onclick = function () {
    state = document.getElementsByClassName('filter')[0].className.split(" ")[1]
    switch (state) {
        case "active":
            document.getElementsByClassName('container-accordeon')[0].style.display = "none";
            document.getElementById("filter").className = "filter inactive"
            document.getElementById("filter").children[0].style.background = "var(--blue)"
            break;

        case "inactive":
            document.getElementsByClassName('container-accordeon')[0].style.display = "flex";
            document.getElementById('filter').className = "filter active"
            document.getElementById("filter").children[0].style.background = "var(--black)"
            break;
    }

}
let containerCards = document.getElementById("container-cards")
let cards = document.getElementsByClassName("card")

containerCards.onclick = function (event) {
    let target = event.target;
    if (target.className.split(" ")[0] == "add-to-cart" && target.className.split(" ")[1] != "disabled") {
        do {
            target = target.parentNode
        } while (!target.className.startsWith("card"));
        addToCart(target.className.split(" ")[1])
        return
    }
    while (target.parentNode.id != "container-cards") {
        target = target.parentNode
    }
    let cardID = target.className.split(" ")[1] - 1;
    let enabled = items[cardID].orderInfo.inStock
    if (enabled > 0) {
        enabled = "fa-circle-check"
        btnEnabled = ""
    } else {
        enabled = "fa-circle-xmark"
        btnEnabled = " disabled"
    }
    var div = document.createElement("div");
    div.className = "modal-content"
    div.innerHTML = `
      
                            <span class="modal-close">&times;</span>
                            <div class="modal-photo">
                                <img src="img/${items[cardID].imgUrl}" alt="">
                            </div>
                            <div class="modal-description">
                                <h1>${items[cardID].name}</h1>
                                <div class="product-stats">
                                    <div class="stats-left">
                                        <i class="fa-solid fa-heart"></i>
                                        <div class="reviews">
                                            <span>${items[cardID].orderInfo.reviews}%</span> Positive reviews <br> Above avarage
                                        </div>
                                    </div>
                                    <div class="orders">
                                        <span>${getRandomInt(300, 1000)}</span><br>orders
                                    </div>
                                </div>
                                <div class="description">
                                    <p>Color: <span>${items[cardID].color}</span></p>
                                    <p>Operating System: <span>${items[cardID].os}</span></p>
                                    <p>Chip: <span>${items[cardID].chip.name}</span></p>
                                    <p>Height: <span>${items[cardID].size.height}</span></p>
                                    <p>Width: <span>${items[cardID].size.width}</span></p>
                                    <p>Depth: <span>${items[cardID].size.depth}</span></p>
                                    <p>Weight: <span>${items[cardID].size.weight}</span></p>
                                </div>
                            </div>
                            <div class="modal-price">
                                <span>$ ${items[cardID].price}</span>
                                <div class="stock">
                                  <br>
                                Stock: <b>${items[cardID].orderInfo.inStock}</b>pcs.  
                                </div>
                                
                                <button class='add-to-cart${btnEnabled} ${items[cardID].id}'${btnEnabled}>Add to cart</button>

                            </div>
                       
        `;
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal").appendChild(div)

}
document.getElementById("modal").onclick = function (event) {
    let target = event.target;
    if (target.id == "modal" || target.className == "modal-close") {

        document.getElementById("modal").style.display = "none";
        document.getElementById("modal").removeChild(document.getElementsByClassName("modal-content")[0])
    } else {
        if (target.className.split(" ")[0] == "add-to-cart" && target.className.split(" ")[1] != "disabled") {
            addToCart(target.className.split(" ")[1]);
        }
        return
    }

}


/* update current filters */

function updateFilter() {
    priceFilter = [document.getElementById("price-attribute-min").value, document.getElementById("price-attribute-max").value]
    storageFilter = [...document.querySelectorAll('#filter-attribute-storage input:checked')].map(n => n.id.split("-")[2])
    osFilter = [...document.querySelectorAll('#filter-attribute-os input:checked')].map(n => { if (n.id.split("-")[2] == "other") { return null } else { return n.id.split("-")[2]; } })
    colorFilter = [...document.querySelectorAll('#filter-attribute-colour input:checked')].map(n => n.id.split("-")[2])
    displayFilter = [...document.querySelectorAll('#filter-attribute-display input:checked')].map(n => convertDisplay(n.id))
    build(items.filter((n => (
        (priceFilter[1] == 0 || (n.price >= priceFilter[0] && n.price <= priceFilter[1])) &&
        (!colorFilter.length || checkColour(n, colorFilter)) &&
        (!storageFilter.length || (n.storage != null && storageFilter.includes(n.storage.toString()))) &&
        (!osFilter.length || osFilter.includes(n.os)) &&
        (!displayFilter.length || checkDisplay(n, displayFilter))
    ))))
}

let filtersCB = document.getElementsByClassName("filter-attribute-checkbox ib-m")
for (let i = 0; i < filtersCB.length; i++) {
    filtersCB[i].onchange = updateFilter
}
document.getElementById("price-attribute-max").onblur = function () {
    if (document.getElementById("price-attribute-max").value < document.getElementById("price-attribute-min").value) {
        document.getElementById("price-attribute-min").value = document.getElementById("price-attribute-max").value;
    }
    updateFilter()
}

function convertDisplay(diap) {
    temp = diap.split("-");
    switch (true) {
        case temp.length == 4:
            return [temp[2], temp[3]]
        case temp[2] == "other":
            return null
        default:
            return [16, 1000]
    }
}


function checkColour(item, filterArr) {
    for (let i = 0; i < filterArr.length; i++) {
        if (item.color.includes(filterArr[i])) {
            return true
        }
    }
}

function checkDisplay(item, filterArr) {
    for (let i = 0; i < filterArr.length; i++) {
        if (filterArr[i] == null) {
            if (item.display == null) {
                return true
            }
            return false
        }
        if (filterArr[i].length == 2) {
            if (item.display >= filterArr[i][0] && item.display <= filterArr[i][1]) {
                return true
            }
        }

    }
}

function GetCartCount() {
    let res = 0
    Object.values(localStorage).forEach(val => {
        res += Number(val)
    });
    return res
}

function buildCart(storage) {
    while (document.getElementById("container-rows").firstChild) {
        document.getElementById("container-rows").removeChild(document.getElementById("container-rows").firstChild)
    }
    Object.keys(storage).forEach(key => {
        el = GetItemByID(Number(key))
        let buttonMinus, buttonPlus = ""
        if (storage[key] == 1) {
            buttonMinus = " disabled"
        }
        if (storage[key] >= 4) {
            buttonPlus = " disabled"
        }
        var div = document.createElement("div");
        div.className = `row-item`
        div.id = el.id
        div.innerHTML = ` <div class="item-preview">
        <img src="./img/${el.imgUrl}" alt="">
    </div>
    <div class="item-info">
    ${el.name} <br>
        <span>$${el.price}</span>
    </div>
    <div class="counter">
        <button class="counter-del"${buttonMinus}>
            &lt;
        </button>
        <span class="count">
            ${storage[key]}
        </span>
        <button class="counter-add"${buttonPlus}>
            &gt;
        </button>
    </div>
    <div class="remove-item">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
    </div>
</div>`
        document.getElementById("container-rows").appendChild(div)
    });

    document.getElementById("total-amount").innerHTML = `Total amount: <b>${GetCartCount()} ptc.</b>`
    document.getElementById("total-price").innerHTML = `Total price: <b>${GetPrice()}$</b> `
    $('.cart span.cart').html(GetCartCount());


}

function GetItemByID(id) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            return items[i]
        }
    }

}

function GetPrice() {
    let res = 0
    Object.keys(localStorage).forEach(key => {
        e = GetItemByID(key)
        res += localStorage[key] * e.price
    })
    return res
}

document.getElementById("container-rows").onclick = function (event) {
    let target = event.target;
    if (target.className == "fa fa-times-circle") {
        do {
            target = target.parentNode
        } while (target.className != "row-item");
        localStorage.removeItem(target.id);
        buildCart(localStorage)
    }
    if (target.className == "counter-del") {
        do {
            target = target.parentNode
        } while (target.className != "row-item");
        changeCount(target.id, "-")
    }
    if (target.className == "counter-add") {
        do {
            target = target.parentNode
        } while (target.className != "row-item");
        changeCount(target.id, "+")
    }
}

document.getElementById("cart").onclick = function (event) {
    let target = event.target
    if (target.id == "modal-cart") {
        return
    }
    while (target.id != "modal-cart") {
        target = target.parentNode
        console.log(target);
        if (target!=null){
            break
        }
        if (target.id == "modal-cart") {
            return
        }
    }
    if (document.getElementById("cart").title == "closed") {
        document.getElementById("modal-cart").style.display = "flex"
        document.getElementById("cart").title = "opened"
        return
    }
    if (document.getElementById("cart").title == "opened") {
        document.getElementById("modal-cart").style.display = "none"
        document.getElementById("cart").title = "closed"
        return
    }
}

function changeCount(id, change) {
    switch (change) {
        case "+":
            localStorage.setItem(id, Number(localStorage[id]) + 1)
            break;
        case "-":
            localStorage.setItem(id, Number(localStorage[id]) - 1)
            break;
    }
    buildCart(localStorage)

}