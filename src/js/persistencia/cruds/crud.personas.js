/**
 * Crud de Personas
*/
Cruds.Personas = ((win, db, Persona) => {

    let table = 'persona'; 
    let collection = void 0;
    let model = void 0;
    let row = {};

    /**
     * listar
     * @param {*} callback retorno de function anidada
     */
    const listar = (callback) => {
        if ( db ) {  
            let sql = `SELECT * FROM ${table}`;
            db.transaction( (tx) => {
                tx.executeSql(sql, [], (tx, result) => {
                    let i = 0;
                    collection = new Persona.Collection()
                    for (i; i < result.rows.length; i++) {
                        collection.add(result.rows.item(i)) 
                    }
                    let status = true; 
                    callback(status, tx, collection)
                }, (tx, error) => {
                    let status = false; 
                    callback(status, tx, void 0, error.message)
                })
            })
        } else {
            callback(false, false, void 0, "Conexión db error")
        }
    }

    /**
     * crear
     * Requiere de un modelo backbone de perona y una function callback como retorno
     * @param {*} model 
     * @param {*} callback 
     */
    const crear = (model, callback) => {
        if ( db ) { 
            let data = model.toJSON()
            if((typeof data) !== 'Object'){
                callback(false, false, [], 'Los parametros no están en un objeto')
            }
            let object = win.helpers.prepareInsertQuery(table, data);
            db.transaction( (tx) => {
                tx.executeSql(object.sql, object.valores, (tx, result) => {
                    model.set('id', result.insertId);
                    callback(true, tx, model)
                },
                (tx, error) => {
                    callback(false, tx, void 0, error.message)
                })
            })
        } else {
            callback(false, false, void 0, 'Conexión db error')
        }
    }

    /**
     * editar 
     * @param {*} key clave para editar 
     * @param {*} model modelo de datos backbone para procesar
     * @param {*} callbac funcion anidada  
    */
    const editar = (key, model, callback) => {
        if ( db ) { 
            let data = model.toJSON()
            if((typeof data) !== 'Object' || (typeof key) !== 'Object') {
                callback(false, false, void 0, 'Los parametros no están en un objeto')
            }

            let object = win.helpers.prepareUpdateQuery(table, data, key);
            db.transaction( (tx) => {
                tx.executeSql(object.sql, object.valores, (tx, result) => {
                    callback(true, tx, result.rowsAffected)
                },
                (tx, error) => {
                    callback(false, tx, void 0, error.message)
                })
            })
        } else {
            callback(false, false, void 0, 'Conexión db error')
        }
    }

    /**
     * borrar
     * @param {*} key 
     * @param {*} callback 
     */
    const borrar = (key, callback) => {
        if(db){ 
            if((typeof key) !== 'Object') {
                callback(false, false, void 0, 'Los parametros no están en un objeto')
            }
            
            let object = win.helpers.prepareDeleteQuery(table, key);
            db.transaction( (tx) => {
                tx.executeSql(object.sql, object.valores, (tx, result) => {
                    callback(true, tx, result.rowsAffected)
                },
                (tx, error) => {
                    callback(false, tx, void 0, error.message)
                })
            })
        } else {
            callback(false, false, void 0, 'Conexión db error')
        }
    }

    /**
     * mostrar
     * @param {*} key 
     * @param {*} callback 
     */
    const mostrar = (key, callback) => {
        if(db){ 
            if((typeof key) !== 'Object') {
                callback(false, false, void 0, 'Los parametros no están en un objeto')
            }
            
            let object = win.helpers.prepareShowQuery(table, key);
            db.transaction( (tx) => {
                tx.executeSql(object.sql, object.valores, (tx, result) => {
                    if ( result.rows.length > 0 ){
                        model = new Persona.Model(result.rows.item(0));
                    }
                    callback(true, tx, model)
                },
                (tx, error) => {
                    callback(false, tx, void 0, error.message)
                })
            })
        } else {
            callback(false, false, void 0, 'Conexión db error')
        }
    }
    
    /**
     * consultar
     * @param {*} sql 
     * @param {*} valores 
     */
    const consulta = (sql, valores) => {
        if ( db ) { 
            db.transaction( (tx) => {
                tx.executeSql(sql, valores, (tx, result) => {
                    let data = [];
                    if ( result.rows.length == 0 ){
                        data.push(result.rows.item(0)) 
                    } else {
                        let i = 0;
                        for (i; i < result.rows.length; i++) {
                            data.push(result.rows.item(i)) 
                        }
                    }
                    callback(true, tx, data)
                },
                (tx, error) => {
                    callback(false, tx, void 0, error.message)
                })
            })
        } else {
            callback(false, false, void 0, 'Conexión db error')
        }
    }

    return {
        "listar": listar,
        "crear": crear,
        "editar": editar,
        "borrar": borrar,
        "mostrar": mostrar,
        "consulta": consulta
    }
})(window, InstanciaDb, Modulos.Persona);