Vue.component('tool-bar', {
     data: () => ({
     toolBarData,
     sideBarData,
     activeShadow:false,
    disableOnSidebar: false
     }),
    created: function(){
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function(){
         window.addEventListener('scroll', this.handleScroll);
    },
    methods:{
        rightBtnAction(){
            var str = this.toolBarData.paginaSiguiente;
            var res = str.slice(0, 2);
            console.log("Resultado slice: "+res);
            if (res == "UO"){
                console.log("Entro en UO");
                 switch(this.toolBarData.paginaSiguiente){
                    case "UO_step2":
                         console.log("Entro en UO2");
                        this.$root.$emit("generateTags","prueba");
                        break;
                    case "UO_step3":
                        this.$root.$emit("saveTags","prueba");
                }
            }
            if (res == "SO"){
                console.log(this.toolBarData.paginaSiguiente);
                if (this.toolBarData.paginaSiguiente == "SO_step2"){
                    this.$root.$emit("searchTags");
                }
                else if (this.toolBarData.paginaSiguiente == "SO_step3"){
                    this.$root.$emit("detailsFoundObject");
                }
            }
            if (this.toolBarData.paginaSiguiente == "activarMenu"){
                this.sideBarData.showNavigation = true;
                
            }
            if (this.toolBarData.paginaSiguiente == "NewObjectStep2"){
                
            }
            
        },
        leftBtnAction(){
            var str = this.toolBarData.paginaAnterior;
            var res = str.slice(0, 2);
            if (res == "UO"){
                console.log("Entro en Uo atrás");
                switch(this.toolBarData.paginaAnterior){
                    case "UO_step1":
                        console.log("Entro en step1 atras");
                        var prevObj = {
                            imgUrl: null,
                            nextStep: 1
                        };
                        this.$root.$emit("goToPreviousState", prevObj);
                        break;
                    case "UO_step2":
                         var prevObj = {
                            imgUrl: "unChanged",
                            nextStep: 2
                        };
                        this.$root.$emit("goToPreviousState", prevObj);
                }
            }
            else if (res == "SO"){
                if (this.toolBarData.paginaAnterior == "SO_step1"){
                    var prevObj = {
                            nextStep: 1
                        };
                        this.$root.$emit("goToPreviousState", prevObj);   
                }
                else if (this.toolBarData.paginaAnterior == "SO_step2"){
                    var prevObj = {
                            nextStep: 2
                        };
                        this.$root.$emit("goToPreviousState", prevObj);   
                }
            }
            else if (this.toolBarData.paginaAnterior == "userProfile"){
                 this.$root.$emit("backToProfile");   
            }
            else{
                if (this.toolBarData.paginaAnterior != "" && this.toolBarData.paginaAnterior != "inicio" ){
                    this.$router.push(this.toolBarData.paginaAnterior);
                }
            }
                
     
        },
        
        handleScroll(){
            console.log("Detecto Scroll");
            if(window.pageYOffset == 0){
                this.activeShadow = false;
            }
            else{
                if (!this.activeShadow)
                    this.activeShadow = true;
            }
        }
          
    },
    computed:{
        changedShowNavigation(){
            return this.sideBarData.showNavigation;
        }
    },
    watch:{
        changedShowNavigation(){
           if (this.sideBarData.showNavigation == true){
                this.disableOnSidebar = true;
            }
            else{
                this.disableOnSidebar = false;
            }
        }
    },
    
    template: `

    <md-toolbar v-if="activeShadow == false" md-elevation="0"  style="position:sticky;top:0px;z-index:5;background: linear-gradient(to right, #03a9f4, #81d4fa); "><!--inicio toolbar-->
      <div class="md-toolbar-row" style="text-align: center">
        <div  class="md-toolbar-section-start">

          <md-button v-if="toolBarData.paginaAnterior != '' " class="md-icon-button"  v-on:click="leftBtnAction" :disabled="disableOnSidebar">
            <md-icon style="color:white">{{toolBarData.iconoPaginaAnterior}}</md-icon>
          </md-button>
        </div>
        
          <h3 v-if="toolBarData.toolBarTitle != '' " class="md-title" style="flex: 1 ; margin-left: 0;color: white; overflow:unset;">{{toolBarData.toolBarTitle}}</h3>

        <div class="md-toolbar-section-end">

          <md-button v-if="toolBarData.paginaSiguiente != '' " class="md-icon-button"  v-on:click="rightBtnAction">
            <md-icon style="color:white">{{toolBarData.iconoPaginaSiguiente}}</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>

      <md-toolbar v-else md-elevation="1"  style="position:sticky;top:0px;z-index:5;background: linear-gradient(to right, #03a9f4, #81d4fa); "><!--inicio toolbar-->
      <div class="md-toolbar-row" style="text-align: center">
        <div  class="md-toolbar-section-start">

          <md-button v-if="toolBarData.paginaAnterior != '' " class="md-icon-button"  v-on:click="leftBtnAction" :disabled="disableOnSidebar">
            <md-icon style="color:white">{{toolBarData.iconoPaginaAnterior}}</md-icon>
          </md-button>
        </div>
        
          <h3 v-if="toolBarData.toolBarTitle != '' " class="md-title" style="flex: 1 ; margin-left: 0;color: white; overflow:unset;">{{toolBarData.toolBarTitle}}</h3>

        <div class="md-toolbar-section-end">

          <md-button v-if="toolBarData.paginaSiguiente != '' " class="md-icon-button"  v-on:click="rightBtnAction">
            <md-icon style="color:white">{{toolBarData.iconoPaginaSiguiente}}</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>

<!-- fin toolbar de la app-->

    `
});