let numArticle = 0;
let current = 0;
let prev = -1;
let slides = document.getElementsByClassName("slide");
let itemsNum = items.length
let cart = []
let colorFilter = [];
let storageFilter = [];
let osFilter = [];
let displayFilter = [];

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

var a = document.getElementsByClassName('add-to-cart');
for (let i = 0; i < a.length; i++) {
    a[i].onclick = function () {
        numArticle++;
        setTimeout(function () {
            $('.cart span').html(numArticle);
        }, 100);
        id = a[i].parentElement.className.split(" ")[a[i].parentElement.className.split(" ").length - 1];

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

let cards = document.getElementsByClassName("card")

for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = function () {
        let cardID = cards[i].className.split(" ")[1];
        let enabled = items[cardID - 1].orderInfo.inStock
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
                                <img src="img/${items[cardID - 1].imgUrl}" alt="">
                            </div>
                            <div class="modal-description">
                                <h1>${items[cardID - 1].name}</h1>
                                <div class="product-stats">
                                    <div class="stats-left">
                                        <i class="fa-solid fa-heart"></i>
                                        <div class="reviews">
                                            <span>${items[cardID - 1].orderInfo.reviews}%</span> Positive reviews <br> Above avarage
                                        </div>
                                    </div>
                                    <div class="orders">
                                        <span>${getRandomInt(300, 1000)}</span><br>orders
                                    </div>
                                </div>
                                <div class="description">
                                    <p>Color: <span>${items[cardID - 1].color}</span></p>
                                    <p>Operating System: <span>${items[cardID - 1].os}</span></p>
                                    <p>Chip: <span>${items[cardID - 1].chip.name}</span></p>
                                    <p>Height: <span>${items[cardID - 1].size.height}</span></p>
                                    <p>Width: <span>${items[cardID - 1].size.width}</span></p>
                                    <p>Depth: <span>${items[cardID - 1].size.depth}</span></p>
                                    <p>Weight: <span>${items[cardID - 1].size.width}</span></p>
                                </div>
                            </div>
                            <div class="modal-price">
                                <span>$ ${items[cardID - 1].price}</span>
                                <div class="stock">
                                  <br>
                                Stock: <b>${items[cardID - 1].orderInfo.inStock}</b>pcs.  
                                </div>
                                
                                <button class='add-to-cart${btnEnabled} ${items[cardID - 1].id}'${btnEnabled}>Add to cart</button>

                            </div>
                       
        `;
        document.getElementById("modal").style.display = "flex";
        document.getElementById("modal").appendChild(div)

    }

}

document.getElementById("modal").onclick = function (event) {
    let target = event.target;
    if (target.id == "modal" || target.className == "modal-close") {

        document.getElementById("modal").style.display = "none";
        document.getElementById("modal").removeChild(document.getElementsByClassName("modal-content")[0])
    } else {
        if (target.className.split(" ")[0] == "add-to-cart" && target.className.split(" ")[1] != "disabled") {

            numArticle++;
            setTimeout(function () {
                $('.cart span').html(numArticle);
            }, 100);

            addToCart(target.className.split(" ")[1]);
        }
        return
    }

}


