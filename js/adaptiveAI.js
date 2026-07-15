const ORDER=['melee','throw','dodge','emp','defensive'];
export function analyzeProfile(a){
  const attacks=a.meleeUses+a.throwUses, minutes=a.combatTime/60;
  const meleeRatio=a.meleeUses/Math.max(attacks,1), throwRatio=a.throwUses/Math.max(attacks,1), dashRate=a.dashUses/Math.max(minutes,1), empUsage=a.empUses/Math.max(a.empChargeCompletedCount,1), quick=a.empUsesWithin8Seconds/Math.max(a.empUses,1), standing=a.standingStillTime/Math.max(a.combatTime,1), avg=a.totalCombatEncounterDuration/Math.max(a.combatEncounterCount,1);
  const candidates=[];
  if(meleeRatio>=.6&&a.meleeUses>=8)candidates.push(['melee',meleeRatio/.6+a.meleeUses/8]);
  if(throwRatio>=.4&&a.throwUses>=5)candidates.push(['throw',throwRatio/.4+a.throwUses/5]);
  if(a.combatTime>=60&&dashRate>=7&&a.damageTaken<=80)candidates.push(['dodge',dashRate/7+(80-Math.min(a.damageTaken,80))/80]);
  if(a.empUses>=2&&empUsage>=.7&&quick>=.6)candidates.push(['emp',empUsage/.7+quick/.6]);
  if(a.combatTime>=60&&standing>=.25&&avg>=35)candidates.push(['defensive',standing/.25+avg/35]);
  candidates.sort((x,y)=>Math.abs(y[1]-x[1])<=.05?ORDER.indexOf(x[0])-ORDER.indexOf(y[0]):y[1]-x[1]);
  return candidates[0]?.[0]||'balanced';
}
export function adaptiveModifiers(profile,difficulty){
  const base={ profile, shieldDuration:1, counterChance:0, throwDodgeChance:0, prediction:0, empDurationMultiplier:1, detection:1, cooldown:1 };
  const power={Easy:.75,Normal:1,Hard:1.15}[difficulty]||1;
  if(profile==='melee')Object.assign(base,{shieldDuration:1+.25*power,counterChance:.35*power});
  if(profile==='throw')Object.assign(base,{throwDodgeChance:Math.min(.5,.35*power)});
  if(profile==='dodge')Object.assign(base,{prediction:difficulty==='Hard'?.22:.18});
  if(profile==='emp')Object.assign(base,{empDurationMultiplier:{Easy:.85,Normal:.75,Hard:.65}[difficulty]});
  if(profile==='defensive')Object.assign(base,{detection:1.15,cooldown:Math.max(.85,1-.1*power)});
  return base;
}
