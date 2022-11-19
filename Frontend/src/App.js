import './App.css';
import {Routes,Route} from "react-router-dom"
import { Homepage } from './Components/Homepage';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { ViewBlog } from './Components/ViewBolg';
import { ContentWriterForm } from './Components/AddCWriter';
import { AdminApprovedBlog } from './Components/AdminApprovedBlog';
import { AdminNotApprovedBlog } from './Components/AdminNotApprovedBlog';
import { Adminview } from './Components/Adminvew';
import { Allcontentwriter } from './Components/AllContentWriter';
import { ContentWriterAddBlog } from './Components/ContentwriterAddBlog';
import { ContentWriterApprovedBlog } from './Components/ContentWriterApprovedBlog';
import { ContentWriterView } from './Components/ContentwriterView';
import { ContentWriterNotApprovedBlog } from './Components/ContentWriterNotApprovedBlog';
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path='/'  element={<Homepage/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/signup'  element={<Signup/>}/>
        <Route path='/user' element={<ContentWriterAddBlog/>}/>
        <Route path='/ContentWriterApprovedBlogs' element={<ContentWriterApprovedBlog/>}/>
        <Route path='/ContentWriterApprovedBlogsview/:id' element={<ContentWriterView/>}/>
        <Route path='/ContentwriternotApprovedBlogs' element={<ContentWriterNotApprovedBlog/>}/>
        <Route path='/viewblog/:id' element={<ViewBlog/>}/>
        <Route path='/adduser' element={<ContentWriterForm/>}/>
        <Route path='/ApprovedBlogs' element={<AdminApprovedBlog/>}/>
        <Route path='/notApprovedBlogs' element={<AdminNotApprovedBlog/>}/>
        <Route path='/Adminview/:id' element={<Adminview/>}/>
        <Route path='/allusers' element={<Allcontentwriter/>}/>
       </Routes>
    </div>
  );
}

export default App;
