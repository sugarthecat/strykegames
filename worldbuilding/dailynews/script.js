let tiles = []
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", 'Thursday', "Friday", "Saturday"]
let date = new Date();
let storyCount= 2;
function setup() {
    noStroke();
    let seed = date.getFullYear() * 500 + date.getMonth() * 40 + date.getDate()
    randomSeed(seed * 20)
    document.title = `Daily News (${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`
    updateDate();
    storyCount = floor(random(5, 10))
    
}

let rendered = false;
function draw() {
    if(!rendered && dataMax == dataLoaded){
        FormatData();
        rendered = true;
        for (let i = 0; i < storyCount; i++) {
            AddStory()
        }
    }
}

function AddStory() {
    let story = CreateStory();
    let storydiv = document.createElement("div")
    let header = document.createElement("h1")
    header.innerText = story.title
    let author = document.createElement("h3")
    author.innerText = "By "+ story.author
    let content = document.createElement("p")
    content.innerText = story.content

    storydiv.appendChild(header)
    storydiv.appendChild(author)
    storydiv.appendChild(content)
    document.getElementById("stories").appendChild(storydiv)
}

function setInnerHTML(id, value) {
    document.getElementById(id).innerHTML = value;
}

function updateDate() {
    let dateEnd = "th"
    let currDate = date.getDate()
    if (currDate % 10 == 3 && currDate != 13) {
        dateEnd = "rd"
    }
    if (currDate % 10 == 2 && currDate != 12) {
        dateEnd = "nd"
    }
    if (currDate % 10 == 1 && currDate != 11) {
        dateEnd = "st"
    }
    setInnerHTML("date", `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}${dateEnd}, ${date.getFullYear()}`)

}

function CreateStory() {
    let story = GetStory();
    return { title: story.title, author: getName(), content: story.content }
}

