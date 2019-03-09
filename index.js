let c = document.getElementById("canvas");
let ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

window.onresize = () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
};

class Player {
    constructor(x, y) {
        this.x = window.innerWidth / 2.0 - 100;
        this.y = window.innerHeight - 100;
        this.w = 50;
        this.h = 50;
        this.health = 100;
        this.dx = 0;
        this.dy = 0;
    }

    update() {
        if (this.x + this.dx >= 0 && this.x + this.dx + this.w <= innerWidth)
            this.x += this.dx;
        if (this.y + this.dy >= 0 && this.y + this.dy + this.h <= innerWidth)
            this.y += this.dy;
        ctx.fillStyle = "#ff0000";
        ctx.font = "30px Arial";
        ctx.fillText(this.health, 10, 100);
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Rock {

    constructor(x) {
        this.x = x;
        this.y = 0;
        this.w = 100;
        this.h = 100;
    }

    update() {
        this.y += 5;
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

}

class Bullet {

    constructor(x,y){
        this.x = x; 
        this.y = y;
        this.w = 25;
        this.h = 25;
    }

        update() {
            this.y -= 5;
            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
}

let player = new Player();
let gameObjects = [];
let rate = 0.005;
let bullets = [];


window.onkeydown = (e) => {
    switch (e.keyCode) {
        case 37:
        case 65:
            player.dx = -5;
            player.dy = 0;
            break;
        case 38:
        case 87:
            player.dy = -5;
            player.dx = 0;
            break;
        case 39:
        case 68:
            player.dx = 5;
            player.dy = 0;
            break;
        case 40:
        case 83:
            player.dy = 5;   
            player.dx = 0;
            break;
        case 32:  
            var shoot = new Bullet(player.x,player.y); 
            bullets.push(new Bullet(player.x,player.y));
            break;
    } 
};

function animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    rate += 0.00001;
    if (Math.random() < rate)
        gameObjects.push(new Rock(Math.random() * innerWidth));
        for (let bullet of bullets){
            bullet.update();
            for(let obj of gameObjects){
                if (obj.x + obj.w >= bullet.x && obj.x < bullet.x + bullet.w && obj.y + obj.h >= bullet.y && obj.y < bullet.y + bullet.h)
            {
                player.health++;
                gameObjects.splice(gameObjects.indexOf(obj),1);
            }
            
            }
        }
        for (let obj of gameObjects) {
            obj.update();
            if (obj.x + obj.w >= player.x && obj.x < player.x + player.w && obj.y + obj.h >= player.y && obj.y < player.y + player.h)
            {
                player.health--;
            }
            if(obj.y >= window.innerHeight){
                player.health--;
                gameObjects.splice(gameObjects.indexOf(obj),1);
            }
    }
    player.update();
    if (player.health <= 0) {
        clearInterval(interval);
        alert("You Lose!");
    }
}

let interval = setInterval(animate, 10);
