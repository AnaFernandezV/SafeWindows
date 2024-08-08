
const express = require('express'),
router = express.Router(),
{_findAll} = require('../controllers/cotizacion')
auth = require('../middleware/authemp')

router.get('/', async(req,res)=> {
    try{
        const cotizacions = await _findAll();
        return res.status(200).json(cotizacions)
    }catch (e){
        return res.status(500).json(e.message);
}});




module.exports = router;