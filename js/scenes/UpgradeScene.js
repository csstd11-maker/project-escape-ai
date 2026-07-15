import { addBackdrop, addButton } from './BootScene.js';
import { gameSession } from '../gameSession.js';
const UPGRADES={exoskeleton:{name:'강화 외골격',desc:'최대 체력 +25',max:2},impact:{name:'충격 증폭기',desc:'근접 피해 +20%',max:2},throwAssist:{name:'투척 보조장치',desc:'투척 피해 +25% · 속도 +10%',max:2},dashModule:{name:'고속 대시 모듈',desc:'대시 쿨타임 20% 감소',max:1},empExpander:{name:'EMP 확장기',desc:'범위 +25% · 지속 +0.5초',max:1},selfRepair:{name:'자가 복구 장치',desc:'즉시 및 Stage 완료 시 체력 20 회복',max:1},dataCollector:{name:'데이터 수집기',desc:'점수 획득 +15%',max:2}};
export class UpgradeScene extends Phaser.Scene{
  constructor(){super('UpgradeScene');}
  init(data){this.nextScene=data.nextScene;}
  create(){addBackdrop(this,'UPGRADE SELECT','하나의 모듈만 선택할 수 있습니다');const available=Phaser.Utils.Array.Shuffle(Object.entries(UPGRADES).filter(([id,u])=>(gameSession.upgradeCounts[id]||0)<u.max)).slice(0,3);if(!available.length){addButton(this,640,420,'계속',()=>this.continue(),340);return;}available.forEach(([id,u],i)=>{const x=240+i*400;this.add.rectangle(x,360,340,320,0x0a1e2c).setStrokeStyle(3,0x26ffe6);this.add.text(x,285,u.name,{fontFamily:'monospace',fontSize:'24px',fontStyle:'bold',color:'#eaffff'}).setOrigin(.5);this.add.text(x,355,u.desc,{fontFamily:'monospace',fontSize:'18px',color:'#9fffee',align:'center',wordWrap:{width:280}}).setOrigin(.5);this.add.text(x,410,`선택 ${gameSession.upgradeCounts[id]||0} / ${u.max}`,{fontFamily:'monospace',fontSize:'16px',color:'#ffce72'}).setOrigin(.5);addButton(this,x,480,'선택',()=>this.choose(id),230);});}
  choose(id){if(this.chosen)return;this.chosen=true;gameSession.applyUpgrade(id);this.game.audio?.playSfx('upgrade');this.time.delayedCall(500,()=>this.continue());}
  continue(){gameSession.setStage(this.nextScene);this.scene.start(this.nextScene);}
}
