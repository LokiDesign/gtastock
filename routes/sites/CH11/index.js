exports.index = function(req, res){
  var rooms = [{name: '101'}, {name: '103'}, {name: '201'}]

  res.render('buildings', { title: 'CH11', rooms: JSON.stringify(rooms) });
};