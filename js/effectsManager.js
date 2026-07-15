import { COLORS } from './config.js';
import { saveManager } from './saveManager.js';
export class EffectsManager{
  constructor(scene){this.scene=scene;this.active=[];}
  activeScene(){return this.scene?.sys?.isActive?.()?this.scene:null;}
  flash(target,color=0xffffff){const scene=this.activeScene();if(!scene)return;target.setAlpha?.(.25);scene.time.delayedCall(90,()=>target?.active&&target.setAlpha?.(1));}
  damageNumber(x,y,value,color='#ffffff'){const scene=this.activeScene();if(!scene)return;const t=scene.add.text(x,y-25,`-${Math.round(value)}`,{fontFamily:'monospace',fontSize:'20px',fontStyle:'bold',color,stroke:'#02050a',strokeThickness:4}).setDepth(50);this.active.push(t);scene.tweens.add({targets:t,y:y-65,alpha:0,duration:650,onComplete:()=>t.destroy()});}
  ring(x,y,r,color=COLORS.cyan,duration=350){const scene=this.activeScene();if(!scene)return null;const g=scene.add.graphics().setDepth(20);g.lineStyle(5,color,.9).strokeCircle(x,y,8);this.active.push(g);scene.tweens.addCounter({from:8,to:r,duration,onUpdate:t=>{g.clear();g.lineStyle(5,color,1-t.progress).strokeCircle(x,y,t.getValue());},onComplete:()=>g.destroy()});return g;}
  warningCircle(x,y,r,duration=700){const scene=this.activeScene();if(!scene)return null;const g=scene.add.graphics().setDepth(4);g.lineStyle(4,COLORS.red,.9).fillStyle(COLORS.red,.13).fillCircle(x,y,r).strokeCircle(x,y,r);this.active.push(g);scene.tweens.add({targets:g,alpha:.25,duration:180,yoyo:true,repeat:Math.max(1,duration/360|0)});scene.time.delayedCall(duration,()=>g.destroy());return g;}
  burst(x,y,color=COLORS.cyan,count=10){const scene=this.activeScene();if(!scene)return;for(let i=0;i<count;i++){const p=scene.add.rectangle(x,y,Phaser.Math.Between(3,7),Phaser.Math.Between(3,9),color).setDepth(30);this.active.push(p);scene.tweens.add({targets:p,x:x+Phaser.Math.Between(-70,70),y:y+Phaser.Math.Between(-70,70),alpha:0,angle:180,duration:Phaser.Math.Between(250,550),onComplete:()=>p.destroy()});}}
  shake(duration=80,intensity=.003){const scene=this.activeScene();if(saveManager.data.screenShakeEnabled&&scene)scene.cameras.main.shake(duration,intensity);}
  clear(){this.active.forEach(o=>o?.destroy?.());this.active=[];}
}
