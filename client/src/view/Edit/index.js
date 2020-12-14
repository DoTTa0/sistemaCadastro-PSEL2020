import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import imgEdit from '../images/edit.PNG';
import api from '../../services/api.js'
import './style.css'


export default function EditPage() {   
    const [username, setUsername] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [init, setInit] = useState(true)
    const [checkCpfAndEmail, setCheckCpfAndEmail] = useState({})

    const {id} = useParams()

    let history = useHistory();
    
    useEffect(()=>{
       if(init) loadInfos(id)
    })

    const loadInfos = async(id) =>{
        const responseEdit = await api.get(`user/${id}`)
          .then(success=>success)
          .catch(error=>error.response)
          .then(response=>response)

          if(responseEdit === undefined || responseEdit.status !== 200) return alert('Erro na comunicação com o servidor.')

          const {username, cpf, email} = responseEdit.data

          setUsername(username)
          setCpf(cpf)
          setEmail(email)
          setInit(false)
          setCheckCpfAndEmail({cpf,email})
          

    }
    
    const handlerSubmit = async(event) => {
        event.preventDefault();

        await editUser({username, cpf, email, password})

      }

      const existCpf = async(cpf) => {
          const responseCpf = await api.post(`cpf`,{cpf})
          .then(sucess => sucess)
          .catch(error => error.response)
          .then(response=>response)

          if(responseCpf === undefined || responseCpf.status !== 200) return alert('Erro na comunicação com o servidor.')

          const {check,msg,user} = responseCpf.data

          if(check) {
              if(msg !== "CPF inválido"){
                if(user.cpf === checkCpfAndEmail.cpf) return setCpf(checkCpfAndEmail.cpf)
              }
              
              alert(msg)
          }
      }

      const existEmail = async(email) => {
        const responseEmail = await api.post(`email`, {email})
        .then(sucess => sucess)
        .catch(error => error.response)
        .then(response=>response)

        if(responseEmail === undefined || responseEmail.status !== 200) return alert('Erro na comunicação com o servidor.')

        const {check,msg,user} = responseEmail.data

        if(check){
            if(user.email === checkCpfAndEmail.email) return setEmail(checkCpfAndEmail.email)
            alert(msg)
        }

    }

    const editUser = async(editInfo) =>{

        const responseEdit = await api.put(`edit/${id}`, editInfo)
          .then(success=>success)
          .catch(error=>error.response)
          .then(response=>response)

          if(responseEdit === undefined || responseEdit.status !== 200) return alert('Erro na comunicação com o servidor.')
            console.log(responseEdit.data)
          const {username, cpf, email, check, msg} = responseEdit.data

          if(check) {
              alert(msg)
              setPassword('')
            }
          

          
    }

    return (
        <div className="edit">
            <img src={imgEdit} className='imageEdit'/>
            <form autoComplete="nope" onSubmit={handlerSubmit}>
                <div className="edit__form-control">
                    <label htmlFor="name">Nome Completo</label>
                    <input id="name" type="text" name="name" autoComplete="off"  value={username} onChange={(event)=>setUsername(event.target.value)}/>
                </div>
                <div className="edit__form-control">
                    <label htmlFor="cpf">CPF</label>
                    <input id="cpf" type="text" name="cpf" autoComplete="off" required  value={cpf} onBlur={(event)=>existCpf(event.target.value)} onChange={(event)=>setCpf(event.target.value)}/>
                </div>
                <div className="edit__form-control">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="text" name="email" autoComplete="off" required  value={email} onBlur={(event)=>existEmail(event.target.value)} onChange={(event)=>setEmail(event.target.value)}/>
                </div>
                <div className="edit__form-control">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="text" name="password" autoComplete="off"  value={password} onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <button
                type="submit"
                className="edit__submit-button"
                //disabled={exist}
                //onClick={()=>{registerUser({username,cpf,email,password,image})}}
                >
                Editar
                </button>
            </form>
            <button
                type="submit"
                className="back-button"
                onClick={()=>{history.push("/dashboard")}}
                >
                Voltar
                </button>
        </div>
    )
}
