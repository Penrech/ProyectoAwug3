const userLostObjectsTemplate = {props: [],
                          data: () => ({
        objectsArray : []/* [
            {id: "1", img: "img/bolso.png",state:"1",updates: 0, tags:["#bolso","#negro"]},
            {id: "2", img: "img/bolso.png",state:"1",updates: 0,tags:["#bolso","#negro"]},
            {id: "3", img: "null",state:"2",updates: 0,tags:["#cartera","#roja","#billabong"]},
            {id: "4", img: "null",state:"2",updates:3,tags:["#movil","#gris","#htc","#pantalla","#rota"]}
                       ]*/,
       /* activeNavigation: false,*/
        showNavigation:false,
        loading:true,                      
        heartStyle1:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginTop: "0px"
        },
         heartStyle2:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginTop: "30px"
        }
                              

    }),
        created: function () {
            this.getList();
        },
        methods: {
            getList: function(){
            this.$http.get('https://raw.githubusercontent.com/Penrech/ProyectoAwug3/master/FakeData/UserLostList.json').then(function (response){
                this.objectsArray = response.data.userLostList;
                this.loading = false;
                //console.log(response.data.userLostList);
            }); },
              completeProfile () {
                
              },
              goToLostObjetcts () {
                
              }
           
        },
        template:`

<div >

      <md-toolbar md-elevation="0" class="md-large md-transparent" ><!--inicio toolbar-->
      <div class="md-toolbar-row " style="text-align: center">
  

          <md-button class="md-icon-button" @click="goToHome()">
            <md-icon style="color:white">keyboard_backspace</md-icon>
          </md-button>
        
          
        <h3 class="md-title " style="flex: 1 ; margin-left: 0;color: white;">Mis objetos perdidos</h3>


          <md-button class="md-icon-button" v-on:click="showNavigation = true" >
            <md-icon style="color:white">menu</md-icon>
          </md-button>

      </div>
 
        <div class="md-toolbar-row" style="justify-content: center;">
        <span class="md-title" style="font-weight: 600;font-size: 14px; margin-left: 0;color: white;  white-space: normal; text-align:center">Haz click para ver o editar los detalles de los objetos</span>
      </div>
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio de botones-->
        
    <ul class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div v-if="loading" style="margin-top:25%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <li style="list-style:none;padding: 0 12px 24px 12px;"  v-for="item in objectsArray" :key="item.id">
           <md-card  style="border-radius: 10px;width: 150px;">
      <md-card-media-cover style="    overflow: hidden;" >
        <md-card-media md-ratio="1:1">
          <img v-if="item.state != 2" :src="item.img" alt="">
        </md-card-media>

        <md-card-area v-if="item.state == 2" style="top:0;bottom:unset;">
            <md-card-header style="padding-top: 10px;">
            
        
             <md-avatar v-if="item.updates > 0" class="md-avatar-icon" style="margin-right: 0;font-size: 14px; width: 30px; min-width: 20px;height: 30px;background-color: limegreen;
    font-weight: 500;">{{item.updates}}</md-avatar>

            <md-icon v-if="item.updates > 0" :style="heartStyle1">favorite</md-icon>
            <md-icon v-else :style="heartStyle2">favorite</md-icon>
         
            <span class="md-title" style="font-size:14px;font-weight:600;line-height: 1.4; text-align:center; color:#00c9fa;margin-bottom:10px">Objecto no encontrado</span>
            <span class="md-subhead" style="font-size:12px;font-weight:200; line-height: 1.2; text-align:center;color:#d9d9d9" ><span v-for="tag in item.tags">{{tag}} </span></span>
          </md-card-header>

        </md-card-area>
      </md-card-media-cover>
    </md-card>
        </li>
        
    
        
    </ul>
        <!--Fin de botones-->
        
        
        

</div>

                      ` };
