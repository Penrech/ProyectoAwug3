const allLostObjectsTemplate = {props: [],
                          data: () => ({
        objectsArray : [],
        showNavigation:false,
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
            marginTop: "20px",
            marginRight: "auto",
            marginBottom: "10px"
        }
                              

    }),
        created: function () {
            window.scrollTo(0,0);
            this.getList();
            document.body.style = this.bodyStyle;
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "allLostObjects";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Lista de objetos perdidos";
        },
        methods: {
            getList: function(){
            this.$http.get('https://raw.githubusercontent.com/Penrech/ProyectoAwug3/master/FakeData/PruebasBuscarPorTags.json').then(function (response){
                this.objectsArray = response.data.searchedObjects;
                this.loading = false;
                //console.log(response.data.userLostList);
            }); },
              completeProfile () {
                
              },
              goBackHome () {
                  this.$router.push('homeUser');
              }
           
        },
        template:`

<div >

      
<!--inicio subnav-->
  <md-toolbar md-elevation="0" class="md-transparent" >
        <div class="md-toolbar-row" style="justify-content: center;">
        <span class="md-title" style="font-weight: 600;font-size: 14px; margin-left: 0;color: white;  white-space: normal; text-align:center">Haz click para ver o editar los detalles de los objetos</span>
      </div>
    </md-toolbar>
<!-- fin subnav-->
        
        
        <!--Inicio de botones-->
        
    <ul class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div v-if="loading" style="margin-top:25%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <li style="list-style:none;padding: 0 12px 24px 12px;"  v-for="item in objectsArray" :key="item.id">
           <md-card  style="border-radius: 10px;width: 150px;">
      <md-card-media-cover style="    overflow: hidden;" >
        <md-card-media md-ratio="1:1">
          <img  :src="item.img" alt="">
        </md-card-media>

        <md-card-area  style="top:0;bottom:unset;">
            <md-card-header style="padding-top: 10px;">
            
        
             <md-avatar class="md-avatar-icon" style="margin-right: 0;font-size: 14px; width: 30px; min-width: 20px;height: 30px;background-color: gold;
            font-weight: 500;float:right;margin-bottom:-10px;"><md-icon>done</md-icon></md-avatar>

            
          </md-card-header>

        </md-card-area>
      </md-card-media-cover>
    </md-card>
        </li>
        
    
        
    </ul>
        <!--Fin de botones-->
        
        
        

</div>

                      ` };
