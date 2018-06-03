const registrationTypeTemplate = {props: [], 
                          data: () => ({
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)"
    }),
        created: function(){
            window.scrollTo(0,0);
           document.body.style = this.bodyStyle; 
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "";
            toolBarData.paginaActual = "registrationType";
            toolBarData.paginaSiguiente = "";
            toolBarData.paginaAnterior = "login";
            toolBarData.toolBarTitle = "";
            this.$root.$on("backToLogin",this.goToLogin);
        },
        destroyed:function(){
            this.$root.$off("backToLogin",this.goToLogin);
        },
        methods: {
            registerAs(type){
                if (type == "admin"){
                    this.$router.push({name: 'register', params: {registerType:2}});
                }
                else{
                     this.$router.push({name: 'register', params: {registerType:1}});
                }
            },
             goToLogin(){
                this.$router.push('login');
            }
        },
        template:`

<div>
    
     
<!--inicio subnav-->
<md-toolbar md-elevation="0" class=" md-transparent">
    <div class="md-toolbar-row" style="margin-bottom: 10px;">
        
        <img class="md-icon md-size-4x" src="icon/logoWhite.svg" stlye="color:blue;"/>
     
        </div>
    </md-toolbar><!-- fin subnav-->
        
        
        <!--Inicio de botones-->
        
    <div  style="margin-top: 1em;margin-left: 6.25%;margin-right: 10.25% ">
     <div class="md-layout md-gutter md-alignment-top-center">
        <div  style="width: 100%">
            <md-button class="md-raised" v-on:click="registerAs('admin')" style="width: inherit;height: 200px; background: linear-gradient(to bottom right, #ededed, #fbfbfb); border-radius: 10px;">
                <img class="md-icon md-size-5x" style="margin-bottom: 10px;" src="icon/iconAdmin.svg" />
                <br>
                <span style="font-size: 12px;font-weight: 700;">Registrarse como<br>Administrador</span></md-button>
          </div>
         
        <div  style="width: 100%">
           <md-button class="md-raised " v-on:click="registerAs('user')" style="width: inherit; height: 200px ;background: linear-gradient(to bottom right, #ededed, #fbfbfb); border-radius: 10px;">
            <img class="md-icon md-size-5x" style="margin-bottom: 10px;" src="icon/iconUser.svg" />
                <br>
                <span style="font-size: 12px;font-weight: 700;">Registrarse como<br>Usuario</span></md-button>
            
          </div>
        
      </div>
        
    </div>
        <!--Fin de botones-->
        
        
        
       

</div>


                      ` };
