# Pokemon App Basica

## Alcance

### Funcionalidades

Pokemon App es un proyecto donde tendremos disponibles las siguientes funcionalidades:

- Crear una cuenta (registro y login).

- Cargar, Editar, Eliminar o Ver la información de cada Pokemon.

- Atrapar pokemons y guardarlos en nuestra cuenta

Este proyecto es solo BackEnd, donde hay una API que recibe y responde JSON.

## Instalacion

Para poder levantar el proyecto debemos tener instalado node js y mongodb.

* Clonar este repo
* Correr npm start.
* Para acceder a el ingresamos en http://localhost:1337


## Organización

#### Módulos

Primero que nada este proyecto cuenta con un solo modulo.

#### Back-End

```bash.
├── config
├── middlewares
├── models
├── public
├── routes
├── views
│   └── /partials
├── app.js
└── package.json
```

* __config__: Configuracion de passport.
* __middlewares__: Middlewares, en este caso aqui se encuentra isAuthenticated. 
* __models__: Modelos de la base de datos.
* __public__: Archivos publicos (imágenes).
* __routes__: Rutas de la aplicación.
* __views__: En esta carpeta se encuentran las vistas de la app.
* __app.js__: Archivo donde arranca la app.


## Tecnologias usadas

* [NodeJs](https://nodejs.org/en/)
* [Express](https://expressjs.com/en/)
* [MongoDB](https://www.mongodb.com/en)
* [PassportJs](http://www.passportjs.org/)
* [ejs](https://ejs.co/)
* [Postman](https://www.getpostman.com/)

### Rutas Front-End

* `/pokemons`: Listado de pokemons.
* `/pokemons/add`: Alta de pokemon.
* `/pokemons/edit/:id`: Edición de pokemon.
* `/pokemons/:id/:slug`: Información de pokemon.
* `/user/profile`: Perfil del usuario.
* `/login`: logueo.
* `/register`: registro.


## Modelos:

#### Pokemon: 
+ Nombre
+ Tipo
+ Imagen
+ Nivel
+ Ataques
+ Comentarios
 
#### Ataque:
+ Nombre
+ Daño

## Puerto

El frontend se levanta en el puerto 1337, por lo tanto, para acceder a el ingresamos en http://localhost:1337.
