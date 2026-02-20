import React, { useState } from 'react';
import { Code, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeViewerProps {
  code: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedCode = code || '// Your code will appear here when you add blocks';

  return (
    <div className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Code className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-foreground">Generated Code</h3>
            <p className="text-sm text-muted-foreground">See what your blocks create!</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      
      {isExpanded && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/30">
            <span className="text-xs font-mono text-muted-foreground">JavaScript</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-success" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <pre className="p-4 overflow-auto max-h-64 text-sm font-mono bg-muted/20">
            <code className="text-foreground/80">{formattedCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeViewer;
