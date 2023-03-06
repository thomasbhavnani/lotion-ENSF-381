import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import uuid from 'react-uuid';
import {React, useState, forceUpdate} from 'react';
import { json, useNavigate, useParams,useOutletContext, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Notes from './Notes.js';
import handleAddNote from './Layout.js'



export default function EditingNote(){

    const {id} = useParams()
    const navigate = useNavigate();
    const[notes, setNote] = useOutletContext();
    const noteToSave = notes.find(note => note.id === id)

    const [title, setTitle] = useState(noteToSave.title);
    const [date, setDate] = useState(noteToSave.date);
    const [editorValue, setEditorValue] = useState(noteToSave.content);
    
    const handleDeleteNote = () =>{

        const updateNotes = notes.filter(note => note.id !== id)
        console.log(Object.keys(notes).length)

        if(Object.keys(notes).length === 1){

            setNote(
                updateNotes   
            )
            navigate (`/`, {replace:true})
            
            
        }
        else{
            setNote(
                updateNotes
            )
            navigate (`/viewnote/${updateNotes[0].id}`, {replace:true})
        }
        
        } 

        
    
    

        const  handleSaveNote = ()=>{
                const noteToSave = notes.find(note => note.id === id)
                console.log(notes)
                noteToSave.title = title
                noteToSave.content = editorValue
                noteToSave.date = date
                noteToSave.formattedDate = formatDate(date)
                localStorage.setItem("notes", JSON.stringify(notes))
        } 

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        
        const formatDate = (when) => {
            const formatted = new Date(when).toLocaleString("en-US", options);
            if (formatted === "Invalid Date") {
                return "";
            }
            console.log(formatted)
            return formatted;
        };
        
        
        
        
        
    
    return(
        <>
    <div id = "editor-flex">
      <div id = "editor-title">
          <div id = "title-and-time">
            <input id = "input-title" type = "text" value = {title} onChange ={(e) => setTitle(e.target.value)} ></input>
            <input type="datetime-local" id = "time-edit" value = {date} onChange ={(r) => setDate(r.target.value)}/> 
          </div>
          
          <div id = "save-and-delete-labels">
                <Link to={`/viewnote/${id}`} id = "save-icon" >
                    <label onClick={handleSaveNote} id = "save-icon">Save</label>
                </Link>  
                <label  id = "delete-icon" onClick={handleDeleteNote} >Delete</label>                   
          </div>
      </div>
      <ReactQuill defaultValue={""} value = {editorValue}  onChange = {(value) => setEditorValue(value)} theme="snow" />
      
  </div>
        </>
    )
    }