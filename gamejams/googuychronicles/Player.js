const TIME_TO_EAT_HUMAN = 2;
class Player {
    constructor(roomX, roomY) {
        this.x = 150 + roomX * 350;
        this.y = -150 - roomY * 350;
        this.size = 30;
        this.speed = 100;
        this.vertVelocity = 0;
        this.hVelocity = 0;
        this.hanging = false;
        this.toInteract = false;
        this.canJump = true;
        this.lookingRight = false;
        this.eatingEnemyTime = -1;
        this.eatingEnemyHeight = 0;
        this.eatingEnemyWidth = 0;
        this.eatingEnemyFacingRight = false;
        this.eatingEnemySpritesheet;
        this.aniFrame = 0;
        this.health = 3;
        this.maxHealth = 3;
        this.healingRate = 0;
        this.dead = false;
        this.won = false;
        this.beakerCount = 0;
        this.iTimeLeft = 0;
    }
    Update(rooms, enemies) {
        if (this.eatingEnemyTime >= 0) {
            this.eatingEnemyTime -= deltaTime / 1000
        }
        if (this.iTimeLeft >= 0) {
            this.iTimeLeft -= deltaTime / 1000
        }
        this.UpdatePosition(rooms, enemies);
        this.UpdateHealth(rooms, enemies);
    }
    UpdateHealth(rooms, enemies) {
        this.toInteract = false;
        //heal
        this.healingRate += deltaTime / 50000
        this.healingRate = min(this.healingRate, 0.25)
        this.health += this.healingRate * deltaTime / 1000
        //take damage
        for (let i = 0; i < rooms.length; i++) {
            //Loops through each object in each room and set damage
            //if they have no x-overlap, we don't need to check this room
            if (rooms[i].x >= this.x + this.size / 2 || this.x - this.size / 2 >= rooms[i].x + rooms[i].w) {
                continue;
            }
            if (rooms[i].y >= this.y + this.size / 2 || this.y - this.size / 2 >= rooms[i].y + rooms[i].h) {
                continue;
            }
            for (let j = 0; j < rooms[i].objects.length; j++) {
                let object = rooms[i].objects[j]
                if (object instanceof HazardZone) {
                    let dmg = object.DPSAtPosition(this.x - rooms[i].x, this.y - rooms[i].y) * deltaTime / 1000

                    this.TakeDamage(dmg)
                }
                if (object instanceof Beaker) {
                    if (dist(this.x, this.y, object.x + rooms[i].x, object.y + rooms[i].y) < 30 / 2 + this.size / 2) {
                        this.beakerCount++;
                        object.active = false;
                    }
                }
                if (object instanceof WeakWallSection) {
                    if (abs(this.x - object.x - rooms[i].x) > this.size / 2 + object.w / 2) {
                        continue
                    }
                    if (abs(this.y - object.y - rooms[i].y) > this.size / 2 + object.h / 2) {
                        continue
                    }
                    this.toInteract = object;
                }
            }
        }
        for (let i = 0; i < enemies.length; i++) {

            //Player-Enemy Collision

            if (abs(this.x - enemies[i].x) < this.size / 2 + enemies[i].w / 2 && abs(this.y - enemies[i].y) < (this.size / 2 + enemies[i].h / 2)*0.9) {
                //no y-overlap

                if (this.x < enemies[i].x && !enemies[i].facingRight) {
                    enemies[i].Stun();
                    this.TakeDamage(1)
                }
                if (this.x > enemies[i].x && enemies[i].facingRight) {
                    enemies[i].Stun();
                    this.TakeDamage(1)
                }
                this.vertVelocity = -100;
                this.hVelocity = 300;
                enemies[i].spotPlayer();
                if (this.x < enemies[i].x) {
                    this.hVelocity *= -1;
                }
            }
            //Bullet Collsiion

            if (enemies[i].bullet) {
                if (abs(this.x - enemies[i].bullet.x) > this.size / 2 + enemies[i].bullet.w / 2) {
                    //no x-overlap
                    continue
                    //console.log("HIT1");
                }
                if (abs(this.y - enemies[i].bullet.y) > this.size / 2 + enemies[i].bullet.h / 2) {
                    //no y-overlap
                    continue;
                }
                console.log("HIT2");
                enemies[i].bullet.used = true;
                this.TakeDamage(1)
                this.vertVelocity = -150
                if (this.x > enemies[i].bullet) {
                    this.hVelocity = 300;
                } else {

                    this.hVelocity = -300;
                }

            }



        }
        if(this.health < 0){
            this.dead = true;
        }
        this.health = constrain(this.health, 0, this.maxHealth)
    }
    UpdatePosition(rooms, enemies) {
        //handle velocity changes:
        if (abs(this.hVelocity) < deltaTime) {
            this.hVelocity = 0;
        } else if (this.hVelocity > 0) {
            this.hVelocity -= deltaTime;
        } else if (this.hVelocity < 0) {
            this.hVelocity += deltaTime;
        }
        //hang physics
        if (this.hanging) {
            if (this.hanging.horizontal) {
                //No longer hanging if off of the surface
                if (this.hanging.x1 > this.x + this.size / 2) {
                    this.hanging = false;
                }
                if (this.hanging.x2 < this.x - this.size / 2) {
                    this.hanging = false;
                }
            } else {
                //No longer hanging if off of the surface
                if (this.hanging.y1 > this.y + this.size / 2) {
                    this.hanging = false;
                }
                if (this.hanging.y2 < this.y - this.size / 2) {
                    this.hanging = false;
                }
            }
        }
        if (this.eatingEnemyTime <= 0) {
            //do position updating
            this.UpdateXPosition(rooms);
            this.canJump = false;
            this.UpdateYPosition(rooms, enemies);
        }
    }

