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
            stripecolor = color(200,0,200)
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
