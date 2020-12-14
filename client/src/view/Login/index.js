  import { useHistory} from "react-router-dom";
  import { useAuth } from '../../routes/index.js'

  import { useState } from "react"
  import api from '../../services/api.js'
  
  import './style.css'
  import imgLogin from '../images/login.PNG'

export default function LoginPage() {
    let history = useHistory();

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    
    const handlerSubmit = async(event) => {
      event.preventDefault();

      await authLogin({user,password})
    }

    const authLogin = async (userInfo) =>{
      const responseLogin = await api.post('/login', userInfo)
          .then(success=>success)
          .catch(error=>error.response)
          .then(response=>response)

          if(responseLogin === undefined || responseLogin.status !== 200) return alert('Erro na comunicação com o servidor.')

          const {user,login,msg} = responseLogin.data


          if(login){
            const {_id,typeUser} = user
            localStorage.setItem('id',_id)
            localStorage.setItem('typeUser', typeUser)

            return history.push(`/dashboard`)
          }

          return alert(msg)

    }
   
    return (
        <div className="user-login">
            <img src={imgLogin} className='imageLogin'/>
            <form autoComplete="nope" onSubmit={handlerSubmit}>
                <div className="user-login__form-control">
                    <label htmlFor="user">E-mail ou CPF</label>
                    <input id="user" type="text" name="user" required autoComplete="off" onChange={(event)=>setUser(event.target.value)} />
                </div>
                <div className="user-login__form-control">
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" required name="password" onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <button
                type="submit"
                className="user-login__submit-button"
                //onClick={ ()=>{authLogin({user,password})}}
                >
                Entrar
                </button> 
            </form>
            <button
                type="button"
                className="register-button"
                onClick={()=>{history.push("/register")}}
                >
                Registre-se
                </button>
        </div>
    );
  }