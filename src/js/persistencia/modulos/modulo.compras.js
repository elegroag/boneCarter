Modulos.Compra = ((Bone, _, $, win) => {
    let Collections = {};
    let Models = {};

    Models.Compra = Bone.Model.extend({
        initialize: () => {
            console.log("inicializa el modelo de compra")
        },
        urlRoot: 'http://localhost:3001/compras/crear',
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

    Collections.Compra = Bone.Collection.extend({
        'url': 'http://localhost:3001/compras/listar',
        'model': Models.Compra
    })

    return {
        "models": Models,
        "collections": Collections
    }
})(Backbone, _, jQuery, window)