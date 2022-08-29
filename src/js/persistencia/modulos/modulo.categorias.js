Modulos.Categoria = ((Bone, _, $, win) => {
    let Collections = {};
    let Models = {};

    Models.Categoria = Bone.Model.extend({
        initialize: () => {
            console.log("inicializa el modelo de categoria")
        },
        urlRoot: 'http://localhost:3001/categoria/crear',
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

    Collections.Categoria = Bone.Collection.extend({
        'url': 'http://localhost:3001/categoria/listar',
        'model': Models.Categoria
    })

    return {
        "models": Models,
        "collections": Collections
    }
})(Backbone, _, jQuery, window)