import { addBackdrop, addButton } from './BootScene.js';
import { ACHIEVEMENTS } from '../achievementManager.js';
import { saveManager } from '../saveManager.js';
export class AchievementsScene extends Phaser.Scene{
  constructor(){super('AchievementsScene');}
  create(){addBackdrop(this,'업적');Object.entries(ACHIEVEMENTS).forEach(([id,a],i)=>{const x=250+(i%2)*560,y=200+Math.floor(i/2)*135,unlocked=saveManager.data.unlockedAchievements.includes(id);this.add.rectangle(x,y,470,100,unlocked?0x123f3d:0x111a24,.95).setStrokeStyle(2,unlocked?0x26ffe6:0x53636e);this.add.text(x-210,y-28,`${unlocked?'✓':'◇'} ${a.name}`,{fontFamily:'monospace',fontSize:'21px',fontStyle:'bold',color:unlocked?'#75ffed':'#82939c'});this.add.text(x-210,y+10,a.condition,{fontFamily:'monospace',fontSize:'16px',color:'#d3e6e9'});});addButton(this,180,660,'뒤로',()=>this.scene.start('MenuScene'),220);}
}
