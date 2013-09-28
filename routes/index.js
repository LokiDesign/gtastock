exports.index = function(req, res){
  var isLogged = req.cookies.USER_ID;

  res.render('index', { title: 'Intel Chat', isLogged: isLogged });
};