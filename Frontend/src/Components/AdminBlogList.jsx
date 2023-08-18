import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from "react";
const style = {
    position:'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const style1 = {
    position:'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export const AdminBlogList = ({ el,FetchBlogs,setload ,approve,edit }) => {
    const [open, setOpen] = React.useState(false);
    const[Blog,setBlog] = React.useState(el);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [Eopen, setEOpen] = React.useState(false);
    const handleEOpen = () => {
      setBlog(el);
      setEOpen(true)
    };
    const handleEClose = () => setEOpen(false);
    const Handledelete = ()=>{
        setOpen(false)
        setload(true)
           fetch(`http://localhost:8080/blog/${el._id}`,{
            method:"DELETE"
           })
           .then(()=>{
            FetchBlogs();
           })
           .catch(()=>{
            alert('somthing went wrong')
           })
           .finally(()=>{
            setload(false)
           })
    }
    
    const Handlechhange = (e)=>{
      const {name,value} = e.target;
      setBlog(pre=>({
        ...pre,
        [name]:value
      }))
 }
  const SaveBlogChange = (obj)=>{
        setload(true)
        fetch(`http://localhost:8080/blogs/${el._id}`,{
          method:"PATCH",
          body:JSON.stringify(obj),
          headers:{"content-type":"application/json"}
        })
        .then((res)=>res.json())
        .then((res)=>{
          if(res.status==="success"){
            FetchBlogs();
      
          }else{
            alert(res.response);
            setBlog(el);
          }
        })
        .catch((err)=>{
            alert('something went wrong please try again')
        })
        .finally(()=>{
          setload(false)
        })
  }
    const {title,body} = Blog;
    const HandleEdit = ()=>{
          if(title!==""&&body!==""){
            let obj = {
              title,
              body
            }
               SaveBlogChange(obj);
          }
    }
  return (<div>

    <div key={el._id} className={'homemapidv'}>
      <div>
        <div className="authorname">
          <FaRegUser className="usericon" />
          <div>
            <h4>Blog Title :- {el.title}</h4>
            <p>Author Name :- {el.user.name}</p>
            <p>Author Email Id :-{el.user.email}</p>
          </div>
        </div>
      </div>
      <div className="crudonadmin">
        <button>
          <Link to={edit ? `/ContentWriterApprovedBlogsview/${el._id}` : `/Adminview/${el._id}`}>VIEW</Link>
        </button>
           {approve && <button>Approve Blog</button>}
           {edit && <button onClick={handleEOpen}>Edit Blog</button>}
        <button onClick={handleOpen}>DELETE BLOG</button>
      </div>
    </div>


    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <h2>Are you sure you want to delete</h2>
           <div id="Deleteblogdiv">
           <button onClick={handleClose}>No</button>
           <button onClick={Handledelete}>Yes</button>
           </div>
        </Box>
      </Modal>
    </div>
    <div>
      <Modal
        open={Eopen}
        onClose={handleEClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
        <div id="edituserdiv">
        <h1>EDIT BLOG</h1>
        <div id="inputdiv">
           <label htmlFor="name">Title</label>
           <input type="text" name="title"  placeholder="Enter Blog Title" value={title} onChange={Handlechhange}/>
           <label htmlFor="body">Body</label>
           <textarea name="body" id="blogbody" cols="40" rows="20" onChange={Handlechhange} value={body}></textarea>
        </div>
   </div>
           <div id="Deleteblogdiv">
           <button onClick={HandleEdit}>Save Changes</button>
           </div>
        </Box>
      </Modal>
    </div>


    </div>
  )
}
