Vue.component('capture-img', {
    data: () => ({
    loading:false,
    btnShow:true,
    btnChange:false,
    cameraStyle:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginTop: "0px",
            marginRight: "auto"
        },
     buttonStyle:{ 
            borderRadius:"28px",
            border:"1px solid #00c9fa",
            color:"#00c9fa !important",
            fontSize:"14px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "40%",
            width: "60%",
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
            width: "14em",
            height: "3.2em",
            marginTop: "1.5em",
            marginBottom:"2.5em",
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
            width: "60%",
            height: "3.2em",
            marginTop: "1em",
            marginLeft: "0",
            marginRight: "0",
            padding: "0.5em"
        },
        imageHandler: null,
        imgStyle: null,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa); background-repeat: no-repeat; background-size: 100% 50%; background-color: white;"
 }),
    created: function(){
        window.scrollTo(0,0);
        document.body.style= this.bodyStyle;
        this.$root.$on("generateTags",this.passToNextStep);
    },
    destroyed: function(){
         this.$root.$off("generateTags",this.passToNextStep);
    },
    methods: {
           
              setCameraOptions (srcType) {
                var options = {
                // Some common settings are 20, 50, and 100
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                // In this app, dynamically set the picture source, Camera or photo gallery
                sourceType: srcType,
                targetWidth: 1200,
                targetHeight: 1200,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: false,
                correctOrientation: true  //Corrects Android orientation quirks
                    }
                return options;
              },
              takePhotoFromCamera(){
                var srcType = Camera.PictureSourceType.CAMERA;
                var options = this.setCameraOptions(srcType);

                navigator.camera.getPicture(this.onSuccess,this.onFail,options);
                this.loading = true;
                this.btnShow = false;
              },
             takePhotoFromGallery(){
                var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                var options = this.setCameraOptions(srcType);

                navigator.camera.getPicture(this.onSuccess,this.onFail,options);
                this.loading = true;
                this.btnShow = false;
              },
               onSuccess(imageURI) {
                    var CropperOptions = {
                    quality: 100,
                    widthRatio: 1,
                    heightRatio: 1,
                    targetWidth: 1200,
                    targetHeight: 1200
                    };
                    plugins.crop(this.croppedSuccess,this.croppedFail,imageURI,CropperOptions);
                },
                onFail(message) {
                    this.btnShow = true;
                    this.loading = false;
                    console.log('Failed because: ' + message);
                },
                croppedSuccess(croppedPath){
                    this.loading = false;
                    this.btnChange = true;
                    toolBarData.paginaSiguiente = "UO_step2";
                    console.log("Pagina siguiente: "+toolBarData.paginaSiguiente);
                    this.imageHandler = croppedPath;
                },
                croppedFail(error){
                    this.btnShow = true;
                    this.loading = false;
                    console.log(error);
                },
                changePhoto(){
                    this.imageHandler = null;
                    this.btnShow = true;
                    this.btnChange = false;
                    toolBarData.paginaSiguiente = "";
                    
                },
               passToNextStep(){
                   var emitObj = {
                       imgUrl : this.imageHandler,
                       nextStep: 2
                   }
                this.$emit('reciveDataStep1',emitObj);
               }
 },
    
    template:`


        
        
        <!--Inicio de body-->

     <div class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0">
<md-card class="md-elevation-0" style="border-radius: 10px;width: 80%;box-shadow: 0px 5px 35px -15px rgba(51,51,51,0.5);
}">
 <md-card-media-cover style="  overflow: hidden;" >
        <md-card-media md-ratio="1:1" style="overflow: hidden; position: relative">
          <img id="generateTagsImageHandler" :src="imageHandler" :style="imgStyle" alt="">
        </md-card-media>

        <md-card-area v-if="btnShow == true">
        <md-card-header style="padding-top: 10px;">
           <md-icon class="md-size-2x" :style="cameraStyle">camera_alt</md-icon>
          </md-card-header>
 <div class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-bottom:15%;">
                 
                <md-button v-on:click="takePhotoFromGallery" :style="buttonStyle">Buscar en galería</md-button>
                <md-button v-on:click="takePhotoFromCamera" :style="buttonStyle">Hacer fotografía</md-button>
            </div>

        </md-card-area>

        <md-card-area v-if="btnChange == true">
 <div class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-bottom:40%;">
                 
                <md-button v-on:click="changePhoto" :style="buttonStyle3">Cambiar fotografía</md-button>
            </div>

        </md-card-area>

        <md-card-area v-if="loading" >
                <md-card-header>
                    <div class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-bottom:40%;">
                        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                    </div>

                  
                </md-card-header>

        </md-card-area>

      </md-card-media-cover>
    </md-card>
        <div style="text-align: center;">
              <md-button v-on:click="passToNextStep" v-if="imageHandler != null" :style="buttonStyle2">Generar tags</md-button>
            </div>
    </div>
        <!--Fin de body-->

        
        

                      `
    
    
    
});