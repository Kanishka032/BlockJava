// taskDetails.ts
// Detailed explanations for each coding task

export interface TaskDetail {
  id: number;
  title: string;
  description: string;
  world: number;
  points: number;
  hint?: string;
  example?: string;
}

export const TASK_DETAILS: Record<number, TaskDetail> = {
  // ================= WORLD 1: Code Forest =================
  1: {
    id: 1,
    title: "First Steps",
    description: "Use the 'move' block to move your sprite forward by 50 steps",
    world: 0,
    points: 10,
    hint: "Think about how to move your character in a straight line.",
    example: "sprite.move(50);"
  },
  2: {
    id: 2,
    title: "Turn Around",
    description: "Use the 'turn left' block to rotate your sprite by 50 degrees",
    world: 0,
    points: 10,
    hint: "Rotating changes the sprite's direction.",
    example: "sprite.turnLeft(50);"
  },
  3: {
    id: 3,
    title: "Jump Up",
    description: "Use the 'change y by' block to make your sprite jump!",
    world: 0,
    points: 15,
    hint: "Increasing the Y coordinate moves the sprite up.",
    example: "sprite.changeY(50);"
  },
  4: {
    id: 4,
    title: "Play a Sound",
    description: "Find and use the 'play sound meow' block",
    world: 0,
    points: 10,
    hint: "Sounds make the game interactive.",
    example: "sprite.playSound('meow');"
  },
  5: {
    id: 5,
    title: "Say Hello",
    description: "Use the 'say' block to make your sprite greet the world",
    world: 0,
    points: 15,
    hint: "Text can be displayed above the sprite.",
    example: "sprite.say('Hello!');"
  },
  6: {
    id: 6,
    title: "Teleport",
    description: "Use 'go to x: y:' block to jump to position (100, 50)",
    world: 0,
    points: 25,
    hint: "You need specific coordinates to place the sprite.",
    example: "sprite.goTo(100, 50);"
  },
  7: {
    id: 7,
    title: "Move & Turn",
    description: "Combine a 'move' block and a 'turn right' block together",
    world: 0,
    points: 20,
    hint: "Sequence matters: move first, then turn, or vice versa.",
    example: "sprite.move(50);\nsprite.turnRight(50);"
  },
  8: {
    id: 8,
    title: "Repeat 5 Times",
    description: "Use a 'repeat' block to do an action 5 times",
    world: 0,
    points: 30,
    hint: "Loops help you repeat actions without writing code multiple times.",
    example: "for (let i = 0; i < 5; i++) {\n  sprite.move(50);\n}"
  },
  9: {
    id: 9,
    title: "Wait Then Jump",
    description: "Use 'wait 1 second' followed by a jump",
    world: 0,
    points: 20,
    hint: "Timing allows you to control the order of actions.",
    example: "sprite.wait(1);\nsprite.jump();"
  },
  10: {
    id: 10,
    title: "BOSS: Forever Loop",
    description: "Use the 'forever' block to create an infinite loop!",
    world: 0,
    points: 100,
    hint: "Think of how to make your sprite keep doing something endlessly.",
    example: "while (sprite.isRunning()) {\n  sprite.move(10);\n}"
  },

  // ================= WORLD 2: Logic Lagoon =================
  11: {
    id: 11,
    title: "Count to 10",
    description: "Use 'repeat 10' to repeat an action exactly 10 times",
    world: 1,
    points: 30,
    hint: "Loops can use counters.",
    example: "for (let i = 0; i < 10; i++) {\n  sprite.move(10);\n}"
  },

  // Add the rest of the tasks up to 50 following the same format
};