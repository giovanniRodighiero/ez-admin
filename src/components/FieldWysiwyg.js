import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FieldWysiwyg = ({ onChange, value }) => (
    <Editor
        editorState={value}
        onEditorStateChange={onChange}
    />
);

export default FieldWysiwyg;