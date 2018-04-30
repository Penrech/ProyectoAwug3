Vue.component('generate-tags-search', {
    props: ["prevTags"], 
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
        toolBarData.paginaActual = "SO_step1";
        toolBarData.paginaAnterior = "homeUser";
        toolBarData.paginaSiguiente = "SO_step2";
        if (this.prevTags.length > 0){
            this.tagsArray = this.prevTags;
        }
        this.$root.$on("searchTags",this.passToNextStep);
    },
    destroyed: function(){
         this.$root.$off("searchTags",this.passToNextStep);
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
               passToNextStep(){
                if(this.tagsArray.length > 2){
                   var emitObj = {
                       tags : this.tagsArray,
                       nextStep: 2
                   }
                this.$emit('reciveDataStep1',emitObj);
                }
                else{
                    this.activeTagsAlert = true;
                }
               },
                
            
 },
    
    template:`


        
        
        <!--Inicio de body-->
<div>



         <div class="md-layout md-alignment-top-center" style="padding-left:0;text-align:center;margin-top:3%;margin-bottom:5%">
            <div>
            <div  class="md-layout-item md-layout md-gutter" style="margin-left:7%;margin-right:7%;">
                <div class="md-layout-item" v-for="(value, index) in tagsArray" >
                 <md-button :style="buttonStyle" v-on:click="deleteTag(index,value,0)">{{value}}</md-button>
                </div>
                <div class="md-layout-item">
                 <md-button :style="buttonStyle4" v-on:click="activeInsertTagDialog = true">+</md-button>
                  </div>
                <div v-if="!marcaAdded"class="md-layout-item">
                 <md-button :style="buttonStyle4" v-on:click="activeInsertTagDialog = true">Añade la marca</md-button>
                  </div>
            </div>
             <div  class="md-layout-item md-size-100" style="margin-top:3%;">
                 <md-button v-on:click="passToNextStep" :style="buttonStyle2">Buscar</md-button>
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