"use client"
import TextField from '@mui/material/TextField';
import JoditEditor from 'jodit-react';

import "./myeditor.css"

export default function MyEditor({title_, content_, titleRef, editorRef}) {




    return (
        <div className="editor-container">
            <TextField
                label="Title"
                variant="standard"
                defaultValue={title_}
                inputRef={titleRef}

                id="standard-basic"
                autoComplete="off"
            />

            <JoditEditor
                id="editor-basic"
                ref={editorRef}

                value={content_}

                config={{
                    minHeight: "200px"
                }}
            />

        </div>
    );
}
