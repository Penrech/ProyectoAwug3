Vue.component('searched-tags', {
    props: ["prevTags"], 
    data: () => ({
     uploading: false,
     tagsString: "",
     registerDate: null,
     buttonStyle:{ 
            borderRadius:"28px",
            border:"1px solid white",
            color:"#ffffff",
            fontSize:"16px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "8em",
            width: "14em",
            height: "3.2em",
            marginTop: "1.5em",
            marginBottom:"2.5em"
        },
        labelStyle:{
             fontSize:"16px",
            fontWeight:"500"
        },
        inputStyle:{
            fontSize:"14px",
            fontWeight:"200"
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)"
 }),
    created: function(){
        window.scrollTo(0,0);
         document.body.style= this.bodyStyle;
         this.getCurrentDate();
         toolBarData.paginaActual ="SO_step2";
         toolBarData.paginaSiguiente ="";
         toolBarData.paginaAnterior = "SO_step1";
         this.toStringTags();
        this.$root.$on("saveObject",this.passToNextStep);
        this.$root.$on("backToSoStep1",this.changeData);
    },
    destroyed: function(){
         this.$root.$off("saveObject",this.passToNextStep);
         this.$root.$off("backToSoStep1",this.changeData);

    },
    methods: {
                toStringTags(){
                    for(i=0; i < this.prevTags.length;i++ ){
                        if (i == (this.prevTags.length-1)){
                             this.tagsString += this.prevTags[i];
                        }
                        else{
                            this.tagsString += this.prevTags[i] + ", ";
                        }
                    }
                },
                getCurrentDate(){
                    var myDate = new Date();
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    this.registerDate = date + '/' + month + '/' + year;
                },
                changeData(){
                     var emitObj = {
                       nextStep: 1
                   }
                this.$emit('backtoStep1',emitObj);
                },
               MarcarComoEncontrado(){

               }
 },
    
    template:`


        
        
        <!--Inicio de body-->
<div>

    <!--Inicio datos-->
        
    <div  style="margin-left: 10.25%;margin-right: 10.25% ">
        <div  style="width: 100%">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
                <md-card-header>
                 <md-card-header-text >
                    <md-list style="font-size:14px;">
                        <md-list-item style="margin-top:1.5em">
                            <md-field>
                                <label :style="labelStyle">Tags generados:</label>
                                <md-input v-model="tagsString" type="text" :style="inputStyle" readonly></md-input>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Fecha de registro:</label>
                                <md-input v-model="registerDate"  :style="inputStyle" readonly></md-input>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            </md-card>
          </div>        
    </div>
        <!--Fin datos-->



  </div> 
        <!--Fin de body-->

        
        

                      `
    
    
    
});