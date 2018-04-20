const registerTemplate = {props: ["registerType"], 
                          data: () => ({
        activeNavigation: false,
        showNavigation:false,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa); background-repeat: no-repeat; background-size: 100% 50%; background-color: white;",
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
        },
        expandPassInput: false
    }),
        created: function(){
            console.log("tipo de registro : "+this.registerType);
            document.body.style = this.bodyStyle;
           toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "";
            toolBarData.paginaActual = "register";
            toolBarData.paginaSiguiente = "";
            toolBarData.paginaAnterior ="registrationType"
            toolBarData.toolBarTitle = "";  
        },
        methods: {
            checkForm: function(e){
                 for (var key in this.errors){
                     this.errors[key] = false;
                 }
                
                  if(!this.form.email) this.errors.emptyEmail = true;
                    else if(!this.validEmail(this.form.email)) {
                    this.errors.invalidEmail = true;           
                  }
                    
                if(!this.form.name) this.errors.emptyName = true;
                else if(!this.form.name.length < 3) this.errors.tooShortName = true;
                
                if(!this.form.phone) this.errors.emptyPhone = true;
                else if(!this.form.phone.length == 9) this.errors.invalidPhone = true;
                
                
                
                  if(!this.errors.length) return true;
                  e.preventDefault();
                },
                validEmail:function(email) {
                  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return re.test(email);
                },
            passFocusManager(focus){
                if (focus == true){
                    this.passEditMode = true;
                }
                else{
                    
                    this.passEditMode = false;
                }
            },
            passValidation(){
                
            },
            submitForm(){
                document.getElementById("userForm").submit;
                this.passEditMode = false;
                this.editionMode = false;  
            },
             goBackHome () {
                document.body.style = "";
                  this.$router.push('homeUser');
              },
            goToLogin(){
                this.$router.push('login');
            }
        },
        template:`

<div>

        <md-toolbar md-elevation="0" class="md-large md-transparent" ><!--inicio subnavbar-->
    <div class="md-toolbar-row" style="margin-bottom: 10px;">
        
        <img class="md-icon md-size-4x" src="icon/logoWhite.svg" stlye="color:blue;"/>
     
        </div>
    <div style ="text-align: center; margin: 0 auto">
        <h1 class="md-headline" style="color: white; font-size:30px">Registro</h1>
    </div>
      
    </md-toolbar><!-- fin subnavbar-->
        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 10.25%;margin-right: 10.25% ">
            <md-card class="md-elevation-0" style=" border-radius: 10px;box-shadow: 0px 5px 35px -15px rgba(51,51,51,0.5);">
              
        <form id="userForm" @submit="checkForm">
                 <md-card-header-text>
                    <md-list style="font-size:14px; margin: 10px;">
                        <md-list-item>
                            <md-field>
                                <label>Correo electrónico</label>
                                <md-input id="register_email" placeholder="Email" type="email"></md-input>
                                <md-icon>email</md-icon>
                                <span class="md-error">Se requiere un email</span>
                                <span class="md-error">Este email no es correcto</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label>Nombre y Apellidos</label>
                                <md-input id="register_name" placeholder="Nombre y Apellidos"></md-input>
                                <md-icon>person</md-icon>
                                <span class="md-error">Se requiere un nombre</span>
                                <span class="md-error">Este nombre no es correcto</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label  v-if="registerType == 2">Teléfono de ayuda</label>
                                <md-input id="register_phone" placeholder="Teléfono de ayuda"  v-if="registerType == 2"></md-input>
                                <label  v-if="registerType == 1">Teléfono</label>
                                <md-input  v-if="registerType == 1"id="register_phone" placeholder="Teléfono"></md-input>
                                <md-icon>phone</md-icon>
                                <span class="md-error">Se requiere un número de teléfono</span>
                                <span class="md-error">Este número no es correcto</span>
                            </md-field>
                        </md-list-item>
                         <md-list-item v-if="registerType == 2">
                            <md-field>
                                <label>Centro de atención</label>
                                <md-input id="register_atention_office" placeholder="Centro de atención"></md-input>
                                <md-icon>location_on</md-icon>
                                <span class="md-error">Contraseña incorrecta</span>
                                <span class="md-error">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="registerType == 2">
                            <md-field>
                                <label>Código Profesional</label>
                                <md-input id="register_check_Pcode" placeholder="Código profesional"></md-input>
                                <md-icon>verified_user</md-icon>
                                <span class="md-error">Contraseña incorrecta</span>
                                <span class="md-error">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                        
                        <md-list-item>
                            <md-field>
                                <label>Contraseña</label>
                                <md-input id="register_pass" placeholder="Contraseña" type="password"></md-input>
                                <span class="md-error">Contraseña incorrecta</span>
                                <span class="md-error">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label>Repite la contraseña</label>
                                <md-input id="register_pass_repeat" placeholder="Repite la contraseña" type="password"></md-input>
                                <span class="md-error">Contraseña incorrecta</span>
                                <span class="md-error">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
</form>

            </md-card>
            <div class="md-layout md-gutter md-alignment-center-center" style="padding-left:0; text-align:center">
            <md-list>
                <md-list-item>
                  <md-button :style="buttonStyle">Registrarse</md-button>
                </md-list-item>
                <md-list-item style="margin-left: auto;
                    margin-right: auto;">
              <span  v-on:click="goToLogin" style=" color:grey;margin-bottom:3em;font-size:14px;font-weight: 500;">Ya tengo una cuenta</span>
            </md-list-item>
                </md-list>
            </div>        
    </div>
        <!--Fin datos-->
        
        
        
       

</div>


                      ` };