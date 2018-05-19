Vue.component('found-object-details', {
        props: ["searched","prevTags","objSelect"],
        data: () => ({
        uploading: false,
        loading:true,
        tagsString: null,
        registerDate :null,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",                     
        heartStyle1:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginTop: "0px",
            marginRight: "auto",
            marginBottom: "10px"
            
        },
         heartStyle2:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginRight: "auto",
            marginBottom: "30px"
        },
        labelSpan:{
            fontSize:"16px",
            fontWeight:"500",
            marginRight: "15px"
        },
        textSpan:{
            fontSize:"16px",
            fontWeight:"500",
        },
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
          buttonStyle2:{ 
            borderRadius:"28px",
            border:"1px solid #03a9f4",
            color:"#03a9f4",
            fontSize:"16px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "10em",
            width: "10em",
            height: "3.2em"
        },
        labelStyle:{
             fontSize:"16px",
            fontWeight:"500",
            marginBottom:"12px"
        },
        inputStyle:{
            fontSize:"16px",
            fontWeight:"200",
            marginTop:"12px"
        },
         inputStyle2:{
            fontSize:"16px",
            fontWeight:"200",
            marginTop:"12px",
            color:"#03a9f4",
            webkitTextFillColor:"#03a9f4"
        },
        snackBar:{
            text: null,
            active: false
        },
        duration:3000

                              

    }),
        created: function(){
         window.scrollTo(0,0);
         document.body.style= this.bodyStyle;
         this.$root.$on("backToSoStep2",this.changeData);
         this.getFormatDate();
         this.toStringTags();

    },
    destroyed: function(){
         this.$root.$off("backToSoStep2",this.changeData);

    },
        methods: {
             toStringTags(){
                 if(this.objSelect == null){
                    this.tagsString = this.prevTags.toString();
                    this.loading = false;
                 }
                 else{
                     let _this = this;
                     var objTags = getObjectTags(this.objSelect.id);
                        objTags.then(function(result){
                            _this.tagsString = result.toString();
                            _this.loading = false;
                        })
                 }   
                },

                getFormatDate(){
                    if (this.objSelect){
                    var myDate = new Date(this.objSelect.registro);
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    this.registerDate = date + '/' + month + '/' + year;
                    }
                    else{
                    this.registerDate = new Date().getTime();
                    }
                },
                changeData(){
                     var emitObj = {
                       nextStep: 2
                   }
                this.$emit('backToStep2',emitObj);
                },
               guardarObjeto(){
                   var deferred = $.Deferred();
                   this.uploading = true;
                   console.log(this.uploading);
                   let _this = this;
                    if(this.objSelect){
                      if(this.searched != null){
                          var dQuery= new deleteUserSearch(this.searched.idBusqueda,userIdTest)
                          .then(function(result){
                              if(result == true)
                                  deferred.resolve();
                              else{
                                   var error={
                                  text:"Error guardando objeto",
                                  active: true
                                    }
                              _this.snackBar = error;
                              }
                          })
                      }
                      else 
                          deferred.resolve();
                        
                      $.when(deferred).done(function(x){
                            var sQuery = new saveUserObject(_this.objSelect.id,userIdTest)
                              .then(function(result){
                                  _this.uploading = false;
                                   console.log(_this.uploading);
                                  //ir a mis objetos
                                  if (result == true)
                                      _this.$router.push('userLostObjects');
                                  else{
                                      var error={
                                          text:"Error guardando objeto",
                                          active: true
                                            }
                                      _this.snackBar = error;
                                  }
                              })
                          
                      })
                    
                      
                    }
                   else{
                       var sQuery = new saveUserSearch(this.prevTags,userIdTest)
                       .then(function(result){
                           //ir a mis objetos
                           if (result == true)
                              _this.$router.push('userLostObjects');
                          else{
                              var error={
                                  text:"Error guardando busqueda",
                                  active: true
                                    }
                              _this.snackBar = error;
                          }
                       })
                       
                   }

               },
            callNumber(){
                  window.location.href="tel:"+this.objSelect.phone;
              }, 
            openMaps(){
                window.location.href="geo:"+this.objSelect.location.lat+","+this.objSelect.location.lon+"?q="+this.objSelect.location.lat+","+this.objSelect.location.lon+"("+this.objSelect.location.name+")";
              }
           
        },
        template:`


<div>

        
        
        <!--Inicio datos-->
        
    <div  v-if="objSelect != null && loading != true" style="margin-top:2em;margin-left: 5.25%;margin-right: 5.25% ">
        <div  style="width: 100%; padding-bottom: 2.5em;">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
                <md-card-header>
                 <md-card-header-text >
                    <md-list id="details_obj_list" style="font-size:14px;">
                       <md-list-item style="justify-content:center">
                      <img :src="objSelect.imgBig" alt="" style="width:100%;border-radius:7px">
                        </md-list-item>
                        <md-list-item style="margin-top:1.5em">
                            <md-field>
                                <label :style="labelStyle">Tags :</label>
                                 <md-textarea v-model="tagsString" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-list>
                                <md-list-item>
                                <md-field>
                                    <label :style="labelStyle">Localización:</label>
                                    <md-textarea v-model="objSelect.location.name" md-autogrow :style="inputStyle" disabled></md-textarea>
                                </md-field>
                                </md-list-item>
                                <md-list-item>
                                    <md-button v-on:click="openMaps" :style="buttonStyle2">Abrir en Maps</md-button>
                                </md-list-item>
                            </md-list>
                        </md-list-item>
                        <md-list-item>
                            <md-field  @click.native="callNumber">
                                <label :style="labelStyle">Número de ayuda:</label>
                                <md-textarea v-model="objSelect.phone" md-autogrow :style="inputStyle2" disabled></md-textarea>

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

        <div v-if="!uploading && !objSelect.objInUserList" style="text-align: center;">
          <md-button v-on:click="guardarObjeto" :style="buttonStyle">Guardar objeto</md-button>
        </div>
        <div v-if="uploading" class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:1.5em">
            <div  style="--md-theme-default-primary: white;">
                 <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
        </div>
          </div>        
    </div>

    <div  v-if="objSelect == null && loading != true" style="margin-top:2em;margin-left: 5.25%;margin-right: 5.25% ">
        <div  style="width: 100%; padding-bottom: 2.5em;">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
           <!-- <md-card-media-cover style="    overflow: hidden;" >

            <md-card-media md-ratio="1:1">
              <img src="" alt="">
            </md-card-media>-->

            <md-card-area>
                <md-card-header style=" display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                flex-direction: column;padding: 15%">

                <img class="md-icon md-size-3x" :style="heartStyle2" src="icon/heartBreak.svg"></img>

                <span class="md-title" style="font-size:16px;font-weight:600;line-height: 1.4; text-align:center; color:black;margin-bottom:10px">Lo sentimos</span>
                <span class="md-title" style="font-size:14px;font-weight:400;line-height: 1.4; text-align:center; color:black;">Vuelve a intentarlo más tarde. Puedes guardar tu búsqueda para realizar este proceso más rápidamente la próxima vez.</span>
              </md-card-header>

            </md-card-area>
        <!-- </md-card-media-cover>-->
        </md-card>

         <div v-if="loading" class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0">
            <div  style="margin-top:50%;--md-theme-default-primary: white;">
                 <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
            </div>

        <div v-if="!uploading" style="text-align: center;">
          <md-button v-on:click="guardarObjeto" :style="buttonStyle">Guardar busqueda</md-button>
        </div>
        <div v-else class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:1.5em">
            <div  style="--md-theme-default-primary: white;">
                 <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
        </div>
          </div>        
    </div>
        <!--Fin datos-->
        
         <!-- SnackBar errores -->
    <!--snackBar errores-->
    <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="snackBar.active" md-persistent>
      <span>{{snackBar.text}}</span>
      <md-button class="md-primary" @click="snackBar.active = false">OK</md-button>
    </md-snackbar>
        
        
       

</div>

                      ` });
