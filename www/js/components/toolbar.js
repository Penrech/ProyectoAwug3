Vue.component('tool-bar', {
     data: () => (toolBarData),
    created: function(){
       
    },
    methods:{
        rightBtnAction(){
            if (this.paginaSiguiente == "activarMenu"){
                sideBarData.showNavigation = true;
                console.log("Entro aqui");
                console.log("Valor de shownavitagion: "+sideBarData.showNavigation);
            }
            if (this.paginaSiguiente == "NewObjectStep2"){
                
            }
            
        },
        leftBtnAction(){
            if (this.paginaAnterior != "" && this.paginaAnterior != "inicio" ){
                this.$router.push(this.paginaAnterior);
            }
                
                
        },
        
        
        
        
    },
    
    template: `
      <md-toolbar md-elevation="0" class=" md-transparent"><!--inicio toolbar-->
      <div class="md-toolbar-row" style="text-align: center">
        <div  class="md-toolbar-section-start">

          <md-button v-if="paginaAnterior != '' " class="md-icon-button"  v-on:click="leftBtnAction">
            <md-icon style="color:white">{{iconoPaginaAnterior}}</md-icon>
          </md-button>
        </div>
        
          <h3 v-if="toolBarTitle != '' " class="md-title" style="flex: 1 ; margin-left: 0;color: white; overflow:unset;">{{toolBarTitle}}</h3>

        <div class="md-toolbar-section-end">

          <md-button v-if="paginaSiguiente != '' " class="md-icon-button"  v-on:click="rightBtnAction">
            <md-icon style="color:white">{{iconoPaginaSiguiente}}</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar><!-- fin toolbar de la app-->

    `
});