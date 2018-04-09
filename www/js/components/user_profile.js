const userProfileTemplate = {props: [], 
                          data: () => ({
        userProfileData:{email: "JohnDoe@prueba.es",password: "prueba",name: "John Doe", phone: "666777888"},
        activeNavigation: false,
        showNavigation:false,
        editionMode:false,
        passEditMode:false,
        buttonStyle:{ 
            borderRadius:"28px",
            border:"1px solid white",
            color:"#ffffff",
            fontSize:"16px",
            fontWeight:"100",
            textTransform: "none",
            minWidth: "8em",
            width: "14em",
            height: "3.2em",
            marginTop: "1.5em",
            marginBottom:"2.5em"
        }
    }),
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
            goToEditMode(){
                
                this.editionMode = true
            },
            submitForm(){
                document.getElementById("userForm").submit;
                this.passEditMode = false;
                this.editionMode = false;  
            },
             goBackHome () {
                document.body.style = "";
                  this.$router.push('homeUser');
              }
        },
        template:`

<div>

        <md-toolbar md-elevation="0" class="md-large md-primary" style=" background: linear-gradient(to right, #03a9f4, #81d4fa);"><!--inicio toolbar-->
        <div class="md-toolbar-row " style="text-align: center">
  
        <div v-if="editionMode == false">
          <md-button class="md-icon-button" v-on:click="goBackHome()">
            <md-icon style="color:white">keyboard_backspace</md-icon>
          </md-button>
        </div>

        <div v-else>
          <md-button class="md-icon-button" v-on:click="editionMode = false, passEditMode = false">
            <md-icon style="color:white">keyboard_backspace</md-icon>
          </md-button>
        </div>
          
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
              <md-card-header >

                <md-card-header-text v-if="editionMode == false">
                    <md-list style="font-size:14px;">
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{userProfileData.email}}</span>
                            <md-icon>email</md-icon>
                        </md-list-item>
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{userProfileData.name}}</span>
                            <md-icon>person</md-icon>
                        </md-list-item>
                        <md-list-item>
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">{{userProfileData.phone}}</span>
                            <md-icon>phone</md-icon>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            
            <form id="userForm" @submit="checkForm">
                 <md-card-header-text v-if="editionMode == true">
                    <md-list style="font-size:14px;">
                        <md-list-item>
                            <md-field>
                                <label>Email</label>
                                <md-input id="profile_email"  :placeholder="userProfileData.email" type="email"></md-input>
                                <md-icon>email</md-icon>
                                <span class="md-error">Se requiere un email</span>
                                <span class="md-error">Este email no es correcto</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label>Nombre y Apellidos</label>
                                <md-input id="profile_name"  :placeholder="userProfileData.name" ></md-input>
                                <md-icon>person</md-icon>
                                <span class="md-error">Este nombre no es válido</span>
                                <span class="md-error">Se requiere un nombre</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label>Teléfono</label>
                                <md-input id="profile_phone" :placeholder="userProfileData.phone"></md-input>
                                <md-icon>phone</md-icon>
                                <span class="md-error">Este teléfono no es válido</span>
                                <span class="md-error">Se requiere un teléfono</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label  v-if="passEditMode == true">Contraseña actual</label>
                                <label v-else>Cambiar Contraseña</label>
                                <md-input id="profile_pass_handler" v-if="passEditMode == false" v-on:focus="passFocusManager(true)"></md-input>
                                <md-icon v-if="passEditMode == false">lock</md-icon>
                                <md-input id="profile_actual_pass" v-else  type="password"></md-input>
                                <span class="md-error">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="passEditMode == true" >
                            <md-field>
                                <label>Nueva Contraseña</label>
                                <md-input id="profile_new_pass"  type="password"></md-input>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="passEditMode == true" >
                            <md-field>
                                <label>Repite la contraseña</label>
                                <md-input id="profile_new_pass_repeat" type="password"></md-input>
                                <span class="md-error">La contraseña no coinciden</span>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
</form>

            </md-card>
            <div style="text-align: center;">
              <md-button v-if="editionMode == false" v-on:click="goToEditMode()" :style="buttonStyle">Editar perfil</md-button>
              <md-button v-if="editionMode == true" v-on:click="submitForm()" :style="buttonStyle">Guardar cambios</md-button>
            </div>
          </div>        
    </div>
        <!--Fin datos-->
        
        
        
       

</div>


                      ` };
