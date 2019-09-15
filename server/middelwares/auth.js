// file:app/authentication/middleware.js

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.status(401).json({error : 401, message :"Unauthorized"});
}

export default ({
  isLoggedIn
})
