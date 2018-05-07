Vue.component('ULO-step2', {
        props: ["objSelect"],
        data: () => ({
        uploading: false,
        tagsString: null,
        loading:true,
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
        labelStyle:{
             fontSize:"16px",
            fontWeight:"500",
            marginBottom:"12px"
        },
        inputStyle:{
            fontSize:"16px",
            fontWeight:"200",
            marginTop:"12px"
        }

                              

    }),
        created: function(){
         window.scrollTo(0,0);
        toolBarData.iconoPaginaAnterior = "keyboard_backspace";
        toolBarData.iconoPaginaSiguiente = "";
        toolBarData.paginaActual = "ULO_step2";
        toolBarData.paginaSiguiente = "";
        toolBarData.paginaAnterior = "ULO_step1";
        toolBarData.toolBarTitle = "Detalles del objeto";
        this.$root.$on("backToULOStep1",this.changeData);
         console.log(this.objSelect);
         //this.toStringTags();
    },
    destroyed: function(){
         this.$root.$off("backToULOStep1",this.changeData);
    },
        methods: {
             /*toStringTags(){
                 console.log(this.objSelect);
                    this.tagsString = this.objSelect.tags.toString();
                },*/
           
                changeData(){
                     var emitObj = {
                       nextStep: 1
                   }
                this.$emit('backToStep1',emitObj);
                },
            
                deleteObj(state){
                    var emitObj;
                    if(state == 1){
                     this.$emit("borrarObjeto");
                    }
                    else if(state == 2){
                        
                    }
                    
                },
           
        },
        template:`


<div>

        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 5.25%;margin-right: 5.25% ">
        <div  style="width: 100%">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
                <md-card-header>
                 <md-card-header-text >
                    <md-list id="details_obj_list" style="font-size:14px;">
                       <md-list-item v-if="!objSelect.reclamado" style="justify-content:center;">
                      <img :src="objSelect.img" alt="" style="width:100%;border-radius:7px">
                        </md-list-item>
                        <md-list-item style="margin-top:1.5em">
                            <md-field>
                                <label :style="labelStyle">Tags :</label>
                                 <md-textarea v-model="objSelect.tags" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="!objSelect.reclamado">
                            <md-field>
                                <label :style="labelStyle">Localización:</label>
                                <md-textarea v-model="objSelect.location" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="!objSelect.reclamado">
                            <md-field>
                                <label :style="labelStyle">Número de ayuda:</label>
                                <md-textarea v-model="objSelect.phone" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label v-if="!objSelect.reclamado" :style="labelStyle">Fecha de registro:</label>
                                <label v-else :style="labelStyle">Fecha de busqueda:</label>
                                <md-textarea v-model="objSelect.registro" md-autogrow :style="inputStyle" disabled></md-textarea>
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

            <div class="md-layout md-gutter md-alignment-center-center" style="padding-left:0; text-align:center; margin-top:1.5em;">
            <md-list style="background: transparent;margin-bottom:1.5em">
                <md-list-item  v-if="objSelect.updates > 0" >
                  <md-button :style="buttonStyle">Volver a buscar</md-button>
                </md-list-item>
                <md-list-item>
                  <md-button v-on:click="activeDeleteDialog = true" :style="buttonStyle">Borrar de mi lista</md-button>
                </md-list-item>
                </md-list>
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
        
       

</div>

                      ` });
