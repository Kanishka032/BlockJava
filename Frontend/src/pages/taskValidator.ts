// ================================
// 🎯 TASK POINT RULES (1–50)
// ================================

export const taskRules: Record<number, { points: number }> = {
  1: { points: 10 },   2: { points: 10 },   3: { points: 15 },   4: { points: 10 },   5: { points: 15 },
  6: { points: 25 },   7: { points: 20 },   8: { points: 30 },   9: { points: 20 },   10: { points: 100 },

  11: { points: 30 },  12: { points: 30 },  13: { points: 40 },  14: { points: 35 },  15: { points: 35 },
  16: { points: 40 },  17: { points: 50 },  18: { points: 60 },  19: { points: 40 },  20: { points: 50 },

  21: { points: 25 },  22: { points: 25 },  23: { points: 30 },  24: { points: 30 },  25: { points: 35 },
  26: { points: 30 },  27: { points: 25 },  28: { points: 30 },  29: { points: 25 },  30: { points: 30 },

  31: { points: 35 },  32: { points: 20 },  33: { points: 20 },  34: { points: 35 },  35: { points: 30 },
  36: { points: 40 },  37: { points: 30 },  38: { points: 45 },  39: { points: 25 },  40: { points: 50 },

  41: { points: 35 },  42: { points: 40 },  43: { points: 40 },  44: { points: 35 },  45: { points: 45 },
  46: { points: 30 },  47: { points: 30 },  48: { points: 50 },  49: { points: 55 },  50: { points: 100 },
};


// ================================
// 🔍 HELPER CHECK FUNCTIONS
// ================================

const has = (code: string, text: string) => code.includes(text);
const hasRegex = (code: string, regex: RegExp) => regex.test(code);


// ================================
// 🧠 MAIN VALIDATOR
// ================================

export const validateTask = (code: string, taskId: number): boolean => {
  if (!code || !code.trim()) return false;

  switch (taskId) {

    // ================= WORLD 1 =================

    case 1:
      return has(code, "sprite.move(");

    case 2:
      return has(code, "sprite.turnLeft(");

    case 3:
      return has(code, "sprite.jump(");

    case 4:
      return has(code, "sprite.playSound(");

    case 5:
      return has(code, "sprite.say(");

    case 6:
      return hasRegex(code, /sprite\.goTo\(\s*100\s*,\s*50\s*\)/);

    case 7:
      return has(code, "sprite.move(") && has(code, "sprite.turnRight(");

    case 8:
      return hasRegex(code, /for\s*\(.*<\s*5/);

    case 9:
      return has(code, "sprite.wait(") && has(code, "sprite.jump(");

    case 10:
      return has(code, "while (sprite.isRunning())");


    // ================= WORLD 2 =================

    case 11:
      return hasRegex(code, /for\s*\(.*<\s*10/);

    case 12:
      return hasRegex(code, /for\s*\(.*\)/) && has(code, "sprite.move(");

    case 13:
      return hasRegex(code, /for\s*\(.*<\s*4/) &&
             has(code, "sprite.move(") &&
             has(code, "sprite.turnRight(");

    case 14:
      return has(code, "while (sprite.isRunning())") &&
             (has(code, "sprite.turnLeft(") || has(code, "sprite.turnRight("));

    case 15:
      return hasRegex(code, /for\s*\(.*\)/) &&
             has(code, "sprite.jump(") &&
             has(code, "sprite.wait(");

    case 16:
      return hasRegex(code, /for\s*\(.*\)/) &&
             hasRegex(code, /sprite\.move\(\s*100/);

    case 17:
      return hasRegex(code, /for\s*\(.*<\s*8/) &&
             hasRegex(code, /turn.*45/);

    case 18:
      return (code.match(/for\s*\(/g) || []).length >= 2;

    case 19:
      return hasRegex(code, /for\s*\(.*\)/) &&
             has(code, "sprite.move(") &&
             has(code, "sprite.wait(");

    case 20:
      return hasRegex(code, /for\s*\(.*<\s*36/) &&
             has(code, "turn");


    // ================= WORLD 3 =================

    case 21:
      return has(code, "sprite.setCostume(");

    case 22:
      return hasRegex(code, /setScale\(\s*200/);

    case 23:
      return has(code, "sprite.hide(") &&
             has(code, "sprite.show(");

    case 24:
      return hasRegex(code, /setEffect\(\s*['"]ghost['"]/);

    case 25:
      return (code.match(/playSound/g) || []).length >= 2;

    case 26:
      return has(code, "sprite.say(") &&
             has(code, "sprite.move(");

    case 27:
      return hasRegex(code, /setScale\(\s*50/);

    case 28:
      return hasRegex(code, /setEffect\(\s*['"]color['"]/);

    case 29:
      return has(code, "sprite.say("); // think equivalent

    case 30:
      return has(code, "sprite.clearEffects(");


    // ================= WORLD 4 =================

    case 31:
      return has(code, "setBackdrop");

    case 32:
      return hasRegex(code, /wait\(\s*5/);

    case 33:
      return has(code, "sprite.say(");

    case 34:
      return has(code, "sprite.playSound(") &&
             has(code, "sprite.hide(");

    case 35:
      return has(code, "sprite.show(") &&
             hasRegex(code, /setScale\(\s*100/);

   case 36:
  return hasRegex(code, /sprite\.x\s*<=\s*-240|sprite\.x\s*>=\s*240|sprite\.y\s*<=\s*-180|sprite\.y\s*>=\s*180/);
    case 37:
      return has(code, "random");

    case 38:
      return has(code, "if (") && has(code, "else");

    case 39:
      return hasRegex(code, /goTo\(\s*0\s*,\s*0/);

    case 40:
      return has(code, "if (") && has(code, ">");


    // ================= WORLD 5 =================

    case 41:
      return has(code, "glide");

    case 42:
      return has(code, "=") && has(code, "10");

    case 43:
      return has(code, "+");

    case 44:
      return has(code, "mouse");

    case 45:
      return has(code, "wait");

    case 46:
      return has(code, "setX") || has(code, "changeX");

    case 47:
      return has(code, "setY") || has(code, "changeY");

    case 48:
      return has(code, "if (") && has(code, "100");

    case 49:
      return has(code, "glide") && has(code, "turn");

    case 50:
      return has(code, "for") &&
             has(code, "if") &&
             has(code, "playSound");

    default:
      return false;
  }
};