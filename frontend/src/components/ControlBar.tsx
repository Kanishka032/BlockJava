import React from 'react';
import { Play, Square, RotateCcw, Save, FolderOpen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ControlBarProps {
  isRunning: boolean;
  onRun: () => void;
  onStop: () => void;
  onReset: () => void;
  onSave: () => void;
  // onLoad: () => void;
  onClear: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  isRunning,
  onRun,
  onStop,
  onReset,
  onSave,
  // onLoad,
  onClear,
}) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Run/Stop buttons */}
      <div className="flex items-center gap-2">
        {!isRunning ? (
          <Button
            onClick={onRun}
            className="btn-fun btn-run flex items-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span className="font-bold">Run</span>
          </Button>
        ) : (
          <Button
            onClick={onStop}
            className="btn-fun btn-stop flex items-center gap-2"
          >
            <Square className="w-5 h-5 fill-current" />
            <span className="font-bold">Stop</span>
          </Button>
        )}
        
        <Button
          variant="outline"
          onClick={onReset}
          className="rounded-xl h-11 px-4 hover:bg-muted transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <div className="w-px h-8 bg-border mx-2" />

      {/* Project controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onSave}
          className="rounded-xl h-11 px-4 hover:bg-muted transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save</span>
        </Button>
        
        
        
        <Button
          variant="outline"
          onClick={onClear}
          className="rounded-xl h-11 px-4 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ControlBar;
