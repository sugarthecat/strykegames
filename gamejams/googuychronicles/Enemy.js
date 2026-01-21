class Enemy {

    constructor(
        patrolXStart, patrolXEnd, floor, spritesheet = Assets.spritesheets.armyguy, minDist = 100, maxDist = 250, speed = 120,
        attentionSpan = 5, stunTime = 1
    ) {  //same as player pos
        this.x = random(patrolXStart * 350, patrolXEnd * 350); //spawns randomly within the patrol spot
        this.spritesheet = spritesheet;
        this.xStart = patrolXStart * 350 + 350 / 2;
        this.xEnd = patrolXEnd * 350 + 350 / 2;
        this.y = floor * -350 + 200;
        this.w = 40;
        this.h = 100;
        this.minDist = minDist;
        this.maxDist = maxDist;
        this.lostPlayerTimer = 0;
        this.stunTime = 0;
        this.speed = speed;
        this.atDistance = false;
        this.spottedPlayer = false;
        this.facingRight = true;
        this.alive = true;
        this.attentionSpan = attentionSpan;
        this.stun = stunTime;
        this.walkingProgress = 0;
    }

    Update(player) {
        let distToPlayer = abs(this.x - player.x)  //X dist
        let yDist = abs(this.y - player.y)
        if (this.spottedPlayer) {
            if (yDist > this.h / 2 + player.y / 2 || distToPlayer > 400) {  //if it cannot see the player, increase lost player time by 1 second each
                this.lostPlayerTimer += deltaTime / 1000;
            } else {
                this.lostPlayerTimer = 0;
            }
            if (this.lostPlayerTimer > this.attentionSpan) {   //stun the enemy for 2 seconds
                this.stunTime = 2;
                this.spottedPlayer = false
            }
        }
        //checks if the enemy can spot the player
        //If the enemy is not stunned and the player comes within 250 horizontal distance and 100 vertical distance while facing the enemy, 
        // it triggers spottedPlayer = true.
        if (!this.spottedPlayer && yDist < 100 && distToPlayer < 250 && ((this.x > player.x && !this.facingRight) || (this.x < player.x && this.facingRight))) {
            this.spottedPlayer = true
            this.atDistance = false
        }
        this.walkingProgress %= 2;
        if (this.stunTime > 0) { //not going to walk
            this.walkingProgress = 0;
            this.stunTime -= deltaTime / 1000;
        } else if (this.spottedPlayer) {
            this.facingRight = this.x < player.x
            if (distToPlayer > this.maxDist) {
                this.atDistance = false
            }
            let movement = this.speed * deltaTime / 1000;
            if (this.atDistance || distToPlayer < this.minDist) {  //not walking
                this.atDistance = true;
                this.walkingProgress = 0
            }
            else if (player.x > this.x) {  //determines if the enemy moves right or left, by facing right or left
                this.x += movement
                this.walkingProgress += deltaTime / 400;
            } else {
                this.x -= movement
                this.walkingProgress += deltaTime / 400;
            }
        } else { //Patrol Behavior
            let movement = this.speed * deltaTime / 2500;
            if (this.facingRight) {
                this.x += movement;
                this.walkingProgress += deltaTime / 1000;
                if (this.x > this.xEnd) {  //if it reaches its patrol end, turn left and head back
                    this.facingRight = false;
                    this.stunTime = 3;
                }
            } else {
                this.x -= movement;
                this.walkingProgress += deltaTime / 1000;
                if (this.x < this.xStart) { //if it reaches the start of its patrol start, turn right and head back
                    this.facingRight = true;
                    this.stunTime = 3;
                }

            }
        }
    }
    Stun() {
        this.stunTime = this.stun
    }
    Draw() {
        push()
        noStroke()
        fill(0)
        translate(this.x, this.y)
        if (!this.facingRight) {
            scale(-1, 1)
        }
        if (this.spottedPlayer) {   //draws the alert symbol above enemy head
            image(Assets.symbols.alert, -this.w / 2, -this.h, this.w, this.h / 2)
        }
        image(this.spritesheet, - this.w * 3 / 4, 5 - this.h / 2, this.w * 2, this.h,   //rendering the enemy
            this.spritesheet.width / 2 * (floor(this.walkingProgress + 1) % 2), 0,
            this.spritesheet.width / 2, this.spritesheet.height)
        pop()
    }
    spotPlayer() {
        if (!this.spottedPlayer) {
            this.Stun();
        }
        this.spottedPlayer = true
    }
}