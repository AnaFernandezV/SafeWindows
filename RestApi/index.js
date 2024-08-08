require('dotenv').config()
const port = process.env.PORT || 3000,
express = require('express')
const multer = require('multer');
app = express();
db = require('./models')
cors = require('cors')
bodyParser = require('body-parser');
passport = require('passport');
LocalStrategy = require('./passport/local'),
JWTStrategy = require('./passport/jwt')

const sgMail = require('@sendgrid/mail');//MAILER DE SENDGRID
const API_KEY = '';

sgMail.setApiKey(API_KEY);
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

passport.use('local', LocalStrategy);
passport.use('jwt', JWTStrategy);
app.use(passport.initialize());
app.use('/uploads', express.static('uploads'));
app.use('/auth',require('./routes/auth'));
app.use('/users',require('./routes/users'));
app.use('/empresas',require('./routes/empresas'));
app.use('/materiales',require('./routes/materiales'));
app.use('/catalogos',require('./routes/catalogo'));
app.use('/transportes',require('./routes/transportes'));
app.use('/proveedores',require('./routes/proveedores'));
app.use('/manodeobras',require('./routes/manodeobras'));
app.use('/cotizaciones',require('./routes/cotizacion'));

//metodo para enviar email!
app.post('/send-email', (req, res) => {
  const { to, from, subject, text} = req.body;

  const message = {
    to,
    from,
    subject,
    text
    
  };

  sgMail
    .send(message)
    .then(() => {
      res.send('Correo electrónico enviado exitosamente');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Ocurrió un error al enviar el correo electrónico');
    });
});




// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes subidas
  },
  filename: function (req, file, cb) {
    const fileName = /* Date.now() + '-' +  */file.originalname;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Ruta para subir una imagen
app.post('/upload', upload.single('image'), (req, res) => {
    console.log('Intentando subir!')
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
  }

  // Aquí puedes realizar cualquier procesamiento adicional con la imagen, como guardar la referencia en una base de datos, redimensionarla, etc.

  res.json({ message: 'Imagen subida correctamente' });
});

// Ruta para subir un archivo PDF
app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha proporcionado ningún archivo PDF' });
  }

  // Aquí puedes realizar cualquier procesamiento adicional con el archivo PDF, como guardarlo en una base de datos, realizar operaciones de extracción de texto, etc.

  res.json({ message: 'Archivo PDF subido correctamente' });
});

// Ruta para descargar el PDF
app.get('/download-pdf/:filename', (req, res) => {
  const { filename } = req.params;
  const pdfPath = path.join(__dirname, 'uploads', `${filename}.pdf`);

  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      console.error('Error al leer el archivo PDF:', err);
      res.status(500).send('Error al descargar el PDF');
      return;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
    res.send(data);
  });
});

