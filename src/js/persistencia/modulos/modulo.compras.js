Modulos.Compras = ((Bone, _, $, win) => {
    let Collections = {};
    let Models = {};

    Models.Compras = Bone.Model.extend({
        initialize: () => {
            console.log("inicializa el modelo de compras")
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

    Collections.Compras = Bone.Collection.extend({
        'url': 'http://localhost:3001/Compras/listar',
        'model': Models.Compras
    })

    return {
        "models": Models,
        "collections": Collections
    }
})(Backbone, _, jQuery, window)