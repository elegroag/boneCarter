class Test {
    
    static instancia;
    page = void 0;

    constructor(){
        if( !!Test.instancia){
            return Test.instancia;
        } 
        this.initialize()
        Test.instancia = this;
        return Test.instancia;
    }
    
    initialize() {
        $.mobile.ignoreContentEnabled = true;
        this.page = $(":mobile-pagecontainer").pagecontainer("getActivePage");
        this.events();
        let strategy  = new Procesador()
        strategy.offline()
        strategy.procesar({}, (respuesta) =>{
            
        });
    }

    events(){
        $.mobile.document.on("click", "#show-alert", this.showAlert);
        this.loadFooter();
    }

    loadFooter(){
        let template = _.template($("#tmp_footer_page").html());
        $(template()).appendTo(this.page.find('[data-role="footer"]')).enhanceWithin();
    }

    showAlert(e){
        e.preventDefault()
        alert('oK al hacer click');
    }

    get page(){
        return this.page;
    }
    
}