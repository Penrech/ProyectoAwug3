const uploadObjectTemplate = {props: [],
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
            marginTop: "0px",
            marginRight: "auto"
        },
         heartStyle2:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginTop: "30px",
            marginRight: "auto"
        },
     buttonStyle:{ 
            borderRadius:"28px",
            border:"1px solid #00c9fa",
            color:"#00c9fa !important",
            fontSize:"14px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "40%",
            width: "60%",
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
            width: "14em",
            height: "3.2em",
            marginTop: "1.5em",
            marginBottom:"2.5em"
    },
    imgStyle:{
        position: "absolute",
        left: "50%",
        top: "50%",
        height: "100%",
        maxWidth: "unset",
        width: "auto",
        transform: "translate(-50%,-50%)"
        
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
              goBackHome () {
                document.body.style = "";
                  this.$router.push('homeUser');
              }
           
        },
        template:`

<div>

      <md-toolbar md-elevation="0" class="md-large md-transparent" ><!--inicio toolbar-->
     <div class="md-toolbar-row " style="text-align: center">
  

          <md-button class="md-icon-button" v-on:click="goBackHome ()">
            <md-icon style="color:white">clear</md-icon>
          </md-button>
        
          
        <h3 class="md-title " style="flex: 1 ; margin-left: 0;color: white;">Nuevo objeto perdido</h3>


          <md-button class="md-icon-button" >
            <md-icon style="color:white">done</md-icon>
          </md-button>

      </div>
          
         <div class="md-toolbar-row" style="justify-content: center;margin-left: 14%;margin-right: 14%">
        
         <div class="md-toolbar-section-start">
             <md-avatar class="md-avatar-icon" style="margin: 0; padding: 0;font-size: 14px; width: 45px; min-width: 45px;height: 45px;background:white;
            font-weight: 200; border: 1px solid white; color: #03a9f4">1</md-avatar>
             <hr style="  width: 100%;
                color: white;
                background: white;
                background-color: white;
                border-style: solid;
                border-color: white;">
        </div>
            
          <md-avatar class="md-avatar-icon" style="margin: 0; padding: 0; font-size: 14px; width: 35px; min-width: 35px;height: 35px;background:none;
          font-weight: 200; border: 1px solid white">2</md-avatar>
             
           <div class="md-toolbar-section-end">
               <hr style="  width: 100%;
                color: white;
                background: white;
                background-color: white;
                border-style: solid;
                border-color: white;">
             <md-avatar class="md-avatar-icon" style="margin: 0; padding: 0; font-size: 14px; width: 35px; min-width: 35px;height: 35px;background:none;
          font-weight: 200; border: 1px solid white">3</md-avatar>
        </div>
         
        
      </div>
          <div class="md-toolbar-row" style="justify-content:center">
          <span class="md-title" style="font-weight: 400;font-size: 12px; margin-left: 0;color: white;  white-space: normal; text-align:center">Sube una fotografía para crear tags automáticamente</span>
          </div>
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio de body-->

     <div class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-top:0">
<md-card class="md-elevation-0" style="border-radius: 10px;width: 80%;">
 <md-card-media-cover style="  overflow: hidden;" >
        <md-card-media md-ratio="1:1" style="overflow: hidden; position: relative">
          <img src="" alt="" style="position: absolute;
              left: 50%;
              top: 50%;
              height: 100%;
              max-width: unset;
              width: auto;
              -webkit-transform: translate(-50%,-50%);
                  -ms-transform: translate(-50%,-50%);
                      transform: translate(-50%,-50%);">
        </md-card-media>

        <md-card-area>
        <md-card-header style="padding-top: 10px;">
           <md-icon class="md-size-2x" :style="heartStyle1">camera_alt</img>
          </md-card-header>
 <div class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-bottom:15%;">
                 
                <md-button  :style="buttonStyle">Buscar en galería</md-button>
                <md-button  :style="buttonStyle">Hacer fotografía</md-button>
            </div>


        </md-card-area>
      </md-card-media-cover>
    </md-card>
        <div style="text-align: center;">
              <md-button class="md-raised" :style="buttonStyle2">Generar tags</md-button>
            </div>
    </div>
        <!--Fin de body-->

        
        
        
</div>
                      ` };
