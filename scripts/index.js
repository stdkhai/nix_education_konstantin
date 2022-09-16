let eventslist = [
   
]

let nowEvents = [];
let currSize = document.documentElement.clientWidth;
$(window).resize(function () {
    if (document.documentElement.clientWidth != currSize) {
        currSize = document.documentElement.clientWidth;
        FormatEvents()
    }
})

function GetEventList() {
    eventslist = []
    Object.keys(localStorage).forEach((key) => {
        eventslist.push(JSON.parse(localStorage[key]))
        eventslist[eventslist.length - 1].mute = false
    });
}
function UpdateLocalStorage() {
    localStorage.clear()
    eventslist.sort((a, b) => (a.start > b.start) ? 1 : -1)
    for (let i = 0; i < eventslist.length; i++) {
        eventslist[i].id = i
        localStorage.setItem(i, JSON.stringify(eventslist[i]))

    }
}

function Notificate() {
    for (let i = 0; i < eventslist.length; i++) {
        const now = new Date();
        if (now.getHours() * 60 + now.getMinutes() > eventslist[i].start && now.getHours() * 60 + now.getMinutes() < eventslist[i].start + eventslist[i].duration) {
            eventslist[i].active = true
        } else {
            eventslist[i].active = false
        }
    }
    BuildNotifications(eventslist)
}


GetEventList()
UpdateLocalStorage()
RebuildCalendar()

setInterval(Notificate, 10);

function BuildNotifications(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].active && !arr[i].mute) {
            div = document.createElement("div")
            div.className = "notification"
            div.innerHTML = `<i class="fa-solid fa-xmark"></i>
                                <div class="info">
                                    <i class="fa-solid fa-business-time"></i>
                                    <div class="title">${arr[i].title} already started!</div>
                                </div>`
            document.getElementById("ntf").appendChild(div)
            arr[i].mute = true
        }

    }

}

function RebuildCalendar() {
    toClear = document.getElementsByClassName("events");
    for (let i = 0; i < toClear.length; i++) {
        while (toClear[i].firstChild) {
            toClear[i].removeChild(toClear[i].lastChild)
        }

    }
    eventslist.sort((a, b) => (a.duration < b.duration) ? 1 : -1)
    for (let i = 0; i < eventslist.length; i++) {
        div = document.createElement("div")
        div.className = `event ${GetFormattedID(eventslist[i].start)}`
        div.title = eventslist[i].title
        let id = String(Math.floor(eventslist[i].start / 60)).padStart(2, "0")
        div.id =eventslist[i].id
        if (eventslist[i].duration < 10) {
            div.style.height = "10px"
            div.style.fontSize = "10px"
        } else {
            div.style.height = String(eventslist[i].duration) + "px"
            if (eventslist[i].duration < 30) {
                div.style.fontSize = String(eventslist[i].duration - 2) + "px"
            }
        }
        div.style.marginTop = String(eventslist[i].start % 60) + "px"
        div.style.backgroundColor = `rgba(${eventslist[i].colour}, 0.5)`
        div.style.borderLeftColor = `rgba(${eventslist[i].colour}, 1)`
        div.innerHTML = eventslist[i].title
        $(`#${id}.events`).append(div)
    }
    AddInvisible()
    FormatEvents()

}

function GetFormattedID(start) {
    return `${String(Math.floor(start / 60)).padStart(2, "0")}:${String(start % 60).padStart(2, "0")}`
}

function AddInvisible() {
    eventslist.sort((a, b) => (a.start > b.start) ? 1 : -1)
    for (let j = 0; j < eventslist.length; j++) {
        if (Math.floor(eventslist[j].start / 60) < Math.floor((eventslist[j].start + eventslist[j].duration) / 60)) {
            for (let i = Math.floor(eventslist[j].start / 60) + 1; i <= Math.floor((eventslist[j].start + eventslist[j].duration) / 60); i++) {
                div = document.createElement("div")
                div.className = "event invisible"
                insertAtIndex(FindIndexOfChild(/* GetFormattedID(eventslist[j].start) */eventslist[j].id), i, div);
            }
        }
    }

}

