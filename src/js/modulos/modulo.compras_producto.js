Modulos.CompraProducto = ((Bone, _, $, win) => {
    let Collections = {};
    let Models = {};

    Models.CompraProducto = Bone.Model.extend({
        initialize: () => {
            console.log("inicializa el modelo de compra_productos")
        },
        urlRoot: 'http://localhost:3001/compra_productos/crear',
        idAttribute: 'id',
        defaults: {
            'nombres': ''
        },
        validate: (attrs, options) => {
            let errors = []
            if (attrs.nombre == '') {
                errors.push("el nombre es valor requerido")
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

    Collections.CompraProducto = Bone.Collection.extend({
        'url': 'http://localhost:3001/compra_productos/listar',
        'model': Models.CompraProducto
    })

    return {
        "models": Models,
        "collections": Collections
    }
})(Backbone, _, jQuery, window)