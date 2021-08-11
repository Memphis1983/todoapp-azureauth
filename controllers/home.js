// get request that renders index.ejs file 
module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    }
}
