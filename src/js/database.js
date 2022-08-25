
((win) => {
    //conexion a la base de datos
    let db = win.openDatabase("hospireBone", "1.0", "Esto es un repositorio local para la persistencia de los datos locales", (5*1024*1024))

    //crear la tabla de personas
    let _tablas = []
    _tablas["persona"] = "CREATE TABLE persona (id REAL UNIQUE PRIMARY KEY, nombre TEXT NOT NULL, cedula NUM NOT NULL)"
    _tablas["roles"] = "CREATE TABLE roles (id REAL UNIQUE PRIMARY KEY, nombre TEXT NOT NULL, cedula NUM NOT NULL)"
    _tablas["tipo_documento"] = "CREATE TABLE tipo_documento (id REAL UNIQUE PRIMARY KEY, nombre TEXT NOT NULL, cedula NUM NOT NULL)"

    //creamos la query de insercion
    let _persona_insert = "INSERT INTO persona (id, nombre, cedula)VALUES (?, ?, ?)";

    let _personas_select = "SELECT * FROM persona";

    let _lista_tablas = "SELECT name FROM (SELECT * FROM sqlite_schema UNION ALL SELECT * FROM sqlite_temp_schema)WHERE type='table' ORDER BY name;"
    
    let crearTabla = (tx, $tabla) => {
        //crear la transaccion, ejecutando la query 
        tx.executeSql(_tablas[$tabla], [],  (tx, result) => {
            console.log('La tabla se creo OK!', result.rowsAffected)
        }, (tx, error) => {
            console.log('Error la tabla no se pudo crear! '+ error.message)
        })
   }

    let insertarData =  (tx) => {
        tx.executeSql(_persona_insert, [1, 'alan felipe legro paes', 1110491951], (tx, result) => {
            console.log('Ingreso de los datos de forma correcta OK!', result.rowsAffected + ' con el id: ' + result.insertId)
        },
        (tx, error) => {
            console.log('Hubo un error en el insert! '+ error.message)
        },
        () => {
            console.log('Completo la transaccion!')
        })
    }
    
    let buscarPersonas = (tx, resolve, reject) => {
        tx.executeSql('SELECT COUNT(*) as num FROM persona', [], (tx, result) => {
            resolve(result.rows.item(0).num);
        }, (tx, error) => {
            reject(error.message)
        })   
    }  

    //borrar la tabla de forma posterior
    let borrarTabla = (db, $tabla) => {
        db.transaction( (tx) => {
            tx.executeSql('DROP TABLE persona', [], (tx, result) => {
                console.log('OK borrado de tabla! ', result.rowsAffected)
            }, (tx, error) => {
                console.log('Hubo un error en la consulta! '+ error.message) 
            })
        })
    }

    let validaCreateTablas = (db, $tabla) => {
        db.transaction( (tx) => {
            tx.executeSql(_lista_tablas, [],  (tx, result) => {
                console.log('Tablas listadas: ', result.rows.length)
    
                let flag = 0;
                let exp = new RegExp($tabla);
                for (let i = 1; i < result.rows.length; i++) {
                    const element = result.rows.item(i).name;
                    if (exp.test(element)){
                        flag++;
                        break;
                    }
                }
                if(flag == 0){
                    console.log('Puede crear la tabla OK!')
                    crearTabla(tx, $tabla)
                }else{
                    console.log('La tabla ya existe, no se requiere de más acciones')
                }
            }, (tx, error) => {
                console.log('Error la tabla no se puede buscar '+ error.message)
            })
        })
    }

    let insertaDatosTabla = (db, $tabla) => {
        db.transaction( (tx) => {
            new Promise( (resolve, reject) => {
                buscarPersonas(tx, resolve, reject)
            }).then((response) => {
                if(response === 0){
                    insertarData(tx)
                }else{
                    console.log("El registro ya se realizo previamente OK !")
                }
            }).catch((error) => {
                console.log("Error en promesa: ", error)
            })
        })
    }

    let consultamosDatosTabla = (db, $tabla) => {
        db.transaction( (tx) => {
            tx.executeSql(_personas_select, [], (tx, result) => {
                console.log('Busqueda está OK! ', result.rows.length)
                let i = 0;
                for (i; i < result.rows.length; i++) {
                    console.log(result.rows.item(i))
                }
            }, (tx, error) => {
                console.log('Hubo un error en la consulta! '+ error.message) 
            })
        })
    }

    //valida si existe la tabla y luego la crea
    validaCreateTablas(db, 'persona')

    //ingresa los primeros regsitrso a la tabla
    insertaDatosTabla(db, 'persona')
    
    //la consulta de los datos
    consultamosDatosTabla(db, 'persona')

    borrarTabla(db, 'persona')
})(window)