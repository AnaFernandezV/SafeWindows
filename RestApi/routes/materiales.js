
const express = require('express'),
router = express.Router(),
{_findAll} = require('../controllers/materiales')
auth = require('../middleware/authemp')

router.get('/', async(req,res)=> {
    try{
        const materiales = await _findAll();
        return res.status(200).json(materiales)
    }catch (e){
        return res.status(500).json(e.message);
}});


module.exports = router;