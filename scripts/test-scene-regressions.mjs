import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

globalThis.Phaser={Scene:class {}};
const { UpgradeScene }=await import('../js/scenes/UpgradeScene.js?scene-regression');
const { gameSession }=await import('../js/gameSession.js');

const makeScene=()=>{
  const scene=new UpgradeScene();
  scene.game={audio:{playSfx:()=>{}}};
  scene.add={text:()=>({setOrigin(){return this;}})};
  scene.time={delayedCall:(_delay,callback)=>callback()};
  scene.scene={start:key=>{scene.started=key;}};
  return scene;
};

gameSession.newGame('Normal');
const first=makeScene();
first.init({nextScene:'SecurityScene'});
assert.equal(first.chosen,false,'첫 업그레이드 화면은 선택 가능해야 합니다');
first.choose('impact');
assert.equal(gameSession.upgradeCounts.impact,1,'업그레이드 효과가 적용되어야 합니다');
assert.equal(first.started,'SecurityScene','선택 후 다음 Stage로 이동해야 합니다');
first.choose('impact');
assert.equal(gameSession.upgradeCounts.impact,1,'한 화면에서 중복 선택되면 안 됩니다');

const second=makeScene();
second.chosen=true;
second.init({nextScene:'ServerScene'});
assert.equal(second.chosen,false,'두 번째 업그레이드 화면에서 선택 잠금이 초기화되어야 합니다');
second.choose('throwAssist');
assert.equal(gameSession.upgradeCounts.throwAssist,1,'두 번째 업그레이드도 적용되어야 합니다');
assert.equal(second.started,'ServerScene','두 번째 선택 후 다음 Stage로 이동해야 합니다');

const baseScene=await readFile(new URL('../js/scenes/BaseGameScene.js',import.meta.url),'utf8');
const cleanupLine=baseScene.split(/\r?\n/).find(line=>line.includes('cleanup(){'));
assert.ok(cleanupLine,'Scene 종료 정리 함수가 있어야 합니다');
assert.doesNotMatch(cleanupLine,/projectiles\??\.clear/,'Scene 종료 시 Phaser가 정리한 투사체 그룹을 다시 비우면 안 됩니다');
console.log('Scene 회귀 검사 통과: 업그레이드 재진입·중복 선택·Stage 이동·종료 정리');
