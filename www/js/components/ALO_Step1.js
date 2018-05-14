Vue.component('ALO-step1', {props: [],
                          data: () => ({
        objectsArray: [],
        loading:true,
        noData:false,
        ordenSeleccion: 'registro',
        visualizar: 'todos'
                              

    }),
        created: function () {
            window.scrollTo(0,0);
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "ALO_step1";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Lista de objetos perdidos";
            this.orderData();
            
        
        },
        methods: {
                orderData(){
                let _this = this;
                var oQuery= new orderAllObjects(this.ordenSeleccion,this.visualizar);
                oQuery.then(function(result){
                    if (result != null){
                        _this.objectsArray = result;
                        _this.noData = false;}
                    else{
                        _this.objectsArray= [];
                        _this.noData = true;
                    }
                    _this.loading = false;
                })
            },

                selectObject(clave,indice){
                console.log("Entro aqui");
                var emitObj;
                /*this.objectSelect.id = clave;
                this.objectSelect.index = indice;*/
                emitObj = {
                        indice: indice,
                        objArray : this.objectsArray[indice],
                        nextStep : 2
                    }
                    
                
                this.$emit("receiveDataStep1",emitObj);

            }

        },
        watch:{
            ordenSeleccion: function(val){
                    this.orderData();
            },
            visualizar: function(val){
                 this.orderData();
            }
        },
        template:`

<div >

      
<!--inicio subnav-->
  <md-toolbar md-elevation="0" class="md-transparent" >
        <div class="md-toolbar-row" style="justify-content: center;">
        <md-field id="selectALO_Mostrar" style="width:45%;margin-right:7px;">
          <label style="font-weight: 600;font-size: 14px;color: white;">Visualizar:</label>
          <md-select v-model="visualizar" name="orden" id="mostrarSelect" style="font-weight: 300;color:white;margin-top:15px">
            <md-option value="todos">Todos</md-option>
            <md-option value="semana">Última semana</md-option>
            <md-option value="mes">Último mes</md-option>
            <md-option value="year">Último año</md-option>
          </md-select>
        </md-field>
        <md-field id="selectALO_ordenar" style="width:45%;margin-left:7px">
          <label style="font-weight: 600;font-size: 14px;color: white">Orden de:</label>
          <md-select v-model="ordenSeleccion" name="orden" id="ordenSelect" style="font-weight: 300;color:white;margin-top:15px">
            <md-option value="registro" style="color:white">Fecha de registro</md-option>
            <md-option value="reclamado">Objetos reclamados</md-option>
          </md-select>
        </md-field>
        </div>
        <div class="md-toolbar-row" style="justify-content: center;">
        <span class="md-title" style="font-weight: 600;font-size: 14px; margin-left: 0;color: white;  white-space: normal; text-align:center">Haz click para ver o editar los detalles de los objetos</span>
      </div>
    </md-toolbar>
<!-- fin subnav-->

<!--inicio subnav2-->
  <md-toolbar v-if="noData" md-elevation="0" class="md-transparent" >
        <div class="md-toolbar-row" style="justify-content: center;">
        <span class="md-title" style="font-weight: 300;font-size: 16px; margin-left: 0;color: white;  white-space: normal; text-align:center">No hay objetos en el periodo seleccionado</span>
      </div>
    </md-toolbar>
<!-- fin subnav2-->
        
        
        <!--Inicio de objetos-->
        
    <ul class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-top:2%">

        <div v-if="loading" style="margin-top:25%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <li v-else style="list-style:none;padding: 0 12px 24px 12px;"  v-for="(item,index) in objectsArray" :key="item.id">
           <md-card  :id="item.id" @click.native="selectObject(item.id,index)" style="border-radius: 10px;width: 150px;">
      <md-card-media-cover style="    overflow: hidden;" >
        <md-card-media md-ratio="1:1">
          <img  :src="item.img" alt="">
        </md-card-media>

        <md-card-area v-if="item.reclamado" style="top:0;bottom:unset;">
            <md-card-header style="padding-top: 10px;">
            
        
             <md-avatar class="md-avatar-icon" style="margin-right: 0;font-size: 14px; width: 30px; min-width: 20px;height: 30px;background-color: gold;
            font-weight: 500;float:right;margin-bottom:-10px;"><md-icon>done</md-icon></md-avatar>

            
          </md-card-header>

        </md-card-area>
      </md-card-media-cover>
    </md-card>
        </li>
        
    
        
    </ul>
        <!--Fin de objetos-->
        
        
        

</div>

                      ` });
