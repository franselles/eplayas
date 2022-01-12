var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var PARTES_COLLECTION = "partes";
var OPERARIOS_COLLECTION = "operarios";
var ESTADISTICAS_COLLECTION = "estadisticas";
var VEHICULOS_COLLECTION = "vehiculos";
var ASISTENCIA_COLLECTION = "asistencia";
var HAMACAS_COLLECTION = "hamacas";
var MANTENIMIENTO_COLLECTION = "mantenimiento";
var CONSTANTES_COLLECTION = "constantes";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

require("dotenv").config();

// CORS on ExpressJS
// Allow CORS with localhost in Chrome

app.all("/api/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return next();
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
    process.env.MONGODB_URI || process.env.DB_HOST,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, database) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        db = database.db(process.env.DB_NAME);
        console.log("Database connection ready");

        // Initialize the app.
        var server = app.listen(process.env.PORT || 8080, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    }
);

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ error: message });
}

app.get("/", function (request, response) {
    response.send("Eplayas!!!");
});

// CONSTANTES API ROUTES BELOW

/*  "/api/constantes"
 *    GET: finds all constantes
 *    POST: creates a new constantes
 */

app.get("/api/constantes/:seccion", function (req, res) {
    db.collection(CONSTANTES_COLLECTION)
        .find({ seccion: req.params.seccion })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get constantes.");
            } else {
                res.status(200).json(docs);
            }
        });
});

// ASISTENCIA API ROUTES BELOW

/*  "/api/asistencia"
 *    GET: finds all asistencias
 *    POST: creates a new asistencia
 */

app.get("/api/asistencia", function (req, res) {
    db.collection(ASISTENCIA_COLLECTION)
        .find({})
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get asistencia.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/asistencia/ultimos/:fecha", async function (req, res) {
    const aggCursor = db.collection(ASISTENCIA_COLLECTION).aggregate([
        {
            $match: { fecha: { $lt: req.params.fecha } },
        },
        {
            $sort: { fecha: 1 },
        },
        {
            $group: {
                _id: "$id_op",
                lastFecha: { $last: "$fecha" },
                lastTrabajado: { $last: "$trabajado" },
                lastDescanso: { $last: "$descanso" },
                lastFestivo: { $last: "$festivo" },
                lastVacaciones: { $last: "$vacaciones" },
                lastDisfrutadas: { $last: "$disfrutadas" },
                lastBaja: { $last: "$baja" },
                lastJustificado: { $last: "$justificado" },
                lastInjustificado: { $last: "$injustificado" },
                lastFecha_inicio: { $last: "$fecha_inicio" },
                lastFecha_fin: { $last: "$fecha_fin" },
                lastObservacion: { $last: "$observacion" },
                lastId: { $last: "$_id" },
            },
        },
    ]);

    try {
        const data = await aggCursor.toArray();
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error.message, "Failed to get aggregate del dia.");
    }
});

app.post("/api/asistencia", function (req, res) {
    var newAsistencia = req.body;
    newAsistencia.createfecha = new Date();

    if (!req.body.nombre) {
        handleError(res, "Invalid nombre input", "Must provide a nombre.", 400);
    }

    var splitFecha = req.body.fecha.split("-");

    newAsistencia.year = splitFecha[0];
    newAsistencia.month = splitFecha[1];

    db.collection(ASISTENCIA_COLLECTION).insertOne(
        newAsistencia,
        function (err, doc) {
            if (err) {
                handleError(
                    res,
                    err.message,
                    "Failed to create new asistencia."
                );
            } else {
                res.status(201).json(doc.ops[0]);
            }
        }
    );
});

/*  "/api/asistencia/:id"
 *    GET: find asistencia by id
 *    PUT: upfecha asistencia by id
 *    DELETE: deletes asistencia by id
 */

app.get("/api/asistencia/:fecha/:id_op", function (req, res) {
    db.collection(ASISTENCIA_COLLECTION)
        .find({ fecha: req.params.fecha, id_op: req.params.id_op })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get asistencia.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/asistencia/lista/dia/:fecha", function (req, res) {
    db.collection(ASISTENCIA_COLLECTION)
        .find({ fecha: req.params.fecha })
        .sort({ nombre: 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get asistencias.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.put("/api/asistencia/:id", function (req, res) {
    var upfechaDoc = req.body;
    delete upfechaDoc._id;

    db.collection(ASISTENCIA_COLLECTION).updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: upfechaDoc },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to upfecha asistencia");
            } else {
                upfechaDoc._id = req.params.id;
                res.status(200).json(upfechaDoc);
            }
        }
    );
});

app.delete("/api/asistencia/:id", function (req, res) {
    db.collection(ASISTENCIA_COLLECTION).deleteOne(
        { _id: new ObjectID(req.params.id) },
        function (err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete asistencia");
            } else {
                res.status(200).json(req.params.id);
            }
        }
    );
});

