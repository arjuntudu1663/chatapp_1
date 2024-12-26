import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { IoMdSend } from "react-icons/io";
import {Row,Col,Tabs,Tab, Button} from 'react-bootstrap'
import { useNavigate ,useLocation } from 'react-router-dom';
import { GoPlus } from "react-icons/go";
import axios from 'axios';
import {motion} from 'framer-motion'
import { RxCross1 } from "react-icons/rx";



const Home = () => {
    
    const [people,setPeople] = useState([1,31,31,31,3,13,13,1])
    const [useId,setUserId] = useState("")
    const [searchVal,setSeachVal] = useState({name:""})
    const [searchResult,setSearchResult] = useState([])
    const [profileName,setProfileName] = useState("")

    const [openChatFlag,setOpenChatFlag] = useState(false)
    const [alignFlag,setAlignFlag] = useState("")

    const [allChat,setAllChat] = useState([])
    const [roomChat,setRoomChat] = useState([])
    const [marginSet,setMarginSet] = useState(0);

    const [currentReceiver,setCurrentReceiver] = useState("")

    const [roomId,setRoomId] = useState("")
    
    const [msgRoom,setMsgRoom] = useState({
        sender:"",
        receiver:"",
        senderName:"",
        receiverName:"",
        massege:""
    })
    
    const navigation = useNavigate();
    const location = useLocation()

    const [msgs,setMsgs] = useState([])


    const searchPeople = async(name) => {


        console.log("search hit",name)
       

        try{

            const response = await axios.post("http://localhost:5000/searchPeople",{name:name})
            console.log(response , "< === search response")
           
            if(response.data.length>0){
                console.log(response.data , " <=== search response")
                
                setSearchResult(response.data)
                
                
            }

           
            console.log("after click", searchVal)
           
        }catch(e){}

    }

    const openChat = async(receiver,name) => {
        
        console.log("open chat hit =================================")
        console.log(receiver,name, "<=== receiver id")
        
        try{


            const response = await axios.post("http://localhost:5000/msgRoomChats",{
                sender:location.state.id,receiver:receiver
            })
            
            console.log(response , "<============ current room response")
            setRoomChat(response.data)

        }catch(e){}

    }

    const settingMsgRoom = async(userId,name) => {
        
        console.log("setting room hit")
        console.log(userId,"<=== receiver's id")
        setCurrentReceiver(userId)
        console.log(currentReceiver , "<========= current receiver" )
     
        setMsgRoom((prev)=>{

            return {...prev,sender:location.state.id,receiver:userId,receiverName:name}

        })

        console.log(msgRoom)
        
        setOpenChatFlag(true)

        try{

            const response = await axios.post("http://localhost:5000/msgRoomChats",{

                sender:location.state.id,receiver:userId
                
            })

            console.log(response , "<==== room chat response" )
            
            setRoomChat(response.data)
           

            
            
        }catch(e){}

        console.log(msgRoom)
          


    }

    const sendMassege = async() => {


        console.log(msgRoom , "<===== current massege")

         try{
            
            return await axios.post("http://localhost:5000/sendMassege",

                msgRoom
            );

           
            

            console.log(roomId,"<====================================current room id")

         }catch(e){}

    }


    
    

   useEffect(()=>{

    const allPeople = async()=>{
        
        try{
            const response = await axios.get("http://localhost:5000")
            console.log(response)

        }catch(e){}

    }

    const getAllMassege = async()=>{

        console.log( location.state.id,"<=============>" ,currentReceiver, "get all massege hit")
         
        try{
            const response = await axios.post("http://localhost:5000/getAllMasseges",{

                sender:location.state.id , receiver:currentReceiver

            })
            
            setRoomChat(response.data)

        }catch(e){}

    }

    const getMassege = async() =>{

        try{

            const response = await axios.post("http://localhost:5000/getMassege",{
                id:location.state.id 
            })

            console.log(response,"<=== all chats")

            setAllChat(response.data)
            
        }catch(e){}
    }
      
      const findName = async() => {
          
          try{

            const response = await axios.post("http://localhost:5000/getName",{id:location.state.id})
            console.log(response.data[0].name)

            setMsgRoom((prev)=>{
                return {...prev,senderName:response.data[0].name}
            })
            setProfileName(response.data[0].name)

          }catch(e){}
         
      }

     
      

      allPeople()
      findName()
      getMassege();
      settingMsgRoom()
      getAllMassege();
      
      const str = "676ad8936118f85858384c07";
      console.log(str.length , "<======================================================================")

   },[])

  return (

            <div style={{width:"100%",display:"grid",placeItems:"center"}} >
               
               
                    

                     <div className='changeWidthOnPhone'  >

                       

                     <Row style={{marginTop:"5%"}}>

                        <Col className='marginDownOnMobile' lg = {5} sm = {12}> 
                             
                             <div style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",padding:"15px"}}>
                            
                             <Tabs  defaultActiveKey="all">

                             <Tab eventKey="all" title = "All" style={{maxheight:"300px",overflow:"scroll"}} >

                                    {
                                        allChat.map((x)=>{
                                            return  <div onClick={e=>openChat(x.receiver,x.receiverName)} style={{display:"flex",border:"1px solid",padding:"15px",margin:"5px",alignItems:"center",gap:"20px"}}>
                                            <h5 style={{opacity:"0.6"}}>

                                                 <p></p>
                                                {x.receiverName}</h5>
                                            </div>
                                        })
                                    }

                                </Tab>

                               <Tab eventKey="search" title = "Search" >

                                    <div style={{width:"100%",padding:"5px",display:"flex",marginTop:"15px"}} >
                                        <p></p>
                                                <input onChange={e=>searchPeople(e.target.value)} placeholder='type name ...' style={{padding:"5px",border:"0px",backgroundColor:"#dedede"}}  /> 
                                            
                                                <Button onClick={searchPeople} style={{marginLeft:"25px"}}>search</Button> 
                                        
                                    </div>

                               </Tab>

                               <Tab eventKey="request" title = "Requests" >

                                   <h1>Requests</h1>

                                </Tab>
                             
                             </Tabs>
                            
                           

                         

                            {
                                searchResult.map((x)=>{

                                    return <div style={{backgroundColor:"white",padding:"15px",border:"1px solid",margin:"5px"}}> 
                                    
                                    <div style={{display:"flex",gap:"15px",alignItems:"center",justifyContent:"space-between"}} >
                                    
                                     <div onClick={e=>settingMsgRoom(x._id,x.name)} style={{display:"flex",alignItems:"center",gap:"20px"}}>
                                     <CgProfile style={{opacity:"0.8"}} size={30} />
                                      
                                     <h5 style={{opacity:"0.6"}}>{x.name}</h5>
                                     </div>


                                    <GoPlus onClick={e=>console.log("adding")} size={40} />
                                    
                                    </div>     

                                   
                                    
                        </div>
                                })
                            }


                            

                            </div>

                            <div style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",marginTop:"50px",padding:"15px"}} >
                                   
                                   <h5>{profileName}</h5>
                                   <p>{location.state.id}</p>


                                 <p></p>
                                <Button variant='danger' onClick={e=>{
                                           navigation("/")
                               }} >LOG OUT</Button>
   
                                </div>



                           </Col>

                          

                        <Col lg = {7} sm = {12} > 
                           
                           
                            {openChatFlag ? <div  style={{border:"1px solid",height:"80vh",backgroundColor:"",display:"flex",flexDirection:"column",justifyContent:"space-between"}} >
               
                                    <div style={{backgroundColor:"white",padding:"15px"}}> 

                                        <div style={{display:"flex",gap:"15px",alignItems:"center",justifyContent:"space-between"}} >

                                                <div style={{display:"flex",alignItems:"center",gap:"15px"}}>

                                                        <CgProfile style={{opacity:"0.8"}} size={50} />
                                                        <h5 style={{opacity:"0.6"}}>{msgRoom.receiverName}</h5>

                                                </div>

                                               <RxCross1 onClick={e=>setOpenChatFlag(false)} size = {30}/>
                                        
                                        </div>     
                                        
                                    </div>

                                        <div style={{height:"100%",backgroundColor:"#dedede",padding:"5px",overflow:"scroll"}}>
                                        
                                        <div style={{backgroundColor:"#dedede",width:"100%"}}>
                                                    
                                                    {
                                                        roomChat.map((x)=>{
                                                            return <div >
                                                                  
                                                                  { x.slice(x.length-24,x.length) === location.state.id? <div style={{marginLeft:"60%",width:"200px",border:"1px solid",padding:"15px",marginBottom:"5px"}}>{x.slice(-x.length,-25)}</div>:<div style={{width:"200px",border:"1px solid",padding:"15px",marginBottom:"5px"}}>{x.slice(-x.length,-25)}</div> }

                                                            </div>
                                                        })
                                                    }
                                                    
                                         </div>

                                                   

                                                    

                                        </div>

                            
                                        
                                    <div style={{padding:"25px",display:"flex",gap:"25px"}} > 
                                                

                                            <input placeholder='type your massege' style={{width:"80%"}} onChange={e=>setMsgRoom((prev)=>{
                                                return {...prev,massege:e.target.value+"-"+location.state.id  }
                                            })}/>

                                            <IoMdSend  onClick={sendMassege} size={50}/>
                                            
                                    </div>
                                
                                </div>:<></>}
                           
                                            
                        </Col>
                    </Row>

                     </div>
                    
                
                
            </div>

  )
}

export default Home