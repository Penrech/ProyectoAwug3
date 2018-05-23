const inicioTemplate = {props: [],
                          data: () => ({
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",
                 

    }),
        created: function () {
            toolBarData.iconoPaginaAnterior = "";
            toolBarData.iconoPaginaSiguiente = "";
            toolBarData.paginaActual = "inicio";
            toolBarData.paginaSiguiente = "";
            toolBarData.paginaAnterior = "";
            toolBarData.toolBarTitle = "";
            document.body.style = this.bodyStyle;
        },
       destroyed: function(){
       },
                                 
        methods: {

        },
        template:`

<div >
 <div class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div style="margin-top:45%;--md-theme-default-primary: white;">
             <img class="md-icon md-size-4x" src="icon/logoWhite.svg" stlye="color:blue;"/>
             <md-progress-bar style="margin-top:45%" md-mode="indeterminate"></md-progress-bar>
        </div>

 </div>
</div>

                      ` };
