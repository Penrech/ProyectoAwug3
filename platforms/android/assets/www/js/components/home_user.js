const HomeUserTemplate = {props: [], 
                          data: () => ({
        username: "",
        activeNavigation: false,
        showNavigation:false,
        UserType,
       bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa); background-repeat: no-repeat; background-size: 100% 250px; background-color: white;",
    }),
        created: function(){
            window.scrollTo(0,0);
            document.body.style = this.bodyStyle;
            toolBarData.iconoPaginaAnterior = "";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "homeUser";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior = "";
            toolBarData.toolBarTitle = "";
            this.username = user.nom + " " + user.apellido;
            /*let _this = this;
            firebase.database().ref("/usuarios/"+userIdTest+"/nomAp").on("value",function(result){
                _this.username = result.val();
            })*/

        },
        methods: {

                goToProfile(){
                    this.$router.push('userProfile');
                },
              goToUserLostObjects () {
                  this.$router.push('userLostObjects');
              },
            goToFindObject () {
                this.$router.push("searchobject");
              },
            goToNewObject(){
                this.$router.push('uploadobject');
            },
            goToObjectList(){
                this.$router.push('allLostObjects');
            }
        },
        template:`

<div>

        
        <!--Inicio de botones-->

    <!--subnavbar-->

<md-toolbar md-elevation="0" class="md-large md-primary md-transparent">
    <div class="md-toolbar-row" >
        <md-avatar @click.native="goToProfile()" class="md-avatar-icon md-large md-elevation-4" style="
            background-color: var(--md-theme-default-icon-disabled, rgba(255,255,255,1));
            min-width: 80px;
            min-height: 80px;
            border-radius: 80px;
            font-size: 40px;">
        <md-icon style="color: #0aabf4">account_circle</md-icon>
      </md-avatar>
        </div>
      <div class="md-toolbar-row" style="justify-content: center;min-height: 1em;padding-top: 0.75em;padding-bottom: 0.25em;">
        <h5 v-on:click="goToProfile()" class="md-title" style="font-weight: 200;font-size: 16px; margin-left: 0; color:white;"> {{username}}</h5>
      </div>
    
        <div class="md-toolbar-row" style="justify-content: center; min-height: 1em;padding-bottom: 3.5em;">
        <h5 v-on:click="goToProfile()" class="md-title" style="font-weight: 400;font-size: 14px; margin-left: 0;color:white;">Tu perfil</h5>
      </div>
    </md-toolbar>


    <!--/subnavbar-->
        
    <div  style="margin-top: 1em;margin-left: 6.25%;margin-right: 10.25% ">
     <div class="md-layout md-gutter md-alignment-top-center">
        <!---tipo user-->
        <div v-if="UserType == 1" style="width: 100%">
            <md-button v-on:click="goToUserLostObjects()" class="md-raised" style="width: inherit;height: 200px; border-radius:10px;background: linear-gradient(to bottom right, #ededed, #fbfbfb);">
                <img class="md-icon md-size-4x" style="margin-bottom: 10px;" src="icon/MyObjects.svg" />
                <br>
                <span style="font-size: 12px;font-weight: 700; ">Mis objetos<br>perdidos</span></md-button>
          </div>

        <div v-else style="width: 100%">
            <md-button v-on:click="goToNewObject()" class="md-raised" style="width: inherit;height: 200px; border-radius:10px;background: linear-gradient(to bottom right, #ededed, #fbfbfb);">
                <img class="md-icon md-size-4x" style="margin-bottom: 10px;" src="icon/newObject.svg" />
                <br>
                <span style="font-size: 12px;font-weight: 700; ">Nuevo objeto<br>perdido</span></md-button>
          </div>
         
        <div v-if="UserType == 1" style="width: 100%">
           <md-button v-on:click="goToFindObject()" class="md-raised "  style="width: inherit; height: 200px ;border-radius:10px;background: linear-gradient(to bottom right, #ededed, #fbfbfb);margin-bottom:3em">
            <img class="md-icon md-size-4x" style="margin-bottom: 10px;" src="icon/FindObjects.svg" />
                <br>
                <span style="font-size: 12px;font-weight: 700;">Encontrar objeto<br>perdido</span></md-button>
            
          </div>

        <div v-else style="width: 100%">
           <md-button class="md-raised " v-on:click="goToObjectList" style="width: inherit; height: 200px ;border-radius:10px;background: linear-gradient(to bottom right, #ededed, #fbfbfb);margin-bottom:3em">
            <img class="md-icon md-size-4x" style="margin-bottom: 10px;" src="icon/objectList.svg" />
                <br>
                <span style="font-size: 12px;font-weight: 700;">Lista de objetos<br>perdidos</span></md-button>
            
          </div>
        
      </div>
        
    </div>
        <!--Fin de botones-->
        
        
        
       

</div>


                      ` };