function FindIndexOfChild(time) {
    arr = document.getElementsByClassName("events")
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].childElementCount; j++) {
            if (arr[i].children[j].id == time) {
                return j
            }
        }
    }
}

function insertAtIndex(i, j, d) {
    if (i == 0) {
        $(`#${String(j).padStart(2, "0")}.events`).prepend(d);
        return;
    }

    if ($(`#${String(j).padStart(2, "0")}.events`).children().length < i) {
        $(`#${String(j).padStart(2, "0")}.events`).append(d);
        return
    }
    $(`#${String(j).padStart(2, "0")}.events > div:nth-child(` + (i) + ")").after(d);
}

function FormatEvents() {
    let arr = document.getElementsByClassName("events")
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].childElementCount > 0) {
            for (let j = 0; j < arr[i].childElementCount; j++) {
                if (arr[i].childElementCount * 200 <= arr[i].offsetWidth) {
                    arr[i].children[j].style.width = "200px"
                    arr[i].children[j].style.marginLeft = 200 * j + "px"
                } else {
                    arr[i].children[j].style.width = arr[i].offsetWidth / arr[i].childElementCount + "px"
                    arr[i].children[j].style.marginLeft = arr[i].offsetWidth / arr[i].childElementCount * j + "px"
                }

            }
        }

    }
}

document.onclick = function (event) {
    let target = event.target;
    switch (target.className.split(" ")[0]) {
        case "event":
            DialogToEditEvent(target.id)
            break;
        case "events":
            DialogToAddEvent(target.id)
            break;
        case "fa-solid":
            if (target.className.split(" ")[1]=="fa-xmark") {
                CloseNotification(target)
            }
            break;


    }
    switch (target.id) {
        case "sumbit":
            getFormValue(event)
            break;
        case "reset":
            Hide(event)
            break;
        case "delete":
            event.preventDefault();
            DelEvent(target.value)
            Hide(event)
            break;
        case "update":
            event.preventDefault();
            UpdateEvent(target.value, event)
            break;
    }
}

function DialogToEditEvent(time) {
    e = GetEventByID(time)
    div = document.createElement("div")
    div.className = "modal-event"
    div.innerHTML = `<form id="event-editor">
        <div class="span">
            Назва події
        <input type="text" name="event-caption" id="event-caption" value="${e.title}">
        </div>
        <div class="span">
            Виберіть колір<input type="color" name="event-colour" id="event-colour" value="${RGBToHex(e.colour.split(",")[0], e.colour.split(",")[1], e.colour.split(",")[2])}">
        </div>
        <div class="span">
            Виберіть час початку події 
        <input type="time" name="event-start" id="event-start" value="${GetFormattedID(e.start)}">
        </div>
        <div class="span">
            Виберіть час кінця події
        <input type="time"  name="event-end" id="event-end" value="${GetFormattedID(e.start + e.duration)}">
        </div>
        <div class="span-button">
            <button id="update" value="${time}">Save</button>
            <button type="reset" id="reset">Cancel</button>
            <button id="delete" value="${time}">Delete</button>
        </div>
    </form>`
    document.getElementById("modal").appendChild(div)
    document.getElementById("modal").style.display = "block";
}

function DialogToAddEvent(time) {
    div = document.createElement("div")
    div.className = "modal-event"
    div.innerHTML = `<form id="event-editor">
        <div class="span">
            Назва події
        <input type="text" name="event-caption" id="event-caption">
        </div>
        <div class="span">
            Виберіть колір<input type="color" name="event-colour" id="event-colour" value="#006edc">
        </div>
        <div class="span">
            Виберіть час початку події 
        <input type="time" name="event-start" id="event-start" value="${time}:00">
        </div>
        <div class="span">
            Виберіть час кінця події
        <input type="time"  name="event-end" id="event-end">
        </div>
        <div class="span-button">
            <button type="submit" id="sumbit">Save</button>
        <button type="reset" id="reset">Cancel</button>
        </div>
        
    </form>`
    document.getElementById("modal").appendChild(div)
    document.getElementById("modal").style.display = "block";
}

