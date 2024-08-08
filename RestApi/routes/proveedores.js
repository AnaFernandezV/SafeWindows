const express = require('express'),
router = express.Router(),
{_findAll} = require('../controllers/proveedores')
auth = require('../middleware/authemp')

router.get('/', async(req,res)=> {
    try{
        const proveedores = await _findAll();
        return res.status(200).json(proveedores)
    }catch (e){
        return res.status(500).json(e.message);
}});


module.exports = router;