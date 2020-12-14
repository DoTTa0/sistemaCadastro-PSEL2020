const validacaoEmail = (field) => {
    const usuario = field.substring(0, field.indexOf("@"));
    const dominio = field.substring(field.indexOf("@")+ 1, field.length);
    
    return Promise.all([(usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)]) 
}

module.exports = validacaoEmail;