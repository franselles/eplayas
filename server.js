var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var PARTES_COLLECTION = "partes";
var OPERARIOS_COLLECTION = "operarios";
var ESTADISTICAS_COLLECTION = "estadisticas";
var VEHICULOS_COLLECTION = "vehiculos";


var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// CORS on ExpressJS
// Allow CORS with localhost in Chrome

app.all("/api/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return next();
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// 'mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious'
// process.env.MONGODB_URI
// 'mongodb://localhost/eplayas'

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://f54n:Uzituxez1800@ds145295.mlab.com:45295/userserious', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

 app.get('/', function(request, response) {
  response.send('Eplayas!!!');
 });

// OPERARIOS API ROUTES BELOW

/*  "/api/operarios"
 *    GET: finds all operarios
 *    POST: creates a new operario
 */

app.get("/api/operarios", function(req, res) {
  db.collection(OPERARIOS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get operarios.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/operarios", function(req, res) {
  var newOperario = req.body;
  newOperario.createfecha = new Date();

  if (!req.body.nombre) {
    handleError(res, "Invalid nombre input", "Must provide a nombre.", 400);
  }

  db.collection(OPERARIOS_COLLECTION).insertOne(newOperario, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new operario.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/operarios/:id"
 *    GET: find operario by id
 *    PUT: upfecha operario by id
 *    DELETE: deletes operario by id
 */

app.get("/api/operarios/:id", function(req, res) {
  db.collection(OPERARIOS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get operario");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/operarios/:id", function(req, res) {
  var upfechaDoc = req.body;
  delete upfechaDoc._id;

  db.collection(OPERARIOS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, upfechaDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to upfecha operario");
    } else {
      upfechaDoc._id = req.params.id;
      res.status(200).json(upfechaDoc);
    }
  });
});

app.delete("/api/operarios/:id", function(req, res) {
  db.collection(OPERARIOS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete operario");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

// PARTES API ROUTES BELOW

/*  "/api/partes"
 *    GET: finds all partes
 *    GET: finds all partes in month and year
 *    POST: creates a new parte
 */

app.get("/api/partes", function(req, res) {
  db.collection(PARTES_COLLECTION).find({}).sort({ "fecha": -1, "horarios.salida_almacen": -1 }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get partes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/partes/limit/:mes/:ano", function(req, res) {
  db.collection(PARTES_COLLECTION).find({"month": req.params.mes, "year": req.params.ano}).sort({ "fecha": -1, "horarios.salida_almacen": -1 }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get partes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/partes/fecha/:fecha", function(req, res) {
  db.collection(PARTES_COLLECTION).find({"fecha": req.params.fecha}).sort({ "fecha": -1, "horarios.salida_almacen": -1 }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get partes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/partes", function(req, res) {
  var newParte = req.body;
  newParte.createfecha = new Date();

  if (!req.body.fecha) {
    handleError(res, "Invalid fecha input", "Must provide a fecha.", 400);
  }
  var splitFecha = req.body.fecha.split("-");

  newParte.year = splitFecha[0];
  newParte.month = splitFecha[1];

  db.collection(PARTES_COLLECTION).insertOne(newParte, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new partes.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/partes/:id"
 *    GET: find parte by id
 *    PUT: upfecha parte by id
 *    DELETE: deletes parte by id
 */

app.get("/api/partes/:id", function(req, res) {
  db.collection(PARTES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get parte");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/partes/:id", function(req, res) {
  var upfechaDoc = req.body;
  delete upfechaDoc._id;

  var splitFecha = req.body.fecha.split("-");

  upfechaDoc.year = splitFecha[0];
  upfechaDoc.month = splitFecha[1];

  db.collection(PARTES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, upfechaDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to upfecha parte");
    } else {
      upfechaDoc._id = req.params.id;
      res.status(200).json(upfechaDoc);
    }
  });
});

app.delete("/api/partes/:id", function(req, res) {
  db.collection(PARTES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete parte");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

// ESTADISTICAS API ROUTES BELOW

/*  "/api/estadisticas"
 *    GET: finds all estadisticas
 *    POST: creates a new estadistica
 */

app.get("/api/estadisticas", function(req, res) {
  db.collection(ESTADISTICAS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get estadisticas.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/estadisticas", function(req, res) {
  var newEstadistica = req.body;
  newEstadistica.createfecha = new Date();

  if (!req.body.nombre) {
    handleError(res, "Invalid nombre input", "Must provide a nombre.", 400);
  }

  db.collection(ESTADISTICAS_COLLECTION).insertOne(newEstadistica, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new estadistica.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/estadisticas/:id"
 *    GET: find estadisticas by id
 *    PUT: upfecha estadistica by id
 *    DELETE: deletes estadistica by id
 */

app.get("/api/estadisticas/:id", function(req, res) {
  db.collection(ESTADISTICAS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get estadistica");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/estadisticas/:id", function(req, res) {
  var upfechaDoc = req.body;
  delete upfechaDoc._id;

  db.collection(ESTADISTICAS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, upfechaDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to upfecha estadistica");
    } else {
      upfechaDoc._id = req.params.id;
      res.status(200).json(upfechaDoc);
    }
  });
});

app.delete("/api/estadisticas/:id", function(req, res) {
  db.collection(ESTADISTICAS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete estadistica");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

// RESUMEN DIA API ROUTES BELOW

/*  "/api/resumen/dia/:dia"
 *    GET: finds all resumen del dia
 */


/* Abrimos resumen-dia */
app.get("/api/resumen/diario/:dia/:turno/:municipio", function(req, res) {
  db.collection(PARTES_COLLECTION).aggregate(
    [
      {
        $match : { 
          fecha : req.params.dia,
          turno :  req.params.turno,
          municipio :  req.params.municipio
         }
      },
      {
        $group: {
          _id: {
            fecha: "$fecha",
            turno: "$turno",
            lugar: "$lugar"}
      }}
    ], function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get aggregate /diario/:dia/:turno/:municipio.");
        } else {
          res.status(200).json(docs);
        }
    });
});

/* Abrimos resumen-dia-partes */
app.get("/api/resumen/dia/:dia/:turno/:lugar", function(req, res) {
  db.collection(PARTES_COLLECTION).find({"fecha": req.params.dia, "turno": req.params.turno, "lugar": req.params.lugar}).sort({"tipo": 1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get partes del dia.");
    } else {
      res.status(200).json(docs);
    }
  });
});

/* Abrimos resumen-mes-partes */
app.get("/api/resumen/mes/:year/:month/:turno/:lugar/:municipio", function(req, res) {
  db.collection(PARTES_COLLECTION).find({"year": req.params.year, "month": req.params.month, "turno": req.params.turno, "lugar": req.params.lugar, "municipio": req.params.municipio}).sort({"fecha": 1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get partes del dia.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/resumen/dia/basura/playa/:dia/:turno/:lugar", function(req, res) {
  db.collection(PARTES_COLLECTION).aggregate(
    [
      {
        $match : { 
          fecha : req.params.dia,
          turno :  req.params.turno,
          lugar :  req.params.lugar
         }
      },
      {
        $group: {
          _id: "$fecha",
          total_rsu_manual: {$sum: "$pesos.rsu_manual"},
          total_rsu_criba: {$sum: "$pesos.rsu_criba"},
          total_selectivo: {$sum: "$pesos.selectivo"},
          total_algas_teoricas: {$sum: "pesos.algas_teoricas"}
      }}
    ], function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get aggregate del dia and playa.");
        } else {
          res.status(200).json(docs);
        }
    });
});

app.get("/api/resumen/dia/basura/total/:dia/:turno/:municipio", function(req, res) {
  db.collection(PARTES_COLLECTION).aggregate(
    [
      {
        $match : { 
          fecha : req.params.dia,
          turno: req.params.turno,
          municipio: req.params.municipio
         }
      },
      {
        $group: {
          _id: "$fecha",
          total_rsu_manual: {$sum: "$pesos.rsu_manual"},
          total_rsu_criba: {$sum: "$pesos.rsu_criba"},
          total_selectivo: {$sum: "$pesos.selectivo"},
          total_algas_teoricas: {$sum: "pesos.algas_teoricas"}
      }}
    ], function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get aggregate del dia.");
        } else {
          res.status(200).json(docs);
        }
    });
});

app.get("/api/resumen/mes/basura/total/:mes/:ano/:municipio", function(req, res) {
  db.collection(PARTES_COLLECTION).aggregate(
    [
      {
        $match : { 
          fecha : req.params.dia,
          turno: req.params.turno,
          municipio: req.params.municipio
         }
      },
      {
        $group: {
          _id: "$fecha",
          total_rsu_manual: {$sum: "$pesos.rsu_manual"},
          total_rsu_criba: {$sum: "$pesos.rsu_criba"},
          total_selectivo: {$sum: "$pesos.selectivo"},
          total_algas_teoricas: {$sum: "pesos.algas_teoricas"}
      }}
    ], function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get aggregate del dia.");
        } else {
          res.status(200).json(docs);
        }
    });
});

// RESUMEN MES API ROUTES BELOW

/*  "/api/resumen/mes/:mes/:ano/:turno/:playa"
 *    GET: finds all resumen del mes
 */

app.get("/api/resumen/mes/:mes/:ano/:turno/:playa", function(req, res) {
  db.collection(PARTES_COLLECTION).find({
    "month": req.params.mes,
    "year": req.params.ano,
    "turno": req.params.turno,
    "playa": req.params.playa,
    "tipo": "Manual"
  }).sort({"fecha": 1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get resumen del mes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// VEHICULOS API ROUTES BELOW

/*  "/api/vehiculos"
*    GET: finds all partes
*    GET: finds all partes in month and year
*    POST: creates a new parte
*/

app.get("/api/vehiculos", function(req, res) {
  db.collection(VEHICULOS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get vehiculos.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// CALCULA ESTADISTICAS API ROUTES BELOW

/*  "/api/calculo/estadisticas"
*    GET: finds all partes
*    GET: finds all partes in month and year
*    POST: creates a new parte
*/


app.get("/api/calculo/estadisticas", function(req, res) {

  /*
  db.collection(ESTADISTICAS_COLLECTION).aggregate(
  [
    { $group: { _id: null, count: { $sum: 1 } } }
  ]
  ).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get calculo/estadisticas.");
    } else {
      console.log(docs[0].count);
      res.status(200).json(docs);
    }
  });
  */


  db.collection(ESTADISTICAS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get estadisticas.");
    } else {
      console.log(docs);
      console.log(docs.length);
      // res.status(200).json(docs);

      for (var key in docs) {
        var t = [];
        var e;

        if (docs.hasOwnProperty(key)) {
          var element = docs[key];
          console.log(element.nombre);
          t.push({"nombre": element.nombre, "otro": element.nombre + 'R'});

          e = element.nombre;

          db.collection(PARTES_COLLECTION).aggregate(
            [
              {
                $match : { 
                  month: "07",
                  year: "2017",
                  lugar: "Poniente y Mal Pas",
                  tipo: "Manual",
                  estadisticas: {
                    estadistica: "botellon"
                  }
                }
              },
              {
                $group: {
                  _id: "element._id",
                  value: {$sum: 1},
              }}
            ], function(err, docs) {
                if (err) {
                  handleError(res, err.message, "Failed to get aggregate del contar estadisticas.");
                } else {
                  console.log(docs);
                  //res.status(200).json(docs);
                }
            });

        }
      }


      //console.log(t);
      res.status(200).json(docs);
    }
  });    

    /*
    db.collection(VEHICULOS_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get calculo/estadisticas.");
      } else {
        res.status(200).json(docs);
      }
    });
    */
});

app.get("/api/calculo/estadisticas/c", function(req, res) {

  db.collection(PARTES_COLLECTION).aggregate(
    [
      {
        $match : { 
          month: "07",
          year: "2017",
          lugar: "Poniente y Mal Pas",
          tipo: "Manual",
          estadisticas: {
            estadistica: "botellon"
          }
        }
      },
      {
        $group: {
          _id: "element._id",
          value: {$sum: 1},
      }}
    ], function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get aggregate del contar estadisticas.");
        } else {
          console.log(docs);
          res.status(200).json(docs);
        }
    });
});
