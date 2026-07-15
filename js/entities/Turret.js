import { Enemy } from './Enemy.js';
export class Turret extends Enemy{
  constructor(scene,x,y,mods={}){super(scene,x,y,'turret',mods);this.body.setImmovable(true);this.barrel=scene.add.rectangle(27,0,38,9,0xff8296).setOrigin(.2,.5);this.add(this.barrel);}
  update(){if(!this.canAct())return;this.body.setVelocity(0);const p=this.scene.player,d=Phaser.Math.Distance.Between(this.x,this.y,p.x,p.y);this.facePlayer();if(d<560&&this.scene.time.now>=this.nextAttack)this.attackWindup(()=>{let tx=p.x,ty=p.y;if(this.modifiers.prediction){tx+=p.body.velocity.x*this.modifiers.prediction;ty+=p.body.velocity.y*this.modifiers.prediction;}this.scene.createEnemyProjectile(this.x,this.y,tx,ty,this.attackDamage,340);},650);}
}
