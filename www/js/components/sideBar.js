Vue.component('side-bar', {
     data: () => (sideBarData),
    created: function(){
        
    },
    methods:{
            goToHome: function(){
                this.showNavigation = false;
                   this.$router.push('homeUser');
                },
             goToUserLostObjects: function(){
                    this.showNavigation = false;
                    this.$router.push('userLostObjects');
                },
            goToNewLostObject: function(){
                    this.showNavigation = false;
                    this.$router.push('uploadObject');
                },
            goToFindObject: function(){},
            goToAllLostObjects(){},
            goToUserProfile: function(){
                    this.showNavigation = false;
                    this.$router.push('userProfile');
                }
    },
    
    template: `
         <!--Inicio lateral. EVA: Esto de aqui es el menu lateral, actualmente no funciona porque me peta el router y se le ha de preguntar al profe, bueno, no funciona el boton. Si quieres probarlo
has de hacer swipe hacia la izquierda y alli esta, los botones que van ahora son home y mis objetos perdidos. Todo esto solo funciona si la clase main anterior esta descomentada-->
         <md-drawer class="md-right" :md-active.sync=showNavigation ref="sidebar"> <!-- inicio panel lateral-->
              <md-toolbar class="md-transparent" md-elevation="0">
                <div class="md-toolbar-section-end">
                  <md-button class="md-icon-button" @click="showNavigation = false">
                    <md-icon style="color: #0aabf4">menu</md-icon>
                  </md-button>
                </div>
              </md-toolbar>

            <md-divider></md-divider>
              <md-list >
                <md-list-item @click="goToHome()" style="padding: 15px 0 15px 0;">
                  <md-icon style="color: #0aabf4">home</md-icon>
                  <span class="md-list-item-text"  style="color: #0aabf4;font-weight: 600;font-size: 16px">Home</span>
                </md-list-item>
                  
                  <md-divider></md-divider>
                  
                <md-list-item v-if="userType == 2" @click="goToNewLostObject()" style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">note_add</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Nuevo objeto perdido</span>
                </md-list-item>
                
                <md-list-item v-else-if="userType == 1" @click="goToFindObject()" style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">note_add</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Encontrar objeto perdido</span>
                </md-list-item>
                  
                  <md-divider></md-divider>

                <md-list-item v-if="userType == 1" @click="goToUserLostObjects()" style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">view_list</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Mis objetos</span>
                </md-list-item>

                <md-list-item  v-else-if="userType == 2" @click="goToAllLostObjects()" style="padding: 15px 0 15px 0">
                  <md-icon style="color: #0aabf4">view_list</md-icon>
                  <span class="md-list-item-text" style="color: #0aabf4;font-weight: 600;font-size: 16px">Lista de objetos perdidos</span>
                </md-list-item>
                  
                  <md-divider></md-divider>

                <md-list-item @click="goToUserProfile()" style="padding: 15px 0 15px 0">
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
    `
});