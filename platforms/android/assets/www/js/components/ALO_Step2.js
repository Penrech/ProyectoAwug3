Vue.component('ALO-step2', {
        props: ["objSelect"],
        data: () => ({
        tagsString: null,
        loading:true,
        uploading:false,
        activeDeleteDialog: false,
        reclamado: null,
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
        showSnackbar:false,
        duration: 3000

                              

    }),
        created: function(){
        window.scrollTo(0,0);
        toolBarData.iconoPaginaAnterior = "keyboard_backspace";
        toolBarData.iconoPaginaSiguiente = "";
        toolBarData.paginaActual = "ALO_step2";
        toolBarData.paginaSiguiente = "";
        toolBarData.paginaAnterior = "ALO_step1";
        toolBarData.toolBarTitle = "Detalles del objeto";
        this.getFormatDate();
        this.showTags();
        this.$root.$on("backToALOStep1",this.changeData);
         console.log(this.objSelect);
    },
    destroyed: function(){
         this.$root.$off("backToALOStep1",this.changeData);
    },
        methods: {
            showTags(){
                     let _this = this;
                     var objTags = getObjectTags(this.objSelect.id);
                        objTags.then(function(result){
                            _this.tagsString = result.toString();
                            if (_this.objSelect.reclamado)
                                _this.reclamado = "Si";
                            else
                                _this.reclamado = "No";
                            _this.loading = false;
                        })
                },
             getFormatDate(){
                    var myDate = new Date(this.objSelect.registro);
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    this.registerDate = date + '/' + month + '/' + year;
                },
  
                changeData(){
                     var emitObj = {
                       nextStep: 1
                   }
                this.$emit('backToStep1',emitObj);
                },
                
                goToClaimers(){
                    var emitObj={
                        nextStep:3
                    }
                this.$emit('receiveDataStep2',emitObj);
                },
                deleteObj(state){
                    this.uploading = true;
                    let _this = this;
                    if(state == 1){
                         var dQuery = deleteObject(this.objSelect.id);
                         dQuery.then(function(result){
                             if (result == false){
                                 _this.showSnackbar = true;
                                 _this.uploading = false;
                             }
                             else
                                 _this.changeData();
                         })
                    }      
                },
           
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

        <div v-if="!loading" style="width: 100%;padding-bottom:2.5em">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
                <md-card-header>
                 <md-card-header-text >
                    <md-list id="details_obj_list" style="font-size:14px;">
                       <md-list-item style="justify-content:center;">
                      <img :src="objSelect.imgBig" alt="" style="width:100%;border-radius:7px">
                        </md-list-item>
                        <md-list-item style="margin-top:1.5em">
                            <md-field>
                                <label :style="labelStyle">Tags :</label>
                                 <md-textarea v-model="tagsString" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Localización:</label>
                                <md-textarea v-model="objSelect.location" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Número de ayuda:</label>
                                <md-textarea v-model="objSelect.phone" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Fecha de registro:</label>
                                <md-textarea v-model="this.registerDate" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item >
                            <md-field>
                                <label :style="labelStyle">Reclamado:</label>
                                <md-textarea v-model="this.reclamado" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            </md-card>

            <div v-if="!loading && !uploading" class="md-layout md-gutter md-alignment-center-center" style="padding-left:0; text-align:center; margin-top:1.5em;">
            <md-list style="background: transparent;">
                <md-list-item  v-if="objSelect.reclamado" >
                  <md-button v-on:click="goToClaimers" :style="buttonStyle">Ver datos de reclamantes</md-button>
                </md-list-item>
                <md-list-item>
                  <md-button v-on:click="activeDeleteDialog = true" :style="buttonStyle">Borrar Objeto</md-button>
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
      md-content= "El objeto se borrará permanentemente de la base de datos"
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-cancel="deleteObj(2)"
      @md-confirm="deleteObj(1)" />

    <!--snackBar errores-->
    <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="showSnackbar" md-persistent>
      <span>Error borrando objeto</span>
      <md-button class="md-primary" @click="showSnackbar = false">OK</md-button>
    </md-snackbar>
        
       

</div>

                      ` });
