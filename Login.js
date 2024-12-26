import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button ,Modal} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => { 

    const navigation = useNavigate()

    const [modalFlag,setModalFlag] = useState(false)
    const [modalMsg,setModalMsg] = useState("")
  
    const [registerData,setRegisterData] = useState({
       name:"",
       password:"",
       re_password:""
    })

    const [loginData,setLoginData] = useState({
      name:"",
      password:""
    })

    const [flag,setFlag] = useState("login")
    let element ;


   const login = async()=>{
       
      try{
         const response = await axios.post("http://localhost:5000/login",loginData)
        if(response.data.length>0){
           
          navigation("/home",{state:{id:response.data[0]._id}})

        }
      }catch(e){}

   }




    const register = async()=>{
    
      try{
        const response = await axios.post("http://localhost:5000/register",registerData);

        if(response.data.length>0){
           
          setModalFlag(true);
          setModalMsg("user already exists")

        }else{
           setFlag("login")
        }
        
        
      }catch(e){}

    }


    switch(flag){
         
      case "login":
          element = <div style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",padding:"50px",width:"500px"}}>
             
             <h1>Login</h1>
             <p></p>
             <input onChange={e=>setLoginData((prev)=>{
              return {...prev,name:e.target.value}
             })} value={loginData.name} placeholder='username' style={{border:"0px solid",padding:"5px",backgroundColor:"#dedede",width:"70%"}} />
             <p></p>
             <input onChange={e=>setLoginData((prev)=>{
              return {...prev,password:e.target.value}
             })} value={loginData.password}  placeholder='password' style={{border:"0px solid",padding:"5px",backgroundColor:"#dedede",width:"70%"}}  />
             <p></p>
             <Button onClick={login} >Login</Button>
             <p></p>
             <Button variant='link' onClick={e=>setFlag("register")} > dont have a account ?</Button>

          </div>

          break;
      
      case "register":
           
         element = <div  style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",padding:"50px",width:"500px"}}>
             <h1>Register</h1>
             <p></p>
             <input onChange={e=>setRegisterData((prev)=>{
              return {...prev,name:e.target.value}
             })} placeholder='username' style={{border:"0px solid",padding:"5px",backgroundColor:"#dedede",width:"70%"}} />
             <p></p>
             <input type='password' onChange={e=>setRegisterData((prev)=>{
              return {...prev,password:e.target.value}
             })} placeholder='password' style={{border:"0px solid",padding:"5px",backgroundColor:"#dedede",width:"70%"}} />
             <p></p>
             <input type='password' onChange={e=>setRegisterData((prev)=>{
              return {...prev,re_password:e.target.value}
             })} placeholder='re-enter password' style={{border:"0px solid",padding:"5px",backgroundColor:"#dedede",width:"70%"}}  />
             <p></p>
             <Button onClick={register} >register</Button>
             <p></p>
             <Button variant='link'  onClick={e=>setFlag("login")}> already have a account?  </Button>

         </div>


  }
    

    useEffect(()=>{
        
      const getData = async() => {
         
        const response = await axios.get("http://localhost:5000");
        console.log(response)

      }

      getData();

    })



   

  return (

    <div style={{width:"100%",display:"grid",placeItems:"center",height:"50vh"}} > 

        {element} 

        <Modal show = {modalFlag} style={{marginTop:"20%",width:"100%",padding:"30px"}} >
           
           <Modal.Body style={{padding:"50px"}}>
            <h2> {modalMsg}</h2>
            <p></p>
            <Button onClick={e=>setModalFlag(false)} variant='danger' >close</Button>
            
            </Modal.Body>

           
          
        </Modal>


    </div>


  )
}

export default Login