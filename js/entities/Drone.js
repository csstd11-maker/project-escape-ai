import { Enemy } from './Enemy.js';
export class Drone extends Enemy{
  constructor(scene,x,y,mods={}){super(scene,x,y,'drone',mods);this.add([scene.add.triangle(-30,0,0,-12,0,12,-25,0,0x32e7ff,.6),scene.add.triangle(30,0,0,-12,25,0,0,12,0x32e7ff,.6)]);}
  update(){if(!this.canAct())return;const p=this.scene.player,d=Phaser.Math.Distance.Between(this.x,this.y,p.x,p.y),a=this.facePlayer();if(d>245)this.body.setVelocity(Math.cos(a)*this.moveSpeed,Math.sin(a)*this.moveSpeed);else if(d<180)this.body.setVelocity(-Math.cos(a)*this.moveSpeed,-Math.sin(a)*this.moveSpeed);else this.body.setVelocity(Math.cos(a+Math.PI/2)*this.moveSpeed*.6,Math.sin(a+Math.PI/2)*this.moveSpeed*.6);if(d<500&&this.scene.time.now>=this.nextAttack)this.attackWindup(()=>this.scene.createEnemyProjectile(this.x,this.y,p.x,p.y,this.attackDamage,300),550);}
}
