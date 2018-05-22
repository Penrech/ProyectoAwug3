const loginTemplate = {props: [], 
                          data: () => ({
        activeNavigation: false,
        showNavigation:false,
        email:null,
        pass:null,
        errores:{
            errorEmail: false,
            errorEmail2:false,
            errorEmail3:false,
            errorPassword: false,
            errorPassword2:false
        },
         bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa); background-repeat: no-repeat; background-size: 100% 390px; background-color: white;",
        buttonStyle:{ 
            borderRadius:"28px",
            border:"1px solid white",
            color:"#ffffff",
            background: "linear-gradient(to right, rgb(3, 169, 244), rgb(129, 212, 250))",
            fontSize:"16px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "8em",
            width: "14em",
            height: "3.2em",
            marginTop: "1.5em"
        }
    }),
        created:function(){
            document.body.style= this.bodyStyle;
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "";
            toolBarData.paginaActual = "login";
            toolBarData.paginaSiguiente = "";
            toolBarData.paginaAnterior ="inicio"
            toolBarData.toolBarTitle = "";
        },
        
        methods: {
            
             goBackHome () {
                document.body.style = "";
                  this.$router.push('homeUser');
              },
            logIn(){
                this.errores = {
                    errorEmail: false,
                    errorEmail2:false,
                    errorPassword: false
                };
                if (this.email == null){
                 this.errores.errorEmail = true;
                 this.errores.errorEmail3 = true;
                }
                else if(this.pass == null){
                this.errores.errorPassword = true;
                this.errores.errorPassword2 = true;
                }
                let _this = this;
                firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        _this.errores.errorPassword = true;
                    }
                    if (errorCode === 'auth/invalid-email') {
                        _this.errores.errorEmail = true;
                    }
                    if (errorCode === 'auth/user-not-found') {
                        _this.errores.errorEmail = true;
                        _this.errores.errorEmail2 = true;
                    }
                });
            },
            goToRegistrationType(){
                this.$router.push('registrationType');
            }
        },
        template:`

<div>

     
<md-toolbar md-elevation="0" class="md-large md-transparent" ><!--inicio subnavbar-->
    <div class="md-toolbar-row" style="margin-bottom: 10px;">
        
        <img class="md-icon md-size-4x" src="icon/logoWhite.svg" stlye="color:blue;"/>
     
        </div>
    <div style ="text-align: center; margin: 0 auto">
        <h1 class="md-headline" style="color: white; font-size:30px">Inicio de sesión</h1>
    </div>
      
    </md-toolbar><!-- fin subnavbar-->
        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 10.25%;margin-right: 10.25% ">
            <md-card class="md-elevation-0" style=" border-radius: 10px;box-shadow: 0px 5px 35px -15px rgba(51,51,51,0.5);">
              
        <form @submit="logIn">
                 <md-card-header-text>
                    <md-list style="font-size:14px; margin: 10px;">
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': errores.errorEmail }">
                                <label >Correo electrónico</label>
                                <md-input id="login_email" v-model="email" placeholder="Email" type="email"></md-input>
                                <md-icon>email</md-icon>
                                <span v-if="!errores.errorEmail2 && !errores.errorEmail3" class="md-error">Este email no es correcto</span>
                                <span v-if="errores.errorEmail2" class="md-error">Este email no está registrado</span>
                                <span v-if="errores.errorEmail3" class="md-error">No has introducido datos</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': errores.errorPassword }">
                                <label>Contraseña</label>
                                <md-input id="login_pass" v-model="pass" placeholder="Contraseña" type="password"></md-input>
                                <span v-if="errores.errorPassword2" class="md-error">No has introducido datos</span>
                                <span v-else class="md-error">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
</form>

            </md-card>
            <div class="md-layout md-gutter md-alignment-center-center" style="padding-left:0; text-align:center">
            <md-list style="background: transparent;">
                <md-list-item>
                  <md-button v-on:click="logIn" :style="buttonStyle">Entrar</md-button>
                </md-list-item>
                <md-list-item style="margin-left: auto;
                    margin-right: auto;">
              <span  v-on:click="goToRegistrationType" style=" color:grey;margin-bottom:3em;font-size:14px;font-weight: 500;">Crear una cuenta nueva</span>
            </md-list-item>
                </md-list>
            </div>        
    </div>
        <!--Fin datos-->
        
        
        
       

</div>


                      ` };
