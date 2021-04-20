import React,{useState,useEffect}  from 'react';
import NavbarAdmin from '../components/admin/NavbarAdmin'
import './Admin.css'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function UsersAdmin() {
    const [users, setUsers] = useState([])


    useEffect(async() => { 
       const response = await axios.get("http://localhost:5000/user")
       setUsers(response.data)  
    },[])

   

  return(
    <>
    
        <NavbarAdmin/>
  
    <div className="container" >
 
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th>User Name</th>
        <th>Email</th>
        <th>Date of the creation of the account</th>
      </tr>
    </thead>
    <tbody >
        {users.map((user,index) =>
            <tr>
            <td>
                <Link to={"/profile/"+user._id}> {user.userName}
                </Link>
            </td>
            <td> {user.email}</td>
            <td>{user.date}</td>
            </tr>
            
         ) }
        
      
    </tbody>

  </table>
  
</div>


    </>
  )
}