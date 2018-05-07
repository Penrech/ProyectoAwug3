Vue.component('ULO-step1', {props: ["objectsArray","subNavText"],
                          data: () => ({
        objectsArrayTemp: [],
        loading:true,
        objectSelect: {
            id: null,
            index:null
        },
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
            marginTop: "20px",
            marginRight: "auto",
            marginBottom: "10px"
        }
                              

    }),
        created: function () {
            window.scrollTo(0,0);
            this.getList();
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "ULO_step1";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Mis objetos perdidos";
            
        },
        methods: {
            getList: function(){
            console.log(this.objectsArray);
            if (this.objectsArray.length < 1){
                console.log(this.objectsArray.length);
                this.$http.get('https://raw.githubusercontent.com/Penrech/ProyectoAwug3/master/FakeData/UserLostList.json').then(function (response){
                    this.objectsArrayTemp = response.data.userLostList;
                    this.loading = false;
                    var emitObj = {
                        objArray : this.objectsArrayTemp
                    };
                    this.$emit("PassArray",emitObj);
                    
                    //console.log(response.data.userLostList);
                }); 
            }
            else{
                this.objectsArrayTemp = this.objectsArray;
                this.loading = false;
            }
            
            },
              selectObject(clave,indice){
                console.log("Entro aqui");
                clave = "user-object-"+clave;
                var emitObj;
                this.objectSelect.id = clave;
                this.objectSelect.index = indice;
                emitObj = {
                        indice: indice,
                        objArray : this.objectsArrayTemp[indice],
                        nextStep : 2
                    }
                    
                
                this.$emit("recieveDataStep1",emitObj);

            },
            toStringTags(data){
               return data.join(", ");
                },


        },
        template:`

<div>

      
<!--inicio subnav-->
  <md-toolbar v-if="subNavText != '' " md-elevation="0" class="md-transparent" >
        <div class="md-toolbar-row" style="justify-content: center;">
        <span class="md-title" style="font-weight: 600;font-size: 14px; margin-left: 0;color: white;  white-space: normal; text-align:center">{{subNavText}}</span>
      </div>
    </md-toolbar>
<!-- fin subnav-->
        
        
        <!--Inicio de botones-->
        
    <ul class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div v-if="loading" style="margin-top:25%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <li style="list-style:none;padding: 0 12px 24px 12px;"  v-for="(item,index) in objectsArrayTemp" :key="item.id">
    <md-card :id="'user-object-'+item.id" @click.native="selectObject(item.id,index)" style="border-radius: 10px;width: 150px;">
      <md-card-media-cover style="    overflow: hidden;" >
        <md-card-media md-ratio="1:1">
          <img v-if="!item.reclamado" :src="item.img" alt="">
        </md-card-media>

        <md-card-area v-if="item.reclamado == true" style="top:0;bottom:unset;">
            <md-card-header style="padding-top: 10px;">
            
        
             <md-avatar v-if="item.updates > 0" class="md-avatar-icon" style="margin-right: 0;font-size: 14px; width: 30px; min-width: 20px;height: 30px;background-color: limegreen;
    font-weight: 500;float:right;margin-bottom:-10px;">{{item.updates}}</md-avatar>

            <img class="md-icon" v-if="item.updates > 0" :style="heartStyle1" src="icon/heartBreak.svg"></img>
            <img class="md-icon" v-else :style="heartStyle2" src="icon/heartBreak.svg"></img>
         
            <span class="md-title" style="font-size:14px;font-weight:600;line-height: 1.4; text-align:center; color:#00c9fa;margin-bottom:10px">Objeto no encontrado</span>
            <span class="md-subhead" style="font-size:12px;font-weight:200; line-height: 1.2; text-align:center;color:#d9d9d9" >{{toStringTags(item.tags)}}</span>
          </md-card-header>

        </md-card-area>
      </md-card-media-cover>
    </md-card>
        </li>
        
    
        
    </ul>
        <!--Fin de botones-->
        
        
        
</div>

                      ` });
