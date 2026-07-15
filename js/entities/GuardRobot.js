import { Enemy } from './Enemy.js';
export class GuardRobot extends Enemy{
  constructor(scene,x,y,mods={}){super(scene,x,y,'guard',mods);this.shielding=false;this.shield=scene.add.arc(18,0,29,-70,70,false,0xffbd3d,.3).setStrokeStyle(5,0xffe186).setVisible(false);this.add([scene.add.rectangle(-18,0,10,36,0xc8a23a),this.shield]);this.nextShield=scene.time.now+1800;}
  update(){if(!this.canAct())return;const p=this.scene.player,d=Phaser.Math.Distance.Between(this.x,this.y,p.x,p.y),a=this.facePlayer();if(this.scene.time.now>this.nextShield&&!this.isAttacking){this.shielding=true;this.shield.setVisible(true);this.nextShield=this.scene.time.now+4500;this.scene.time.delayedCall(1300*(this.modifiers.shieldDuration||1),()=>{this.shielding=false;this.shield.setVisible(false);});}if(d>68)this.body.setVelocity(Math.cos(a)*this.moveSpeed,Math.sin(a)*this.moveSpeed);else{this.body.setVelocity(0);if(this.scene.time.now>=this.nextAttack)this.attackWindup(()=>this.scene.meleeEnemyHit(this,76,this.attackDamage),450);}}
  disable(duration){this.shielding=false;this.shield.setVisible(false);super.disable(duration);}
}
