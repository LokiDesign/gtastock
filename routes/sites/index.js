exports.index = function(req, res){
  var isLogged = req.cookies.USER_ID;

  res.render('sites', { title: 'Sites', isLogged: isLogged });
};