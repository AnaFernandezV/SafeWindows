const express = require('express'),
router = express.Router(),
{_findAll} = require('../controllers/transportes')
auth = require('../middleware/authemp')

router.get('/',  async(req,res)=> {
    try{
        const transportes = await _findAll();
        return res.status(200).json(transportes)
    }catch (e){
        return res.status(500).json(e.message);
}});


module.exports = router;