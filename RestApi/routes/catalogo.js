
const express = require('express'),
router = express.Router(),
{_findAll} = require('../controllers/catalogo')
auth = require('../middleware/authemp')

router.get('/', async(req,res)=> {
    try{
        const catalogo = await _findAll();
        return res.status(200).json(catalogo)
    }catch (e){
        return res.status(500).json(e.message);
}});


module.exports = router;