import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface WpCKEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  label: string;
  required?: boolean;
  editor?: any;
}

const TextEditor: React.FC<WpCKEditorProps> = ({
  initialContent = "",
  onContentChange,
  label,
  required,
  editor = ClassicEditor,
}) => {
  const [content, setContent] = useState<string>(initialContent);

  const handleChange = (_event: any, editorInstance: any) => {
    const data = editorInstance.getData();
    setContent(data);
    onContentChange?.(data);
  };

  return (
    <>
      {label && (
        <label
          style={{ fontSize: "12px" }}
          className={`fw-medium ms-1 ${required ? "required" : ""}`}
        >
          {label}
        </label>
      )}

      <div className="wp-ckeditor-container">
        <CKEditor
          editor={editor as any}
          data={content}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default TextEditor;
