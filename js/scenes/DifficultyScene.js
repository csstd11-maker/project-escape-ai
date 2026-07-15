import { addBackdrop, addButton } from './BootScene.js';
import { gameSession } from '../gameSession.js';
import { saveManager } from '../saveManager.js';
import { achievementManager } from '../achievementManager.js';
export class DifficultyScene extends Phaser.Scene{
  constructor(){super('DifficultyScene');}
  create(){addBackdrop(this,'난이도 선택','분석 강도와 점수 배율이 변경됩니다');const descriptions={Easy:'적 체력 80% · 공격력 70% · 점수 80%',Normal:'표준 전투 프로토콜 · 점수 100%',Hard:'적 체력 120% · 공격력 125% · 점수 150%'};['Easy','Normal','Hard'].forEach((d,i)=>{const y=235+i*145;addButton(this,420,y,d,()=>this.startGame(d),340);this.add.text(630,y,descriptions[d],{fontFamily:'monospace',fontSize:'18px',color:d===saveManager.data.lastDifficulty?'#ffdb70':'#9abdc4'}).setOrigin(0,.5);});addButton(this,190,650,'뒤로',()=>this.scene.start('MenuScene'),230);}
  startGame(difficulty){gameSession.newGame(difficulty);gameSession.empGauge=0;saveManager.set('lastDifficulty',difficulty);achievementManager.unlock('first');gameSession.setStage('ResearchLabScene');this.scene.start('ResearchLabScene');}
}
