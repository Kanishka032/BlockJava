import React, { useState, useEffect, useRef, useCallback } from 'react';

import spriteCat from '@/assets/sprite-cat.png';
import spriteDog from '@/assets/sprite-dog.jpg';
import bird1 from '@/assets/LS20260215141028.png';
import bird2 from '@/assets/LS20260215141656.png';
import bird3 from '@/assets/LS20260215141818.png';
import bird4 from '@/assets/LS20260215141936.png';
import bird5 from '@/assets/LS20260215142154.png';
import bird6 from '@/assets/LS20260215142318.png';
import bird7 from '@/assets/LS20260215142538.png';
import bird8 from '@/assets/LS20260215142726.png';
import bird9 from '@/assets/LS20260215142846.png';
import bird10 from "@/assets/LS20260215143141.png";


// =========================
// Interfaces
// =========================

interface SpriteState {
  x: number;
  y: number;
  rotation: number;
  isVisible: boolean;
  scale: number;
  message: string;
  variables: Record<string, number>;
  opacity: number;
  hueRotate: number;
  brightness: number;
}

export interface StageProps {
  onSpriteRef?: (controller: SpriteController | null) => void;
  isRunning: boolean;
  spriteType: string;
}

export interface SpriteController {
  move: (steps: number) => Promise<void>;
  turnLeft: (degrees: number) => Promise<void>;
  turnRight: (degrees: number) => Promise<void>;
  goTo: (x: number, y: number) => Promise<void>;
  jump: () => Promise<void>;
  wait: (seconds: number) => Promise<void>;

  show: () => Promise<void>;
  hide: () => Promise<void>;
  setScale: (percent: number) => Promise<void>;
  setEffect: (name: string, value: number) => Promise<void>;
  clearEffects: () => Promise<void>;

  playSound: (sound: string) => Promise<void>;
  say: (message: string, seconds: number) => Promise<void>;

  setVariable: (name: string, value: number) => void;
  changeVariable: (name: string, delta: number) => void;
  getVariable: (name: string) => number;

  // 🔥 NEW
  setBackdrop: (bg: string) => void;
  readonly mouseX: number;
  readonly mouseY: number;

  reset: () => void;
  isRunning: () => boolean;
  stop: () => void;
}

const SPRITE_IMAGES: Record<string, string> = {
  cat: spriteCat,
  dog: spriteDog,
  fish: bird2,
  butterfly: bird3,
  turtle: bird4,
  robot: bird5,
  alien: bird6,
  dinosaur: bird7,
  bird: bird1,
  unicorn: bird8,
  rocket: bird9,
  car: bird10,
};

