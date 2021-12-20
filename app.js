const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});

//4 -seteamos el directorio de assets o publico
//es publica para que funcione en cualquier sitio
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantillas
app.set('RESIDENCIA UNIVERSITARIA engine','html'); 
 
//6 -Invocamos a bcrypt
const bcrypt = require('bcryptjs');

//7- variables de session
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// 8 - Invocamos a la conexion de la DB

const connection = require('./database/db');
const { response } = require('express');
 
//9 - establecemos las rutas
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index_registro.html'));
});

	app.get('/index_registro',(req, res)=>{
		res.render('index_registro.html');
	})
//10 - Método para la REGISTRACIÓN
app.post('btnRegistro', async (req, res)=>{
	const nombre = req.body.nombre;
	const correo = req.body.correo;
    const password = req.body.password;
	let passwordHash = await bcrypt.hash(password, 10);
    connection.query('INSERT INTO registro SET ?',{nombre:nombre, correo:correo, password:passwordHash}, async (error, results)=>{
        if(error){
            console.log(error);
        }else{            
			res.render('', {
				alert: true,
				alertTitle: "Registration",
				alertMessage: "¡Successful Registration!",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: ''
			});
            //res.redirect('/');         
        }
	});
})
