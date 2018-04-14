const HomeUserTemplate = {props: [], 
                          data: () => ({
        username: "John Doe",
        activeNavigation: false,
        showNavigation:false,
        typeUser: 2,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)"
    }),
        created: function(){
            document.body.style = "";
        },
        methods: {
            toggleSideBar(){
                console.log(this.$refs.sidebar);
            },
              completeProfile () {
                
              },
                goToProfile(){
                    this.$router.push('userProfile');
                },
              goToUserLostObjects () {
                  this.$router.push('userLostObjects');
              },
            goToFindObject () {
                
              },
            goToNewObject(){
                this.$router.push('uploadobject');
            },
            goToObjectList(){
                
            }
        },
        template:`

<div>
    <side-bar></side-bar>
      <md-toolbar md-elevation="0" class="md-large md-primary" style=" background: linear-gradient(to right, #03a9f4, #81d4fa);"><!--inicio toolbar-->
      <div class="md-toolbar-row">

        <div class="md-toolbar-section-end">

          <md-button class="md-icon-button" v-on:click="this.$showNavigation = true">
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
        <h5 v-on:click="goToProfile()" class="md-title" style="font-weight: 400;font-size: 14px; margin-left: 0;">Tu perfil</h5>
      </div>
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio de botones-->
        
    <div  style="margin-top: 1em;margin-left: 6.25%;margin-right: 10.25% ">
     <div class="md-layout md-gutter md-alignment-top-center">
        <!---tipo user-->
        <div v-if="typeUser == 1" style="width: 100%">
            <md-button v-on:click="goToUserLostObjects()" class="md-raised" style="width: inherit;height: 200px; background: linear-gradient(to bottom right, #ededed, #fbfbfb);">
                <img class="md-icon md-size-4x" style="margin-bottom: 10px;" src="icon/MyObjects.svg" />
                <br>
                <md-title style="font-size: 12px;font-weight: 700; ">Mis objetos<br>perdidos</md-title></md-button>
          </div>

        <div v-else style="width: 100%">
            <md-button v-on:click="goToNewObject()" class="md-raised" style="width: inherit;height: 200px; background: linear-gradient(to bottom right, #ededed, #fbfbfb);">
                <img class="md-icon md-size-4x" style="margin-bottom: 10px;" src="icon/newObject.svg" />
                <br>
                <md-title style="font-size: 12px;font-weight: 700; ">Nuevo objeto<br>perdido</md-title></md-button>
          </div>
         
        <div v-if="typeUser == 1" style="width: 100%">
           <md-button class="md-raised "  style="width: inherit; height: 200px ;background: linear-gradient(to bottom right, #ededed, #fbfbfb);margin-bottom:3em">
            <img class="md-icon md-size-4x" style="margin-bottom: 10px;" src="icon/FindObjects.svg" />
                <br>
                <md-title style="font-size: 12px;font-weight: 700;">Encontrar objeto<br>perdido</md-title></md-button>
            
          </div>

        <div v-else style="width: 100%">
           <md-button class="md-raised "  style="width: inherit; height: 200px ;background: linear-gradient(to bottom right, #ededed, #fbfbfb);margin-bottom:3em">
            <img class="md-icon md-size-4x" style="margin-bottom: 10px;" src="icon/objectList.svg" />
                <br>
                <md-title style="font-size: 12px;font-weight: 700;">Lista de objetos<br>perdidos</md-title></md-button>
            
          </div>
        
      </div>
        
    </div>
        <!--Fin de botones-->
        
        
        
       

</div>


                      ` };
