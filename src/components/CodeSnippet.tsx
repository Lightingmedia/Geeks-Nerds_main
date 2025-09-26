import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  code, 
  language, 
  showLineNumbers = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const highlightJavaCode = (code: string) => {
    return code
      .replace(/(public|static|void|var|List|String|System|out|println)/g, '<span class="text-orange-400">$1</span>')
      .replace(/(main|stream|map|filter|limit|collect|toUpperCase|length|joining)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
      .replace(/(\d+)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(\.)/g, '<span class="text-gray-300">$1</span>')
      .replace(/([{}();])/g, '<span class="text-gray-300">$1</span>');
  };

  const lines = code.split('\n');

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 font-mono">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors rounded"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="text-gray-500 text-xs mr-4 select-none w-8 text-right">
                  {index + 1}
                </span>
              )}
              <code 
                className="text-gray-100 flex-1"
                dangerouslySetInnerHTML={{ 
                  __html: language === 'java' ? highlightJavaCode(line) : line 
                }}
              />
            </div>
          ))}
        </pre>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-2 right-4">
        <span className="text-xs text-gray-500 font-mono">geeksandnerds.com</span>
      </div>
    </div>
  );
};