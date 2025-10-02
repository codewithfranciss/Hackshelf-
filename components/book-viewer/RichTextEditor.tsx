import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Code,
  Quote
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          'prose-headings:text-matrix prose-headings:font-mono',
          'prose-p:text-foreground prose-p:font-mono prose-p:text-sm',
          'prose-strong:text-matrix prose-strong:font-bold',
          'prose-em:text-matrix prose-em:italic',
          'prose-code:text-matrix prose-code:bg-code-bg prose-code:px-1 prose-code:rounded',
          'prose-blockquote:border-l-matrix prose-blockquote:text-muted-foreground',
          'prose-ul:text-foreground prose-ol:text-foreground',
          'prose-li:text-foreground prose-li:font-mono prose-li:text-sm',
          'min-h-full p-4 bg-background'
        ),
      },
      handleDOMEvents: {
        keydown: (view, event) => {
          // Handle Tab key for indentation
          if (event.key === 'Tab') {
            event.preventDefault();
            return true;
          }
        },
      },
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    children 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode;
  }) => (
    <Button
      variant={isActive ? "hack" : "terminal"}
      size="sm"
      onClick={onClick}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-terminal-border p-2 bg-card">
        <div className="flex items-center gap-1 flex-wrap">
          {/* Text formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Headings */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          >
            <List className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Quote */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto">
        <EditorContent 
          editor={editor}
          className="h-full"
        />
        
        {/* Placeholder */}
        {editor.isEmpty && (
          <div className="absolute top-20 left-4 text-muted-foreground font-mono text-sm pointer-events-none">
            {placeholder || "> Start typing your notes..."}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="border-t border-terminal-border p-2 bg-card">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>
            {editor.storage.characterCount?.characters() || editor.getText().length} chars, {editor.getText().split(' ').filter(w => w.length > 0).length} words
          </span>
          <span className="matrix-text">
            &gt; READY
          </span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;