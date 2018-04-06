const HomeUserTemplate = {props: [], 
                          data: () => ({
        username: "Nombre del usuario",
        activeNavigation: false,
        showNavigation:false
    }),
        methods: {
              completeProfile () {
                
              }/*,
              goToUserLostObjects () {
                  vm.
                  router.push('userLostObjects');
              },
            goToFindObject () {
                
              }*/
        },
        template:`

<div>

      <md-toolbar md-elevation="0" class="md-large md-primary" style=" background: linear-gradient(to right, #03a9f4, #81d4fa);"><!--inicio toolbar-->
      <div class="md-toolbar-row">

        <div class="md-toolbar-section-end">

          <md-button class="md-icon-button" @click="showNavigation = true">
            <md-icon>menu</md-icon>
          </md-button>
        </div>
      </div>
    <div class="md-toolbar-row" >
        <md-avatar class="md-avatar-icon md-large md-elevation-4" style="
            min-width: 80px;
            min-height: 80px;
            border-radius: 80px;
            font-size: 40px;
            color: aqua">
        <md-icon stlye="color:blue;">account_circle</md-icon>
      </md-avatar>
        </div>
      <div class="md-toolbar-row" style="justify-content: center;min-height: 1em;padding-top: 0.75em;padding-bottom: 0.25em;">
        <h5 class="md-title" style="font-weight: 200;font-size: 16px; margin-left: 0; "> {{username}}</h5>
      </div>
    
        <div class="md-toolbar-row" style="justify-content: center; min-height: 1em;padding-bottom: 3.5em;">
        <h5 class="md-title" style="font-weight: 400;font-size: 14px; margin-left: 0;">Completa tu perfil</h5>
      </div>
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio de botones-->
        
    <div  style="margin-top: 1em;margin-left: 6.25%;margin-right: 10.25% ">
     <div class="md-layout md-gutter md-alignment-top-center">
        <div  style="width: 100%">
            <md-button  class="md-raised" style="width: inherit;height: 200px; background: linear-gradient(to bottom right, #ededed, #fbfbfb);">
                <md-icon class="md-size-4x" style="margin-bottom: 10px;" md-src="icon/MyObjects.svg" />
                <br>
                <md-title style="font-size: 12px;font-weight: 700;">Mis objetos<br>perdidos</md-title></md-button>
          </div>
         
        <div  style="width: 100%">
           <md-button class="md-raised "  style="width: inherit; height: 200px ;background: linear-gradient(to bottom right, #ededed, #fbfbfb);">
            <md-icon class="md-size-4x" style="margin-bottom: 10px;" md-src="icon/FindObjects.svg" />
                <br>
                <md-title style="font-size: 12px;font-weight: 700;">Encontrar objeto<br>perdido</md-title></md-button>
            
          </div>
        
      </div>
        
    </div>
        <!--Fin de botones-->
        
        
        
       

</div>


                      ` };
