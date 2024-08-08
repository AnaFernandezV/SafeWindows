
const db = require('../../models');


async function findByID(id){
    if(!id) throw new Error('sin id de cotizacion...');
    return await db.cotizacion.findOne({

        where:{
            id
        }
    });
}

async function findByFechas(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) {
        throw new Error('Faltan fechas para la búsqueda');
    }
        const cotizacion = await db.cotizacion.findAll({
            where: {
                created_at: {
                    $between: [fechaInicio, fechaFin]
                }
            }
        });

        return cotizacion;
    
}




async function findAll(){
    return await db.cotizacion.findAll({
        attributes: ['id','emp_coti','codigo','total','estado']
    })
}
module.exports ={
    findByID, findAll,findByFechas
}