import React, { useEffect, useRef, useCallback } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import 'blockly/blocks';
import '../blockly/customBlocks';
import { registerGenerators } from '../blockly/generators';
import toolboxConfig from '../blockly/toolbox';

interface BlocklyWorkspaceProps {
  onCodeChange?: (code: string) => void;
  onWorkspaceChange?: (workspace: Blockly.WorkspaceSvg) => void;
}

const BlocklyWorkspace: React.FC<BlocklyWorkspaceProps> = ({ 
  onCodeChange,
  onWorkspaceChange 
}) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const isInitializedRef = useRef(false);

  const initWorkspace = useCallback(() => {
    if (!blocklyDiv.current || isInitializedRef.current) return;
    if (workspaceRef.current) return;

    // Ensure container has dimensions
    const container = blocklyDiv.current;
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      // Retry after a short delay if container isn't sized yet
      setTimeout(initWorkspace, 100);
      return;
    }

    // Register generators
    registerGenerators();

    // Create workspace
    const workspace = Blockly.inject(container, {
      toolbox: toolboxConfig,
      grid: {
        spacing: 20,
        length: 3,
        colour: '#e0e0e0',
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.9,
        maxScale: 2,
        minScale: 0.5,
        scaleSpeed: 1.1,
      },
      trashcan: true,
      sounds: true,
      renderer: 'zelos',
      move: {
        scrollbars: {
          horizontal: true,
          vertical: true,
        },
        drag: true,
        wheel: true,
      },
    });

    workspaceRef.current = workspace;
    isInitializedRef.current = true;

    // Notify parent of workspace
    if (onWorkspaceChange) {
      onWorkspaceChange(workspace);
    }

    // Listen for changes
    workspace.addChangeListener((event) => {
      if (event.type === Blockly.Events.FINISHED_LOADING) return;
      try {
        const code = javascriptGenerator.workspaceToCode(workspace);
        if (onCodeChange) {
          onCodeChange(code);
        }
      } catch (e) {
        console.error('Error generating code:', e);
      }
    });

    // Load saved workspace
    const savedWorkspace = localStorage.getItem('codekids_workspace');
    if (savedWorkspace) {
      try {
        const json = JSON.parse(savedWorkspace);
        Blockly.serialization.workspaces.load(json, workspace);
      } catch (e) {
        console.log('No saved workspace to load');
      }
    }

    // Resize to fit container
    Blockly.svgResize(workspace);
  }, [onCodeChange, onWorkspaceChange]);

  useEffect(() => {
    initWorkspace();

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, [initWorkspace]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (workspaceRef.current) {
        Blockly.svgResize(workspaceRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Also resize after initial render
    const resizeTimer = setTimeout(handleResize, 200);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div 
      ref={blocklyDiv} 
      className="w-full h-full rounded-xl overflow-hidden border-2 border-border bg-card"
      style={{ minHeight: '500px', height: '100%' }}
    />
  );
};

export default BlocklyWorkspace;
