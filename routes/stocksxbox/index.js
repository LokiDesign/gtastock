exports.index = function(req, res){
  var isLogged = req.cookies.USER_ID;

  res.render('stocks', { title: 'Xbox Stocks', platform: 'XBOX' });
};