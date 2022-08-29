Modulos.Gasto = ((Bone, _, $, win) => {
    let Collections = {};
    let Models = {};

    Models.Gasto = Bone.Model.extend({
        initialize: () => {
            console.log("inicializa el modelo de Gasto")
        },
        urlRoot: 'http://localhost:3001/gastos/crear',
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

    Collections.Gasto = Bone.Collection.extend({
        'url': 'http://localhost:3001/gastos/listar',
        'model': Models.Gasto
    })

    return {
        "models": Models,
        "collections": Collections
    }
})(Backbone, _, jQuery, window)