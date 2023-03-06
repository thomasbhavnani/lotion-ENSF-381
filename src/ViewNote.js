
import 'react-quill/dist/quill.snow.css';
// import uuid from 'react-uuid';
import {React} from 'react';
import { json, Link, useOutletContext, useParams, parse, useNavigate } from 'react-router-dom';


export default function ViewNote(){
    const {id} = useParams()
    const navigate = useNavigate();
    const[notes, setNote] = useOutletContext();

    var filteredNote = notes.filter(notes => notes.id.includes(id));
    
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

        
    return(

    <div id = "editor-flex">
        
        <div id = "editor-title">
            <div id = "title-and-time">
                <div id = "input-title">{filteredNote[0].title}</div>
                <input id = "time" value = {filteredNote[0].formattedDate} />
            </div>
            <div id = "save-and-delete-labels">

                <Link to={'/editnote/' + id} id = "edit-icon"> 
                <label  id = "edit-icon">Edit</label>
                </Link>
                <label  id = "delete-icon" onClick={handleDeleteNote}>Delete</label> 
                                
            </div>
         
      </div>
        <div dangerouslySetInnerHTML={{ __html: filteredNote[0].content }} id = "content-view">
        
        </div>
  </div>
    )
}