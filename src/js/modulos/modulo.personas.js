Modulos.Persona = ((Bone, _, $, win) => {

    const Model = Bone.Model.extend({
        initialize: () => {
            console.log("inicializa el modelo de personas")
        },
        urlRoot: 'http://localhost:3001/personas/crear',
        idAttribute: 'id',
        defaults: {
            'documento': void 0,
            'nombres': '',
            'apellidos': '',
            'tipo_documento': void 0,
            'email': '',
            'celular': void 0
        },
        validate: (attrs, options) => {
            let errors = []
            if (attrs.documento == '') {
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
    });

    const Collection = Bone.Collection.extend({
        'url': 'http://localhost:3001/personas/listar',
        'model': Model.Persona
    });

    return {
        "Model": Model,
        "Collection": Collection
    }
})(Backbone, _, jQuery, window)
