let eventslist = [
    { start: 0, duration: 15, title: "Exercise" },
    { start: 25, duration: 30, title: "Travel to work" },
    { start: 30, duration: 30, title: "Plan day" },
    { start: 60, duration: 15, title: "Review yesterday's commits" },
    { start: 100, duration: 15, title: "Code review" },
    { start: 180, duration: 90, title: "Have lunch with John" },
    { start: 360, duration: 30, title: "Skype call" },
    { start: 370, duration: 45, title: "Follow up with designer" },
    { start: 405, duration: 30, title: "Push up branch" },
]

for (let i = 0; i < eventslist.length; i++) {
    if (localStorage.getItem(i) == null) {
        localStorage.setItem(i, JSON.stringify(eventslist[i]))
    }

}



RebuildCalendar()


function RebuildCalendar() {
    for (let i = 0; i < eventslist.length; i++) {
        div = document.createElement("div")
        div.className = "event"
        let id = String(Math.floor(eventslist[i].start / 60)).padStart(2, "0")
        div.id = GetFormattedID(eventslist[i].start)
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
        div.innerHTML = eventslist[i].title

        $(`#${id}.events`).append(div)
        AddInvisible(eventslist[i].start, eventslist[i].duration, Math.floor(eventslist[i].start / 60))
    }
    FormatEvents()
}

function GetFormattedID(start) {
    return `${String(Math.floor(start / 60)).padStart(2, "0")}:${String(start % 60).padStart(2, "0")}`
}

function GetEventWidth(id) {
    let count = 1
    for (let i = id + 1; i < eventslist.length; i++) {
        if (eventslist[id].start + eventslist[id].duration >= eventslist[i].start) {
            count++
            count += Recurse(i)
        }
    }
    return Math.floor(100 / count) + "%"
}

function GetEventMargin(id) {
    let count = 1
    for (let i = 0; i < id; i++) {
        if (eventslist[i].start + eventslist[i].duration > eventslist[id].start) {
            count++
            count += Recurse(i)
        }
    }
    return 100 - Math.floor(100 / count) + "%"
}

function Recurse(id) {
    let i = id
    res = 0
    while (eventslist[i - 1].start + eventslist[i - 1].duration >= eventslist[i].start || i == 0) {
        res++
        i--
    }
    return res
}

/* function RecurseW(id) {
    let i = id
    res = 0
    while (eventslist[i - 1].start + eventslist[i - 1].duration >= eventslist[i].start || i == 0) {
        res++
        i--
    }
    return res


    if ($(".events")[i].children(".event").length!=0) {
        }
} */

function AddInvisible(start, duration, id) {
    if (id < Math.floor((start + duration) / 60)) {
        for (let i = id + 1; i <= Math.floor((start + duration) / 60); i++) {
            div = document.createElement("div")
            div.className = "event invisible"
            $(`#${String(i).padStart(2, "0")}.events`).append(div)
        }
    }
}

function FormatEvents() {
    let arr = document.getElementsByClassName("events")
    for (let i = 0; i < arr.length; i++) {
        console.log("ch", arr[i].childElementCount);
        if (arr[i].childElementCount > 0) {
            for (let j = 0; j < arr[i].childElementCount; j++) {
                console.log(j, "j");
                arr[i].children[j].style.width = /* 100/arr[i].childElementCount+"%" */GetEventWidth()
                if (arr[i].getElementsByClassName("event invisible").length == 0) {
                    console.log("nul");
                    arr[i].children[j].style.marginLeft = 100 - 100 / (j + 1) + "%"
                }
                arr[i].children[j].style.marginLeft = 100 - 100 / (arr[i].getElementsByClassName("event invisible").length + 1 + j) + "%"
            }
        }

    }
}

document.getElementById("container").onclick = function (event) {
    let target = event.target;
    switch (target.className) {
        case "event":
            console.log("touched");
            break;

        default:
            return

    }
}

document.getElementById('event-editor').addEventListener('submit', getFormValue);
document.getElementById('event-editor').addEventListener('reset', Hide)
function getFormValue(event) {
    event.preventDefault();
    
    const start = document.getElementById('event-editor').querySelector('[name="event-start"]'), 
    end = document.getElementById('event-editor').querySelector('[name="event-end"]'),
    title = document.getElementById('event-editor').querySelector('[name="event-caption"]'), 
    colour = document.getElementById('event-editor').querySelector('[name="event-colour"]');
    if (title.value=="") {
        document.getElementById("event-caption").style.borderColor="red"
    }
    const data = {
        title: title.value,
        colour: colour.value,
        start: start.value,
        end: end.value
    };
    if (data.end<=data.start) {
        document.getElementById("event-end").style.borderColor="red"
    } else{
        document.getElementById("event-end").style.borderColor="black" 
    }

}

function Hide(event) {
    event.preventDefault();
    document.getElementById("modal").style.display="none";

}


const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };