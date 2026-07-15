export const WIDTH = 1280;
export const HEIGHT = 720;
export const COLORS = { bg:0x030914, floor:0x081827, panel:0x0d2a39, cyan:0x26ffe6, blue:0x2b82ff, red:0xff365f, white:0xe8ffff, amber:0xffbd3d, purple:0xb75cff };
export const PLAYER = { maxHealth:100, speed:220, dashSpeed:520, dashDuration:180, dashInvulnerability:180, dashCooldown:1000, attackCooldown:320, comboWindow:750, attackDamage:[18,22,30], attackRange:[65,65,80], empMax:100, empRange:210, empDuration:3000 };
export const THROWABLES = {
  crate:{ name:'금속 상자', damage:30, speed:520, color:0x94a9b8 },
  battery:{ name:'에너지 배터리', damage:15, speed:560, color:0x29f4ff, disable:1500 },
  barrel:{ name:'폭발통', damage:55, speed:520, color:0xff4d45, radius:120 }
};
export const ENEMIES = {
  drone:{ health:40, damage:12, speed:130, cooldown:1800, score:100 },
  guard:{ health:90, damage:18, speed:90, cooldown:1400, score:180 },
  turret:{ health:55, damage:10, speed:0, cooldown:1300, score:150 },
  charger:{ health:70, damage:24, speed:80, chargeSpeed:320, cooldown:3000, score:220 }
};
export const DIFFICULTIES = {
  Easy:{ health:.8, damage:.7, speed:.95, score:.8, adaptive:.75, warning:1.05 },
  Normal:{ health:1, damage:1, speed:1, score:1, adaptive:1, warning:1 },
  Hard:{ health:1.2, damage:1.25, speed:1.08, score:1.5, adaptive:1.15, warning:.9 }
};
export const SCORE = { drone:100, guard:180, turret:150, charger:220, boss:2000, puzzle:300, log:200, throwHit:25 };
export const LIMITS = { enemies:5, projectiles:30, particles:120, bossParticles:180, bossSummons:3 };
export const SCENE_ORDER = ['ResearchLabScene','SecurityScene','ServerScene','BossScene'];
export const PROFILE_LABELS = { melee:'근접형', throw:'투척형', dodge:'회피형', emp:'EMP 의존형', defensive:'방어형', balanced:'균형형' };
