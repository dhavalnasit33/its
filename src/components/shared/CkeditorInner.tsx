"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    List,
    Link,
    Heading,
    BlockQuote,
    Table,
    TableToolbar,
    TableProperties,
    TableCellProperties,
    Image,
    // ImageToolbar,
    ImageUpload,
    ImageResize,
    Undo,
    FontColor,
    FontBackgroundColor,
    CodeBlock,
    HorizontalLine,
    SourceEditing,
    Base64UploadAdapter,
    Alignment,
    Autoformat,
    RemoveFormat,
    Strikethrough,
    Subscript,
    Superscript,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

interface Props {
    value: string;
    onChange: (data: string) => void;
}

export default function CustomCKEditorInner({
    value,
    onChange,
}: Props) {
    return (
        <div className="shadow-sm overflow-visible ">   {/* overflow-hidden */}
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                    licenseKey: "GPL",

                    heading: {
                        options: [
                            {
                                model: "paragraph",
                                title: "Paragraph",
                                class: "ck-heading_paragraph",
                            },
                            {
                                model: "heading1",
                                view: "h1",
                                title: "Heading 1",
                                class: "ck-heading_heading1",
                            },
                            {
                                model: "heading2",
                                view: "h2",
                                title: "Heading 2",
                                class: "ck-heading_heading2",
                            },
                            {
                                model: "heading3",
                                view: "h3",
                                title: "Heading 3",
                                class: "ck-heading_heading3",
                            },
                            {
                                model: "heading4",
                                view: "h4",
                                title: "Heading 4",
                                class: "ck-heading_heading4",
                            },
                        ],
                    },

                    plugins: [
                        Essentials,
                        Paragraph,
                        Bold,
                        Italic,
                        Underline,
                        Strikethrough,
                        Subscript,
                        Superscript,
                        RemoveFormat,
                        List,
                        Link,
                        Heading,
                        BlockQuote,
                        Table,
                        TableToolbar,
                        TableProperties,
                        TableCellProperties,
                        Image,
                        // ImageToolbar,
                        ImageUpload,
                        ImageResize,
                        Base64UploadAdapter,
                        Undo,
                        FontColor,
                        FontBackgroundColor,
                        CodeBlock,
                        HorizontalLine,
                        SourceEditing,
                        Alignment,
                        Autoformat,
                    ],

                    toolbar: {
                        shouldNotGroupWhenFull: true,
                        items: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "underline",
                            "strikethrough",
                            "subscript",
                            "superscript",
                            "removeFormat",
                            "|",
                            "fontColor",
                            "fontBackgroundColor",
                            "|",
                            "alignment",
                            "|",
                            "bulletedList",
                            "numberedList",
                            "|",
                            "insertTable",
                            "blockQuote",
                            "codeBlock",
                            "horizontalLine",
                            "|",
                            "link",
                            "uploadImage",
                            "|",
                            "sourceEditing",
                            "|",
                            "undo",
                            "redo",
                        ],
                    },

                    table: {
                        contentToolbar: [
                            "tableColumn",
                            "tableRow",
                            "mergeTableCells",
                            "tableProperties",
                            "tableCellProperties",
                        ],
                    },
                }}
                onChange={(_, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </div>
    );
}
