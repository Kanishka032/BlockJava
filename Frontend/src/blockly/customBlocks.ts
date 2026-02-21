import * as Blockly from 'blockly';

// =========================
// Motion Blocks (Blue)
// =========================


Blockly.Blocks['move_steps'] = {
  init() {
    this.appendValueInput('STEPS')
      .setCheck('Number')
      .appendField('move');
    this.appendDummyInput().appendField('steps');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('Move the sprite forward');
  },
};

Blockly.Blocks['turn_left'] = {
  init() {
    this.appendValueInput('DEGREES')
      .setCheck('Number')
      .appendField('turn left');
    this.appendDummyInput().appendField('degrees');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('Turn the sprite left');
  },
};
Blockly.Blocks['think_message'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck("String")
        .appendField("think");
    this.appendValueInput("SECONDS")
        .setCheck("Number")
        .appendField("for seconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Make the sprite think a message");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['turn_right'] = {
  init() {
    this.appendValueInput('DEGREES')
      .setCheck('Number')
      .appendField('turn right');
    this.appendDummyInput().appendField('degrees');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('Turn the sprite right');
  },
};

Blockly.Blocks['go_to_xy'] = {
  init() {
    this.appendValueInput('X').setCheck('Number').appendField('go to x:');
    this.appendValueInput('Y').setCheck('Number').appendField('y:');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('Move sprite to position');
  },
};

Blockly.Blocks['jump'] = {
  init() {
    this.appendDummyInput().appendField('jump!');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
    this.setTooltip('Make the sprite jump');
  },
};

// =========================
// Control Blocks (Orange)
// =========================
Blockly.Blocks['repeat_times'] = {
  init() {
    this.appendValueInput('TIMES').setCheck('Number').appendField('repeat');
    this.appendDummyInput().appendField('times');
    this.appendStatementInput('DO').appendField('do');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(30);
    this.setTooltip('Repeat blocks multiple times');
  },
};

Blockly.Blocks['wait_seconds'] = {
  init() {
    this.appendValueInput('SECONDS').setCheck('Number').appendField('wait');
    this.appendDummyInput().appendField('seconds');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(30);
    this.setTooltip('Wait for some time');
  },
};

Blockly.Blocks['if_then'] = {
  init() {
    this.appendValueInput('CONDITION').setCheck('Boolean').appendField('if');
    this.appendStatementInput('DO').appendField('then');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(30);
    this.setTooltip('Do something if condition is true');
  },
};

Blockly.Blocks['if_else'] = {
  init() {
    this.appendValueInput('CONDITION').setCheck('Boolean').appendField('if');
    this.appendStatementInput('DO').appendField('then');
    this.appendStatementInput('ELSE').appendField('else');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(30);
    this.setTooltip('If-Else logic');
  },
};

Blockly.Blocks['forever'] = {
  init() {
    this.appendDummyInput().appendField('forever');
    this.appendStatementInput('DO').appendField('do');
    this.setPreviousStatement(true);
    this.setColour(30);
    this.setTooltip('Repeat forever');
  },
};

// =========================
// Event Blocks (Green)
// =========================
Blockly.Blocks['when_start'] = {
  init() {
    this.appendDummyInput().appendField('🚀 when start clicked');
    this.setNextStatement(true);
    this.setColour(90);
    this.setTooltip('Start the program');
  },
};

// =========================
// Sound Blocks (Pink)
// =========================
Blockly.Blocks['play_sound'] = {
  init() {
    this.appendDummyInput()
      .appendField('play sound')
      .appendField(
        new Blockly.FieldDropdown([
          ['meow', 'meow'],
          ['pop', 'pop'],
          ['boing', 'boing'],
          ['chime', 'chime'],
        ]),
        'SOUND'
      );
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(300);
    this.setTooltip('Play a sound');
  },
};

Blockly.Blocks['say_message'] = {
  init() {
    this.appendValueInput('MESSAGE').setCheck('String').appendField('say');
    this.appendValueInput('SECONDS').setCheck('Number').appendField('for');
    this.appendDummyInput().appendField('seconds');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(300);
    this.setTooltip('Show a speech bubble');
  },
};

// =========================
// Variable Blocks (Purple)
// =========================
Blockly.Blocks['set_variable'] = {
  init() {
    this.appendValueInput('VALUE')
      .setCheck(null)
      .appendField('set')
      .appendField(new Blockly.FieldVariable('myVar'), 'VAR')
      .appendField('to');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(270);
    this.setTooltip('Set a variable value');
  },
};

Blockly.Blocks['change_variable'] = {
  init() {
    this.appendValueInput('VALUE')
      .setCheck('Number')
      .appendField('change')
      .appendField(new Blockly.FieldVariable('myVar'), 'VAR')
      .appendField('by');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(270);
    this.setTooltip('Change a variable by amount');
  },
};

Blockly.Blocks['get_variable'] = {
  init() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable('myVar'), 'VAR');
    this.setOutput(true, null);
    this.setColour(270);
    this.setTooltip('Get variable value');
  },
};

// =========================
// Math Blocks (Green)
// =========================
Blockly.Blocks['math_add'] = {
  init() {
    this.appendValueInput('A').setCheck('Number');
    this.appendDummyInput().appendField('+');
    this.appendValueInput('B').setCheck('Number');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(230);
    this.setTooltip('Add two numbers');
  },
};

