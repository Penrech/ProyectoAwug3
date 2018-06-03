Vue.component('Up-step1', {props: [], 
                          data: () => ({
        UserType,
        userProfileData:null,
        buttonStyle:{ 
            borderRadius:"28px",
            border:"1px solid white",
            color:"#ffffff",
            fontSize:"16px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "8em",
            width: "14em",
            height: "3.2em"
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)"
    }),
        created: function(){
            document.body.style = this.bodyStyle;
            window.scrollTo(0,0);
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "userProfile";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior ="homeUser"
            toolBarData.toolBarTitle = "Mi perfil";
            this.userProfileData = user;
            this.$root.$on("backFromProfileToHome",this.GoBackHome);
            this.$root.$on("backBeforeCharge",this.updateData);
            
        },
        destroyed: function(){
            this.$root.$off("backFromProfileToHome",this.GoBackHome);
            this.$root.$off("backBeforeCharge",this.updateData);
        },
        methods: {
            updateData(){
              this.userProfileData = user;  
            },
            GoToEditProfile(){
                var emitObj={
                    nextStep:2
                }
                this.$emit("goToStep",emitObj);
            },
            GoToEditCredentials(){
                var emitObj={
                    nextStep:3
                }
                this.$emit("goToStep",emitObj);
            },
            GoBackHome(){
                this.$router.push("homeUser");
            }
        },
        template:`

<div>

        
<!--inicio subnav-->
<md-toolbar md-elevation="0" class=" md-transparent" >
    <div class="md-toolbar-row" >
        <md-avatar class="md-avatar-icon md-large md-elevation-4" style="
            background-color: var(--md-theme-default-icon-disabled, rgba(255,255,255,1));
            min-width: 80px;
            min-height: 80px;
            border-radius: 80px;
            font-size: 40px;
            color: aqua">
        <md-icon style="color: #0aabf4">account_circle</md-icon>
      </md-avatar>
        </div>
      
    </md-toolbar><!-- fin subnav-->
        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 10.25%;margin-right: 10.25% ">
        <div  style="width: 100%;padding-bottom:2.5em">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
              <md-card-header >

                <md-card-header-text>
                    <md-list style="font-size:14px;">
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{userProfileData.email}}</span>
                            <md-icon>email</md-icon>
                        </md-list-item>
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{userProfileData.nom}} {{userProfileData.apellido}}</span>
                            <md-icon>person</md-icon>
                        </md-list-item>
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{userProfileData.phone}}</span>
                            <md-icon>phone</md-icon>
                        </md-list-item>
                        <md-list-item v-if="UserType == 2">
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500;text-overflow: ellipsis;
                            white-space: initial;">{{userProfileData.location.name}}</span>
                            <md-icon>location_on</md-icon>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            
            </md-card>
            
            <div class="md-layout md-gutter md-alignment-center-center" style="padding-left:0; text-align:center;">
            <md-list style="background: transparent;">
                <md-list-item >
                  <md-button v-on:click="GoToEditProfile" :style="buttonStyle">Editar perfil</md-button>
                </md-list-item>
                <md-list-item>
                  <md-button v-on:click="GoToEditCredentials" :style="buttonStyle">Editar credenciales</md-button>
                </md-list-item>
            </md-list>
            </div>
          </div>        
    </div>
        <!--Fin datos-->

        
        
       

</div>


                      ` });
