const express = require('express'),
router = express.Router(),

 {_1createcatalogo,_findByIDcatalogo} = require('../controllers/catalogo'),
{_1createmanoobra, _findByIDobra} = require('../controllers/manodeobras'),
{_1createmat, _findByIDmat} = require('../controllers/materiales'),
{_1createprove, _findByIDprove} = require('../controllers/proveedores'),
{_1createtrans, _findByIDtrans} = require('../controllers/transportes'),
{_1createCotizacion,_findByFechas} = require('../controllers/cotizacion'),
{_1createdetallecotizacion,_findByCodigo} = require('../controllers/detallecotizacion'),
{_create, _findByUsername, findByuserID} = require('../controllers/users'),
{_1create, _findByID,_findByemail} = require('../controllers/empresas'),


passport = require('passport');
jwt = require('jsonwebtoken')

/*------------------------------LOGIN------------------------------ */

router.post('/signin', async(req, res, next) => {
    passport.authenticate('local', {session: false} , function(err,user,info) {
        if (err) return res.status(500).json(err);
        if (!user) return res.status(400).json(info);
        const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '1h'})
        return res.status(200).json({
            token, expiresIn : 3600,
             user
        });
    })(req,res,next);




    

});
/*------------------------------REGISTRAR------------------------------ */

router.post('/signup', async(req, res) => {
    try {

        const foundUser = await _findByUsername(req.body.username);
        if (foundUser) {
            return res.status(400).json('eL USUARIO YA EXISTE')
        }
        const user = await _create(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `el usuario ${user.username} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});

/*------------------------------------Ver Credencial-------------------------------- */
router.post('/vercredencial', async(req, res) => {
    try {

        const foundEmp = await findByuserID(req.body.id);
        if (foundEmp) {
            return res.status(200).json({
                foundEmp
            })
        }

        return res.status(201).json({
            status : 'ERROR',
            message: `NO fue posible encontrar`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});
/*------------------------------Recupera EMPRESA------------------------------ */


router.post('/verempresa', async(req, res) => {
    try {

        const foundEmp = await _findByID(req.body.id);
        if (foundEmp) {
            return res.status(200).json({
                foundEmp
            })
        }

        return res.status(201).json({
            status : 'ERROR',
            message: `NO fue posible encontrar`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});
/*------------------------------CREA EMPRESA------------------------------ */

router.post('/creaempresa', async(req, res) => {
    try {

        const foundEmp = await _findByemail(req.body.correo);
        if (foundEmp) {
            return res.status(400).json('LA EMPRESA EXISTE')
        } 
        const empresa = await _1create(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `el usuario ${empresa.nomempresa} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});


/*-----------------------------CATALOGO-------------------------------------- */
 router.post('/creacatalogo', async(req, res) => {
    try {

        const catalogo = await _1createcatalogo(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `el catalogo ${catalogo.nom_cata} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
}); 
router.post('/vercatalogo', async(req, res) => {
    try {

        const foundcata = await _findByIDcatalogo(req.body.id);
        if (foundcata) {
            return res.status(200).json(foundcata)
        }

        return res.status(201).json({
            status : 'ERROR',
            message: `NO fue posible encontrar`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});

/*-----------------------------Cotizacion-------------------------------------- */
router.post('/creacotizacion', async(req, res) => {
    try {

        const cotizacion = await _1createCotizacion(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `la cotizacion ${cotizacion.emp_coti} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
}); 
router.post('/cotizacionxfecha', async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.body;
        
        const detallesCotizacion = await _findByFechas(fechaInicio, fechaFin);
        
        if (detallesCotizacion.length > 0) {
            return res.status(200).json(detallesCotizacion);
        }
        
        return res.status(201).json({
            status: 'ERROR',
            message: 'No se encontraron detalles de cotización en el rango de fechas proporcionado'
        });
    } catch (e) {
        return res.status(500).json(e.message);
    }
});




/*-----------------------------DetalleCotizacion-------------------------------------- */
router.post('/creadetallecotizacion', async(req, res) => {
    try {

        const detallecotizacion = await _1createdetallecotizacion(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `la cotizacion ${detallecotizacion.codigo} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
}); 

router.post('/verdetallecotizacion', async(req, res) => {
    try {

        const foundcoti = await _findByCodigo(req.body.codigo);
        if (foundcoti) {
            return res.status(200).json(foundcoti)
        }

        return res.status(201).json({
            status : 'ERROR',
            message: `NO fue posible encontrar`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});



/*-----------------------------PROVEEDOR-------------------------------------- */
router.post('/creaprove', async(req, res) => {
    try {

        const proveedor = await _1createprove(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `el proveedor ${proveedor.nom_pro} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});


/*------------------------------------Ver Proveedor-------------------------------- */
router.post('/verproveedor', async(req, res) => {
    try {

        const foundEmp = await _findByIDprove(req.body.id);
        if (foundEmp) {
            return res.status(200).json({
                foundEmp
            })
        }

        return res.status(201).json({
            status : 'ERROR',
            message: `NO fue posible encontrar`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});

/*-----------------------------TRANSPORTE-------------------------------------- */
router.post('/creatrasn', async(req, res) => {
    try {

        const transporte = await _1createtrans(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `el transporte ${transporte.emp_tra} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});
/*------------------------------------Ver Transporte-------------------------------- */
router.post('/vertransporte', async(req, res) => {
    try {

        const foundEmp = await _findByIDtrans(req.body.id);
        if (foundEmp) {
            return res.status(200).json({
                foundEmp
            })
        }

        return res.status(201).json({
            status : 'ERROR',
            message: `NO fue posible encontrar`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});








/*-----------------------------Materiales-------------------------------------- */
 router.post('/creamaterial', async(req, res) => {
    try {

        const material = await _1createmat(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `El Material ${material.nom_material} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
}); 
/*----------------------------Ver Material------------------------------------------- */ 
router.post('/vermaterial', async(req, res) => {
    try {

        const foundEmp = await _findByIDmat(req.body.id);
        if (foundEmp) {
            return res.status(200).json({
                foundEmp
            })
        }

        return res.status(201).json({
            status : 'ERROR',
            message: `NO fue posible encontrar`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});


/*-----------------------------ManoDeObras-------------------------------------- */
router.post('/creamanodeobra', async(req, res) => {
    try {

        const manodeobra = await _1createmanoobra(req.body);
        return res.status(201).json({
            status : 'SUCCESS',
            message: `La mano de obra de nombre ${manodeobra.nom_mano} fue creado satisfactoriamente`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
}); 
/*----------------------------Ver Mano De Obra------------------------------------------- */ 
router.post('/vermanodeobra', async(req, res) => {
    try {

        const foundEmp = await _findByIDobra(req.body.id);
        if (foundEmp) {
            return res.status(200).json({
                foundEmp
            })
        }

        return res.status(201).json({
            status : 'ERROR',
            message: `NO fue posible encontrar`      
        })
    } catch (e) {
        return res.status(500).json(e.message);
    }
});



module.exports = router;