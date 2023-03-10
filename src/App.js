import Layout from "./Layout"
import ViewNote from "./ViewNote"
import EditingNote from "./EditingNote";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Nonote from './Nonote.js'


function App() {
  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/viewnote/:id"
          element={<ViewNote />}
        />
        <Route path="/" element={<Nonote />}/>
        <Route path="/editnote/:id" element={<EditingNote/>} />
      </Route>`
  </Routes>
</BrowserRouter>
    </>

    
    
    )
  
}



export default App;
