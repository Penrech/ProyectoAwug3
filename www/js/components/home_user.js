const HomeUserTemplate = {props: [], 
                          data: () => ({
        username: "Nombre del usuario",
        activeNavigation: false
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

          <md-button class="md-icon-button" v-on:click=" activeNavigation = true">
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
        
    <div  style="margin-top: 1em;margin-left: 6.25%; ">
     <div class="md-layout md-gutter md-alignment-center-center" style="display: inline-flex;">
        <div class="md-layout-item">
            <md-button  class="md-raised" style="width: 160px;height: 400px; background: linear-gradient(to bottom right, #ededed, #fbfbfb);">
                <md-icon class="md-size-4x" style="margin-bottom: 10px;">menu</md-icon>
                <br>
                <md-title style="font-size: 12px;font-weight: 700;">Mis objetos<br>perdidos</md-title></md-button>
          </div>
        <div class="md-layout-item">
           <md-button class="md-raised "  style="width: 160px; height: 400px ;background: linear-gradient(to bottom right, #ededed, #fbfbfb);">
            <md-icon class="md-size-4x" style="margin-bottom: 10px;">menu</md-icon>
                <br>
                <md-title style="font-size: 12px;font-weight: 700;">Encontrar objeto<br>perdido</md-title></md-button>
            </md-button>
          </div>
      </div>
        
    </div>
        <!--Fin de botones-->
        
        
        
        <md-drawer class="md-right" :md-active.sync= activeNavigation ref="sidebar"> <!-- inicio panel lateral-->
              <md-toolbar class="md-transparent" md-elevation="0">
                <div class="md-toolbar-section-end">
                  <md-button class="md-icon-button" v-on:click=" activeNavigation = false">
                    <md-icon style="color: #0aabf4">menu</md-icon>
                  </md-button>
                </div>
              </md-toolbar>

            <md-divider></md-divider>
              <md-list >
                <md-list-item @click="goToInbox()" style="padding: 15px 0 15px 0;">
                  <md-icon style="color: #0aabf4">home</md-icon>
                  <span class="md-list-item-text"  style="color: #0aabf4;font-weight: 600;font-size: 16px">Home</span>
                </md-list-item>
                  
                  <md-divider></md-divider>
                  
                <md-list-item @click="goToSettings()" style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">note_add</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Nuevo objeto perdido</span>
                </md-list-item>
                  
                  <md-divider></md-divider>

                <md-list-item @click="goToSimpleList()" style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">view_list</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Lista de objetos</span>
                </md-list-item>
                  
                  <md-divider></md-divider>

                <md-list-item style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">account_circle</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Mi perfil</span>
                </md-list-item>
             <md-divider></md-divider>
            
            <md-list-item style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">info</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Ayuda</span>
                </md-list-item>
             <md-divider></md-divider>
            
            <md-list-item style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">exit_to_app</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Salir de la sesión</span>
                </md-list-item>
              </md-list>
             <md-divider></md-divider>
        </md-drawer> <!-- fin panel lateral-->

</div>


                      ` };
