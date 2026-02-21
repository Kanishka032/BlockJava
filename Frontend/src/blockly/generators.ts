import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";

/* =====================================================
   🔥 ALWAYS REGISTER START BLOCK (OUTSIDE FUNCTION)
   Prevents "does not know how to generate code"
===================================================== */

/* =====================================================
   REGISTER ALL CUSTOM GENERATORS
===================================================== */

export const registerGenerators = () => {
  /* =========================
     Helper: safeValue
     Only uses fallback if no block is connected
  ========================= */
  function safeValue(block: Blockly.Block, inputName: string, fallback: string) {
    return block.getInputTargetBlock(inputName)
      ? javascriptGenerator.valueToCode(block, inputName, Order.ATOMIC)
      : fallback;
  }
// Event - when_start (prevents duplicate code generation)
  javascriptGenerator.forBlock["when_start"] = function (block: Blockly.Block) {
    const nextBlock = block.getNextBlock();
    if (nextBlock) {
      return '';
    }
    return '';
  };
  javascriptGenerator.forBlock["think_message"] = (block) => {
  const message = safeValue(block, "MESSAGE", `"Hmm..."`);
  const seconds = safeValue(block, "SECONDS", "2");
  return `await sprite.think(${message}, ${seconds});\n`;
};
  /* =========================
     Motion
  ========================= */


  javascriptGenerator.forBlock["move_steps"] = (block) => {
    const steps = safeValue(block, "STEPS", "10");
    return `await sprite.move(${steps});\n`;
  };

  javascriptGenerator.forBlock["turn_left"] = (block) => {
    const degrees = safeValue(block, "DEGREES", "15");
    return `await sprite.turnLeft(${degrees});\n`;
  };

  javascriptGenerator.forBlock["turn_right"] = (block) => {
    const degrees = safeValue(block, "DEGREES", "15");
    return `await sprite.turnRight(${degrees});\n`;
  };

  javascriptGenerator.forBlock["go_to_xy"] = (block) => {
    const x = safeValue(block, "X", "0");
    const y = safeValue(block, "Y", "0");
    return `await sprite.goTo(${x}, ${y});\n`;
  };

  javascriptGenerator.forBlock["jump"] = () => `await sprite.jump();\n`;

  javascriptGenerator.forBlock["glide_to_xy"] = (block) => {
    const seconds = safeValue(block, "SECONDS", "1");
    const x = safeValue(block, "X", "0");
    const y = safeValue(block, "Y", "0");
    return `await sprite.wait(${seconds});\nawait sprite.goTo(${x}, ${y});\n`;
  };

  javascriptGenerator.forBlock["set_x"] = (block) => {
    const x = safeValue(block, "X", "0");
    return `sprite.x = ${x};\n`;
  };

  javascriptGenerator.forBlock["change_x"] = (block) => {
    const x = safeValue(block, "X", "10");
    return `sprite.x += ${x};\n`;
  };

  javascriptGenerator.forBlock["set_y"] = (block) => {
    const y = safeValue(block, "Y", "0");
    return `sprite.y = ${y};\n`;
  };

  javascriptGenerator.forBlock["change_y"] = (block) => {
    const y = safeValue(block, "Y", "10");
    return `sprite.y += ${y};\n`;
  };

  javascriptGenerator.forBlock["bounce_edge"] = () =>
    `
if (sprite.x <= -240 || sprite.x >= 240) sprite.direction *= -1;
if (sprite.y <= -180 || sprite.y >= 180) sprite.direction *= -1;
`;

  /* =========================
     Control
  ========================= */
  javascriptGenerator.forBlock["repeat_times"] = (block) => {
    const times = safeValue(block, "TIMES", "10");
    const statements = javascriptGenerator.statementToCode(block, "DO") || "";
    return `for (let i = 0; i < ${times}; i++) {\n${statements}}\n`;
  };

  javascriptGenerator.forBlock["wait_seconds"] = (block) => {
    const seconds = safeValue(block, "SECONDS", "1");
    return `await sprite.wait(${seconds});\n`;
  };

  javascriptGenerator.forBlock["if_then"] = (block) => {
    const condition = safeValue(block, "CONDITION", "false");
    const statements = javascriptGenerator.statementToCode(block, "DO") || "";
    return `if (${condition}) {\n${statements}}\n`;
  };

  javascriptGenerator.forBlock["if_else"] = (block) => {
    const condition = safeValue(block, "CONDITION", "false");
    const doCode = javascriptGenerator.statementToCode(block, "DO") || "";
    const elseCode = javascriptGenerator.statementToCode(block, "ELSE") || "";
    return `if (${condition}) {\n${doCode}} else {\n${elseCode}}\n`;
  };

  javascriptGenerator.forBlock["forever"] = (block) => {
    const statements = javascriptGenerator.statementToCode(block, "DO") || "";
    return `while (sprite.isRunning()) {\n${statements}await sprite.wait(0.05);\n}\n`;
  };

  /* =========================
     Sound
  ========================= */
  javascriptGenerator.forBlock["play_sound"] = (block) => {
    const sound = block.getFieldValue("SOUND") || "pop";
    return `await sprite.playSound('${sound}');\n`;
  };

  javascriptGenerator.forBlock["say_message"] = (block) => {
    const message = safeValue(block, "MESSAGE", `"Hello!"`);
    const seconds = safeValue(block, "SECONDS", "2");
    return `await sprite.say(${message}, ${seconds});\n`;
  };

  /* =========================
     Variables
  ========================= */
  const getSafeVarName = (block: Blockly.Block) => {
    const nameDB = javascriptGenerator.nameDB_;
    if (!nameDB) return "variable";
    return nameDB.getName(
      block.getFieldValue("VAR"),
      Blockly.Names.NameType.VARIABLE
    );
  };

  javascriptGenerator.forBlock["set_variable"] = (block) => {
    const variable = getSafeVarName(block);
    const value = safeValue(block, "VALUE", "0");
    return `${variable} = ${value};\n`;
  };

  javascriptGenerator.forBlock["change_variable"] = (block) => {
    const variable = getSafeVarName(block);
    const value = safeValue(block, "VALUE", "1");
    return `${variable} = (typeof ${variable} === 'number' ? ${variable} : 0) + ${value};\n`;
  };

  javascriptGenerator.forBlock["get_variable"] = (block) => {
    const variable = getSafeVarName(block);
    return [variable, Order.ATOMIC];
  };

  /* =========================
     Math
  ========================= */
  javascriptGenerator.forBlock["math_add"] = (block) => {
    const a = safeValue(block, "A", "0");
    const b = safeValue(block, "B", "0");
    return [`${a} + ${b}`, Order.ADDITION];
  };

  javascriptGenerator.forBlock["math_random"] = (block) => {
    const min = safeValue(block, "MIN", "1");
    const max = safeValue(block, "MAX", "10");
    return [`Math.floor(Math.random() * (${max} - ${min} + 1)) + ${min}`, Order.FUNCTION_CALL];
  };

  /* =========================
     Logic
  ========================= */
  javascriptGenerator.forBlock["logic_boolean"] = (block) => {
    return [block.getFieldValue("BOOL") === "TRUE" ? "true" : "false", Order.ATOMIC];
  };

  javascriptGenerator.forBlock["logic_negate"] = (block) => {
    const bool = safeValue(block, "BOOL", "false");
    return [`!${bool}`, Order.LOGICAL_NOT];
  };

  /* =========================
     Looks
  ========================= */
  javascriptGenerator.forBlock["set_costume"] = (block) => {
    const costume = block.getFieldValue("COSTUME") || "costume1";
    return `await sprite.setCostume('${costume}');\n`;
  };

  javascriptGenerator.forBlock["set_scale"] = (block) => {
    const scale = safeValue(block, "SCALE", "100");
    return `await sprite.setScale(${scale});\n`;
  };

  javascriptGenerator.forBlock["show_sprite"] = () => `await sprite.show();\n`;
  javascriptGenerator.forBlock["hide_sprite"] = () => `await sprite.hide();\n`;

  javascriptGenerator.forBlock["set_effect"] = (block) => {
    const effect = block.getFieldValue("EFFECT") || "color";
    const value = safeValue(block, "VALUE", "0");
    return `await sprite.setEffect('${effect}', ${value});\n`;
  };

  javascriptGenerator.forBlock["clear_effects"] = () => `await sprite.clearEffects();\n`;

  javascriptGenerator.forBlock["mouse_x"] = () => [`stage.mouseX`, Order.ATOMIC];
  javascriptGenerator.forBlock["mouse_y"] = () => [`stage.mouseY`, Order.ATOMIC];

  javascriptGenerator.forBlock["set_backdrop"] = (block) => {
    const backdrop = block.getFieldValue("BACKDROP");
    return `await stage.setBackdrop("${backdrop}");\n`;
  };
};

export default registerGenerators;