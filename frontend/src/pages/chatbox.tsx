import React, { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

// ------------------------------
// TYPES
interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

// ------------------------------
// TASK DETAILS
// src/data/tasks.ts
export const TASK_DETAILS: Record<
  number,
  {
    title: string;
    description: string;
    points: number;
    world: number;
    hint?: string;
    example?: string;
  }
> = {
  // ================= WORLD 1: Basic Movement =================
  1: { title: "First Steps", description: "Use the 'move' block to move your sprite forward by 50 steps", points: 10, world: 0, hint: "Look for a block like move(50).", example: "sprite.move(50);" },
  2: { title: "Turn Around", description: "Use the 'turn left' block to rotate your sprite by 50 degrees", points: 10, world: 0, hint: "Use a turnLeft() function.", example: "sprite.turnLeft(50);" },
  3: { title: "Jump Up", description: "Use the 'change y by' block to make your sprite jump!", points: 15, world: 0, hint: "Change the Y coordinate to move up.", example: "sprite.jump(50);" },
  4: { title: "Play a Sound", description: "Find and use the 'play sound meow' block", points: 10, world: 0, hint: "Use sprite.playSound('meow').", example: "sprite.playSound('meow');" },
  5: { title: "Say Hello", description: "Use the 'say' block to make your sprite greet the world", points: 15, world: 0, hint: "Use sprite.say('Hello!').", example: "sprite.say('Hello!');" },
  6: { title: "Teleport", description: "Use 'go to x: y:' block to jump to position (100, 50)", points: 25, world: 0, hint: "Use sprite.goTo(100, 50).", example: "sprite.goTo(100, 50);" },
  7: { title: "Move & Turn", description: "Combine a 'move' block and a 'turn right' block together", points: 20, world: 0, hint: "Use sprite.move() and sprite.turnRight() consecutively.", example: "sprite.move(50); sprite.turnRight(90);" },
  8: { title: "Repeat 5 Times", description: "Use a 'repeat' block to do an action 5 times", points: 30, world: 0, hint: "Use a for loop or repeat(5).", example: "for(let i=0;i<5;i++){ sprite.move(10); }" },
  9: { title: "Wait Then Jump", description: "Use 'wait 1 second' followed by a jump", points: 20, world: 0, hint: "Use sprite.wait() before sprite.jump().", example: "sprite.wait(1); sprite.jump(50);" },
  10: { title: "BOSS: Forever Loop", description: "Use the 'forever' block to create an infinite loop!", points: 100, world: 0, hint: "A while loop running indefinitely works here.", example: "while(sprite.isRunning()) { sprite.move(10); }" },
  // ================= WORLD 2: Loops & Logic =================
  11: { title: "Count to 10", description: "Use 'repeat 10' to repeat an action exactly 10 times", points: 30, world: 1, hint: "Use repeat(10) or a for loop.", example: "for(let i=0;i<10;i++){ sprite.move(10); }" },
  12: { title: "Moving Loop", description: "Put a 'move' block inside a 'repeat' loop", points: 30, world: 1, hint: "Move inside a loop.", example: "for(let i=0;i<5;i++){ sprite.move(10); }" },
  13: { title: "Draw a Square", description: "Use repeat 4 to move forward and turn right 4 times", points: 40, world: 1, hint: "Loop 4 times and turn 90 degrees each time.", example: "for(let i=0;i<4;i++){ sprite.move(50); sprite.turnRight(90); }" },
  14: { title: "Spin Forever", description: "Use 'forever' with a 'turn' block to keep spinning", points: 35, world: 1, hint: "Infinite loop with turn.", example: "while(sprite.isRunning()){ sprite.turnRight(10); }" },
  15: { title: "Dance Loop", description: "Put 'jump' and 'wait' blocks inside a loop", points: 35, world: 1, hint: "Use jump + wait repeatedly.", example: "for(let i=0;i<5;i++){ sprite.jump(20); sprite.wait(1); }" },
  16: { title: "Fast Movement", description: "Use 'repeat' with 'move 100' to travel far", points: 40, world: 1, hint: "Move a large distance in loop.", example: "for(let i=0;i<2;i++){ sprite.move(100); }" },
  17: { title: "Make an Octagon", description: "Repeat turning 45 degrees exactly 8 times", points: 50, world: 1, hint: "Loop 8 times with turn 45.", example: "for(let i=0;i<8;i++){ sprite.move(50); sprite.turnRight(45); }" },
  18: { title: "Loop Inside Loop", description: "Put one 'repeat' block inside another 'repeat' block", points: 60, world: 1, hint: "Nested loops.", example: "for(let i=0;i<3;i++){ for(let j=0;j<3;j++){ sprite.move(10); } }" },
  19: { title: "Walk Slowly", description: "Use repeat with move and wait to walk step by step", points: 40, world: 1, hint: "Use wait inside a loop.", example: "for(let i=0;i<5;i++){ sprite.move(10); sprite.wait(1); }" },
  20: { title: "Draw a Circle", description: "Repeat small turns 36 times to make a circle shape", points: 50, world: 1, hint: "Small turn repeated.", example: "for(let i=0;i<36;i++){ sprite.move(10); sprite.turnRight(10); }" },
  // ================= WORLD 3: Looks & Effects =================
  21: { title: "Change Costume", description: "Use the 'next costume' block to change how sprite looks", points: 25, world: 2, hint: "Switch costume to change appearance.", example: "sprite.setCostume('costume2');" },
  22: { title: "Grow Bigger", description: "Use 'set size to 200%' to make sprite twice as big", points: 25, world: 2, hint: "Use setSize or setScale.", example: "sprite.setScale(200);" },
  23: { title: "Hide & Show", description: "Use 'hide' block then 'show' block to make sprite appear/disappear", points: 30, world: 2, hint: "Use hide() and show() functions.", example: "sprite.hide(); sprite.show();" },
  24: { title: "Ghost Effect", description: "Use 'set ghost effect' to make sprite see-through", points: 30, world: 2, hint: "Use setEffect('ghost').", example: "sprite.setEffect('ghost', 50);" },
  25: { title: "Two Sounds", description: "Play two different sound blocks one after another", points: 35, world: 2, hint: "Call playSound twice.", example: "sprite.playSound('meow'); sprite.playSound('bark');" },
  26: { title: "Talk While Moving", description: "Use 'say' block and 'move' block together", points: 30, world: 2, hint: "Combine say() and move().", example: "sprite.say('Hi'); sprite.move(50);" },
  27: { title: "Shrink Down", description: "Use 'set size to 50%' to make sprite half the size", points: 25, world: 2, hint: "Use setScale or setSize.", example: "sprite.setScale(50);" },
  28: { title: "Rainbow Colors", description: "Use 'change color effect' to change sprite's color", points: 30, world: 2, hint: "Use setEffect('color').", example: "sprite.setEffect('color', 100);" },
  29: { title: "Think Bubble", description: "Use 'think for 2 seconds' to show a thought bubble", points: 25, world: 2, hint: "Use sprite.think().", example: "sprite.think('Hmm...', 2);" },
  30: { title: "Clear Effects", description: "Use 'clear graphic effects' to reset all visual changes", points: 30, world: 2, hint: "Use clearEffects().", example: "sprite.clearEffects();" },
  // ================= WORLD 4: Conditionals & Functions =================
  31: { title: "New Background", description: "Use 'switch backdrop' to change the stage background", points: 35, world: 3, hint: "Use setBackdrop().", example: "sprite.setBackdrop('forest');" },
  32: { title: "Long Wait", description: "Use 'wait 5 seconds' block", points: 20, world: 3, hint: "Use wait().", example: "sprite.wait(5);" },
  33: { title: "Say Your Name", description: "Type your own name in a 'say' block", points: 20, world: 3, hint: "Use sprite.say().", example: "sprite.say('Alice');" },
  34: { title: "Sound & Hide", description: "Play a sound block, then use 'hide' block", points: 35, world: 3, hint: "Use playSound + hide.", example: "sprite.playSound('meow'); sprite.hide();" },
  35: { title: "Reset Everything", description: "Use 'show' and 'set size to 100%' to reset sprite", points: 30, world: 3, hint: "Use show() and setScale(100).", example: "sprite.show(); sprite.setScale(100);" },
  36: { title: "Bounce at Edge", description: "Use 'if on edge, bounce' block to bounce off walls", points: 40, world: 3, hint: "Use edge detection and bounce.", example: "if(sprite.onEdge()){ sprite.bounce(); }" },
  37: { title: "Random Position", description: "Use 'go to random position' block", points: 30, world: 3, hint: "Use goTo(randomX, randomY).", example: "sprite.goTo(Math.random()*240, Math.random()*180);" },
  38: { title: "If-Else Choice", description: "Use an 'if-else' block to make a decision", points: 45, world: 3, hint: "Use if-else statement.", example: "if(x>0){ sprite.move(10); } else { sprite.move(-10); }" },
  39: { title: "Go to Center", description: "Use 'go to x:0 y:0' to return to the middle of stage", points: 25, world: 3, hint: "Use goTo(0,0).", example: "sprite.goTo(0,0);" },
  40: { title: "Check Score", description: "Use an 'if' block to check if a number is greater than 10", points: 50, world: 3, hint: "Use if(score>10).", example: "if(score>10){ sprite.say('Win!'); }" },
  // ================= WORLD 5: Advanced/Ultimate =================
  41: { title: "Glide Up", description: "Use 'glide' block to smoothly move to top of screen", points: 35, world: 4, hint: "Use glide().", example: "sprite.glide(2, sprite.x, 180);" },
  42: { title: "Create Variable", description: "Make a new variable called 'Speed' and set it to 10", points: 40, world: 4, hint: "Use setVariable().", example: "sprite.setVariable('Speed',10);" },
  43: { title: "Math Blocks", description: "Use a '+ operator' block to add 50 + 50 in a move block", points: 40, world: 4, hint: "Use addition.", example: "sprite.move(50+50);" },
  44: { title: "Follow Mouse", description: "Use 'point towards mouse-pointer' block", points: 35, world: 4, hint: "Use pointTowards().", example: "sprite.pointTowards(mouseX, mouseY);" },
  45: { title: "Wait for Click", description: "Use 'wait until' block with 'sprite clicked?' condition", points: 45, world: 4, hint: "Wait for click event.", example: "sprite.waitUntilClicked();" },
  46: { title: "Move on X-axis", description: "Use 'set x to' or 'change x by' block to move horizontally", points: 30, world: 4, hint: "Modify x coordinate.", example: "sprite.setX(100);" },
  47: { title: "Move on Y-axis", description: "Use 'set y to' or 'change y by' block to move vertically", points: 30, world: 4, hint: "Modify y coordinate.", example: "sprite.setY(50);" },
  48: { title: "Win Condition", description: "Use 'if score = 100' to check if player won", points: 50, world: 4, hint: "Check if score==100.", example: "if(score==100){ sprite.say('Win'); }" },
  49: { title: "Glide & Spin", description: "Use 'glide' and 'turn' blocks at the same time", points: 55, world: 4, hint: "Use glide and turn together.", example: "sprite.glide(2, 100,100); sprite.turnRight(90);" },
  50: { title: "ULTIMATE BOSS", description: "Combine loop, if-else, and sound in one program!", points: 100, world: 4, hint: "Combine multiple concepts.", example: "for(let i=0;i<5;i++){ if(score>10){ sprite.playSound('meow'); sprite.move(10); } }" }
};

// ------------------------------
// CHATBOX COMPONENT
const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const taskNumberMatch = input.match(/\b([1-9][0-9]?)\b/);
    let aiText = "";

    if (taskNumberMatch) {
      const taskId = parseInt(taskNumberMatch[1], 10);
      if (taskId >= 1 && taskId <= 50) {
        const task = TASK_DETAILS[taskId];
        aiText = `🎯 Task #${taskId}: "${task.title}"
🌍 World: ${task.world + 1}

📝 Objective: ${task.description}

💡 Hint: ${task.hint || "Think about the main action."}

📌 Example:
${task.example || "No example available."}`;
      } else {
        aiText = `I couldn't find Task #${taskId}. Please ask a number between 1 and 50.`;
      }
    } else {
      aiText = `You asked: "${input}". I'm here to help with tasks! Try asking like "What is task 3?"`;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {open && (
        <div className="bg-white w-96 h-[28rem] rounded-2xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <span className="font-bold">AI Assistant</span>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[85%] whitespace-pre-line break-words ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-blue-900 self-end"
                    : "bg-slate-100 text-slate-900 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded-xl p-2 text-sm"
              placeholder="Ask me about a task..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-xl flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
          className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-lg font-bold"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBox;