app.get(
    "/api/asistencia/seguimiento/:fechad/:fechah/:id_op",
    async function (req, res) {
        const aggCursor = db.collection(ASISTENCIA_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fechad,
                        $lte: req.params.fechah,
                    },
                    id_op: req.params.id_op,
                },
            },
            {
                $sort: { fecha: 1 },
            },
        ]);

        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/asistencia/seguimiento/acumulado/:fechad/:fechah/:id_op/:concepto",
    async function (req, res) {
        var concepto = req.params.concepto;
        var qeryStr = {
            fecha: { $gte: req.params.fechad, $lte: req.params.fechah },
            id_op: req.params.id_op,
            [concepto]: { $gt: 0 },
        };

        aggCursor = db.collection(ASISTENCIA_COLLECTION).aggregate([
            {
                $match: qeryStr,
            },
            {
                $sort: { fecha: 1 },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/asistencia/lista/operario/:fecha_i/:fecha_f",
    async function (req, res) {
        const aggCursor = db.collection(OPERARIOS_COLLECTION).aggregate([
            {
                $lookup: {
                    from: "asistencia",
                    localField: "_id",
                    foreignField: "id_op",
                    as: "parte",
                },
                $match: {
                    parte: {
                        fecha: {
                            $gte: req.params.fecha_i,
                            $lte: req.params.fecha_f,
                        },
                    },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/asistencia/acumulado/:fecha_i/:fecha_f/:id_op",
    async function (req, res) {
        const aggCursor = db.collection(ASISTENCIA_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fecha_i,
                        $lte: req.params.fecha_f,
                    },
                    id_op: req.params.id_op,
                },
            },
            {
                $group: {
                    _id: "$id_op",
                    total_trabajado: { $sum: "$trabajado" },
                    total_descanso: { $sum: "$descanso" },
                    total_festivo: { $sum: "$festivo" },
                    total_vacaciones: { $sum: "$vacaciones" },
                    total_disfrutadas: { $sum: "$disfrutadas" },
                    total_baja: { $sum: "$baja" },
                    total_justificado: { $sum: "$justificado" },
                    total_injustificado: { $sum: "$injustificado" },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/asistencia/rejilla/operarios/:fecha_i/:fecha_f",
    async function (req, res) {
        const aggCursor = db.collection(ASISTENCIA_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fecha_i,
                        $lte: req.params.fecha_f,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        id_op: "$id_op",
                        nombre: "$nombre",
                    },
                },
            },
            {
                $sort: { "_id.nombre": 1 },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/asistencia/rejilla/detalle/:fecha_i/:fecha_f",
    function (req, res) {
        db.collection(ASISTENCIA_COLLECTION)
            .find({
                fecha: { $gte: req.params.fecha_i, $lte: req.params.fecha_f },
            })
            .sort({ nombre: 1, fecha: 1 })
            .toArray(function (err, docs) {
                if (err) {
                    handleError(res, err.message, "Failed to get asistencias.");
                } else {
                    res.status(200).json(docs);
                }
            });
    }
);

app.get(
    "/api/asistencia/rejilla/lista/:fecha_i/:fecha_f",
    async function (req, res) {
        const aggCursor = db.collection(ASISTENCIA_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fecha_i,
                        $lte: req.params.fecha_f,
                    },
                },
            },
            {
                $sort: { nombre: 1, fecha: 1 },
            },
            {
                $group: {
                    _id: { id_op: "$id_op", nombre: "$nombre" },
                    diario: {
                        $push: {
                            dia: { $split: ["$fecha", "-"] },
                            trabajado: "$trabajado",
                            descanso: "$descanso",
                            festivo: "$festivo",
                            vacaciones: "$vacaciones",
                            disfrutadas: "$disfrutadas",
                            baja: "$baja",
                            justificado: "$justificado",
                            injustificado: "$injustificado",
                            fecha_i: "$fecha_inicio",
                            fecha_f: "$fecha_fin",
                        },
                    },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

// OPERARIOS API ROUTES BELOW

/*  "/api/operarios"
 *    GET: finds all operarios
 *    POST: creates a new operario
 */

app.get("/api/operarios", function (req, res) {
    db.collection(OPERARIOS_COLLECTION)
        .find({})
        .sort({ nombre: 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get operarios.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.post("/api/operarios", function (req, res) {
    var newOperario = req.body;
    newOperario.createfecha = new Date();

    if (!req.body.nombre) {
        handleError(res, "Invalid nombre input", "Must provide a nombre.", 400);
    }

    db.collection(OPERARIOS_COLLECTION).insertOne(
        newOperario,
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new operario.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        }
    );
});

/*  "/api/operarios/:id"
 *    GET: find operario by id
 *    PUT: upfecha operario by id
 *    DELETE: deletes operario by id
 */

app.get("/api/operarios/estado/activo", function (req, res) {
    db.collection(OPERARIOS_COLLECTION)
        .find({ activo: true })
        .sort({ nombre: 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get operarios.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/operarios/estado/horario", function (req, res) {
    db.collection(OPERARIOS_COLLECTION)
        .find({ horario: true })
        .sort({ nombre: 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get operarios.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/operarios/activos/conductores", function (req, res) {
    db.collection(OPERARIOS_COLLECTION)
        .find({ activo: true, conductor: true })
        .sort({ nombre: 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get operarios.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/operarios/:id", function (req, res) {
    db.collection(OPERARIOS_COLLECTION).findOne(
        { _id: new ObjectID(req.params.id) },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get operario");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

app.put("/api/operarios/:id", function (req, res) {
    var upfechaDoc = req.body;
    delete upfechaDoc._id;

    db.collection(OPERARIOS_COLLECTION).updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: upfechaDoc },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to upfecha operario");
            } else {
                upfechaDoc._id = req.params.id;
                res.status(200).json(upfechaDoc);
            }
        }
    );
});

app.delete("/api/operarios/:id", function (req, res) {
    db.collection(OPERARIOS_COLLECTION).deleteOne(
        { _id: new ObjectID(req.params.id) },
        function (err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete operario");
            } else {
                res.status(200).json(req.params.id);
            }
        }
    );
});

// PARTES API ROUTES BELOW

/*  "/api/partes"
 *    GET: finds all partes
 *    GET: finds all partes in month and year
 *    POST: creates a new parte
 */

app.get("/api/partes", function (req, res) {
    db.collection(PARTES_COLLECTION)
        .find({})
        .sort({ fecha: -1, "horarios.salida_almacen": -1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get partes.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/partes/limit/:mes/:ano", function (req, res) {
    db.collection(PARTES_COLLECTION)
        .find({ month: req.params.mes, year: req.params.ano })
        .sort({ fecha: -1, "horarios.salida_almacen": -1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get partes.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/partes/fecha/:fecha", function (req, res) {
    db.collection(PARTES_COLLECTION)
        .find({ fecha: req.params.fecha })
        .sort({ fecha: -1, "horarios.salida_almacen": -1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get partes.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.post("/api/partes", function (req, res) {
    var newParte = req.body;
    newParte.createfecha = new Date();

    if (!req.body.fecha) {
        handleError(res, "Invalid fecha input", "Must provide a fecha.", 400);
    }
    var splitFecha = req.body.fecha.split("-");

    newParte.year = splitFecha[0];
    newParte.month = splitFecha[1];

    db.collection(PARTES_COLLECTION).insertOne(newParte, function (err, doc) {
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

app.get("/api/partes/:id", function (req, res) {
    db.collection(PARTES_COLLECTION).findOne(
        { _id: new ObjectID(req.params.id) },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get parte");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

app.put("/api/partes/:id", function (req, res) {
    var upfechaDoc = req.body;
    delete upfechaDoc._id;

    var splitFecha = req.body.fecha.split("-");

    upfechaDoc.year = splitFecha[0];
    upfechaDoc.month = splitFecha[1];

    db.collection(PARTES_COLLECTION).updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: upfechaDoc },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to upfecha parte");
            } else {
                upfechaDoc._id = req.params.id;
                res.status(200).json(upfechaDoc);
            }
        }
    );
});

app.delete("/api/partes/:id", function (req, res) {
    db.collection(PARTES_COLLECTION).deleteOne(
        { _id: new ObjectID(req.params.id) },
        function (err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete parte");
            } else {
                res.status(200).json(req.params.id);
            }
        }
    );
});

app.post("/api/partes/duplica", function (req, res) {
    var partes = req.body;

    partes.forEach((item) => {
        item.createfecha = new Date();
        let splitFecha = item.fecha.split("-");
        item.year = splitFecha[0];
        item.month = splitFecha[1];
    });

    db.collection(PARTES_COLLECTION).insertMany(partes, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new partes.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

// HAMACAS API ROUTES BELOW

/*  "/api/hamacas"
 *    GET: finds all hamacas
 *    POST: creates a new hamacas
 */

app.get("/api/hamacas", function (req, res) {
    db.collection(HAMACAS_COLLECTION)
        .find({})
        .sort({ fecha: 1, sector: 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get hamacas.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.post("/api/hamacas", function (req, res) {
    var newHamaca = req.body;
    newHamaca.createfecha = new Date();

    /*   if (!req.body.nombre) {
    handleError(res, "Invalid nombre input", "Must provide a nombre.", 400);
  } */

    var splitFecha = req.body.fecha.split("-");

    newHamaca.year = splitFecha[0];
    newHamaca.month = splitFecha[1];

    db.collection(HAMACAS_COLLECTION).insertOne(newHamaca, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new hamacas.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/api/hamacas/:id"
 *    GET: find hamacas by id
 *    PUT: upfecha hamacas by id
 *    DELETE: deletes hamacas by id
 */

app.get("/api/hamacas/edita/:id", function (req, res) {
    db.collection(HAMACAS_COLLECTION).findOne(
        { _id: new ObjectID(req.params.id) },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get hamacas");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

app.get("/api/hamacas/lista/ultimos", async function (req, res) {
    const aggCursor = db.collection(HAMACAS_COLLECTION).aggregate([
        {
            $sort: { fecha: 1 },
        },
        {
            $group: {
                _id: "$sector",
                lastFecha: { $last: "$fecha" },
                lastHamacas: { $last: "$hamacas" },
                lastSombrillas: { $last: "$sombrillas" },
                lastId: { $last: "$_id" },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ]);
    try {
        const data = await aggCursor.toArray();
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error.message, "Failed to get aggregate del dia.");
    }
});

app.get(
    "/api/hamacas/lista/historico/:fecha1/:fecha2/:sector",
    function (req, res) {
        db.collection(HAMACAS_COLLECTION)
            .find({
                fecha: { $gte: req.params.fecha1, $lte: req.params.fecha2 },
                sector: parseInt(req.params.sector),
            })
            .sort({ fecha: 1 })
            .toArray(function (err, docs) {
                if (err) {
                    handleError(res, err.message, "Failed to get hamacas.");
                } else {
                    res.status(200).json(docs);
                }
            });
    }
);

app.get("/api/hamacas/:id", function (req, res) {
    db.collection(ESTADISTICAS_COLLECTION).findOne(
        { _id: new ObjectID(req.params.id) },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get hamacas");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

app.put("/api/hamacas/:id", function (req, res) {
    var upfechaDoc = req.body;
    delete upfechaDoc._id;

    db.collection(HAMACAS_COLLECTION).updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: upfechaDoc },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to upfecha hamacas");
            } else {
                upfechaDoc._id = req.params.id;
                res.status(200).json(upfechaDoc);
            }
        }
    );
});

app.delete("/api/hamacas/:id", function (req, res) {
    db.collection(HAMACAS_COLLECTION).deleteOne(
        { _id: new ObjectID(req.params.id) },
        function (err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete hamacas");
            } else {
                res.status(200).json(req.params.id);
            }
        }
    );
});

/* Abrimos totales hasta mes en el año */
app.get("/api/hamacas/rotas/total/mes/:month/:year", async function (req, res) {
    const aggCursor = db.collection(HAMACAS_COLLECTION).aggregate([
        {
            $match: {
                month: { $lte: req.params.month },
                year: req.params.year,
            },
        },
        {
            $sort: { sector: -1, fecha: 1 },
        },
        {
            $group: {
                _id: "$sector",
                total_h_rotas: { $sum: "$h_rotas" },
                total_h_retiradas: { $sum: "$h_retiradas" },
                total_h_repuestas: { $sum: "$h_repuestas" },
                total_s_rotas: { $sum: "$s_rotas" },
                total_s_retiradas: { $sum: "$s_retiradas" },
                total_s_repuestas: { $sum: "$s_repuestas" },
            },
        },
    ]);
    try {
        const data = await aggCursor.toArray();
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error.message, "Failed to get aggregate del dia.");
    }
});

/* Abrimos totales en el año */
app.get(
    "/api/hamacas/rotas/total/fecha/:fecha1/:fecha2/:sector",
    async function (req, res) {
        const aggCursor = db.collection(HAMACAS_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fecha1,
                        $lte: req.params.fecha2,
                    },
                    sector: parseInt(req.params.sector),
                },
            },
            {
                $sort: { sector: -1, fecha: 1 },
            },
            {
                $group: {
                    _id: "$sector",
                    total_h_rotas: { $sum: "$h_rotas" },
                    total_h_retiradas: { $sum: "$h_retiradas" },
                    total_h_repuestas: { $sum: "$h_repuestas" },
                    total_s_rotas: { $sum: "$s_rotas" },
                    total_s_retiradas: { $sum: "$s_retiradas" },
                    total_s_repuestas: { $sum: "$s_repuestas" },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

// MANTENIMIENTO API ROUTES BELOW

/*  "/api/mantenimiento"
 *    GET: finds all mantenimiento
 *    GET: finds all mantenimiento in month and year
 *    POST: creates a new mantenimiento
 */

app.get("/api/mantenimiento", function (req, res) {
    db.collection(MANTENIMIENTO_COLLECTION)
        .find({})
        .sort({ fecha: -1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get mantenimiento.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/mantenimiento/limit/:mes/:ano", function (req, res) {
    db.collection(MANTENIMIENTO_COLLECTION)
        .find({ month: req.params.mes, year: req.params.ano })
        .sort({ fecha: -1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get mantenimiento.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.get("/api/mantenimiento/fecha/:fecha", function (req, res) {
    db.collection(MANTENIMIENTO_COLLECTION)
        .find({ fecha: req.params.fecha })
        .sort({ fecha: -1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get mantenimiento.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.post("/api/mantenimiento", function (req, res) {
    var newMantenimiento = req.body;
    newMantenimiento.createfecha = new Date();

    if (!req.body.fecha) {
        handleError(res, "Invalid fecha input", "Must provide a fecha.", 400);
    }
    var splitFecha = req.body.fecha.split("-");

    newMantenimiento.year = splitFecha[0];
    newMantenimiento.month = splitFecha[1];

    db.collection(MANTENIMIENTO_COLLECTION).insertOne(
        newMantenimiento,
        function (err, doc) {
            if (err) {
                handleError(
                    res,
                    err.message,
                    "Failed to create new mantenimiento."
                );
            } else {
                res.status(201).json(doc.ops[0]);
            }
        }
    );
});

/*  "/api/mantenimiento/:id"
 *    GET: find mantenimiento by id
 *    PUT: upfecha mantenimiento by id
 *    DELETE: deletes mantenimiento by id
 */

app.get("/api/mantenimiento/:id", function (req, res) {
    db.collection(MANTENIMIENTO_COLLECTION).findOne(
        { _id: new ObjectID(req.params.id) },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get mantenimiento");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

app.put("/api/mantenimiento/:id", function (req, res) {
    var upfechaDoc = req.body;
    delete upfechaDoc._id;

    var splitFecha = req.body.fecha.split("-");

    upfechaDoc.year = splitFecha[0];
    upfechaDoc.month = splitFecha[1];

    db.collection(MANTENIMIENTO_COLLECTION).updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: upfechaDoc },
        function (err, doc) {
            if (err) {
                handleError(
                    res,
                    err.message,
                    "Failed to upfecha mantenimiento"
                );
            } else {
                upfechaDoc._id = req.params.id;
                res.status(200).json(upfechaDoc);
            }
        }
    );
});

app.delete("/api/mantenimiento/:id", function (req, res) {
    db.collection(MANTENIMIENTO_COLLECTION).deleteOne(
        { _id: new ObjectID(req.params.id) },
        function (err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete mantenimiento");
            } else {
                res.status(200).json(req.params.id);
            }
        }
    );
});

// ESTADISTICAS API ROUTES BELOW

/*  "/api/estadisticas"
 *    GET: finds all estadisticas
 *    POST: creates a new estadistica
 */

app.get("/api/estadisticas", function (req, res) {
    db.collection(ESTADISTICAS_COLLECTION)
        .find({})
        .sort({ estadistica: 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get estadisticas.");
            } else {
                res.status(200).json(docs);
            }
        });
});

app.post("/api/estadisticas", function (req, res) {
    var newEstadistica = req.body;
    newEstadistica.createfecha = new Date();

    if (!req.body.estadistica) {
        handleError(res, "Invalid nombre input", "Must provide a nombre.", 400);
    }

    db.collection(ESTADISTICAS_COLLECTION).insertOne(
        newEstadistica,
        function (err, doc) {
            if (err) {
                handleError(
                    res,
                    err.message,
                    "Failed to create new estadistica."
                );
            } else {
                res.status(201).json(doc.ops[0]);
            }
        }
    );
});

/*  "/api/estadisticas/:id"
 *    GET: find estadisticas by id
 *    PUT: upfecha estadistica by id
 *    DELETE: deletes estadistica by id
 */

app.get("/api/estadisticas/:id", function (req, res) {
    db.collection(ESTADISTICAS_COLLECTION).findOne(
        { _id: new ObjectID(req.params.id) },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get estadistica");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

app.put("/api/estadisticas/:id", function (req, res) {
    var upfechaDoc = req.body;
    delete upfechaDoc._id;

    db.collection(ESTADISTICAS_COLLECTION).updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: upfechaDoc },
        function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to upfecha estadistica");
            } else {
                upfechaDoc._id = req.params.id;
                res.status(200).json(upfechaDoc);
            }
        }
    );
});

app.delete("/api/estadisticas/:id", function (req, res) {
    db.collection(ESTADISTICAS_COLLECTION).deleteOne(
        { _id: new ObjectID(req.params.id) },
        function (err, result) {
            if (err) {
                handleError(res, err.message, "Failed to delete estadistica");
            } else {
                res.status(200).json(req.params.id);
            }
        }
    );
});

// RESUMEN DIA API ROUTES BELOW

/*  "/api/resumen/dia/:dia"
 *    GET: finds all resumen del dia
 */

/* Abrimos resumen-dia */
app.get(
    "/api/resumen/diario/:dia/:turno/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: req.params.dia,
                    turno: req.params.turno,
                    municipio: req.params.municipio,
                },
            },
            {
                $group: {
                    _id: {
                        fecha: "$fecha",
                        turno: "$turno",
                        lugar: "$lugar",
                    },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

/* Abrimos resumen-dia-partes */
app.get("/api/resumen/dia/:dia/:municipio", async function (req, res) {
    const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
        {
            $match: {
                fecha: req.params.dia,
                municipio: req.params.municipio,
            },
        },
        {
            $group: {
                _id: { lugar: "$lugar", turno: "$turno" },
                observacion: {
                    $push: { observacion_ayto: "$observacion_ayto" },
                },
                total_operarios: { $sum: "$numero_ops" },
                total_rsu_manual: { $sum: "$pesos.rsu_manual" },
                total_rsu_criba: { $sum: "$pesos.rsu_criba" },
                total_selectivo: { $sum: "$pesos.selectivo" },
                total_algas_teoricas: { $sum: "$pesos.algas_teoricas" },
                total_algas_pesadas: { $sum: "$pesos.algas_pesadas" },
            },
        },
        {
            $sort: { "_id.lugar": 1 },
        },
        {
            $group: {
                _id: "$_id.lugar",
                topp: { $sum: "$total_operarios" },
                trmp: { $sum: "$total_rsu_manual" },
                trcp: { $sum: "$total_rsu_criba" },
                tsp: { $sum: "$total_selectivo" },
                tatp: { $sum: "$total_algas_teoricas" },
                tapp: { $sum: "$total_algas_pesadas" },
                datos: {
                    $push: {
                        turno: "$_id.turno",
                        observacion: "$observacion",
                        top: "$total_operarios",
                        trm: "$total_rsu_manual",
                        trc: "$total_rsu_criba",
                        ts: "$total_selectivo",
                        tat: "$total_algas_teoricas",
                        tap: "$total_algas_pesadas",
                    },
                },
            },
        },
    ]);
    try {
        const data = await aggCursor.toArray();
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error.message, "Failed to get aggregate del dia.");
    }
});

/* Abrimos resumen-mes-partes */
app.get(
    "/api/viejo/resumen/mes/:year/:month/:turno/:lugar/:municipio",
    function (req, res) {
        db.collection(PARTES_COLLECTION)
            .find({
                year: req.params.year,
                month: req.params.month,
                turno: req.params.turno,
                lugar: req.params.lugar,
                municipio: req.params.municipio,
            })
            .sort({ fecha: 1 })
            .toArray(function (err, docs) {
                if (err) {
                    handleError(
                        res,
                        err.message,
                        "Failed to get partes del dia."
                    );
                } else {
                    res.status(200).json(docs);
                }
            });
    }
);

/* Abrimos resumen-mes-partes revisitesd */
// app.get("/api/resumen/mes/:year/:month/:turno/:lugar/:municipio", function (
app.get(
    "/api/resumen/mes/:year/:month/:lugar/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    year: req.params.year,
                    month: req.params.month,
                    // turno: req.params.turno,
                    lugar: req.params.lugar,
                    municipio: req.params.municipio,
                    observacion_ayto: { $ne: "" },
                },
            },
            {
                $sort: { turno: 1 },
            },

            {
                $group: {
                    _id: "$fecha",
                    observaciones: {
                        $push: { observacion_ayto: "$observacion_ayto" },
                    },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

/* Abrimos resumen-diario-totales-pesos */
app.get(
    "/api/resumen/mes/agrupado/total/:year/:month/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    year: req.params.year,
                    month: req.params.month,
                    municipio: req.params.municipio,
                },
            },
            {
                $group: {
                    _id: {
                        fecha: "$fecha",
                        lugar: "$lugar",
                        turno: "$turno",
                    },
                    total_operarios: { $sum: "$numero_ops" },
                    total_rsu_manual: { $sum: "$pesos.rsu_manual" },
                    total_rsu_criba: { $sum: "$pesos.rsu_criba" },
                    total_selectivo: { $sum: "$pesos.selectivo" },
                    total_algas_teoricas: { $sum: "$pesos.algas_teoricas" },
                    total_algas_pesadas: { $sum: "$pesos.algas_pesadas" },
                },
            },
            {
                sort: {
                    fecha: "-1",
                },
            },
            {
                $group: {
                    _id: { fecha: "$_id.fecha", lugar: "$_id.lugar" },
                    topp: { $sum: "$total_operarios" },
                    trmp: { $sum: "$total_rsu_manual" },
                    trcp: { $sum: "$total_rsu_criba" },
                    tsp: { $sum: "$total_selectivo" },
                    tatp: { $sum: "$total_algas_teoricas" },
                    tapp: { $sum: "$total_algas_pesadas" },
                    datos: {
                        $push: {
                            turno: "$_id.turno",
                            observacion: "$observacion",
                            top: "$total_operarios",
                            trm: "$total_rsu_manual",
                            trc: "$total_rsu_criba",
                            ts: "$total_selectivo",
                            tat: "$total_algas_teoricas",
                            tap: "$total_algas_pesadas",
                        },
                    },
                },
            },
            {
                $sort: { "_id.lugar": 1 },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

/* Abrimos resumen-mes-totales-pesos */
app.get(
    "/api/resumen/dia/basura/total/:dia/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: req.params.dia,
                    municipio: req.params.municipio,
                },
            },
            {
                $group: {
                    _id: "$fecha",
                    total_rsu_manual: { $sum: "$pesos.rsu_manual" },
                    total_rsu_criba: { $sum: "$pesos.rsu_criba" },
                    total_selectivo: { $sum: "$pesos.selectivo" },
                    total_algas_teoricas: { $sum: "$pesos.algas_teoricas" },
                    total_algas_pesadas: { $sum: "$pesos.algas_pesadas" },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

/* Ver si tiene utilidad */
app.get(
    "/api/resumen/mes/basura/total/:mes/:ano/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: req.params.dia,
                    turno: req.params.turno,
                    municipio: req.params.municipio,
                },
            },
            {
                $group: {
                    _id: "$fecha",
                    total_rsu_manual: { $sum: "$pesos.rsu_manual" },
                    total_rsu_criba: { $sum: "$pesos.rsu_criba" },
                    total_selectivo: { $sum: "$pesos.selectivo" },
                    total_algas_teoricas: { $sum: "$pesos.algas_teoricas" },
                    total_algas_pesadas: { $sum: "$pesos.algas_pesadas" },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

/* Ver si tiene utilidad */
app.get("/api/resumen/mes/:mes/:ano/:turno/:playa", function (req, res) {
    db.collection(PARTES_COLLECTION)
        .find({
            month: req.params.mes,
            year: req.params.ano,
            turno: req.params.turno,
            playa: req.params.playa,
            tipo: "Manual",
        })
        .sort({ fecha: 1 })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get resumen del mes.");
            } else {
                res.status(200).json(docs);
            }
        });
});

// ANALISIS API ROUTES BELOW

/*  "/api/analisis"
 *    GET: finds all resumen del periodo
 */

app.get(
    "/api/analisis/pesos/:fechad/:fechah/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: { $gte: req.params.fechad, $lte: req.params.fechah },
                    municipio: req.params.municipio,
                },
            },
            {
                $group: {
                    _id: "$municipio",
                    total_rsu_manual: { $sum: "$pesos.rsu_manual" },
                    total_rsu_criba: { $sum: "$pesos.rsu_criba" },
                    total_selectivo: { $sum: "$pesos.selectivo" },
                    total_algas_teoricas: { $sum: "$pesos.algas_teoricas" },
                    total_algas_pesadas: { $sum: "$pesos.algas_pesadas" },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/analisis/pesos/anual/:fechad/:fechah/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fechad,
                        $lte: req.params.fechah,
                    },
                    municipio: req.params.municipio,
                },
            },
            {
                $group: {
                    _id: { year: "$year", month: "$month" },
                    total_rsu_manual: { $sum: "$pesos.rsu_manual" },
                    total_rsu_criba: { $sum: "$pesos.rsu_criba" },
                    total_selectivo: { $sum: "$pesos.selectivo" },
                    total_algas_teoricas: { $sum: "$pesos.algas_teoricas" },
                    total_algas_pesadas: { $sum: "$pesos.algas_pesadas" },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/analisis/pesos/playas/:fechad/:fechah/:lugar/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fechad,
                        $lte: req.params.fechah,
                    },
                    lugar: req.params.lugar,
                    municipio: req.params.municipio,
                },
            },
            {
                $group: {
                    _id: "$lugar",
                    total_rsu_manual: { $sum: "$pesos.rsu_manual" },
                    total_rsu_criba: { $sum: "$pesos.rsu_criba" },
                    total_selectivo: { $sum: "$pesos.selectivo" },
                    total_algas_teoricas: { $sum: "$pesos.algas_teoricas" },
                    total_algas_pesadas: { $sum: "$pesos.algas_pesadas" },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/analisis/pesos/playas/anual/:fechad/:fechah/:lugar/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fechad,
                        $lte: req.params.fechah,
                    },
                    lugar: req.params.lugar,
                    municipio: req.params.municipio,
                },
            },
            {
                $group: {
                    _id: { year: "$year", month: "$month" },
                    total_rsu_manual: { $sum: "$pesos.rsu_manual" },
                    total_rsu_criba: { $sum: "$pesos.rsu_criba" },
                    total_selectivo: { $sum: "$pesos.selectivo" },
                    total_algas_teoricas: { $sum: "$pesos.algas_teoricas" },
                    total_algas_pesadas: { $sum: "$pesos.algas_pesadas" },
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/analisis/estadisticas/:fechad/:fechah/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fechad,
                        $lte: req.params.fechah,
                    },
                    municipio: req.params.municipio,
                },
            },
            {
                $unwind: "$estadisticas",
            },
            {
                $group: {
                    _id: "$estadisticas.estadistica",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/analisis/estadisticas/anual/:fechad/:fechah/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fechad,
                        $lte: req.params.fechah,
                    },
                    municipio: req.params.municipio,
                },
            },
            {
                $unwind: "$estadisticas",
            },
            {
                $group: {
                    _id: {
                        estadistica: "$estadisticas.estadistica",
                        year: "$year",
                        month: "$month",
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

app.get(
    "/api/analisis/estadisticas/playas/:fechad/:fechah/:lugar/:municipio",
    async function (req, res) {
        const aggCursor = db.collection(PARTES_COLLECTION).aggregate([
            {
                $match: {
                    fecha: {
                        $gte: req.params.fechad,
                        $lte: req.params.fechah,
                    },
                    lugar: req.params.lugar,
                    municipio: req.params.municipio,
                },
            },
            {
                $unwind: "$estadisticas",
            },
            {
                $group: {
                    _id: "$estadisticas.estadistica",
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        try {
            const data = await aggCursor.toArray();
            res.status(200).json(data);
        } catch (error) {
            handleError(res, error.message, "Failed to get aggregate del dia.");
        }
    }
);

// VEHICULOS API ROUTES BELOW

/*  "/api/vehiculos"
 *    GET: finds all partes
 *    GET: finds all partes in month and year
 *    POST: creates a new parte
 */

app.get("/api/vehiculos", function (req, res) {
    db.collection(VEHICULOS_COLLECTION)
        .find({})
        .sort({ matricula: 1 })
        .toArray(function (err, docs) {
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

app.get("/api/calculo/estadisticas", function (req, res) {
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

    db.collection(ESTADISTICAS_COLLECTION)
        .find({})
        .toArray(async function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get estadisticas.");
            } else {
                // res.status(200).json(docs);

                for (var key in docs) {
                    var t = [];
                    var e;

                    if (docs.hasOwnProperty(key)) {
                        var element = docs[key];
                        t.push({
                            nombre: element.nombre,
                            otro: element.nombre + "R",
                        });

                        e = element.nombre;

                        const aggCursor = db
                            .collection(PARTES_COLLECTION)
                            .aggregate([
                                {
                                    $match: {
                                        month: "07",
                                        year: "2017",
                                        lugar: "Poniente y Mal Pas",
                                        tipo: "Manual",
                                        estadisticas: {
                                            estadistica: "botellon",
                                        },
                                    },
                                },
                                {
                                    $group: {
                                        _id: "element._id",
                                        value: { $sum: 1 },
                                    },
                                },
                            ]);
                    }
                }
                try {
                    const data = await aggCursor.toArray();
                    res.status(200).json(data);
                } catch (error) {
                    handleError(
                        res,
                        error.message,
                        "Failed to get aggregate del dia."
                    );
                }
                //console.log(t);
                // res.status(200).json(docs);
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

app.get("/api/calculo/estadisticas/c", async function (req, res) {
    const aaCursor = db.collection(PARTES_COLLECTION).aggregate([
        {
            $match: {
                month: "07",
                year: "2017",
                lugar: "Poniente y Mal Pas",
                tipo: "Manual",
                estadisticas: {
                    estadistica: "botellon",
                },
            },
        },
        {
            $group: {
                _id: "element._id",
                value: { $sum: 1 },
            },
        },
    ]);
    try {
        const data = await aggCursor.toArray();
        res.status(200).json(data);
    } catch (error) {
        handleError(res, error.message, "Failed to get aggregate del dia.");
    }
});

/*  "/api/sistema"
 * borrar datos de las entidades
 * limpieza
 * asistencia
 * patines
 * hamacas
 * inspectoras
 */

app.delete("/api/sistema/delete/:entidad/:fechad/:fechah", function (req, res) {
    var ENTIDAD;

    switch (req.params.entidad) {
        case "limpieza":
            ENTIDAD = "partes";
            break;

        case "asistencia":
            ENTIDAD = "asistencia";
            break;

        case "patines":
            ENTIDAD = "pat_alquileres";
            break;

        case "hamacas":
            ENTIDAD = "hamacas";
            break;

        case "inspectoras":
            ENTIDAD = "ham_inspeccions";
            break;

        default:
            ENTIDAD = "";
    }

    db.collection(ENTIDAD)
        .deleteMany({
            fecha: { $gte: req.params.fechad, $lte: req.params.fechah },
        })
        .toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to detele entidades.");
            } else {
                res.status(200).json(docs);
            }
        });
});
