import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SpriteSelectorProps {
  selectedSprite: string;
  onSpriteChange: (sprite: string) => void;
}

const SPRITES = [
  { value: 'cat', label: '🐱 Cat', emoji: '🐱' },
  { value: 'dog', label: '🐶 Dog', emoji: '🐶' },
  { value: 'bird', label: '🐦 Bird', emoji: '🐦' },
  { value: 'fish', label: '🐠 Fish', emoji: '🐠' },
  { value: 'butterfly', label: '🦋 Butterfly', emoji: '🦋' },
  { value: 'turtle', label: '🐢 Turtle', emoji: '🐢' },
  { value: 'robot', label: '🤖 Robot', emoji: '🤖' },
  { value: 'alien', label: '👾 Alien', emoji: '👾' },
  { value: 'dinosaur', label: '🦖 Dinosaur', emoji: '🦖' },
  { value: 'unicorn', label: '🦄 Unicorn', emoji: '🦄' },
  { value: 'rocket', label: '🚀 Rocket', emoji: '🚀' },
  { value: 'car', label: '🚗 Car', emoji: '🚗' },
];

const SpriteSelector: React.FC<SpriteSelectorProps> = ({ selectedSprite, onSpriteChange }) => {
  const currentSprite = SPRITES.find(s => s.value === selectedSprite) || SPRITES[0];

  return (
    <Select value={selectedSprite} onValueChange={onSpriteChange}>
      <SelectTrigger className="w-[140px] h-9 text-sm">
        <SelectValue>
          <span className="flex items-center gap-2">
            <span className="text-lg">{currentSprite.emoji}</span>
            <span className="hidden sm:inline">{currentSprite.value}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
      
        {SPRITES.map((sprite) => (
          <SelectItem key={sprite.value} value={sprite.value}>
            <span className="flex items-center gap-2">
              <span className="text-lg">{sprite.emoji}</span>
              <span>{sprite.value.charAt(0).toUpperCase() + sprite.value.slice(1)}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SpriteSelector;
