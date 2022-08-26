window.helpers = {
    prepareInsertQuery: (tabla, data) => {
        let valores = _.values(data);
        let claves = (_.keys(data)).join(',');
        let items = (_.map(valores, (num) => { return '?'; })).join(',');
        let sql = `INSERT INTO ${tabla} (${claves})VALUES(${items})`;
        return {
            "sql": sql, 
            "valores":valores, 
            "items":items, 
            "claves":claves
        };
    },
    prepareUpdateQuery: (tabla, data, key) => {
        let _key =  (_.keys(key))[0];
        let _key_value =  (_.values(key))[0];

        let valores = _.values(data);
        valores.push(_key_value);

        let claves = _.keys(data);
        let dataSet = (_.map(claves, (key) => { return key+ '=?'; })).join(',');       
        let sql = `UPDATE ${tabla} SET ${dataSet} WHERE ${_key}=? `;
        return {
            "sql": sql, 
            "valores": valores, 
            "items": dataSet, 
            "claves": claves
        };
    },
    prepareDeleteQuery: (tabla, key) => {
        let _key =  (_.keys(key))[0];
        let valores = _.values(key);
        let sql = `DELETE FROM ${tabla} WHERE ${_key}=? `;
        return {
            "sql": sql, 
            "valores": valores, 
            "items": '', 
            "claves": _key
        };
    },
    prepareShowQuery: (tabla, key) => {
        let _key =  (_.keys(key))[0];
        let valores = _.values(key);
        let sql = `SELECT * FROM ${tabla} WHERE ${_key}=? `;
        return {
            "sql": sql, 
            "valores": valores, 
            "items": '', 
            "claves": _key
        };
    }
};