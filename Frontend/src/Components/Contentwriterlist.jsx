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
export const Contentwriterlist = ({ el,FectAllUsers,setload }) => {
    const[user,setuser] = React.useState(el);
    const [open, setOpen] = React.useState(false);
    const [eopen, seteOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEOpen = () => {
        setuser(el);
        seteOpen(true)
    };
    const handleEClose = () => seteOpen(false);
    const Handlechhange = (e)=>{
        const {name,value} = e.target;
        setuser(pre=>({
          ...pre,
          [name]:value
        }))
   }
    const Handledelete = ()=>{
        setOpen(false)
        setload(true)
           fetch(`http://localhost:8080/user/${el._id}`,{
            method:"DELETE"
           })
           .then(()=>{
            FectAllUsers();
           })
           .catch(()=>{
            alert('somthing went wrong')
           })
           .finally(()=>{
            setload(false)
           })
    }
    
 const {name,email,password} = user; 
 const HandleEdit = ()=>{
     if(name!==""&&email!==""&&password!==""){
        let obj = {
            name,
            email,
            password,
        }
        setload(true)
        fetch(`http://localhost:8080/edituser/${el._id}`,{
            method:"PATCH",
            body:JSON.stringify(obj),
            headers:{"content-type":"application/json"}
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.status==="success"){
                FectAllUsers();  
            }else{
                alert('somthing went wrong')
            }
        })
        .catch(()=>{
            alert('somthing went wrong')
        })
        .finally(()=>{
            setload(false)
            setuser(el)
        })
     }   
}
  return (<div>

       <div className="userdatadiv">
           <h4>Name:- {el.name}</h4>
           <h4>Email:- {el.email}</h4>
           <h4>Password:- {el.password}</h4>
           <div>
               <button onClick={handleEOpen}>EDIT</button>
               <button onClick={handleOpen}>DELETE</button>
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
        open={eopen}
        onClose={handleEClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div id="edituserdiv">
             <h1>Edit Content Writer</h1>
             <div id="inputdiv">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name"  value={name} placeholder="Enter Full Name" onChange={Handlechhange} />
                <label htmlFor="email">Email Id</label>
                <input type="email" name="email" value={email}  placeholder="Enter Email Id" onChange={Handlechhange}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" value={password} placeholder="Enter password" onChange={Handlechhange}/>
             </div>
        </div>
           <div id="Deleteblogdiv">
          
           <button onClick={HandleEdit}>SAVE DETAILS</button>
           </div>
        </Box>
      </Modal>
    </div>


    </div>
  )
}
