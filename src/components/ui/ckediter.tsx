'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Italic,
  Essentials,
  Paragraph,
  Heading,
  List,
  Link,
  Image,
  ImageToolbar,
  ImageUpload,
  CodeBlock,
  SourceEditing
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

interface Props {
  value: string;
  onChange: (data: string) => void;
}

export default function CkEditor({
  value,
  onChange,
}: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: 'GPL',
          plugins: [
            Essentials,
            Paragraph,
            Heading,
            Bold,
            Italic,
            List,
            Link,
            Image,
            ImageToolbar,
            ImageUpload,
            CodeBlock,
            SourceEditing,
          ],

          toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'link',
            'insertImage',
            '|',
            'codeBlock',
            'sourceEditing',
          ],
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