function AddEvent(e) {
    eventslist.push(e)
    UpdateLocalStorage()
    GetEventList()
    RebuildCalendar()
    window.location.reload();
}

function DelEvent(time) {
    e = GetEventByID(time)
    const index = eventslist.indexOf(e);
    if (index > -1) {
        eventslist.splice(index, 1);
    }
    UpdateLocalStorage()
    GetEventList()
    RebuildCalendar()
    window.location.reload();
}

function UpdateEvent(time, event) {
    e = GetEventByID(time)
    const index = eventslist.indexOf(e);
    if (index > -1) {
        const start = document.getElementById('event-editor').querySelector('[name="event-start"]'),
            end = document.getElementById('event-editor').querySelector('[name="event-end"]'),
            title = document.getElementById('event-editor').querySelector('[name="event-caption"]'),
            colour = document.getElementById('event-editor').querySelector('[name="event-colour"]');
        if (title.value == "") {
            document.getElementById("event-caption").style.borderColor = "red"
            return
        } else {
            document.getElementById("event-caption").style.borderColor = "green"
        }
        const data = {
            title: title.value,
            colour: colour.value,
            start: start.value,
            end: end.value
        };
        if (data.end <= data.start) {
            document.getElementById("event-end").style.borderColor = "red"
            return
        } else {
            document.getElementById("event-end").style.borderColor = "green"
        }
        if (data.start == "") {
            document.getElementById("event-start").style.borderColor = "red"
            return
        } else {
            document.getElementById("event-start").style.borderColor = "green"
        }

        formData = {
            start: Number(data.start.split(":")[0] * 60) + Number(data.start.split(":")[1]),
            duration: Number(data.end.split(":")[0] * 60) + Number(data.end.split(":")[1]) - Number(data.start.split(":")[0] * 60) + Number(data.start.split(":")[1]),
            title: data.title,
            colour: hex2rgb(data.colour)
        }
        eventslist[index] = formData
    }
    Hide(event)
    UpdateLocalStorage()
    GetEventList()
    RebuildCalendar()
    window.location.reload();
}

function getFormValue(event) {
    event.preventDefault();
    const start = document.getElementById('event-editor').querySelector('[name="event-start"]'),
        end = document.getElementById('event-editor').querySelector('[name="event-end"]'),
        title = document.getElementById('event-editor').querySelector('[name="event-caption"]'),
        colour = document.getElementById('event-editor').querySelector('[name="event-colour"]');
    if (title.value == "") {
        document.getElementById("event-caption").style.borderColor = "red"
        return
    } else {
        document.getElementById("event-caption").style.borderColor = "green"
    }
    const data = {
        title: title.value,
        colour: colour.value,
        start: start.value,
        end: end.value
    };
    if (data.end <= data.start) {
        document.getElementById("event-end").style.borderColor = "red"
        return
    } else {
        document.getElementById("event-end").style.borderColor = "green"
    }
    if (data.start == "") {
        document.getElementById("event-start").style.borderColor = "red"
        return
    } else {
        document.getElementById("event-start").style.borderColor = "green"
    }

    formData = {
        start: Number(data.start.split(":")[0] * 60) + Number(data.start.split(":")[1]),
        duration: Number(data.end.split(":")[0] * 60) + Number(data.end.split(":")[1]) - Number(data.start.split(":")[0] * 60) + Number(data.start.split(":")[1]),
        title: data.title,
        colour: hex2rgb(data.colour)
    }
    AddEvent(formData)


}

function Hide(event) {
    event.preventDefault();
    document.getElementById("modal").removeChild(document.getElementById("modal").lastChild)
    document.getElementById("modal").style.display = "none";

}

function CloseNotification(t) {
    while (t.className!="notification") {
        t=t.parentNode
    }
    t.remove()
}


const hex2rgb = (hex) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `${r},${g},${b}`;
};
function RGBToHex(r, g, b) {
    r = Number(r).toString(16);
    g = Number(g).toString(16);
    b = Number(b).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function GetEventByID(id) {
   
    return eventslist.find(o => o.id == id);
}