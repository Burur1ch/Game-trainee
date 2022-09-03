import { Sitting, Running ,Jumping, Falling } from "./playerState.js";

export class Player{
    constructor(game){
       this.game = game;
       this.width = 100;
       this.height = 92 ;
       this.x = 0;
       this.y = this.game.height - this.height; 
       this.image = document.getElementById('player');
       this.vy = 0;
       this.weight = 1;
       this.frameX = 0; 
       this.frameY = 0;
       this.speed = 0;
       this.maxSpeed = 7;
       this.state = [new Sitting(this), new Running(this),new Jumping(this),new Falling(this)];
       this.currentState = this.state[0];
       this.currentState.enter();
    }
    update(input){
        this.currentState.handleInput(input);
    //horizontal
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if(input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else this.speed = 0 ;
    if (this.x < 0) this.x = 0;
    if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
    //vertic
  
    // if (input.includes('ArrowUp')&& this.onGround() ) this.vy -= 18;
    this.y += this.vy;
    if (!this.onGround()) this.vy+= this.weight;
    else this.vy = 0;
}


draw(context){
    
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,this.width,this.height, this.x, this.y, this.width, this.height)
}

onGround(){
    return this.y>= this.game.height - this.height
}
setState(state){
    this.currentState=this.state[state];
    this.currentState.enter();
}
}
