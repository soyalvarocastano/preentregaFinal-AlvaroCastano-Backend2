import { generateToken } from "../utils/jwt.js"

export const login = async (req,res) => {
    try {
        if(!req.user) {
            
            return res.status(401).send("Usuario o contraseña no validos")
        }

        const token = generateToken(req.user)

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        } 
        
        //Previo a redireccionar, envio la cookie
        res.cookie('coderCookie', token, {
            httpOnly: true,
            secure: false, //Evitar errores por https
            maxAge: 3600000 //Una hora
        })
        console.log(1,req.user);

        res.status(200).redirect('/')
    }catch(e) {
        console.log(e); 
        res.status(500).send("Error al loguear usuario")
    }     
}

export const register = async (req,res) => {
    try {
        if (!req.user) { // Si el usuario no fue creado, significa que ya existe
            return res.status(400).send("El mail ya se encuentra registrado");
        }
        // Aquí puedes redirigir al login o mostrar un mensaje de éxito
        return res.status(201).redirect('/login');
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error al registrar usuario: ${e.message}`);
    }
}

export const viewRegister = (req,res) => {
    res.status(200).render('templates/register', {})
}

export const viewLogin = (req,res) => {
    res.status(200).render('templates/login', {})
}

export const githubLogin = (req,res) => {
    try {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        } 
        res.status(200).redirect("/")
    }catch(e) {
        console.log(e); 
        res.status(500).send("Error al loguear usuario")
    }  
}