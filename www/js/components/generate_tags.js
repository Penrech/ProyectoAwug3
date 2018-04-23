Vue.component('generate-tags', {
    props: ["imgSrc","prevTags"], 
    data: () => ({
    tagsArray:[],
    toBeDeleted:{
        index: null,
        name: null
    },
    toBeAdded: null,
    activeDeleteDialog:false,
    activeInsertTagDialog:false,
    activeTagsAlert: false,
    dialogText: null,
    loading:false,
    btnShow:true,
    loadingStatusLibrary:{
        first: "Escaneando imagen",
        second: "Generando tags",
        third: "Mostrando tags"
    },
    loadingStatus: null,
    marcaAdded:false,
    btnChange:false,
     buttonStyle:{ 
            borderRadius:"28px",
            border:"1px solid #00c9fa",
            color:"#00c9fa !important",
            fontSize:"14px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "140px",
            width: "140px",
            height: "3.2em",
            marginTop: "1em",
            marginLeft: "0",
            marginRight: "0",
            padding: "0.5em"
        },
    buttonStyle2:{
            borderRadius:"28px",
            background: "linear-gradient(to right, #ff9800, #ffb74d)",
            color:"#ffffff",
            fontSize:"16px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "8em",
            width: "12em",
            height: "3em",
            boxShadow: "0px 5px 35px -15px rgba(51,51,51,0.5)"
    },
    buttonStyle3:{ 
            borderRadius:"28px",
            border:"1px solid white",
            color:"white !important",
            fontSize:"14px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "40%",
            width: "70%",
            height: "3.5em",
            marginTop: "1em",
            marginLeft: "0",
            marginRight: "0",
            padding: "0.5em"
        },
         buttonStyle4:{ 
            borderRadius:"28px",
            background: "linear-gradient(to right, #03a9f4, #81d4fa)",
            color:"#ffffff",
            fontSize:"14px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "140px",
            width: "140px",
            height: "3.2em",
            marginTop: "1em",
            marginLeft: "0",
            marginRight: "0",
            padding: "0.5em"
        },
        imgStyle: null,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa); background-repeat: no-repeat; background-size: 100% 20%; background-color: white;"
 }),
    created: function(){
        window.scrollTo(0,0);
        document.body.style = this.bodyStyle;
        if (this.prevTags.length > 0){
            this.tagsArray = this.prevTags;
        }
        else{
            this.loading = true;
            this.getDataUri(this.imgSrc,this.sendFileToCloudVision);

        }
        this.$root.$on("saveTags",this.passToNextStep);
    },
    destroyed: function(){
         this.$root.$off("saveTags",this.passToNextStep);
    },
    
    methods: {
                
                deleteTag(index,value,state){
                    if(state == 0){
                        this.toBeDeleted.index = index;
                        this.toBeDeleted.name = value;
                        this.dialogText ="Vas a borrar el tag <strong>"+this.toBeDeleted.name+"</strong>, ¿Continuar?"
                        this.activeDeleteDialog = true;
                        
                    }
                    else if(state == 1){
                        this.tagsArray.splice(index, 1);
                        this.dialogText = null;
                        this.toBeDeleted.index = null;
                        this.toBeDeleted.name = null;
                    }
                    else if(state == 2){
                        this.dialogText = null;
                        this.toBeDeleted.index = null;
                        this.toBeDeleted.name = null;
                    }
                    
                },
                createTag(state){
                    if (state == 1){
                        if (!this.tagsArray.includes(this.toBeAdded) && this.toBeAdded.length >= 2){
                            this.tagsArray.push(this.toBeAdded);

                        }
                        this.toBeAdded = null;
                        console.log(this.toBeAdded);
                    }
                    else{
                        this.toBeAdded = null;
                    }
                    this.$refs.inputDialog.inputValue = "";
                },
                changePhoto(){
                     var emitObj = {
                       imgUrl : null,
                       nextStep: 1
                   }
                this.$emit('backtoStep1',emitObj);
                },
               passToNextStep(){
                if(this.tagsArray.length > 2){
                   var emitObj = {
                       imgUrl: this.imgSrc,
                       tags : this.tagsArray,
                       nextStep: 3
                   }
                this.$emit('reciveDataStep2',emitObj);
                }
                else{
                    this.activeTagsAlert = true;
                }
               },
                getDataUri(url,callback){
                this.loadingStatus = this.loadingStatusLibrary.first;
                var image = new Image();

                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
                    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

                    canvas.getContext('2d').drawImage(this, 0, 0);

                    // Get raw image data
                    callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

                    // ... or get as Data URI
                    //callback(canvas.toDataURL('image/png'));
                };

                 image.src = url;
                },
                sendFileToCloudVision(base64){
                    var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

                    var request = {
                        requests: [{
                        image: {
                        content:  base64
                        },
                        features: [
                            {
                        type: 'LABEL_DETECTION',
                        maxResults: 10
                        },{
                        type:'LOGO_DETECTION',
                        maxResults: 2
                        }
                        ]
                        }]
                        };
                    
                    $.post({
                    url: CV_URL,
                    data: JSON.stringify(request),
                    contentType: 'application/json'
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log('ERRORS: ' + textStatus + ' ' + errorThrown);
                    }).done(this.processCloudVisionData);
                    },
                 processCloudVisionData(data){
                     this.loadingStatus = this.loadingStatusLibrary.second;
                     console.log(data);
                     var tempArray=[];
                     var tempObj =  data.responses[0].labelAnnotations;
                     for(i= 0; i<tempObj.length;i++){
                        if(tempObj[i].description.length <15 && !tempArray.includes(tempObj[i].description))
                            tempArray.push(tempObj[i].description);
                     }
                     if(data.responses[0].logoAnnotations){
                         tempObj =  data.responses[0].logoAnnotations;
                         for(i= 0; i<tempObj.length;i++){
                            if(tempObj[i].description.length <15 && !tempArray.includes(tempObj[i].description))
                                tempArray.push(tempObj[i].description);
                     }}
                     this.SendTextToTranslation(tempArray);
                     /*this.tagsArray = tempArray;
                     this.loading = false;
                     toolBarData.paginaSiguiente = "UO_step3";*/
                 },
                SendTextToTranslation(array){
                        var StringAr= array.toString();
                        var url = "https://www.googleapis.com/language/translate/v2?key=" + window.apiKey + "&q="+StringAr+"&target=es&source=en";
                        this.$http.get(url).then(this.translateTags,function(error){
                            console.log("error traductor : "+error);
                        });
                },
                translateTags(data){
                                this.loadingStatus = this.loadingStatusLibrary.third;
                                console.log("Entro en la respuesta bien");
                                console.log(data.body.data.translations[0]);
                                var tempArray = [];
                                var StringRes = data.body.data.translations[0].translatedText;
                                var tempObj = StringRes.split(",");
                                console.log(tempObj);
                                for(i= 0; i<tempObj.length;i++){
                                        if(tempObj[i].length <15)
                                            tempArray.push(tempObj[i]);
                                 }
                                this.tagsArray = tempArray;
                                this.loading = false;
                                this.loadingStatus = null;
                                toolBarData.paginaSiguiente = "UO_step3";
                    }
                
            
 },
    
    template:`


        
        
        <!--Inicio de body-->
<div>

<div class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0;background: linear-gradient(to right, #03a9f4, #81d4fa); background-repeat: no-repeat; background-size: 100% 75%; background-color: white;">
<md-card ref="photoHolderStep2" class="md-elevation-0" style="border-radius: 10px;width: 60%;box-shadow: 0px 5px 35px -15px rgba(51,51,51,0.5);
}">
 <md-card-media-cover style="  overflow: hidden;" >
        <md-card-media md-ratio="1:1" style="overflow: hidden; position: relative">
          <img id="generateTagsImageHandler" :src="imgSrc" :style="imgStyle" alt="">
        </md-card-media>


        <md-card-area>
        <div class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-bottom:40%;">
                 
                <md-button v-on:click="changePhoto" :style="buttonStyle3">Cambiar fotografía</md-button>
        </div>

        </md-card-area>


      </md-card-media-cover>
    </md-card>

</div>

         <div class="md-layout md-alignment-top-center" style="padding-left:0;text-align:center;margin-top:3%;margin-bottom:5%">
            <div v-if="loading" >
            <div  class="md-layout-item  md-size-100" style="margin-top:15%;margin-bottom:7%;--md-theme-default-primary: #03a9f4;">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
            <div class="md-layout-item  md-size-100" style="margin-top:15%;margin-bottom:7%;">
                  <span style="font-size:15px;color:#03a9f4;font-weight:500">{{loadingStatus}}</span>
            </div>
            </div>
            <div v-if="!loading">
            <div  class="md-layout-item md-layout md-gutter" style="margin-left:7%;margin-right:7%;">
                <div class="md-layout-item" v-for="(value, index) in tagsArray" >
                 <md-button :style="buttonStyle" v-on:click="deleteTag(index,value,0)">{{value}}</md-button>
                </div>
                <div v-if="!marcaAdded"class="md-layout-item">
                 <md-button :style="buttonStyle4" v-on:click="activeInsertTagDialog = true">Añade la marca</md-button>
                  </div>
                <div class="md-layout-item">
                 <md-button :style="buttonStyle4" v-on:click="activeInsertTagDialog = true">+</md-button>
                  </div>
            </div>
             <div  class="md-layout-item md-size-100" style="margin-top:3%;">
                 <md-button v-on:click="passToNextStep" :style="buttonStyle2">Guardar</md-button>
            </div>
        </div>

       <!--Dialogo Borrar tag-->
      <md-dialog-confirm
      :md-active.sync="activeDeleteDialog"
      md-title="Borrar tag"
      :md-content= "dialogText"
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-cancel="deleteTag(null,null,2)"
      @md-confirm="deleteTag(toBeDeleted.index,toBeDeleted.name,1)" />

      <!--Fin dialogo borrar tag-->
     <!--Dialogo añadir tag-->
        <md-dialog-prompt
      :md-active.sync="activeInsertTagDialog"
      v-model="toBeAdded"
      md-title="Nuevo tag"
      md-content="<strong>Mínimo 2 carácteres<strong>"
      ref ="inputDialog"
      md-input-maxlength="15"
      md-input-placeholder="Máximo 15 carácteres..."
      md-confirm-text="Añadir"
      md-cancel-text="Cancelar"
      @md-cancel="createTag(2)"
      @md-confirm="createTag(1)" />

    <!--Fin dialogo añadir tag-->
    <!--Dialogo alerta pocos tags-->
      <md-dialog-alert
      :md-active.sync="activeTagsAlert"
      md-title="Pocos tags!"
      md-content="Debe de haber un mínimo de 3 tags prueba a añadir más con el botón <strong>+</strong>" />
    <!-- Fin dialogo pocos tags-->


  </div> 
</div>
        <!--Fin de body-->

        
        

                      `
    
    
    
});