const Stage: React.FC<StageProps> = ({ onSpriteRef, isRunning, spriteType }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(false);

  const stageWidth = 400;
  const stageHeight = 500;

  // =========================
  // Backdrop
  // =========================

  // const [backdrop, setBackdropState] = useState<string>('default');
const [backdrop, setBackdropState] = useState<string>('default');
  const getBackdropColor = () => {
    switch (backdrop) {
      case 'blue': return '#1e3a8a';
      case 'green': return '#064e3b';
      case 'space': return '#0f172a';
      case 'sunset': return '#7c2d12';
      default: return '#0f172a';
    }
  };

  // =========================
  // Mouse Tracking
  // =========================

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!stageRef.current) return;

      const rect = stageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - stageWidth / 2;
      const y = stageHeight / 2 - (e.clientY - rect.top);

      setMouse({ x, y });
    };

    const stageEl = stageRef.current;
    stageEl?.addEventListener('mousemove', handleMouseMove);

    return () => {
      stageEl?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // =========================
  // Sprite State
  // =========================

  const [sprite, setSprite] = useState<SpriteState>({
    x: 0,
    y: 0,
    rotation: 0,
    isVisible: true,
    scale: 1,
    message: '',
    variables: {},
    opacity: 1,
    hueRotate: 0,
    brightness: 100,
  });

  // =========================
  // Controller
  // =========================

  const createController = useCallback((): SpriteController => {
    return {
      move: async (steps: number) => {
        setSprite(prev => {
          const radians = (prev.rotation - 90) * (Math.PI / 180);
          const newX = prev.x + Math.cos(radians) * steps;
          const newY = prev.y + Math.sin(radians) * steps;
          return { ...prev, x: newX, y: newY };
        });
        await new Promise(r => setTimeout(r, 50));
      },

      turnLeft: async (deg) => {
        setSprite(prev => ({ ...prev, rotation: prev.rotation - deg }));
      },

      turnRight: async (deg) => {
        setSprite(prev => ({ ...prev, rotation: prev.rotation + deg }));
      },

      goTo: async (x, y) => {
        setSprite(prev => ({ ...prev, x, y }));
      },

      jump: async () => {
        setSprite(prev => ({ ...prev, y: prev.y + 30 }));
        await new Promise(r => setTimeout(r, 200));
        setSprite(prev => ({ ...prev, y: prev.y - 30 }));
      },

      wait: async (seconds) => {
        await new Promise(r => setTimeout(r, seconds * 1000));
      },

      show: async () => {
        setSprite(prev => ({ ...prev, isVisible: true }));
      },

      hide: async () => {
        setSprite(prev => ({ ...prev, isVisible: false }));
      },

      setScale: async (percent) => {
        setSprite(prev => ({ ...prev, scale: percent / 100 }));
      },

      setEffect: async (name, value) => {
        setSprite(prev => {
          if (name === 'ghost') return { ...prev, opacity: (100 - value) / 100 };
          if (name === 'color') return { ...prev, hueRotate: value * 3.6 };
          if (name === 'brightness') return { ...prev, brightness: value + 100 };
          return prev;
        });
      },

      clearEffects: async () => {
        setSprite(prev => ({
          ...prev,
          opacity: 1,
          hueRotate: 0,
          brightness: 100,
        }));
      },

      playSound: async () => {},
      say: async (msg, seconds) => {
        setSprite(prev => ({ ...prev, message: msg }));
        await new Promise(r => setTimeout(r, seconds * 1000));
        setSprite(prev => ({ ...prev, message: '' }));
      },

      setVariable: (name, value) => {
        setSprite(prev => ({ ...prev, variables: { ...prev.variables, [name]: value } }));
      },

      changeVariable: (name, delta) => {
        setSprite(prev => ({
          ...prev,
          variables: { ...prev.variables, [name]: (prev.variables[name] || 0) + delta },
        }));
      },

      getVariable: (name) => sprite.variables[name] || 0,

      // 🔥 NEW
      setBackdrop: (bg: string) => {
        setBackdropState(bg);
      },

      get mouseX() {
        return mouse.x;
      },

      get mouseY() {
        return mouse.y;
      },

      reset: () => {
        setSprite({
          x: 0,
          y: 0,
          rotation: 0,
          isVisible: true,
          scale: 1,
          message: '',
          variables: {},
          opacity: 1,
          hueRotate: 0,
          brightness: 100,
        });
      },

      isRunning: () => runningRef.current,

      stop: () => {
        runningRef.current = false;
      },
    };
  }, [mouse, sprite.variables]);

  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    onSpriteRef?.(createController());
  }, [createController]);


   return (
  <div
    ref={stageRef}
    className="stage-area relative overflow-hidden rounded-xl"
   style={{
  width: stageWidth,
  height: stageHeight,
  background:
    backdrop === 'blue' ? '#1e3a8a' :
    backdrop === 'green' ? '#064e3b' :
    backdrop === 'space' ? '#0f172a' :
    backdrop === 'purple' ? '#6b21a8' :
    backdrop === 'orange' ? '#c2410c' :
    '#0f172a'
}}
  >
      {sprite.isVisible && (
        <div
          style={{
            position: 'absolute',
            left: `calc(50% + ${sprite.x}px)`,
            top: `calc(50% - ${sprite.y}px)`,
            transform: `translate(-50%, -50%) rotate(${sprite.rotation}deg) scale(${sprite.scale})`,
            opacity: sprite.opacity,
            filter: `hue-rotate(${sprite.hueRotate}deg) brightness(${sprite.brightness}%)`,
          }}
        >
          {sprite.message && (
            <div className="absolute -top-12 bg-white px-3 py-1 rounded shadow">
              {sprite.message}
            </div>
          )}

          <img
            src={SPRITE_IMAGES[spriteType] || spriteCat}
            alt={spriteType}
            className="w-20 h-20 object-contain"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};

export default Stage;