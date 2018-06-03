Vue.component('search-objects', {
        props: ["searched","prevTags"],
        data: () => ({
        objectsArray : [],
        qLen: 0,
        objIDTemp:[],
        objectSelect: {
            id: null,
            index:null
        },
        uploading: false,
        registerDate: null,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",
        loading:true,                      
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
            marginTop: "30px",
            marginRight: "auto",
            marginBottom: "10px"
        },
        cardStyle1:" border-radius: 10px; width: 150px;"
        ,
        cardStyle2:" border-radius: 10px; width: 150px; border: 6px orange solid"
        
                              

    }),
        created: function(){
         window.scrollTo(0,0);
        toolBarData.paginaActual = "SO_step2";
        toolBarData.paginaAnterior = "SO_step1";
        toolBarData.paginaSiguiente = "";
        toolBarData.toolBarTitle = "Encontrar un objeto";
        toolBarData.iconoPaginaAnterior = "clear";
         document.body.style= this.bodyStyle;
         let _this = this;
         var sTags = new searchObjectsByTags(this.prevTags,userIdTest);
         sTags.then(function(result){
             _this.objectsArray = result;
             _this.loading = false;
         })
         this.$root.$on("detailsFoundObject",this.DetallesDeObjeto);
         this.$root.$on("backToSoStep1",this.changeData);
            
    },
    destroyed: function(){
         this.$root.$off("detailsFoundObject",this.DetallesDeObjeto);
         this.$root.$off("backToSoStep1",this.changeData);

    },
        methods: {

            selectObject(clave,indice){
                clave = "found-object-"+clave;
                if (this.objectSelect.id != null){
                    if (this.objectSelect != clave){
                        document.getElementById(this.objectSelect.id).style= this.cardStyle1;
                        document.getElementById(clave).style = this.cardStyle2;
                        this.objectSelect.id = clave;
                        this.objectSelect.index = indice;
                    }           
                }
                else{
                    document.getElementById(clave).style = this.cardStyle2;
                    this.objectSelect.id = clave;
                    this.objectSelect.index = indice;
                    toolBarData.paginaSiguiente = "SO_step3";
                }
            
            },
            
                changeData(){
                     var emitObj = {
                       nextStep: 1
                   }
                this.$emit('backToStep1',emitObj);
                },
               DetallesDeObjeto(){
                   var emitObj;
                   if (this.objectSelect.id == "found-object-none"){
                       emitObj = {
                           nextStep:3,
                       }
                   }
                   else{
                       emitObj = {
                           nextStep:3,
                           objArray : this.objectsArray[this.objectSelect.index]
                       }
                   }
                   this.$emit('reciveDataStep2',emitObj);

               }
           
        },
        template:`

<div >        


        <!--inicio subnav2-->
          <md-toolbar v-if="objectsArray == null && searched != null" md-elevation="0" class="md-transparent" >
                <div class="md-toolbar-row" style="justify-content: center;">
                <span class="md-title" style="font-weight: 300;font-size: 16px; margin-left: 0;color: white;  white-space: normal; text-align:center">Tu objeto no parece estar en nuestra base de datos, intentalo de nuevo más tarde</span>
              </div>
            </md-toolbar>
        <!-- fin subnav2-->

        <!--Inicio de botones-->
        
    <ul class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div v-if="loading" style="margin-top:25%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

            <li v-if="!loading && searched == null" style="list-style:none;padding: 0 12px 24px 12px;">
            <md-card  id="found-object-none" @click.native="selectObject('none',null)" style="border-radius: 10px;width: 150px;">
            <md-card-media-cover style="    overflow: hidden;" >

            <md-card-media md-ratio="1:1">
              <img src="" alt="">
            </md-card-media>

            <md-card-area style="top:0;bottom:unset;">
                <md-card-header>

                <img class="md-icon" :style="heartStyle2" src="icon/heartBreak.svg"></img>

                <span class="md-title" style="font-size:14px;font-weight:600;line-height: 1.4; text-align:center; color:#00c9fa;margin-bottom:10px">Mi objeto no está</span>
              </md-card-header>

            </md-card-area>
          </md-card-media-cover>
        </md-card>
            </li>

            <li v-if="!loading" style="list-style:none;padding: 0 12px 24px 12px;"  v-for="(item,index) in objectsArray" :key="item.id" >
        <md-card :id="'found-object-'+item.id" @click.native="selectObject(item.id,index)" :style="cardStyle1">
          <md-card-media-cover  style="overflow: hidden;background-color:rgba(0, 0, 0, 0.5);" >
            <md-card-media md-ratio="1:1">
              <img :src="item.imgSmall" alt="">
            </md-card-media>
            <md-card-area v-if="item.objInUserList" style="background-color:rgba(0, 0, 0, 0.5);">
                <md-card-header>

                <span class="md-title" style="font-size:14px;font-weight:600;line-height: 1.4; text-align:center; color:white;margin-bottom:10px">Objeto ya en tu lista</span>
              </md-card-header>

            </md-card-area>
          </md-card-media-cover>
        </md-card>
            </li>
 
    
        
    </ul>
        <!--Fin de botones-->
        
        
        

</div>

                      ` });
