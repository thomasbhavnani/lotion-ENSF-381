import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import uuid from 'react-uuid';
import {React, useEffect, useState} from 'react';
import { json, Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Notes from './Notes.js';
import ViewNote from './ViewNote.js';
import EditingNote from './EditingNote.js';


export default function Layout(){

    const navigate = useNavigate();
    const {id} = useParams();
    function Notestoggle(){
        document.querySelector(".notes-flex").classList.toggle("hide-notes"); //have to use hooks
        
    }
    

    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [])
    useEffect(()=>{
        console.log(notes)
    },[notes])
    useEffect(()=>{
            
        localStorage.setItem("notes", JSON.stringify(notes))
        
    }, [notes])
    
    
    
    

    function handleAddNote(){
        let  now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        let date = now.toISOString().slice(0,16);
        
        var newnote = {
            title: "Untitled", 
            content : "", 
            date : date, 
            formattedDate : "",
            id : uuid()
        }
        setNotes([newnote, ...notes])
        localStorage.setItem("notes", JSON.stringify(notes))
        const data = localStorage.getItem("notes");
        console.log("data: ", JSON.parse(data));
        navigate(`/editnote/${newnote.id}`, {replace : true});
    } 

    useEffect(()=>{
        if(notes.length === 0){
             document.getElementById("no-note-yet").style.display = "flex"
        }
        else{
            document.getElementById("no-note-yet").style.display = "none"    
        }    
    })

    return (
    <div id="whole-page">
        <div id = "lotion-header">
            <div id = "spacer-div">
                <label id = "spacer"  onClick={Notestoggle}>&#9776;</label>  
            </div>
            <div id = "title">
                <div id = "lotion">
                    Lotion
                    <div id = "like-notion">
                    like Notion, but worse
                    </div>
                </div>
            </div>
        </div>
        <div id = "flex-container">
            <div className = "notes-flex" >
                <div id = "notes-title">
                    <div id = "notes-text">
                        Notes
                    </div>
                    <div id ="add-notes-div">
                        <label id = "add-notes" onClick = {handleAddNote}> <b>+</b> </label>
                    </div>
                </div>
                <div id = "no-note-yet">No Note Yet</div>
                
                {notes.map(note => (
            <Link  to={'/viewnote/'+ note.id} >
            <Notes  key = {uuid()} CurrentNote={note.id===id ? ' current':''} id = {note.id} Title = {note.title} Date = {note.date} Content = {note.content} FormattedDate = {note.formattedDate}/>
            </Link>
            ))}
            </div>
            
            <Outlet context = {[notes, setNotes]}/>

        </div>
        
    </div>
    )
}