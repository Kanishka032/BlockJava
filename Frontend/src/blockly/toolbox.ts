export const toolboxConfig = {
  kind: 'categoryToolbox',
  contents: [

    { kind: 'sep', gap: '38' },

    // 🚀 EVENTS
    {
      kind: 'category',
      name: '🚀 Events',
      colour: '#ff1212',
      contents: [
        { kind: 'block', type: 'when_start' }
      ],
    },

    { kind: 'sep', gap: '38' },

    // 🏃 MOTION
    {
      kind: 'category',
      name: '🏃 Motion',
      colour: '#4c97ff',
      contents: [

        { kind: 'block', type: 'move_steps',
          inputs: { STEPS: { shadow: { type: 'math_number', fields: { NUM: 10 } } } }
        },

        { kind: 'block', type: 'turn_left',
          inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 15 } } } }
        },

        { kind: 'block', type: 'turn_right',
          inputs: { DEGREES: { shadow: { type: 'math_number', fields: { NUM: 15 } } } }
        },

        { kind: 'block', type: 'go_to_xy',
          inputs: {
            X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
          }
        },

        { kind: 'block', type: 'glide_to_xy',
          inputs: {
            SECONDS: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
          }
        },

        { kind: 'block', type: 'set_x',
          inputs: { X: { shadow: { type: 'math_number', fields: { NUM: 0 } } } }
        },

        { kind: 'block', type: 'change_x',
          inputs: { X: { shadow: { type: 'math_number', fields: { NUM: 10 } } } }
        },

        { kind: 'block', type: 'set_y',
          inputs: { Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } } }
        },

        { kind: 'block', type: 'change_y',
          inputs: { Y: { shadow: { type: 'math_number', fields: { NUM: 10 } } } }
        },

        { kind: 'block', type: 'bounce_edge' },

        { kind: 'block', type: 'jump' },

      ],
    },

    { kind: 'sep', gap: '38' },

    // 🔄 CONTROL
    {
      kind: 'category',
      name: '🔄 Control',
      colour: '#ffab19',
      contents: [
        { kind: 'block', type: 'repeat_times',
          inputs: { TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } } }
        },
        { kind: 'block', type: 'wait_seconds',
          inputs: { SECONDS: { shadow: { type: 'math_number', fields: { NUM: 1 } } } }
        },
        { kind: 'block', type: 'if_then' },
        { kind: 'block', type: 'if_else' },
        { kind: 'block', type: 'forever' },
      ],
    },

    { kind: 'sep', gap: '38' },

    // 🧭 SENSING (NEW CATEGORY)
    {
      kind: 'category',
      name: '🧭 Sensing',
      colour: '#5cb1d6',
      contents: [
        { kind: 'block', type: 'mouse_x' },
        { kind: 'block', type: 'mouse_y' },
         { kind: 'block', type: 'think_message' }
      ],
    },

    { kind: 'sep', gap: '38' },

    // 🔊 SOUND
    {
      kind: 'category',
      name: '🔊 Sound',
      colour: '#cf63cf',
      contents: [
        { kind: 'block', type: 'play_sound' },
        { kind: 'block', type: 'say_message',
          inputs: {
            MESSAGE: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } },
            SECONDS: { shadow: { type: 'math_number', fields: { NUM: 2 } } }
          }
        },
      ],
    },

    { kind: 'sep', gap: '38' },

    // 🎨 LOOKS
    {
      kind: 'category',
      name: '🎨 Looks',
      colour: '#9966ff',
      contents: [
        { kind: 'block', type: 'show_sprite' },
        { kind: 'block', type: 'hide_sprite' },
        { kind: 'block', type: 'set_scale',
          inputs: { SCALE: { shadow: { type: 'math_number', fields: { NUM: 100 } } } }
        },
        { kind: 'block', type: 'set_effect' },
        { kind: 'block', type: 'clear_effects' },
        { kind: 'block', type: 'set_costume',
          fields: { COSTUME: 'costume1' }
        },
       {
  kind: 'block',
  type: 'set_backdrop',
  fields: { BACKDROP: 'blue' }
}
      ],
    },

    { kind: 'sep', gap: '38' },

    // 📊 VARIABLES
    {
      kind: 'category',
      name: '📊 Variables',
      colour: '#9966ff',
      custom: 'VARIABLE',
    },

    { kind: 'sep', gap: '38' },

    // 🔢 MATH
    {
      kind: 'category',
      name: '🔢 Math',
      colour: '#5cb712',
      contents: [
        { kind: 'block', type: 'math_number', fields: { NUM: 0 } },
        { kind: 'block', type: 'math_add',
          inputs: {
            A: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
          }
        },
        { kind: 'block', type: 'math_random',
          inputs: {
            MIN: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
            MAX: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
          }
        },
      ],
    },

    { kind: 'sep', gap: '38' },

    // 🔀 LOGIC
    {
      kind: 'category',
      name: '🔀 Logic',
      colour: '#59c059',
      contents: [
        { kind: 'block', type: 'logic_boolean' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
      ],
    },

  ],
};

export default toolboxConfig;