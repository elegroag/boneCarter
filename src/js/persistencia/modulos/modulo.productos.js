Modulos.Producto = ((Bone, _, $, win) => {
    let Collections = {};
    let Models = {};

    Models.Producto = Bone.Model.extend({
        initialize: () => {
            console.log("inicializa el modelo de prodcuts")
        },
        urlRoot: 'http://localhost:3001/productos/crear',
        idAttribute: 'id',
        defaults: {
            'nombres': '',
            'idcategoria': void 0
        },
        validate: (attrs, options) => {
            let errors = []
            if (attrs.nombre == '') {
                errors.push("el documento es valor requerido")
            }
            return (errors.length == 0)? errors : void 0;
        },
        invalid: (model) => {
            let errors = []
            if (!model.isValid()){
                errors = model.validationError;
                _.each(errors, (error) => {
                    console.log(error)
                });
            }
        }
    })

    Collections.Producto = Bone.Collection.extend({
        'url': 'http://localhost:3001/productos/listar',
        'model': Models.Producto
    })

    return {
        "models": Models,
        "collections": Collections
    }
})(Backbone, _, jQuery, window)