Blockly.Blocks['math_random'] = {
  init() {
    this.appendValueInput('MIN').setCheck('Number').appendField('random from');
    this.appendValueInput('MAX').setCheck('Number').appendField('to');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(230);
    this.setTooltip('Random number between min and max');
  },
};

// =========================
// Logic Blocks (Light Green)
// =========================
Blockly.Blocks['logic_boolean'] = {
  init() {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['true', 'TRUE'],
        ['false', 'FALSE'],
      ]),
      'BOOL'
    );
    this.setOutput(true, 'Boolean');
    this.setColour(60);
    this.setTooltip('Boolean value true or false');
  },
};

Blockly.Blocks['logic_compare'] = {
  init() {
    this.appendValueInput('A').setCheck(null);
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['=', 'EQ'],
        ['≠', 'NEQ'],
        ['<', 'LT'],
        ['≤', 'LTE'],
        ['>', 'GT'],
        ['≥', 'GTE'],
      ]), 'OP');
    this.appendValueInput('B').setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(60);
    this.setTooltip('Compare two values');
  },
};

Blockly.Blocks['logic_operation'] = {
  init() {
    this.appendValueInput('A').setCheck('Boolean');
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['and', 'AND'],
        ['or', 'OR'],
      ]), 'OP');
    this.appendValueInput('B').setCheck('Boolean');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(60);
    this.setTooltip('Logical AND/OR operation');
  },
};

Blockly.Blocks['logic_negate'] = {
  init() {
    this.appendValueInput('BOOL').setCheck('Boolean').appendField('not');
    this.setOutput(true, 'Boolean');
    this.setColour(60);
    this.setTooltip('Negate a boolean value');
  },
};// =========================
// Looks / Effects Blocks (Purple/Magenta)
// =========================
Blockly.Blocks['set_costume'] = {
  init() {
    this.appendDummyInput()
        .appendField('switch costume to')
        .appendField(new Blockly.FieldTextInput('costume1'), 'COSTUME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('Change the sprite costume');
  },
};

Blockly.Blocks['set_scale'] = {
  init() {
    this.appendValueInput('SCALE')
        .setCheck('Number')
        .appendField('set scale to');
    this.appendDummyInput().appendField('%');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('Change the sprite size');
  },
};

Blockly.Blocks['show_sprite'] = {
  init() {
    this.appendDummyInput().appendField('show sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('Make the sprite visible');
  },
};

Blockly.Blocks['hide_sprite'] = {
  init() {
    this.appendDummyInput().appendField('hide sprite');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('Make the sprite invisible');
  },
};

Blockly.Blocks['set_effect'] = {
  init() {
    this.appendDummyInput()
        .appendField('set effect')
        .appendField(new Blockly.FieldDropdown([
            ['ghost', 'ghost'],
            ['color', 'color'],
            ['brightness', 'brightness']
        ]), 'EFFECT')
        .appendField('to')
        .appendField(new Blockly.FieldNumber(0, 0, 100), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('Apply visual effect to sprite');
  },
};

Blockly.Blocks['clear_effects'] = {
  init() {
    this.appendDummyInput().appendField('clear all effects');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('Remove all visual effects');
  },
};
Blockly.Blocks['glide_to_xy'] = {
  init() {
    this.appendValueInput('SECONDS').setCheck('Number').appendField('glide');
    this.appendValueInput('X').setCheck('Number').appendField('to x:');
    this.appendValueInput('Y').setCheck('Number').appendField('y:');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};
Blockly.Blocks['change_y'] = {
  init() {
    this.appendValueInput('Y').setCheck('Number').appendField('change y by');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};
Blockly.Blocks['set_y'] = {
  init() {
    this.appendValueInput('Y').setCheck('Number').appendField('set y to');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};
Blockly.Blocks['mouse_x'] = {
  init() {
    this.appendDummyInput().appendField('mouse x');
    this.setOutput(true, 'Number');
    this.setColour(230);
  },
};
Blockly.Blocks['set_backdrop'] = { init() { this.appendDummyInput() .appendField('switch backdrop to') .appendField( new Blockly.FieldDropdown([ ['Blue', 'blue'], ['Green', 'green'], ['Space', 'space'], ['Purple', 'purple'], ['Orange', 'orange'], ['Default', 'default'] ]), 'BACKDROP' ); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(290); }, };
Blockly.Blocks['bounce_edge'] = {
  init() {
    this.appendDummyInput().appendField('if on edge, bounce');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};
Blockly.Blocks['change_x'] = {
  init() {
    this.appendValueInput('X').setCheck('Number').appendField('change x by');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
};
Blockly.Blocks['set_x'] = {
  init() {
    this.appendValueInput('X').setCheck('Number').appendField('set x to');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120);
  },
  
};
Blockly.Blocks['mouse_y'] = {
  init: function () {
    this.jsonInit({
      type: "mouse_y",
      message0: "mouse y",
      output: "Number",
      colour: 210,
      tooltip: "Current mouse Y position",
      helpUrl: ""
    });
  }
};

// =========================
// Export
// =========================
export const registerBlocks = () => {
  // Blocks auto-register when imported
};

export default registerBlocks;