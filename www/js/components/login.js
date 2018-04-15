const loginTemplate = {props: [], 
                          data: () => ({
        activeNavigation: false,
        showNavigation:false,
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
              }
        },
        template:`

<div>

        <md-toolbar md-elevation="0" class="md-large md-primary" style=" background: linear-gradient(to right, #03a9f4, #81d4fa);"><!--inicio toolbar-->
        <div class="md-toolbar-row " style="text-align: center">
  
        <div>
          <md-button class="md-icon-button" v-on:click="goBackHome()">
            <md-icon style="color:white">keyboard_backspace</md-icon>
          </md-button>
        </div>

      </div>
    <div class="md-toolbar-row" style="margin-bottom: 10px;">
        
        <img class="md-icon md-size-3x" src="icon/logoWhite.svg" stlye="color:blue;"/>
     
        </div>
    <div style ="text-align: center; margin: 0 auto">
        <h1 class="md-headline" style="color: white;">Inicio de sesión</h1>
    </div>
      
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 10.25%;margin-right: 10.25% ">
        <div  style="width: 100%">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
              
        <form id="userForm" @submit="checkForm">
                 <md-card-header-text>
                    <md-list style="font-size:14px; margin: 10px;">
                        <md-list-item>
                            <md-field>
                                <label>Correo electrónico</label>
                                <md-input id="profile_email" placeholder="name@example.com" type="email"></md-input>
                                <md-icon>email</md-icon>
                                <span class="md-error">Se requiere un email</span>
                                <span class="md-error">Este email no es correcto</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label>Contraseña</label>
                                <md-input id="profile_pass_handler" placeholder="********" type="password"></md-input>
                                <span class="md-error">Contraseña incorrecta</span>
                                <span class="md-error">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
</form>

            </md-card>
            <div style="text-align: center;">
              <md-button :style="buttonStyle">Entrar</md-button>
              <a class="md-button" style="text-transform: initial; color:grey">Crear una nueva cuenta</a>
            </div>
          </div>        
    </div>
        <!--Fin datos-->
        
        
        
       

</div>


                      ` };
