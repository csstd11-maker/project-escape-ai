import { readFile, readdir, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const walk=async dir=>{const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(p);}return out;};
const js=(await walk(join(root,'js'))).filter(p=>p.endsWith('.js'));
const missing=[];
for(const file of js){const src=await readFile(file,'utf8');for(const match of src.matchAll(/(?:import|export)\s+(?:[^'\"]+?\s+from\s+)?['\"]([^'\"]+)['\"]/g)){const spec=match[1];if(!spec.startsWith('.'))continue;const target=resolve(dirname(file),spec);try{await access(target);}catch{missing.push(`${file}: ${spec}`);}}}
const main=await readFile(join(root,'js','main.js'),'utf8');
const requiredScenes=['BootScene','MenuScene','DifficultyScene','ResearchLabScene','SecurityScene','ServerScene','UpgradeScene','BossScene','EndingScene','ResultScene','GameOverScene','RecordsScene','AchievementsScene','SettingsScene','CreditsScene','PauseScene'];
const absentScenes=requiredScenes.filter(s=>!main.includes(s));
const index=await readFile(join(root,'index.html'),'utf8');
if(!index.includes('./js/main.js')||!index.includes('phaser@3.90.0'))missing.push('index.html entry scripts');
if(missing.length||absentScenes.length){console.error('검사 실패',missing,absentScenes);process.exit(1);}
console.log(`정적 구조 검사 통과: JS ${js.length}개, Scene ${requiredScenes.length}개, import 경로 정상`);
