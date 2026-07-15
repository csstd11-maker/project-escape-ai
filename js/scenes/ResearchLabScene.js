import { BaseGameScene } from './BaseGameScene.js';
import { gameSession } from '../gameSession.js';
import { scoreManager } from '../scoreManager.js';

export class ResearchLabScene extends BaseGameScene {
  constructor(){ super('ResearchLabScene'); }
  create(){
    this.createCommon('STAGE 1 · RESEARCH LAB',2100,900,{x:120,y:450});
    this.door=this.addDoor(1050,450,34,300);
    this.terminal=this.add.rectangle(870,690,68,85,0x153849).setStrokeStyle(3,0x526e78);
    this.plate=this.add.rectangle(1780,450,120,100,0x15313a).setStrokeStyle(4,0x26ffe6,.4).setDepth(2);
    this.exit=this.add.rectangle(2025,450,80,240,0x143c35,.5).setStrokeStyle(4,0x26ffe6).setDepth(2);
    this.crate=this.createThrowable('crate',1450,430,{puzzleId:'lab-pressure-crate'});
    this.log={x:1510,y:700,id:'log-01'};
    this.add.text(this.log.x,this.log.y,'▣ DATA LOG 01',{fontFamily:'monospace',fontSize:'17px',color:'#6fffea'}).setOrigin(.5);
    [['drone',570,310],['drone',690,570],['guard',1360,280],['drone',1650,620]].forEach(e=>this.createEnemy(...e));
    this.tutorial=['move','attack','dash','pickup','drop','terminal'];
    this.tutorialIndex=0;
    this.tutorialText=this.add.text(640,665,'',{fontFamily:'monospace',fontSize:'21px',color:'#ffef9c',backgroundColor:'#071018cc',padding:{x:16,y:8}}).setOrigin(.5).setScrollFactor(0).setDepth(120);
    this.setObjective('연구실에서 탈출하십시오.');
    this.refreshTutorial();
  }
  refreshTutorial(){
    const labels={move:'WASD 또는 방향키로 이동',attack:'마우스 왼쪽 또는 J로 공격',dash:'Shift로 대시',pickup:'F로 금속 상자 집기',drop:'F로 금속 상자 내려놓기',terminal:'첫 전투 후 E로 단말기 작동'};
    this.tutorialText.setText(`튜토리얼: ${labels[this.tutorial[this.tutorialIndex]]||'완료'}`);
  }
  onTutorialAction(action){ if(this.tutorial[this.tutorialIndex]===action){this.tutorialIndex++;this.refreshTutorial();} }
  updateStage(){
    if(this.tutorial[this.tutorialIndex]==='move'&&this.player.body.speed>5){this.tutorialIndex++;this.refreshTutorial();}
    if(!this.plateSolved&&!this.crate.carried&&!this.crate.thrown&&this.crate.body.speed<10&&Phaser.Geom.Rectangle.Contains(this.plate.getBounds(),this.crate.x,this.crate.y)){
      this.plateSolved=true;this.plate.setFillStyle(0x26ffe6,.6);gameSession.addEmp(15);scoreManager.award('puzzle',300,'stage1-pressure',false);this.setObjective('출구에서 E를 누르십시오.');this.game.audio?.playSfx('puzzle');
    }
  }
  onEnemyDied(){this.time.delayedCall(380,()=>{if(!this.enemies.getChildren().some(e=>e.isAlive)){this.combatCleared=true;this.terminal.setStrokeStyle(4,0x26ffe6);this.setObjective(this.door.active?'보안 단말기를 작동하십시오.':'금속 상자를 압력판에 놓으십시오.');}});}
  onInteract(){
    const d=o=>Phaser.Math.Distance.Between(this.player.x,this.player.y,o.x,o.y);
    if(d(this.log)<85){this.collectLog('log-01','연구 기록 01','NEXUS는 인간의 사고를 예측하기 위해\n모든 행동을 데이터로 수집하기 시작했다.');return;}
    if(d(this.terminal)<100&&this.combatCleared&&this.door.active){this.door.open();this.onTutorialAction('terminal');this.setObjective('금속 상자를 압력판에 놓으십시오.');return;}
    if(d(this.exit)<120){if(this.combatCleared&&this.plateSolved&&!this.door.active)this.finishStage('SecurityScene');else this.setObjective(!this.combatCleared?'모든 적을 처치하십시오.':!this.plateSolved?'압력판 퍼즐을 해결하십시오.':'보안 단말기를 작동하십시오.');}
  }
}
