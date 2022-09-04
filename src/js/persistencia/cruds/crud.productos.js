
Cruds.Productos = ((win, Producto) => {

    let db = win.InstanciaDb;
    let table = 'productos'; 
    let collection = [];
    let row = {};

    const listar = (callback) => {
        if(db){  
            let sql = `SELECT * FROM ${table}`;
            db.transaction( (tx) => {
                tx.executeSql(sql, [], (tx, result) => {
                    let i = 0;
                    collection = []
                    for (i; i < result.rows.length; i++) {
                        collection.push(result.rows.item(i)) 
                    }
                    let status = true; 
                    callback(status, tx, collection)
                }, (tx, error) => {
                    let status = false; 
                    callback(status, tx, [], error.message)
                })
            })
        } else {
            callback(false, false, [], "Conexión db error")
        }
    }

    const crear = (data, callback) => {
        if(db){ 
            if((typeof data) !== 'Object'){
                callback(false, false, [], 'Los parametros no están en un objeto')
            }
            let object = win.helpers.prepareInsertQuery(table, data);
            db.transaction( (tx) => {
                tx.executeSql(object.sql, object.valores, (tx, result) => {
                    callback(true, tx, result.insertId)
                },
                (tx, error) => {
                    callback(false, tx, [], error.message)
                })
            })
        } else {
            callback(false, false, [], 'Conexión db error')
        }
    }

    const editar = (key, data, callback) => {
        if(db){ 
            if((typeof data) !== 'Object' || (typeof key) !== 'Object') {
                callback(false, false, [], 'Los parametros no están en un objeto')
            }

            let object = win.helpers.prepareUpdateQuery(table, data, key);
            db.transaction( (tx) => {
                tx.executeSql(object.sql, object.valores, (tx, result) => {
                    callback(true, tx, result.rowsAffected)
                },
                (tx, error) => {
                    callback(false, tx, [], error.message)
                })
            })
        } else {
            callback(false, false, [], 'Conexión db error')
        }
    }

    const borrar = (key, callback) => {
        if(db){ 
            if((typeof data) !== 'Object' || (typeof key) !== 'Object') {
                callback(false, false, [], 'Los parametros no están en un objeto')
            }
            
            let object = win.helpers.prepareDeleteQuery(table, key);
            db.transaction( (tx) => {
                tx.executeSql(object.sql, object.valores, (tx, result) => {
                    callback(true, tx, result.rowsAffected)
                },
                (tx, error) => {
                    callback(false, tx, [], error.message)
                })
            })
        } else {
            callback(false, false, [], 'Conexión db error')
        }
    }

    const mostrar = (key, callback) => {
        if(db){ 
            if((typeof data) !== 'Object' || (typeof key) !== 'Object') {
                callback(false, false, [], 'Los parametros no están en un objeto')
            }
            
            let object = win.helpers.prepareShowQuery(table, key);
            db.transaction( (tx) => {
                tx.executeSql(object.sql, object.valores, (tx, result) => {
                    row = {};
                    if ( result.rows.length > 0 ){
                        row = result.rows.item(0);
                    }
                    callback(true, tx, row)
                },
                (tx, error) => {
                    callback(false, tx, [], error.message)
                })
            })
        } else {
            callback(false, false, [], 'Conexión db error')
        }
    }
    
    const consulta = (sql, valores) => {
        if(db){ 
            db.transaction( (tx) => {
                tx.executeSql(sql, valores, (tx, result) => {
                    row = {};
                    if ( result.rows.length > 0 ){
                        row = result.rows.item(0);
                    }
                    callback(true, tx, row)
                },
                (tx, error) => {
                    callback(false, tx, [], error.message)
                })
            })
        } else {
            callback(false, false, [], 'Conexión db error')
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
})(window, Modulos.Producto);