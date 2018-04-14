const registrationTypeTemplate = {props: [], 
                          data: () => ({
        activeNavigation: false,
        showNavigation:false,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)"
    }),
        create: function(){
           document.body.style = this.bodyStyle; 
        },                     
        methods: {
            toggleSideBar(){
                console.log(this.$refs.sidebar);
            }
        },
        template:`

<div>
    
      <md-toolbar md-elevation="0" class="md-large md-primary" style=" background: linear-gradient(to right, #03a9f4, #81d4fa);"><!--inicio toolbar-->
      <div class="md-toolbar-row">

        <div class="md-toolbar-section-start">

          <md-button class="md-icon-button" v-on:click="showNavigation = true">
            <md-icon>arrow_back</md-icon>
          </md-button>
        </div>
      </div>
    <div class="md-toolbar-row" style="margin-bottom: 10px;">
        
        <img class="md-icon md-size-3x" src="icon/logoWhite.svg" stlye="color:blue;"/>
     
        </div>
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio de botones-->
        
    <div  style="margin-top: 1em;margin-left: 6.25%;margin-right: 10.25% ">
     <div class="md-layout md-gutter md-alignment-top-center">
        <div  style="width: 100%">
            <md-button class="md-raised" style="width: inherit;height: 200px; background: linear-gradient(to bottom right, #ededed, #fbfbfb); border-radius: 10px;">
                <img class="md-icon md-size-5x" style="margin-bottom: 10px;" src="icon/iconAdmin.svg" />
                <br>
                <md-title style="font-size: 12px;font-weight: 700;">Registrarse como<br>Administrador</md-title></md-button>
          </div>
         
        <div  style="width: 100%">
           <md-button class="md-raised "  style="width: inherit; height: 200px ;background: linear-gradient(to bottom right, #ededed, #fbfbfb); border-radius: 10px;">
            <img class="md-icon md-size-5x" style="margin-bottom: 10px;" src="icon/iconUser.svg" />
                <br>
                <md-title style="font-size: 12px;font-weight: 700;">Registrarse como<br>Usuario</md-title></md-button>
            
          </div>
        
      </div>
        
    </div>
        <!--Fin de botones-->
        
        
        
       

</div>


                      ` };
