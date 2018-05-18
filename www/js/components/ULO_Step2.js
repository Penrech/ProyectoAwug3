Vue.component('ULO-step2', {
        props: ["objSelect"],
        data: () => ({
        uploading: false,
        tagsString: null,
        loading:true,
        registerDate: null,
        claimDate:null,
        activeDeleteDialog: false,
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
            height: "3.2em"
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
     beforeRouteLeave(to,from,next){
       console.log (from.params);
       console.log (to.params);
     },
        created: function(){
         window.scrollTo(0,0);
        toolBarData.iconoPaginaAnterior = "keyboard_backspace";
        toolBarData.iconoPaginaSiguiente = "";
        toolBarData.paginaActual = "ULO_step2";
        toolBarData.paginaSiguiente = "";
        toolBarData.paginaAnterior = "ULO_step1";
        toolBarData.toolBarTitle = "Detalles del objeto";
        this.registerDate = this.getFormatDate(this.objSelect.registro);
        this.showTags();
        this.$root.$on("backToULOStep1",this.changeData);
         console.log(this.objSelect);
         //this.toStringTags();
    },
    destroyed: function(){
         this.$root.$off("backToULOStep1",this.changeData);
    },
        methods: {
            showTags(){
                 if (!this.objSelect.tags){
                     let _this = this;
                     var objTags = new getObjectTags(this.objSelect.id);
                     var objClaimDate = new getUserObjectClaimDate(this.objSelect.id,userIdTest);
                     objTags.then(function(result){
                            _this.tagsString = result.toString();
                            objClaimDate.then(function(result){
                                _this.claimDate = _this.getFormatDate(result);
                                _this.loading = false;
                            })
                        })
                 }
                else{
                    this.tagsString = this.objSelect.tags.toString();
                    this.loading = false;
                }
                },
             getFormatDate(date){
                    var myDate = new Date(date);
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    return date + '/' + month + '/' + year;
                },
  
                changeData(){
                     var emitObj = {
                       nextStep: 1
                   }
                this.$emit('backToStep1',emitObj);
                },
            
                deleteObj(state){
                    var emitObj;
                    let _this = this;
                    this.uploading = true;
                    if(state == 1){
                      if(this.objSelect.imgBig){
                          var dQuery = new deleteUserObject(this.objSelect.id,userIdTest)
                          .then(function(result){
                          if (result == true)
                              _this.changeData();
                          else{
                              _this.uploading = false;
                              var error={
                                  text:"Error borrando objeto",
                                  active: true
                                    }
                              _this.snackBar = error;
                          }
                          })
                      }
                      else{
                          var dQuery = new deleteUserSearch(this.objSelect.idBusqueda,userIdTest)
                          .then(function(result){
                           if (result == true)
                              _this.changeData();
                          else{
                              _this.uploading = false;
                              var error={
                                  text:"Error borrando busqueda",
                                  active: true
                                  } 
                              _this.snackBar = error;
                          }
                          })
                          
                      }
                    }      
                },
              callNumber(){
                  window.location.href="tel:"+this.objSelect.phone;
              },
              openMaps(){
                  console.log("entro aqui");
                  window.location.href="geo:41.5622481,2.0195355";
              },
              searchAgain(){
                  this.$router.push({name: 'searchObject', params: this.objSelect});
              }
           
        },
        watch:{
            loading : function(val){
                console.log("valor de loading",val);
            }
        },
        template:`


<div>

        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 5.25%;margin-right: 5.25% ">

    <div v-if="loading" class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div  style="margin-top:50%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
    </div>

        <div v-if="!loading" style="width: 100%">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
                <md-card-header>
                 <md-card-header-text >
                    <md-list id="details_obj_list" style="font-size:14px;">
                       <md-list-item v-if="objSelect.imgBig" style="justify-content:center;">
                      <img :src="objSelect.imgBig" alt="" style="width:100%;border-radius:7px">
                        </md-list-item>
                        <md-list-item style="margin-top:1.5em">
                            <md-field>
                                <label :style="labelStyle">Tags :</label>
                                 <md-textarea v-model="tagsString" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="objSelect.imgBig">
                            <md-list>
                                <md-list-item>
                                <md-field>
                                    <label :style="labelStyle">Localización:</label>
                                    <md-textarea v-model="objSelect.location" md-autogrow :style="inputStyle" disabled></md-textarea>
                                </md-field>
                                </md-list-item>
                                <md-list-item>
                                    <md-button v-on:click="openMaps" :style="buttonStyle2">Abrir en Maps</md-button>
                                </md-list-item>
                            </md-list>
                        </md-list-item>
                        <md-list-item v-if="objSelect.imgBig">
                            <md-field @click.native="callNumber">
                                <label :style="labelStyle">Número de ayuda:</label>
                                <md-textarea   v-model="objSelect.phone" md-autogrow :style="inputStyle2" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label v-if="objSelect.imgBig" :style="labelStyle">Fecha de registro:</label>
                                <label v-else :style="labelStyle">Fecha de busqueda:</label>
                                <md-textarea v-model="this.registerDate" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item  v-if="objSelect.imgBig">
                            <md-field>
                                <label :style="labelStyle">Fecha de reclamo:</label>
                                <md-textarea v-model="this.claimDate" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="objSelect.updates > 0">
                            <md-field>
                                <label :style="labelStyle">Posibles coincidencias:</label>
                                <md-textarea v-model="objSelect.updates" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            </md-card>

            <div v-if="!loading && !uploading" class="md-layout md-gutter md-alignment-center-center" style="padding-left:0; text-align:center; margin-top:1.5em;">
            <md-list style="background: transparent;margin-bottom:1.5em">
                <md-list-item  v-if="!objSelect.imgBig" >
                  <md-button v-on:click="searchAgain" :style="buttonStyle">Volver a buscar</md-button>
                </md-list-item>
                <md-list-item>
                  <md-button v-on:click="activeDeleteDialog = true" :style="buttonStyle">Borrar de mi lista</md-button>
                </md-list-item>
                </md-list>
            </div>
            <div v-if="uploading" class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:1.5em">
                <div  style="--md-theme-default-primary: white;">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </div>
            </div>
          </div>        
    </div>

        <!--Fin datos-->
        
        <!--Dialogo Borrar tag-->
      <md-dialog-confirm
      :md-active.sync="activeDeleteDialog"
      md-title="¿Estás seguro?"
      md-content= "El objeto se borrará de tu lista de objetos"
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-cancel="deleteObj(2)"
      @md-confirm="deleteObj(1)" />

    <!-- SnackBar errores -->
    <!--snackBar errores-->
    <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="snackBar.active" md-persistent>
      <span>{{snackBar.text}}</span>
      <md-button class="md-primary" @click="snackBar.active = false">OK</md-button>
    </md-snackbar>
        
       

</div>

                      ` });
