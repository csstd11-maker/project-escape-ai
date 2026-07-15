import assert from 'node:assert/strict';

const memory=new Map();
globalThis.localStorage={getItem:key=>memory.get(key)??null,setItem:(key,value)=>memory.set(key,value),removeItem:key=>memory.delete(key)};

const { analyzeProfile }=await import('../js/adaptiveAI.js');
const { gameSession }=await import('../js/gameSession.js');
const { scoreManager }=await import('../js/scoreManager.js');

const ai={meleeUses:0,throwUses:0,dashUses:0,empUses:0,empChargeCompletedCount:0,empUsesWithin8Seconds:0,damageTaken:0,standingStillTime:0,combatTime:0,combatEncounterCount:0,totalCombatEncounterDuration:0};
assert.equal(analyzeProfile(ai),'balanced');
assert.equal(analyzeProfile({...ai,meleeUses:10,throwUses:1}),'melee');
assert.equal(analyzeProfile({...ai,meleeUses:1,throwUses:6}),'throw');
assert.equal(analyzeProfile({...ai,combatTime:60,dashUses:8,damageTaken:20}),'dodge');
assert.equal(analyzeProfile({...ai,empUses:2,empChargeCompletedCount:2,empUsesWithin8Seconds:2}),'emp');
assert.equal(analyzeProfile({...ai,combatTime:80,standingStillTime:30,combatEncounterCount:1,totalCombatEncounterDuration:40}),'defensive');

gameSession.newGame('Normal');
gameSession.ai.meleeUses=4;gameSession.score=900;gameSession.saveCheckpoint();
gameSession.ai.meleeUses=99;gameSession.score=2000;gameSession.deathCount=2;gameSession.restartStage();
assert.equal(gameSession.ai.meleeUses,4);assert.equal(gameSession.score,400);assert.equal(gameSession.deathCount,2);assert.equal(gameSession.playTime,10);
gameSession.ai.meleeUses=7;assert.equal(gameSession.checkpoint.ai.meleeUses,4,'checkpoint must be a deep copy');

gameSession.newGame('Hard');gameSession.stats.dataCollectorStacks=1;
assert.equal(scoreManager.award('test',100,'unique-test',false),173);
assert.equal(scoreManager.award('test',100,'unique-test',false),0);
assert.equal(gameSession.score,173);
assert.deepEqual([0,2199,2200,3500,4800,6000].map(v=>scoreManager.grade(v)),['D','D','C','B','A','S']);

memory.set('escape-ai-save-v1','{broken');
const { saveManager }=await import('../js/saveManager.js?logic-test');
assert.equal(saveManager.data.highestScore,0);assert.equal(saveManager.data.lastDifficulty,'Normal');

console.log('핵심 로직 검사 통과: AI 6유형, 체크포인트, 점수 중복 방지, 등급, 손상 저장 복구');
