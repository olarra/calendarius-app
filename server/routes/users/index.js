// import express from "express";
// const api = express.Router();
//
// //Rutas
//
// api.get("/prueba/:nombre?",favoritosCtrl.prueba);
// api.get("/favoritos",favoritosCtrl.getFavoritos);
// api.get("/favorito/:id",favoritosCtrl.getFavorito);
// api.post("/favorito/",favoritosCtrl.saveFavorito);
// api.put("/favorito/:id",favoritosCtrl.updateFavorito);
// api.delete("/favorito/:id",favoritosCtrl.deleteFavorito);
// api.get('*', function(req, res) {
//     	res.sendfile('./app_client/index.html'); // Carga única de la vista
//     });
// module.exports = api;

// file:app/user/init.js
const passport = require('passport')
app.get('/profile', passport.authenticationMiddleware(), renderProfile)
