const User = require('../models/Users.js');
const bcrypt = require('bcrypt');
const validaCPF = require('./validatorCPF/index.js')
const validacaoEmail = require('./validatorEmail/validaEmail.js')


const passwordAuthenticator = async(passwordSend, user) => {
    const {password} = user

    return bcrypt.compareSync(passwordSend,password)

}

const generateCryptPassword = async(password) => {
    const salt= 10;

     return  bcrypt.hashSync(password, salt)
}


module.exports = {

    async register(req,res){
        let newUser ={ ...req.body }
        if(req.file){
            const { originalname: name, filename:key, size } = req.file

            newUser = {
                ...newUser,
                file:{
                    name,
                    size,
                    key
                }
            }
        }

        const passCrypt = await generateCryptPassword(newUser.password)
        newUser.password = passCrypt

        const user = await User.create(newUser);

        return res.json({check:true, msg:"Usuário Registrado com Sucesso."});
    },

    async checkEmail(req,res){
        const {email} = req.body

        const validaEmail = await validacaoEmail(email)

        
        if(!validaEmail[0]) return res.send({check:true, msg:"Email inválido"})

        const user =  await User.findOne({email:email})

        if(user) return res.send({check:true, msg:"Email já registrado.",user})

        return res.json({check:false, msg:""})
    },

    async checkCpf(req,res){
        const {cpf} = req.body

        const validCpf = await validaCPF(cpf)
        
        if(!validCpf[0]) return res.send({check:true, msg:"CPF inválido"})

        const user = await User.findOne({cpf:cpf})

        if(user) return res.send({check:true, msg:"CPF já registrado.", user})
        
        return res.json({check:false, msg:""})
    },

    async showOne(req,res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async listAll(req,res){
        const user = await User.find().then(results =>{
            const users = results.filter(user => user.typeUser !== 999)
            res.json(users)
        }).catch(error => res.send(error));

        return user;
    },

    async edit(req,res){
        const {password, username, cpf, email} = req.body
        if(password == ''){
            const user = await User.findByIdAndUpdate(req.params.id, {username,cpf,email}, {new:true})

            return res.json({user, check:true, msg:'Usuário modificado.'});
        }
        else{
            const passCrypt = await generateCryptPassword(password)
            req.body.password = passCrypt
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})

            return res.json({user, check:true, msg:'Usuário modificado.'});
        }

    },

    async delete(req,res){
        const user = await User.findByIdAndDelete(req.params.id)

        return res.json(user);
    },

    async login(req,res){
        const {user,password} = req.body;

        const emailAuth = await User.findOne({email:user})
        const cpfAuth = await User.findOne({cpf:user})
        const userAuth = emailAuth || cpfAuth ? emailAuth !== null? emailAuth : cpfAuth : null
        
        //passwordAuth = await User.findOne({password:password})
        if(userAuth){
            const passwordAuth = await passwordAuthenticator(password,userAuth)
            if(passwordAuth){
                const {typeUser} = userAuth

                if(typeUser === 0) return res.send({login:false,user:userAuth, msg:'Usuário Desativado.'})
                return res.json({login:true,user:userAuth, msg:'Usuário Ativado.'});
            }
            else{
                return res.send({login:false,user:userAuth, msg:"Senha Incorreta."})
            }
        }
        else{
            return res.send({login:false,user:userAuth, msg:"Usuário não registrado ou incorreto."})
        }
        
    },
    
    async statusUser(req,res){
        const {typeUser} = req.body

        if(typeUser === 999) return 

        switch(typeUser){
            case 1:{
                const user = await User.findByIdAndUpdate(req.params.id, {typeUser:0}, {new:true})

                return res.json(user)
            }

            case 0:{
                const user = await User.findByIdAndUpdate(req.params.id, {typeUser:1}, {new:true})

                return res.json(user)
            }


        }
        

    }
}
