import './styles.css'
import { useHistory} from "react-router-dom";
import { useEffect, useState } from 'react';
import api from '../../services/api.js'


export default function DashboardPage() {
  const [listAll, setListAll] = useState([{username:'', cpf:'', email:''}])
  const [user, setUser] = useState({username:'', cpf:'', email:'', file:{ key:'default.png' } })
  const [init, setInit] = useState(true)
  const [getUserType, setGetUserType] = useState(localStorage.getItem("typeUser"))
  const [loginId, setLoginId] = useState(localStorage.getItem("id"))
  let history = useHistory()

 
  useEffect(async()=>{
    if(init) {
      if(!getUserType) {
        alert('Faça o login !!!')

        return history.push('/login')
      }

      await loadDashboard(getUserType)
    }
  })

  const loadDashboard = async(typeUser) =>{
    if(typeUser === "999") {
      setInit(false)
      
      await showList()

      await showInfos(loginId)
    }
    else{

      setInit(false)

      await showInfos(loginId)

    }
  }

  const showInfos = async(id) =>{
    const loginUser = await api.get(`user/${id}`)
      .then(success=>success)
      .catch(error=>error.response)
      .then(response=>response)

    if(loginUser === undefined || loginUser.status !== 200) return alert('Erro na comunicação com o servidor.')
    
    setUser(loginUser.data)
  }

  const showList = async() =>{
    const allUsers = await api.get(`users`)
        .then(success=>success)
        .catch(error=>error.response)
        .then(response=>response)

      if(allUsers === undefined || allUsers.status !== 200) return alert('Erro na comunicação com o servidor.')

      setListAll(allUsers.data)
  }

  const statusUser = async(id, typeUser) =>{
    const statusUser = await api.patch(`status/${id}`, {typeUser})
      .then(success=>success)
      .catch(error=>error.response)
      .then(response=>response)

    if(statusUser === undefined || statusUser.status !== 200) return alert('Erro na comunicação com o servidor.')

    showList()
  }

  const logout = () => {

    setGetUserType(localStorage.removeItem("typeUser"))
    setLoginId(localStorage.removeItem("id"))

    return history.push(`/login`)
  }
  window.onhashchange = function() {

    console.log(localStorage.getItem("typeUser"))
    localStorage.removeItem('typeUser');
    localStorage.removeItem('id');
    console.log(localStorage.removeItem('typeUser'))

    return history.push(`/login`)
   }
   
   

    return (
      init?
      <div></div>

      :
      getUserType === '999'?
      <div className="dashboard">
        <div className='grid-container'>
          <div>
            <img src={`http://localhost:2000/files/${user.file.key}` } className='imageDash'/>
          </div>
          <div className='table'>
            <h2> {user.username} </h2>
            <hr></hr>
            <span> CPF: {user.cpf}</span>
            <br></br>
            <span>Email: {user.email}</span>
            <br></br>
            <button
              type="button"
              className="edit__button"
              onClick={ ()=>{history.push(`/edit/${loginId}`)}}
              >
              Editar
              </button> 
          </div>
        </div>
        <div>
          <ul className='list'>
          {(listAll.map((value, key) =>
              <li key={key} className='grid-container'>
                
                  <div>
                    <h3> {value.username} </h3>
                    <hr></hr>
                    <span>CPF: {value.cpf}</span>
                    <br></br>
                    <span>Email: {value.email}</span>
                  </div>
                  <div className='buttons-config'>
                    <button type='button' onClick={ ()=>{history.push(`/edit/${value._id}`)}} className='button-user'> Editar </button>
                    <button type='button' onClick={ ()=>{statusUser(value._id, value.typeUser)}} className='button-user'>{value.typeUser === 0? 'Ativar':'Desativar'} </button>
                  </div>
              </li>
          ))}
          </ul>
        </div>

          <button
              type="button"
              className="logout-button"
              onClick={()=>{logout()}}
              >
              Sair
              </button>
      </div>
      :
      
      <div className="dashboard">
        <div className='grid-container'>
          <div>
            <img src={`http://localhost:2000/files/${user.file.key}`} className='imageDash'/>
          </div>
          <div className='table'>
            <h2> {user.username} </h2>
            <hr></hr>
            <span> CPF: {user.cpf}</span>
            <br></br>
            <span>Email: {user.email}</span>
            <br></br>
            <button
              type="button"
              className="edit__button"
              onClick={ ()=>{history.push(`/edit/${loginId}`)}}
              >
              Editar
              </button> 
          </div>
        </div>
          <button
              type="button"
              className="logout-button"
              onClick={()=>{logout()}}
              >
              Sair
              </button>
      </div>
  )
  }
  