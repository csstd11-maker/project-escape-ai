import { Enemy } from './Enemy.js';
export class Charger extends Enemy{
  constructor(scene,x,y,mods={}){super(scene,x,y,'charger',mods);this.charging=false;this.chargeHit=false;this.add([scene.add.triangle(-28,0,12,-20,-15,0,12,20,0xb75cff,.7),scene.add.triangle(28,0,-12,-20,15,0,-12,20,0xb75cff,.7)]);}
  update(){if(!this.canAct())return;const p=this.scene.player,d=Phaser.Math.Distance.Between(this.x,this.y,p.x,p.y);if(this.charging){if(!this.chargeHit&&Phaser.Math.Distance.Between(this.x,this.y,p.x,p.y)<48){this.chargeHit=true;p.takeDamage(this.attackDamage,this);}return;}if(d>125&&d<430&&this.scene.time.now>=this.nextAttack){const prediction=this.modifiers.prediction||0,a=Phaser.Math.Angle.Between(this.x,this.y,p.x+p.body.velocity.x*prediction,p.y+p.body.velocity.y*prediction);this.attackWindup(()=>{this.charging=true;this.chargeHit=false;this.body.setVelocity(Math.cos(a)*320,Math.sin(a)*320);this.scene.time.delayedCall(1250,()=>this.endCharge());},800);return;}this.moveToward(this.moveSpeed);}
  endCharge(){if(!this.isAlive)return;this.charging=false;this.body.setVelocity(0);this.nextAttack=this.scene.time.now+3000;}
  onWallHit(){if(this.charging){this.endCharge();this.disable(1500);}else super.onWallHit();}
  disable(duration){if(this.charging)this.endCharge();super.disable(Math.min(duration,1200));}
}
