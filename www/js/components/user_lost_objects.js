const userLostObjects = {props: [], 
                          data: () => ({
        objectsArray : [
            {id: "1", img: "img/bolso.png",state:"1"},
            {id: "2", img: "img/bolso.png",state:"1"},
            {id: "3", img: "img/bolso.png",state:"2"}
                       ],
       /* activeNavigation: false,*/
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)"
    }),
        methods: {
              completeProfile () {
                
              },
              goToLostObjetcts () {
                
              }
            /*goToFindObject () {
                router.push('userLostObjects');
              }*/
        },
        template:`

<div >

      <md-toolbar md-elevation="0" class="md-large md-transparent" ><!--inicio toolbar-->
      <div class="md-toolbar-row " style="text-align: center">
  

          <md-button class="md-icon-button" v-on:click=" activeNavigation = true">
            <md-icon style="color:white">keyboard_backspace</md-icon>
          </md-button>
        
          
        <h3 class="md-title " style="flex: 1 ; margin-left: 0;color: white ">Mis objetos perdidos</h3>


          <md-button class="md-icon-button" v-on:click=" activeNavigation = true" >
            <md-icon style="color:white">menu</md-icon>
          </md-button>

      </div>
 
        <div class="md-toolbar-row" style="justify-content: center;">
        <h5 class="md-title" style="font-weight: 600;font-size: 14px; margin-left: 0;color: white">Haz click para ver o editar los detalles de los objetos</h5>
      </div>
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio de botones-->
        
    <div class="md-layout md-gutter" style="margin-left: 6.25%; ">
        <div class="md-layout-item">
           <md-card  style="border-radius: 10px;width: 150px;margin-bottom: 12px">
      <md-card-media-cover >
        <md-card-media md-ratio="1:1">
          <img src="img/bolso.png" alt="bolso">
        </md-card-media>

        <md-card-area style="margin-bottom: 70%;">

          <md-card-actions>

            <md-button class="md-icon-button" style="background-color: #ffae34; width: 30px;
    min-width: 30px;
    height: 30px;" disabled>
              <md-icon style="font-size: 14px!important">done</md-icon>
            </md-button>
              
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
        </div>
        
        <div class="md-layout-item">
             <md-card  style="border-radius: 10px;width: 150px;margin-bottom: 12px">
      <md-card-media-cover >
        <md-card-media md-ratio="1:1">
          <img src="img/bolso.png" alt="bolso">
        </md-card-media>

        <md-card-area style="   margin-bottom: 70%;">

          <md-card-actions>

            <md-button class="md-icon-button" style="background-color: #ffae34;max-width: 20px;width: 30px;
    min-width: 30px;
    height: 30px;" disabled>
              <md-icon style="font-size: 14px!important">done</md-icon>
            </md-button>
              
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
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
