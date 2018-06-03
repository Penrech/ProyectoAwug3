Vue.component('save-object', {
    props: ["imgSrc","prevTags"], 
    data: () => ({
     uploading: false,
     tagsString: "",
     user,
     openDialog:false,
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
            marginTop: "1.5em"
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
        heartStyle2:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginRight: "auto",
            marginBottom: "30px"
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",
        responseObject:{
            response: false,
            uploadedSuccess: null,
            message:null
        }
 }),
    created: function(){
        window.scrollTo(0,0);
         document.body.style= this.bodyStyle;
         this.getCurrentDate();
         this.toStringTags();
        this.$root.$on("backToUoStep2",this.changeData);
    },
    destroyed: function(){
         this.$root.$off("backToUoStep2",this.changeData);

    },
    methods: {
                toStringTags(){
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
                    if (this.uploading == false){
                        if(this.responseObject.uploadedSuccess == true){
                            this.$router.push("allLostObjects");
                        }
                        else if(this.responseObject.uploadedSuccess == false){
                             this.responseObject = {
                                response: false,
                                uploadedSuccess: null,
                                message: "null"
                            }
                            this.hideStepper(false);
                        }
                        else{
                            var emitObj = {
                            imgUrl : "unChanged",
                            nextStep: 2
                            }
                            this.$emit('backtoStep2',emitObj);
                        }
                    }
                    else{
                        this.openDialog = true;
                    }
                },
               uploadObject(){
                    this.uploading = true;
                    this.hideStepper(true);
                    let _this = this;
                    var object ={
                        imgUrl: this.imgSrc,
                        location: this.user.location,
                        phone: this.user.phone,
                        tags:this.prevTags
                    }
                    var sQuery = new saveObject(object);
                    sQuery.then(function(result){
                        if (result.uploadedSucces == true){
                            _this.responseObject = {
                                response: true,
                                uploadedSuccess: true,
                                message: "Objeto guardado correctamente en la base de datos"
                            }
                        }
                        else{
                            _this.responseObject={
                                response:true,
                                uploadedSuccess:false,
                                message: result.error1
                            }
                        }
                        _this.uploading = false;
                    })
               },
              hideStepper(value){
                  this.$emit("hideStepper",value);
              }
                
 },
    
    template:`


        
        
        <!--Inicio de body-->
<div>

<!--inicio subnav2-->
  <md-toolbar v-if="uploading" md-elevation="0" class="md-transparent" >
        <div class="md-toolbar-row" style="justify-content: center;margin-top:25%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div class="md-toolbar-row" style="justify-content: center;">
        <span class="md-title" style="font-weight: 300;font-size: 16px; margin-left: 0;color: white;  white-space: normal; text-align:center">El objeto se está subiendo a la nube</span>
      </div>
    </md-toolbar>
<!-- fin subnav2-->

    <!--Inicio datos-->

    <div  v-if="responseObject.response == true" style="margin-top:2em;margin-left: 5.25%;margin-right: 5.25% ">
        <div  style="width: 100%; padding-bottom: 2.5em;">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">

            <md-card-area>
                <md-card-header style=" display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                flex-direction: column;padding: 15%">

                <img v-if="responseObject.uploadSuccess == false" class="md-icon md-size-3x" :style="heartStyle2" src="icon/heartBreak.svg"></img>
                <md-icon v-else class="md-size-3x" :style="heartStyle2" >done</md-icon>

                <span v-if="responseObject.uploadSuccess == false" class="md-title" style="font-size:16px;font-weight:600;line-height: 1.4; text-align:center; color:black;margin-bottom:10px">Lo sentimos</span>
                <span class="md-title" style="font-size:14px;font-weight:400;line-height: 1.4; text-align:center; color:black;">{{responseObject.message}}</span>
              </md-card-header>

            </md-card-area>
        </md-card>
            <div v-if="uploading == false" style="text-align: center;">
              <md-button v-if="responseObject.uploadedSuccess == false" v-on:click="uploadObject()" :style="buttonStyle">Volver a intentar</md-button>
              <md-button v-else v-on:click="changeData()" :style="buttonStyle">Ir a la lista de objetos</md-button>
            </div>
        </div>
</div>



<!------------------------------------------------------------------->
        
    <div  v-if="uploading == false && responseObject.response == false" style="margin-left: 5.25%;margin-right: 5.25% ">
        <div  style="width: 100% ;padding-bottom: 2.5em;">
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
                                <md-textarea v-model="user.location.name" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Número de ayuda:</label>
                                <md-textarea v-model="user.phone" md-autogrow :style="inputStyle" disabled></md-textarea>
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
            <div v-if="uploading == false && responseObject.response == false" style="text-align: center;">
              <md-button v-on:click="uploadObject()" :style="buttonStyle">Registrar Objeto</md-button>
            </div>
          </div>        
    </div>
        <!--Fin datos-->
   
<!--dialogos-->
    <md-dialog-alert
      :md-active.sync="openDialog"
      md-title= "El objeto se está subiendo"
      md-content="Espera a que el objeto se guarde en la base de datos"
      md-confirm-text="OK" />


  </div> 
        <!--Fin de body-->

        
        

                      `
    
    
    
});