import { useState } from "react"
import { useHistory } from "react-router-dom";
import imgRegister from '../images/register.PNG';
import api from '../../services/api.js'
import './style.css'


export default function RegisterPage() {   
    const [username, setUsername] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState({name:'Nenhum arquivo selecionado.'})


    let history = useHistory();
    
    const handlerSubmit = async(event) => {
        event.preventDefault();
        
        if(file instanceof File) console.log(file)

        const formData = new FormData()

        formData.append("username", username);
        formData.append("cpf", cpf);
        formData.append("email", email);
        formData.append("password", password);
        if(file instanceof File) formData.append("file", file);

        await registerUser(formData)

      }

      const existCpf = async(cpf) => {
          const responseCpf = await api.post(`cpf`,{cpf})
          .then(sucess => sucess)
          .catch(error => error.response)
          .then(response=>response)

          if(responseCpf === undefined || responseCpf.status !== 200) return alert('Erro na comunicação com o servidor.')

          const {check,msg} = responseCpf.data

          if(check) {
              alert(msg)
              setCpf('')
          }
      }

      const existEmail = async(email) => {
        const responseEmail = await api.post(`email`, {email})
        .then(sucess => sucess)
        .catch(error => error.response)
        .then(response=>response)

        if(responseEmail === undefined || responseEmail.status !== 200) return alert('Erro na comunicação com o servidor.')

        const {check,msg} = responseEmail.data

        if(check){
            alert(msg)
            setEmail('')
        }

    }

    const registerUser = async(registerInfo) =>{
        const responseRegister = await api.post('register', registerInfo)
          .then(success=>success)
          .catch(error=>error.response)
          .then(response=>response)

          if(responseRegister === undefined || responseRegister.status !== 200) return alert('Erro na comunicação com o servidor.')

          const {check,msg} = responseRegister.data

          if(check) {
              alert(msg)
              setUsername('')
              setCpf('')
              setEmail('')
              setPassword('')
              setFile({name:'Nenhum arquivo selecionado.'})
            }
          

          
    }

    return (
        <div className="register">
            <img src={imgRegister} className='imageRegister'/>
            <form autoComplete="nope" onSubmit={handlerSubmit}  encType='multipart/form-data'>
                <div className="register__form-control">
                    <label htmlFor="name">Nome Completo</label>
                    <input id="name" type="text" name="name" autoComplete="off" required value={username} onChange={(event)=>setUsername(event.target.value)}/>
                </div>
                <div className="register__form-control">
                    <label htmlFor="cpf">CPF</label>
                    <input id="cpf" type="text" name="cpf" autoComplete="off" required value={cpf} onBlur={(event)=>existCpf(event.target.value)} onChange={(event)=>setCpf(event.target.value)}/>
                </div>
                <div className="register__form-control">
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="text" name="email" autoComplete="off" required value={email} onBlur={(event)=>existEmail(event.target.value)} onChange={(event)=>setEmail(event.target.value)}/>
                </div>
                <div className="register__form-control">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="text" name="password" autoComplete="off" required value={password} onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <div className='register__inputImage'>
                    <label htmlFor="file">Imagem de Usuário > {file.name}</label>
                    <input id="file" type="file" name="file" autoComplete="off" accept='image/png, image/jpg, image/jpeg' onChange={(event)=>{event.target.value != ''?   setFile(event.target.files[0]) : setFile({name:'Nenhum arquivo selecionado.'})}}/>
                </div>
                <button
                type="submit"
                className="register__submit-button"
                //disabled={exist}
                //onClick={()=>{registerUser({username,cpf,email,password,image})}}
                >
                Registrar
                </button>
            </form>
            <button
                type="submit"
                className="back-button"
                onClick={()=>{history.push("/login")}}
                >
                Voltar
                </button>
        </div>
    )
}
