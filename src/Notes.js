import formatDate from './EditingNote.js';


export default function Notes( {Title, Date, Content, FormattedDate} ){

    if(Content.length === 0){
        Content = "..."
    }
    
    Content = Content.substring(0, 20);
    Title = Title.substring(0,20);
return(
    <>

        <div id = "notes">
            <div id = "single-note-title">
                {Title}
            </div>
            <div id = "notes-date">
                {FormattedDate}
            </div>
            <div dangerouslySetInnerHTML={{ __html: Content }} id = "notes-content">
                
            </div>
        </div>
    
    </>
)
}

