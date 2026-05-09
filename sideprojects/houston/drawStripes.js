function drawStripes(author) {
    push()
    let bgcolor = color(0)
    let stripecolor = color(255)
    switch (author.toLowerCase()) {
        case "sherman":
            bgcolor = color(0, 0, 200)
            stripecolor = color(50, 50, 250)
            break;
        case "jester & zephyr":
            bgcolor = color(25)
            stripecolor = color(200, 0, 200)
            break;
        case "oculus":
            bgcolor = color(0)
            stripecolor = color(255)
            break;
        case "voltaire":
            bgcolor = color('#8ACE00')
            stripecolor = color('#B4DD1E')
            break;
        case "starling":
            bgcolor = color(0, 100, 0)
            stripecolor = color(0, 150, 0)
            break;
        case "zeitgeist":
            bgcolor = color(163, 22, 33)
            stripecolor = color(191, 219, 247)
            break;
        case "magus":
            bgcolor = color(147, 33, 145)
            stripecolor = color(255, 147, 0)
            break;
    }
    background(bgcolor)
    stroke(stripecolor)
    strokeWeight(20)
    const timeOffset = (millis() / 1000 * 30) % 60
    for (let i = 0; i < 20; i++) {
        line(i * 60 - timeOffset, 0, i * 60 - 100 - timeOffset, 400)
    }
    pop()
}
