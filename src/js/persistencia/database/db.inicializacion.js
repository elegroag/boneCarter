/**La inicializacion de la base de datos
 * permite el crear las tablas, requeridas en local sqlite, 
 * registrar las configuraciones iniciales y parametrizacion basica.
 */

const Inicializacion = ((win) => {

    let _tablas_creadas = 0;

    const tablas = [
        "usuarios",
        "tipo_documentos",
        "gatos_categorias",
        "ingresos_categorias",
        "categorias",
        "proveedores",
        "clientes",
        "paises",
        "departamentos",
        "ciudades"
    ];
    
    const migration = {
        "usuarios": "CREATE TABLE usuarios (id REAL UNIQUE PRIMARY KEY, nombres TEXT NOT NULL, apellidos TEXT NOT NULL, "+
        "email TEXT NOT NULL, celular TEXT NOT NULL, telefono TEXT NOT NULL, documento NUM NOT NULL, syncro NUM NOT NULL, ciudad NUM NOT NULL, departamento NUM NOT NULL, pais NUM NOT NULL)",
        "tipo_documentos": "CREATE TABLE tipo_documentos (id REAL UNIQUE PRIMARY KEY, detalle TEXT NOT NULL, syncro NUM NOT NULL)",
        "gatos_categorias": "CREATE TABLE gatos_categorias (id REAL UNIQUE PRIMARY KEY, detalle TEXT NOT NULL, syncro NUM NOT NULL)",
        "ingresos_categorias": "CREATE TABLE ingresos_categorias (id REAL UNIQUE PRIMARY KEY, detalle TEXT NOT NULL, syncro NUM NOT NULL)",
        "categorias": "CREATE TABLE categorias (id REAL UNIQUE PRIMARY KEY, detalle TEXT NOT NULL, syncro NUM NOT NULL)",
        "proveedores": "CREATE TABLE proveedores (id REAL UNIQUE PRIMARY KEY, proveedor TEXT NOT NULL, syncro NUM NOT NULL)",
        "clientes": "CREATE TABLE clientes (id REAL UNIQUE PRIMARY KEY, cliente TEXT NOT NULL, syncro NUM NOT NULL)",
        "paises": "CREATE TABLE paises (id REAL UNIQUE PRIMARY KEY, pais TEXT NOT NULL, syncro NUM NOT NULL, codigo NUM NOT NULL)",
        "departamentos": "CREATE TABLE departamentos (id REAL UNIQUE PRIMARY KEY, departamento TEXT NOT NULL, syncro NUM NOT NULL, codigo NUM NOT NULL)",
        "ciudades": "CREATE TABLE ciudades (id REAL UNIQUE PRIMARY KEY, ciudad TEXT NOT NULL, syncro NUM NOT NULL, codigo NUM NOT NULL)"
    };
    
    const seeders  = {
        "tipo_documentos": [
            {"id": 1, "syncro":1, "detalle":"cedula ciudadanía"},
            {"id": 2, "syncro":1, "detalle":"cedula extrangeria"},
            {"id": 3, "syncro":1, "detalle":"nit"},
            {"id": 4, "syncro":1, "detalle":"tarjeta de identidad"},
            {"id": 5, "syncro":1, "detalle":"permiso especial de permanencia"}
        ],
        "ingresos_categorias":[
            {"id": 1, "syncro":1, "detalle":"Sueldo como trabajador dependiente"},
            {"id": 2, "syncro":1, "detalle":"Sueldo trabajador independiente"},
            {"id": 3, "syncro":1, "detalle":"Ingresos proyecto personal"},
            {"id": 4, "syncro":1, "detalle":"Ingresos extras"},
            {"id": 5, "syncro":1, "detalle":"Ingresos por intereses cobrados"},
            {"id": 6, "syncro":1, "detalle":"Venta de un bien"},
            {"id": 7, "syncro":1, "detalle":"Venta de inmueble"},
            {"id": 8, "syncro":1, "detalle":"Prestar un servicio profesional"}
        ],
        "gatos_categorias":[
            {"id": 1, "syncro":1, "detalle":"Servicios publicos"},
            {"id": 2, "syncro":1, "detalle":"Arrendamiento"},
            {"id": 3, "syncro":1, "detalle":"Pago de interese prestamos"},
            {"id": 4, "syncro":1, "detalle":"Hogar"},
            {"id": 5, "syncro":1, "detalle":"Familiares"},
            {"id": 6, "syncro":1, "detalle":"Recreación y deportes"},
            {"id": 7, "syncro":1, "detalle":"Comida"},
            {"id": 8, "syncro":1, "detalle":"Ropa"},
            {"id": 9, "syncro":1, "detalle":"Calzados"},
            {"id": 10,"syncro":1,  "detalle":"Equipo de trabajo"},
            {"id": 11,"syncro":1,  "detalle":"Equipo de deportivo"},
            {"id": 12,"syncro":1,  "detalle":"Equipo de estudio"}
        ],
        "categorias": [
            {"id": 1, "syncro":1,"detalle":"Bebidas"},
            {"id": 2, "syncro":1,"detalle":"Comida de restaurante"},
            {"id": 3, "syncro":1,"detalle":"Ropa de marca"},
            {"id": 4, "syncro":1,"detalle":"Comidas rapidas"},
            {"id": 5, "syncro":1,"detalle":"Mercado"},
            {"id": 6, "syncro":1,"detalle":"Frutas  y verduras"},
            {"id": 7, "syncro":1,"detalle":"Carnicos"},
            {"id": 8, "syncro":1,"detalle":"Pescado"},
            {"id": 9, "syncro":1,"detalle":"Electrodomésticos"},
            {"id": 10,"syncro":1, "detalle":"Tecnología"},
            {"id": 11,"syncro":1, "detalle":"Ropa usada"},
            {"id": 12,"syncro":1, "detalle":"Herramientas de trabajo"},
            {"id": 13,"syncro":1, "detalle":"Herramientas de estudio"},
            {"id": 14,"syncro":1, "detalle":"Articulos de belleza"}
        ],
        "proveedores": [
            {"id": 1, "syncro":1, "detalle":"Galeria principal", "telefono":"0", "direccion_comercial": "", "email_comercial":"@","usuario": "0"},
            {"id": 2, "syncro":1, "detalle":"Tienda más cercana", "telefono":"0", "direccion_comercial": "", "email_comercial":"@","usuario": "0"},
            {"id": 3, "syncro":1, "detalle":"Centro comercial", "telefono":"0", "direccion_comercial": "", "email_comercial":"@","usuario": "0"},
            {"id": 4, "syncro":1, "detalle":"Fama de carnicos", "telefono":"0", "direccion_comercial": "", "email_comercial":"@","usuario": "0"},
            {"id": 5, "syncro":1, "detalle":"Centro comercial", "telefono":"0", "direccion_comercial": "", "email_comercial":"@","usuario": "0"},
        ],
        "usuarios": [
            {"id": 0,"syncro":1, "nombre":"Usuario", "apellidos": "Default", "documento": 100000001, "password": "100000001", "celular":"0", "email": "@", "ciudad": "18001", "departamento": "18", "pais": "168"}
        ],
        "paises":[
            {"id": 1, "pais": "Colombia", "codigo": 168, "syncro":1},
            {"id": 2, "pais": "Venezuela", "codigo": 169, "syncro":1},
            {"id": 3, "pais": "Mexico", "codigo": 167, "syncro":1},
            {"id": 4, "pais": "Peru", "codigo": 170, "syncro":1}
        ],
        "departamentos": [
            {"id": 1, "departamento": "Caqueta", "codigo": 18, "syncro":1},
            {"id": 2, "departamento": "Tolima", "codigo": 17, "syncro":1},
            {"id": 3, "departamento": "Bogota D.C", "codigo": 14, "syncro":1},
        ],
        "ciudades": [
            {"id": 1, "ciudad": "Florencia", "codigo": 18001, "syncro":1},
            {"id": 2, "ciudad": "Ibagué", "codigo": 17001, "syncro":1},
            {"id": 3, "ciudad": "Bogotá", "codigo": 14001, "syncro":1}
        ]
    };

    let tablaExiste = (db, _tabla, callback) => {
        
        db.transaction( (tx) => {
            tx.executeSql("SELECT name FROM (SELECT * FROM sqlite_schema UNION ALL SELECT * FROM sqlite_temp_schema)WHERE type='table' ORDER BY name;", [],  (tx, result) => {
                console.log('Tablas listadas: ', result.rows.length)
                let flag = 0;
                let exp = new RegExp(_tabla);
                for (let i = 1; i < result.rows.length; i++) {
                    const element = result.rows.item(i).name;
                    if (exp.test(element)){
                        flag++;
                        break;
                    }
                }
                if(flag == 0){
                    console.log('La tabla no existe aún.')
                    callback(tx)
                } else {
                    console.log('La tabla ya existe, no se requiere de más acciones')
                    callback(false)
                }
            }, (tx, error) => {
                console.log('Error la tabla no se puede buscar '+ error.message)
            })
        })
    }

    let crearTabla = (tx, _tabla, callback) => {
        //crear la transaccion, ejecutando la query 
        tx.executeSql(migration[_tabla], [],  (tx, result) => {
            console.log('La tabla '+ _tabla +' se creo OK!')
            callback(true);
        }, (tx, error) => {
            console.log('Error la tabla no se pudo crear! '+ error.message)
            callback(false);
        })
    }

    let insertarData = (tx, _tabla, params, callback) => {

        tx.executeSql(params.sql, params.valores, (tx, result) => {
            console.log('Ingreso de los datos de forma correcta OK!', result.rowsAffected + ' con el id: ' + result.insertId)
            callback(result.insertId)
        },
        (tx, error) => {
            console.log('Hubo un error en el insert! '+ error.message)
            callback(error.message)
        },
        () => {
            console.log('Completo la transaccion!')
            callback(false)
        })
    }

    let inicializaTablas = (tx, _tabla) => {
        if(_.has(seeders, _tabla)) {
            let data = seeders[_tabla];
            let params = win.helpers.prepareInsertQuery(_tabla, data)
            console.log('Prepara datos para insert '+ data)
            insertarData(tx, _tabla, params, (result) => {
                if(result){
                    count++;
                }
            })
        }
    }

    let crearTablas = (tx, resolve, reject) => {
        try {
            let i = 0
            while (i < tablas.length) {
                crearTabla(tx, tablas[i], (_res) => {
                    if(_res){
                        _tablas_creadas++;
                    }
                })
                i++
            }
            resolve(_tablas_creadas)
        } catch (error) {
            reject(error)
        }
    }

    let estructuraDb = async () => {
        await new Promise((resolve, reject) => {
            tablaExiste(win.InstanciaDb, 'usuarios', (tx) => {
                if(tx){
                    //crear todas las tablas
                    crearTablas(tx, resolve, reject);
                } else {
                    resolve(true);
                }
            })
        })

        await new Promise((resolve, reject) => {
            console.log('inicializa tablas '+ _tablas_creadas)
            if(_tablas_creadas){
                win.InstanciaDb.transaction((tx) => {
                    let i = 0
                    while (i < tablas.length) {
                        let _tabla = tablas[i]
                        inicializaTablas(tx, _tabla, (response) => {

                        })
                        i++
                    }
                    resolve(true)

                },(tx, error) => {
                    console.log('Error la tabla no se puede buscar '+ error.message)
                    reject(error.message)
                });
            }
        }).catch((error) => {
            console.log('Error '+ error)
        })
    }

    return {
        "init": () => {
            estructuraDb()
        },
        "tablas": tablas,
        "migration": migration,
        "seeders": seeders,
        "tablas_creadas": _tablas_creadas
    }
})(window)