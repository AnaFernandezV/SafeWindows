const express = require('express'),
router = express.Router(),
{_findAll} = require('../controllers/manodeobras')
auth = require('../middleware/authemp')

router.get('/', async(req,res)=> {
    try{
        const manodeobras = await _findAll();
        return res.status(200).json(manodeobras)
    }catch (e){
        return res.status(500).json(e.message);
}});


module.exports = router;