class Assets {
    static loadAssets() {
        this.slop = [
            loadImage("assets/ai_slop/slop1.jpg"),
            loadImage("assets/ai_slop/slop2.jpg"),
            loadImage("assets/ai_slop/slop3.png"),
            loadImage("assets/ai_slop/slop4.png"),
            loadImage("assets/ai_slop/slop5.jpg"),
            loadImage("assets/ai_slop/slop6.jpg"),
            loadImage("assets/ai_slop/slop7.jpg"),
            loadImage("assets/ai_slop/slop8.jpg"),
            loadImage("assets/ai_slop/slop9.png"),
            loadImage("assets/ai_slop/slop10.jpg"),
            loadImage("assets/ai_slop/slop11.jpg"),
            loadImage("assets/ai_slop/slop12.jpg"),
            loadImage("assets/ai_slop/slop13.jpg"),
        ]
        this.silhouettes = {
            banana: loadImage("assets/silhouettes/banana.png"),
            bread: loadImage("assets/silhouettes/bread.png"),
            eyebrows: loadImage("assets/silhouettes/eyebrows.png"),
            eyes: loadImage("assets/silhouettes/eyes.png"),
            feather: loadImage("assets/silhouettes/feather.png"),
            fourtytwo: loadImage("assets/silhouettes/fourtytwo.png"),
            glasses: loadImage("assets/silhouettes/glasses.png"),
            gorilla: loadImage("assets/silhouettes/gorilla.png"),
            human: loadImage("assets/silhouettes/human.png"),
            leg: loadImage("assets/silhouettes/leg.png"),
            mouse: loadImage("assets/silhouettes/mouse.png"),
            mouth: loadImage("assets/silhouettes/mouth.png"),
            no: loadImage("assets/silhouettes/no.png"),
            one: loadImage("assets/silhouettes/one.png"),
            pi: loadImage("assets/silhouettes/pi.png"),
            polyethylene: loadImage("assets/silhouettes/polyethylene.png"),
            sandwich: loadImage("assets/silhouettes/sandwich.png"),
            snake: loadImage("assets/silhouettes/snake.png"),
            six: loadImage("assets/silhouettes/six.png"),
            table: loadImage("assets/silhouettes/table.png"),
            tentacles: loadImage("assets/silhouettes/tentacles.png"),
            treebark: loadImage("assets/silhouettes/treebark.png"),
            wheel: loadImage("assets/silhouettes/wheel.png"),
            wheat: loadImage("assets/silhouettes/wheat.png"),
            yes: loadImage("assets/silhouettes/yes.png"),
        }
        this.background = loadImage("assets/background.png")
        this.titleoverlay = loadImage("assets/titlescreen.png")
        this.nuts = [
            loadImage("assets/nut/plate.jpg"),
            loadImage("assets/nut/burger.jpg"),
            loadImage("assets/nut/beach.jpg")
        ]
        this.cooking = {
            cheese:{
                raw: loadImage("assets/cooking/cheese_raw.png"),
                cooked: loadImage("assets/cooking/cheese_cooked.png"),
                overcooked: loadImage("assets/cooking/cheese_overcooked.png")
            },
            
            bread:{
                raw: loadImage("assets/cooking/bread_raw.png"),
                cooked: loadImage("assets/cooking/bread_cooked.png"),
                overcooked: loadImage("assets/cooking/bread_overcooked.png")
            },
            patty:{
                raw: loadImage("assets/cooking/meat_raw.png"),
                cooked: loadImage("assets/cooking/meat_cooked.png"),
                overcooked: loadImage("assets/cooking/meat_overcooked.png")
            },
            bacon:{
                raw: loadImage("assets/cooking/bacon_raw.png"),
                cooked: loadImage("assets/cooking/bacon_cooked.png"),
                overcooked: loadImage("assets/cooking/bacon_overcooked.png")
            },
            paper:{
                raw: loadImage("assets/cooking/paper_raw.png"),
                cooked: loadImage("assets/cooking/paper_cooked.png"),
                overcooked: loadImage("assets/cooking/paper_overcooked.png")
            },
            circuit_board: loadImage("assets/cooking/circuit_board.png")
        }
    }
}