    UpdateYPosition(rooms, enemies) {
        //y-based collision
        let newY = this.y + this.vertVelocity * deltaTime / 1000;
        for (let i = 0; i < rooms.length; i++) {
            //only deals with surfaces / collision
            let room = rooms[i];
            //if they have no x-overlap, we don't need to check this room
            if (room.x >= this.x + this.size / 2 || this.x - this.size / 2 >= room.x + room.w) {
                continue;
            }
            for (let j = 0; j < room.objects.length; j++) {
                let surface = room.objects[j];
                if (surface instanceof VerticalSurface) {

                    if (surface.x + room.x <= this.x - this.size / 2 || surface.x + room.x >= this.x + this.size / 2) {
                        continue;
                    }

                    if (this.y + this.size / 2 <= surface.y1 + room.y && newY + this.size / 2 > surface.y1 + room.y) {
                        newY = room.y + surface.y1 - this.size / 2;
                        this.vertVelocity = 0
                        this.hVelocity = 0;
                    } else if (this.y - this.size / 2 >= surface.y2 + room.y && newY - this.size / 2 < surface.y2 + room.y) {
                        newY = room.y + surface.y2 + this.size / 2;
                        this.vertVelocity = 0;
                        this.hVelocity = 0;
                    }
                }

            }
            for (let j = 0; j < room.objects.length; j++) {
                let surface = room.objects[j];
                if (surface instanceof HorizontalSurface) {
                    //if no x-overlap for the surface, skip
                    if (surface.x2 + room.x <= this.x - this.size / 2 || surface.x1 + room.x >= this.x + this.size / 2) {
                        continue;
                    }
                    //Bottomside horizontal collision
                    if (this.y + this.size / 2 <= surface.y + room.y && newY + this.size / 2 > surface.y + room.y) {
                        this.y = room.y + surface.y - this.size / 2
                        newY = this.y;
                        if(this.vertVelocity > 50){
                            Assets.sound.land.play()
                        }
                        this.vertVelocity = 0
                        this.canJump = true;
                        this.hanging = false;
                        
                    }
                    //Topside hang collision
                    if (this.y - this.size / 2 > surface.y + room.y && newY - this.size / 2 <= surface.y + room.y) {
                        this.y = room.y + surface.y + this.size / 2 + 0.5
                        newY = this.y;
                        if (this.vertVelocity < 10) {
                            Assets.sound.land.play()
                        }
                        this.hVelocity = 0
                        this.vertVelocity = 0
                        if (surface.sticky) {
                            this.hanging = { horizontal: true, x1: surface.x1 + room.x, x2: surface.x2 + room.x, y: surface.y }
                        }
                    }

                }

                if (surface instanceof VerticalSurface) {
                    //If no x-overlap, skip the room
                    if (surface.x + room.x <= this.x - this.size / 2 || surface.x + room.x >= this.x + this.size / 2) {
                        continue;
                    }
                    //top-side edge collisiom
                    if (this.y + this.size / 2 <= surface.y1 + room.y && newY + this.size / 2 > surface.y1 + room.y) {
                        newY = room.y + surface.y1 - this.size / 2;
                        this.vertVelocity = 0
                        this.hVelocity = 0;
                    } 
                    //bottom-side edge collisiom
                    else if (this.y - this.size / 2 >= surface.y2 + room.y && newY - this.size / 2 < surface.y2 + room.y) {
                        newY = room.y + surface.y2 + this.size / 2;
                        this.vertVelocity = 0;
                        this.hVelocity = 0;
                    }
                }

            }
        }
        for (let i = 0; i < enemies.length; i++) {
            if (abs(this.x - enemies[i].x) > (this.size + enemies[i].w) / 3) {
                //no x-overlap
                continue;
            }
            //we now know there's x-overlap
            let enemy = enemies[i]
            if (this.y + this.size / 2 < enemy.y - enemy.h / 2 && newY + this.size / 2 > enemy.y - enemy.h / 2) {
                this.eatingEnemyTime = 2;
                this.eatingEnemyHeight = enemy.h;
                this.eatingEnemyWidth = enemy.w;
                this.eatingEnemyFacingRight = enemy.facingRight;
                this.eatingEnemySpritesheet = enemy.spritesheet
                this.x = enemy.x;
                this.y = enemy.y + enemy.h / 2 - this.size / 2;
                newY = this.y;
                enemy.alive = false;
            }
        }

        if (!(this.hanging && this.hanging.horizontal)) {
            this.vertVelocity += deltaTime * 0.5;
            this.y = newY;
        }
        if (this.hanging && !this.hanging.horizontal) {
            this.vertVelocity = min(10, this.vertVelocity)
        }
    }
    UpdateXPosition(rooms) {
        let isRight = keyIsDown(RIGHT_ARROW) || keyIsDown(68);
        let isLeft = keyIsDown(LEFT_ARROW) || keyIsDown(65);
        if (this.hanging && !this.hanging.horizontal) {
            isRight = false
            isLeft = false
        }
        let newX = this.x + this.hVelocity * deltaTime / 1000
        if (isRight) {
            newX += deltaTime / 1000 * this.speed
        }
        if (isLeft) {
            newX -= deltaTime / 1000 * this.speed
        }
        //look right if moving right
        if (newX > this.x) {
            this.lookingRight = true;
        } else if (newX < this.x) {
            this.lookingRight = false;
        }
        if (this.hanging && !this.hanging.horizontal) {
            newX = this.x;
        }
        //x-based collision
        for (let i = 0; i < rooms.length; i++) {
            let room = rooms[i];
            //if they have no y-overlap, we don't need to check this room
            if (room.y >= this.y + this.size / 2 || this.y - this.size / 2 >= room.y + room.h) {
                continue;
            }

            for (let j = 0; j < room.objects.length; j++) {
                let surface = room.objects[j];
                if (surface instanceof VerticalSurface) {
                    //if they have no y-overlap, we dont need to worry about it
                    if (surface.y2 + room.y <= this.y - this.size / 2 || surface.y1 + room.y >= this.y + this.size / 2) {
                        continue;
                    }
                    //Left-side hang collision
                    if (this.x + this.size / 2 <= surface.x + room.x && newX + this.size / 2 > surface.x + room.x) {
                        newX = room.x + surface.x - this.size / 2
                        if (this.hVelocity != 0) {
                            Assets.sound.land.play()
                        }
                        this.hVelocity = 0
                        this.vertVelocity = 0
                        if (!this.canJump) {
                            this.hanging = { horizontal: false, y1: surface.y1 + room.y, y2: surface.y2 + room.y, x: surface.x + room.x }
                        }
                    }
                    //right-side hang collision
                    else if (this.x - this.size / 2 >= surface.x + room.x && newX - this.size / 2 < surface.x + room.x) {
                        newX = room.x + surface.x + this.size / 2
                        if (this.hVelocity != 0) {
                            Assets.sound.land.play()
                        }
                        this.hVelocity = 0
                        this.vertVelocity = 0
                        if (!this.canJump) {
                            this.hanging = { horizontal: false, y1: surface.y1 + room.y, y2: surface.y2 + room.y, x: surface.x + room.x }
                        }
                    } 
                }
            }
            for (let j = 0; j < room.objects.length; j++) {
                let surface = room.objects[j];
                //only deals with horizontal surfaces / collision
                if (surface instanceof HorizontalSurface) {
                    //if no y-overlap for the surface+, skip
                    if (abs(room.y + surface.y - this.y) >= this.size / 2) {
                        continue;
                    }
                    //right-side vertical edge collision
                    if (this.x + this.size / 2 <= surface.x1 + room.x && newX + this.size / 2 > surface.x1 + room.x) {
                        newX = room.x + surface.x1 - this.size / 2
                        this.hVelocity = 0
                    } 
                    //left-side vertical edge collision
                    else if (this.x - this.size / 2 >= surface.x2 + room.x && newX - this.size / 2 < surface.x2 + room.x) {
                        newX = room.x + surface.x2 + this.size / 2
                        this.hVelocity = 0
                    }
                }
            }
        }
        this.x = newX;
    }
    Jump() {
        if (this.hanging) {
            if (!this.hanging.horizontal) {
                this.vertVelocity = -300
                Assets.sound.jump.play()
                //Wall jump
                if (this.hanging.x < this.x) {
                    this.hVelocity = 200
                } else {
                    this.hVelocity = -200
                }
            }
            this.hanging = false;

        } else if (this.canJump && this.eatingEnemyTime < 0) {
            this.canJump = false;
            this.vertVelocity = -400;
            Assets.sound.jump.play()
        }
    }
    canInteract() {
        return this.toInteract != false;
    }
    getInteractDialogue() {
        if (!this.canInteract()) {
            return "";
        }
        if (this.toInteract instanceof WeakWallSection) {
            if (this.toInteract.broken) {
                return "Press E to escape"
            } else if (this.toInteract.beakers_needed <= this.beakerCount) {
                return `Press E to break`
            } else {
                return `${this.toInteract.beakers_needed - this.beakerCount} more globules needed`
            }
        }
    }
    Interact() {
        if (!this.canInteract()) {
            return;
        }
        if (this.toInteract instanceof WeakWallSection) {
            if(this.toInteract.broken){
                this.won = true;
            }else{
                this.toInteract.AttemptBreak(this.beakerCount)
            }
        }
    }
    Draw() {
        push()
        translate(this.x, this.y)
        let img = Assets.spritesheets.googuy

        if (this.eatingEnemyTime >= 0) {
            image(img, - 22,
                (TIME_TO_EAT_HUMAN - this.eatingEnemyTime) / TIME_TO_EAT_HUMAN * (this.eatingEnemyHeight) - 18 - this.eatingEnemyHeight,
                44, 44,
                0, img.height / 2 * floor(this.aniFrame), img.width, img.height / 2)
            fill(0)
            let sheet = this.eatingEnemySpritesheet

            if (!this.eatingEnemyFacingRight) {
                scale(-1, 1)
            }
            image(sheet, -this.eatingEnemyWidth * 3 / 4,
                -this.eatingEnemyTime / TIME_TO_EAT_HUMAN * this.eatingEnemyHeight + 20,
                this.eatingEnemyWidth * 2,
                (this.eatingEnemyTime) / TIME_TO_EAT_HUMAN * this.eatingEnemyHeight,
                sheet.width / 2, sheet.height - sheet.height * this.eatingEnemyTime / TIME_TO_EAT_HUMAN,
                sheet.width / 2, sheet.height * this.eatingEnemyTime / TIME_TO_EAT_HUMAN)
        } else {
            if (this.hanging && this.hanging.horizontal) {
                scale(1, -1)
            } else if (this.hanging && !this.hanging.horizontal) {
                if (this.hanging.x > this.x) {
                    scale(1, -1)
                    rotate(-PI / 2)
                } else {
                    rotate(PI / 2)
                }
            } if (!this.lookingRight) {
                scale(-1, 1)
            }

            if (this.canJump || this.hanging) {
                image(img,
                    - 22, - 20,
                    44, 44,
                    0, img.height / 2 * floor(this.aniFrame), img.width, img.height / 2)
            } else {
                if (this.vertVelocity > 0) {
                    scale(1, -1)
                }
                image(Assets.entities.midAirGooGuy,
                    - 22, - 20,
                    44, 44)
            }
        }
        pop()
        this.aniFrame += deltaTime / 1000;
        this.aniFrame = this.aniFrame % 2;
    }
    TakeDamage(dmg) {
        if(this.iTimeLeft > 0){
            return;
        }
        this.health -= dmg;
        if (dmg > 0) {
            this.healingRate = 0;
        }
        if(dmg >= 1){
            this.iTimeLeft = 0.8;
        }
    }
}
