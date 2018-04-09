const userProfileTemplate = {props: [], 
                          data: () => ({
        email: "Correo electrónico",
        password: "Constraseña",
        name: "Nombre y Apellidos",
        phone: "Teléfono",
        activeNavigation: false,
        showNavigation:false,
        editionMode:false
    }),
        methods: {
              completeProfile () {
                
              },/*,
              goToUserLostObjects () {
                  vm.
                  router.push('userLostObjects');
              },
            goToFindObject () {
                
              }*/
             goBackHome () {
                document.body.style = "";
                  this.$router.push('homeUser');
              }
        },
        template:`

<div>

        <md-toolbar md-elevation="0" class="md-large md-primary" style=" background: linear-gradient(to right, #03a9f4, #81d4fa);"><!--inicio toolbar-->
        <div class="md-toolbar-row " style="text-align: center">
  

          <md-button class="md-icon-button" v-on:click="goBackHome()">
            <md-icon style="color:white">keyboard_backspace</md-icon>
          </md-button>
        
          
        <h3 class="md-title " style="flex: 1 ; margin-left: 0;color: white;">Mi perfil</h3>


          <md-button class="md-icon-button" v-on:click="showNavigation = true" >
            <md-icon style="color:white">menu</md-icon>
          </md-button>

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
      
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 10.25%;margin-right: 10.25% ">
        <div  style="width: 100%">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
              <md-card-header>
                <md-card-header-text>
                    <md-list style="font-size:14px;">
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{email}}</span>
                            <md-icon>account_circle</md-icon>
                        </md-list-item>
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{password}}</span>
                            <md-icon>move_to_inbox</md-icon>
                        </md-list-item>
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{name}}</span>
                            <md-icon>move_to_inbox</md-icon>
                        </md-list-item>
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{phone}}</span>
                            <md-icon>move_to_inbox</md-icon>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            </md-card>
            <div style="text-align: center;">
              <md-button style="	
                    border-radius:28px;
                    border:1px solid white;
                    color:#ffffff;
                    font-size:16px;
                    font-weight:100;
                    text-transform: none;
                     min-width: 8em;
                    width: 14em;
                    height: 3.2em;
                        margin-top: 1.5em;
                    ">Editar perfil</md-button>
            </div>
          </div>        
    </div>
        <!--Fin datos-->
        
        
        
       

</div>


                      ` };
