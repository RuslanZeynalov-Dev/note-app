"use client"

import "./home.css"
import {MdOutlineEdit} from "react-icons/md";
import {RiDeleteBinLine} from "react-icons/ri";
import {IoShareOutline} from "react-icons/io5";
import {FaPlus} from "react-icons/fa6";
import Spacer from "@/mycomponents/Spacer";
import MyEditor from "@/mycomponents/MyEditor";
import React, {useEffect, useRef, useState} from "react";
import useNotes from "@/store/notes";

import parse from 'html-react-parser'; //

const ContentState = Object.freeze({
    CREATING: 'creating',
    VIEWING: 'viewing',
    EDITING: 'editing',
    EMPTY: "empty"
});

const shareNote = async(title, content)=>{
    if(navigator.share){
        try{
            await navigator.share({
                title,
                content
            })

        }catch(e){
            console.log("Share cancelled "+e)
        }
    }else{
        await navigator.clipboard.writeText(content);
        alert(
            "Browser doesnt support to share\n" +
            "Copied to clipboard"
        )
    }
}


export default function Home() {

    const [loaded, setLoaded] = useState(false);



    const [contentState, setcontentState] = useState(ContentState.EMPTY); //"viewing" "creating" "editing" "empty"

    const [currentNote, setCurrentNote] = useState(null);


    const titleRef = useRef(null);
    const editorRef = useRef(null);


    const {createNote, getAllNotes, getNoteById, deleteNoteById} = useNotes(state => state);

    useEffect(() => {
        setLoaded(true);
        console.log("loaded")
    }, [])

    const saveNote = () => {
        const title = titleRef.current.value;
        const content = editorRef.current.value;

        if (title.trim() === "" || content.trim() === "") {
            return;
        }

        var newNote = {
            title: title,
            content: content,
        }

        if(currentNote!=null){
            newNote.id = currentNote.id;
            createNote(newNote);
        }else{
            newNote.id = crypto.randomUUID();
            createNote(newNote);
        }

        setCurrentNote(newNote);
        setcontentState(ContentState.VIEWING);

    }



    return (

        <div className="container">
            <div className="side navigation">

                <div className="nav-act-container">

                    <button className="icon-text-button new-note-button" onClick={
                        ()=>{
                            setCurrentNote(null);
                            setcontentState(ContentState.CREATING)
                        }}>
                        <FaPlus/>
                        <span>New Note</span>
                    </button>

                </div>

                <div className="nav-notes-container">
                    {   loaded &&
                        getAllNotes().map(
                            (note) => (
                                <button onClick={()=>{
                                    setCurrentNote(getNoteById(note.id))
                                    setcontentState(ContentState.VIEWING);
                                }} className={"note-card" + ((currentNote && currentNote.id===note.id)?" active":"") }  key={note.id}>{note.title}</button>

                            )
                        )
                    }
                </div>


            </div>

            <div className="side content">
                <div className="con-act-container">

                    {[ContentState.VIEWING].includes(contentState) && (
                        <b>{currentNote.title}</b>
                    )}

                    <Spacer/>


                    {[ContentState.CREATING, ContentState.EDITING].includes(contentState) && (
                        <button className="icon-text-button con-act-button" onClick={()=>{
                            saveNote();
                        }}>
                            <MdOutlineEdit/>
                            <span>Save</span>
                        </button>
                    )}
                    {[ContentState.VIEWING].includes(contentState) && (
                        <button className="icon-text-button con-act-button" onClick={()=>{
                            setcontentState(ContentState.EDITING)
                        }}>
                            <MdOutlineEdit/>
                            <span>Edit</span>
                        </button>
                    )}
                    {[ContentState.VIEWING].includes(contentState) && (
                        <button className="icon-text-button con-act-button" onClick={()=>{
                            deleteNoteById(currentNote.id)
                            setcontentState(ContentState.EMPTY)
                        }}>
                            <RiDeleteBinLine/>
                            <span>Delete</span>
                        </button>
                    )}
                    {[ContentState.VIEWING].includes(contentState) && currentNote!=null && (
                        <button className="icon-text-button con-act-button" onClick={() => shareNote(currentNote.title, currentNote.content)}>
                            <IoShareOutline/>
                            <span>Share</span>
                        </button>
                    )}

                </div>
                <div className="con-text-container">

                    {contentState === ContentState.CREATING && <MyEditor title_={""} content_={""} titleRef={titleRef} editorRef={editorRef} />}
                    {contentState === ContentState.EDITING && currentNote && <MyEditor title_={currentNote.title} content_={currentNote.content} titleRef={titleRef} editorRef={editorRef} />}

                    {[ContentState.VIEWING].includes(contentState) && (
                        <div>
                            {parse(currentNote.content)}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
