module.exports.home=function(req,res){
  //controller will acess the view 
  return res.render('home',{//accessing the home.ejs file and rendering home.ejs
    title:"Home",//this title varialble is in home.ejs file to put the value of "Home"
  })
}