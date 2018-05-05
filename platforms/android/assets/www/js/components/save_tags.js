Vue.component('save-object', {
    props: ["imgSrc","prevTags","location","phone"], 
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
            fontWeight:"500",
            marginBottom:"12px"
        },
        inputStyle:{
            fontSize:"14px",
            fontWeight:"200",
            marginTop:"12px"
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)"
 }),
    created: function(){
        window.scrollTo(0,0);
         document.body.style= this.bodyStyle;
         this.getCurrentDate();
         this.toStringTags();
        this.$root.$on("saveObject",this.passToNextStep);
        this.$root.$on("backToUoStep2",this.changeData);
    },
    destroyed: function(){
         this.$root.$off("saveObject",this.passToNextStep);
         this.$root.$off("backToUoStep2",this.changeData);

    },
    methods: {
                toStringTags(){
                   /* for(i=0; i < this.prevTags.length;i++ ){
                        if (i == (this.prevTags.length-1)){
                             this.tagsString += this.prevTags[i];
                        }
                        else{
                            this.tagsString += this.prevTags[i] + ", ";
                        }
                    }*/
                    this.tagsString = this.prevTags.toString();
                },
                getCurrentDate(){
                    var myDate = new Date();
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    this.registerDate = date + '/' + month + '/' + year;
                },
                changeData(){
                    console.log("Entro en changeData");
                     var emitObj = {
                       imgUrl : "unChanged",
                       nextStep: 2
                   }
                this.$emit('backtoStep2',emitObj);
                },
               uploadObject(){

               }
 },
    
    template:`


        
        
        <!--Inicio de body-->
<div>

    <!--Inicio datos-->
        
    <div  style="margin-left: 5.25%;margin-right: 5.25% ">
        <div  style="width: 100%">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
                <md-card-header>
                 <md-card-header-text >
                    <md-list style="font-size:14px;">
                        <md-list-item style="justify-content:center">
                      <img :src="imgSrc" alt="" style="width:100%;border-radius:7px">
                        </md-list-item>
                        <md-list-item style="margin-top:1.5em">
                            <md-field>
                                <label :style="labelStyle">Tags generados:</label>
                                <md-textarea v-model="tagsString" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Localización:</label>
                                <md-textarea v-model="location" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Número de ayuda:</label>
                                <md-textarea v-model="phone" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Fecha de registro:</label>
                                <md-textarea v-model="registerDate" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            </md-card>
            <div style="text-align: center;">
              <md-button v-on:click="uploadObject()" :style="buttonStyle">Registrar Objeto</md-button>
            </div>
          </div>        
    </div>
        <!--Fin datos-->



  </div> 
        <!--Fin de body-->

        
        

                      `
    
    
    
});