//--------------------------------------------------------MODIFICAR y ELIMINAR DE EMPRESAS--------------------------------------------------------
app.put('/modemp/:id', (req, res) => {
        const empId = req.params.id;
        const { rut,
        nom_empresa ,
        telefono,
        correo,
        contrasena,
        direccion } = req.body;
      
        // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
        db.empresa.update({ rut,
                nom_empresa ,
                telefono,
                correo,
                contrasena,
                direccion  }, { where: { id: empId } })
          .then(() => {
            res.status(200).json({ message: 'Datos de Empresa modificados exitosamente' });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      });

app.delete('/modemp/:id', (req, res) => {
        const empId = req.params.id;
      
        // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
        db.empresa.destroy({ where: { id: empId } })
          .then(() => {
            res.status(200).json({ message: 'Datos de Empresa eLIMINADOS exitosamente' });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      });

//---------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------MODIFICAR y ELIMINAR DE Materiales--------------------------------------------------------
app.put('/modmat/:id', (req, res) => {
  const matId = req.params.id;
  const { nom_material,
  descripcion ,
  tipo,
  precio} = req.body;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.material.update({ nom_material,
    descripcion ,
    tipo,
    precio }, { where: { id: matId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de Material modificados exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.delete('/modmat/:id', (req, res) => {
  const matId = req.params.id;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.material.destroy({ where: { id: matId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de Material eLIMINADOS exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//---------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------MODIFICAR y ELIMINAR DE TRANSPORTES--------------------------------------------------------
app.put('/modtran/:id', (req, res) => {
  const empId = req.params.id;
  const { emp_tra,
  correo ,
  telefono,
  sector,
  cargo_ser} = req.body;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.transporte.update({ emp_tra,
          telefono,
          correo,
          sector,
          cargo_ser  }, { where: { id: empId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de Transporte modificados exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});


/*--------------------------Eliminar Transporte-----------------------------*/ 
app.delete('/modtran/:id', (req, res) => {
  const empId = req.params.id;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.transporte.destroy({ where: { id: empId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de Transporte ELIMINADOS exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
//--------------------------------------------------------MODIFICAR DE CotIZACION--------------------------------------------------------
app.put('/modcotizacion/:codigo', (req, res) => {
  const codcoti = req.params.codigo;
  const {estado} = req.body;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.cotizacion.update({estado}, { where: { codigo: codcoti } })
    .then(() => {
      res.status(200).json({ message: 'Datos de Cotizacion modificados exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//--------------------------------------------------------MODIFICAR y ELIMINAR DE PROVEEDOR--------------------------------------------------------
app.put('/modprove/:id', (req, res) => {
  const empId = req.params.id;
  const { nom_pro,
  correo ,
  telefono,
  direccion} = req.body;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.proveedor.update({ nom_pro,
          correo,
          telefono,
          direccion}, { where: { id: empId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de Proveedor modificados exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});


/*--------------------------Eliminar proveedor-----------------------------*/ 
app.delete('/modprove/:id', (req, res) => {
  const empId = req.params.id;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.proveedor.destroy({ where: { id: empId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de proveedor ELIMINADOS exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});


//--------------------------------------------------------MODIFICAR y ELIMINAR DE MANO DE OBRA--------------------------------------------------------
app.put('/modobra/:id', (req, res) => {
  const empId = req.params.id;
  const { nom_mano,
  ape_mano,
  rut,  
  correo ,
  telefono,
  especialidad} = req.body;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.manodeobra.update({ nom_mano,
          ape_mano,
          rut,
          correo,
          telefono,
          especialidad}, { where: { id: empId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de Mano de obra  modificados exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});


/*--------------------------Eliminar Mano De Obra-----------------------------*/ 
app.delete('/modobra/:id', (req, res) => {
  const empId = req.params.id;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.manodeobra.destroy({ where: { id: empId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de mano de obra ELIMINADOS exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//--------------------------------------------------------MODIFICAR y ELIMINAR DE CATALOGOS-------------------------------------------------------
app.put('/modcata/:id', (req, res) => {
  const empId = req.params.id;
  const { nom_cata,
  descripcion,
  extra,
  imagen} = req.body;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.catalogo.update({ nom_cata,
          descripcion,
          extra,
          imagen}, { where: { id: empId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de catalogo modificados exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.delete('/modcata/:id', (req, res) => {
  const empId = req.params.id;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.catalogo.destroy({ where: { id: empId } })
    .then(() => {
      res.status(200).json({ message: 'Datos de Catalogo eLIMINADOS exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//--------------------------------------------------------MODIFICAR y ELIMINAR DE CREDENCIALES--------------------------------------------------------
app.put('/modcrede/:id', (req, res) => {
  const id = req.params.id;
  const { username,
  tipo} = req.body;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.user.update({ username,
          tipo}, { where: { id: id } })
    .then(() => {
      res.status(200).json({ message: 'Datos de credencial modificados exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});


/*--------------------------Eliminar credencial-----------------------------*/ 
app.delete('/modcrede/:id', (req, res) => {
  const id = req.params.id;

  // Utiliza la librería de ORM o la base de datos NoSQL para modificar los datos
  db.user.destroy({ where: { id: id } })
    .then(() => {
      res.status(200).json({ message: 'Datos de credenciales ELIMINADOS exitosamente' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.listen(port,()=>{
        console.log(`Servidor corriendo en puerto ${port} ...`);


});

db.sequelize
.sync({force: false})
.then(() => console.log('conectado a la BD'))
.catch((e) => console.log(`Error => ${e}`));