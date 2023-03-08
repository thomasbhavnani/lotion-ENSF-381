import { useParams } from "react-router-dom";



export default function Notes( {CurrentNote, Title, Date, Content, FormattedDate} ){
    if(Content.length === 0){
        Content = "..."
    }
    Content = Content.substring(0, 70);
    Title = Title.substring(0,20);
    return(
        <>
            <div className = {"notes"+CurrentNote}>
                <div id = "single-note-title">
                    {Title}
                </div>
                <div id = "notes-date">
                    {FormattedDate}
                </div>
                <div dangerouslySetInnerHTML={{ __html: Content }} id = "notes-content" />
            </div>
        </>
    )
}

