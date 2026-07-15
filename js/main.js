import { WIDTH, HEIGHT } from './config.js';
import { audioManager } from './audioManager.js';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { DifficultyScene } from './scenes/DifficultyScene.js';
import { ResearchLabScene } from './scenes/ResearchLabScene.js';
import { SecurityScene } from './scenes/SecurityScene.js';
import { ServerScene } from './scenes/ServerScene.js';
import { UpgradeScene } from './scenes/UpgradeScene.js';
import { BossScene } from './scenes/BossScene.js';
import { EndingScene } from './scenes/EndingScene.js';
import { ResultScene } from './scenes/ResultScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { RecordsScene } from './scenes/RecordsScene.js';
import { AchievementsScene } from './scenes/AchievementsScene.js';
import { SettingsScene } from './scenes/SettingsScene.js';
import { CreditsScene } from './scenes/CreditsScene.js';
import { PauseScene } from './scenes/PauseScene.js';

const errorBox=document.getElementById('engine-error');
function fatal(message){if(errorBox){errorBox.hidden=false;errorBox.innerHTML=`게임을 시작하지 못했습니다.<br>${message}<br>새로고침해 주세요.`;}document.getElementById('loading')?.setAttribute('hidden','');}
window.addEventListener('error',event=>{console.error('GAME_FATAL',event.error?.stack||event.message);fatal(event.error?.message||event.message||'알 수 없는 오류');});
window.addEventListener('unhandledrejection',event=>fatal(event.reason?.message||'모듈 로딩 오류'));
if(!window.Phaser)fatal('게임 엔진을 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.');
else{
  const game=new Phaser.Game({type:Phaser.AUTO,parent:'game-container',width:WIDTH,height:HEIGHT,backgroundColor:'#030914',physics:{default:'arcade',arcade:{gravity:{x:0,y:0},debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:WIDTH,height:HEIGHT},scene:[BootScene,MenuScene,DifficultyScene,ResearchLabScene,SecurityScene,ServerScene,UpgradeScene,BossScene,EndingScene,ResultScene,GameOverScene,RecordsScene,AchievementsScene,SettingsScene,CreditsScene,PauseScene]});
  game.audio=audioManager;
  const unlock=()=>audioManager.unlockAudio();window.addEventListener('pointerdown',unlock,{once:true});window.addEventListener('keydown',unlock,{once:true});
  document.addEventListener('contextmenu',e=>{if(e.target?.tagName==='CANVAS')e.preventDefault();});document.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)&&document.activeElement?.tagName==='CANVAS')e.preventDefault();});
}
