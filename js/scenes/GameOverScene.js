import { addBackdrop, addButton } from './BootScene.js';
import { gameSession } from '../gameSession.js';
export class GameOverScene extends Phaser.Scene{
  constructor(){super('GameOverScene');}
  init(data){this.stage=data.stage||gameSession.currentStage;this.clicked=false;}
  create(){addBackdrop(this,'GAME OVER',this.stage);this.add.text(640,260,`점수  ${gameSession.score.toLocaleString()}\n플레이 시간  ${Math.floor(gameSession.playTime/60)}:${String(Math.floor(gameSession.playTime%60)).padStart(2,'0')}\n사망 횟수  ${gameSession.deathCount}`,{fontFamily:'monospace',fontSize:'24px',color:'#ffffff',align:'center',lineSpacing:12}).setOrigin(.5);addButton(this,640,420,'현재 Stage 다시 시작',()=>this.restart(),400);addButton(this,640,490,'처음부터 다시 시작',()=>this.fromStart(),400);addButton(this,640,560,'메인 메뉴',()=>this.menu(),400);}
  guard(fn){if(this.clicked)return;this.clicked=true;fn();}
  restart(){this.guard(()=>{gameSession.restartStage();this.scene.start(this.stage);});}
  fromStart(){this.guard(()=>{const d=gameSession.difficulty;gameSession.newGame(d);gameSession.empGauge=0;this.scene.start('ResearchLabScene');});}
  menu(){this.guard(()=>{gameSession.newGame(gameSession.difficulty);this.scene.start('MenuScene');});}
}
