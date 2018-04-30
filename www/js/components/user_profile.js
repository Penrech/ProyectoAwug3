const userProfileTemplate = {props: [], 
                          data: () => ({
        userProfileData:{email: "JohnDoe@prueba.es",password: "prueba",name: "John Doe", phone: "666777888",location:"centro de atención"},
        formData: null,
        erroresForm:{
            email:{
                emailNoValido: false,
            },
            nombre:{
                errorNombre:false,
                nombreNoValido: false,
                faltaApellido: false
            },
            telefono:{
                telefonoNoValido: false,
            },
            direccion:{
                direccionNoValida: false
            },
            contrasena:{
                errorContrasena: false,
                passActualNoValido:false,
                passNoIguales: false,
                passMuyCorta: false
            }
        },
        erroresFormInitial:{
            email:{
                emailNoValido: false,
            },
            nombre:{
                errorNombre:false,
                nombreNoValido: false,
                faltaApellido: false
            },
            telefono:{
                telefonoNoValido: false,
            },
            direccion:{
                direccionNoValida: false
            },
            contrasena:{
                errorContrasena: false,
                passActualNoValido:false,
                passNoIguales: false,
                passMuyCorta: false
            }
        },
        activeNavigation: false,
        showNavigation:false,
        editionMode:false,
        passEditMode:false,
        UserType,
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
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)"
    }),
        created: function(){
            document.body.style = this.bodyStyle;
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "userProfile";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior ="homeUser"
            toolBarData.toolBarTitle = "Mi perfil";
            this.$root.$on("backToProfile",this.backToProfileWithoutSave);
        },
        destroyed: function(){
            this.$root.$off("backToProfile",this.backToProfileWithoutSave);
        },
        methods: {
            checkForm(){

                 this.erroresForm = JSON.parse(JSON.stringify(this.erroresFormInitial));
                 var emailOk = this.emailValidation();
                 var nameOk = this.nameValidation();
                 console.log(emailOk);
                 console.log(nameOk);
                 var phoneOk = this.phoneValidation();
                 var passOK = this.passValidation();
                 if (!emailOk){
                     this.erroresForm.email.emailNoValido = true;
                 }
                 else if (!nameOk.NoError){
                     this.erroresForm.nombre.errorNombre = true;
                     if (nameOk.tooShortName){
                         this.erroresForm.nombre.nombreNoValido = true;
                     }
                     else if(nameOk.NoSurname){
                         console.log("entro aqui");
                         this.erroresForm.nombre.faltaApellido = true;
                     }
                 }
                else if (!phoneOk){
                    this.erroresForm.telefono.telefonoNoValido = true;
                }
                else if(!passOK.NoError){
                    this.erroresForm.contrasena.errorContrasena = true;
                    if (passOK.wrongPass){
                        this.erroresForm.contrasena.passActualNoValido = true;
                    }
                    else if(passOK.passTooShort){
                        this.erroresForm.contrasena.passMuyCorta = true;
                    }
                    else if(passOK.passNotEqual){
                        this.erroresForm.contrasena.passNoIguales = true;
                    }
                }

                if (emailOk && nameOk.NoError && passOK.NoError && phoneOk){
                    this.submitForm();
                }
                 console.log(this.erroresForm.email.emailNoValido);
                
                
                },
            passFocusManager(focus){
                if (focus == true){
                    this.passEditMode = true;
                }
                else{
                    
                    this.passEditMode = false;
                }
            },
            emailValidation(){
                 if (this.formData.email != ""){
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email))
                            { 
                            return true;
                            }
                        else
                            return false;
                  }
                 else
                     return true;
            },
            nameValidation(){
                var errors ={
                    "NoError": false,
                    "tooShortName": false,
                    "NoSurname":false
                }
                var words = this.formData.name.trim().split(/\s+/);
                console.log(words.length);
                if (this.formData.name != ""){
                    if (this.formData.name.length < 3){
                        errors.tooShortName = true;
                        return errors;
                    }
                    if (words.length < 2){
                        errors.NoSurname = true;
                        return errors;
                    }
                    else{
                        errors.NoError = true;
                        return errors;
                    }
                }
                else{
                        errors.NoError = true;
                        return errors;
                }
                console.log(errors);
            },
            phoneValidation(){
                if (this.formData.phone != ""){
                    if (this.formData.phone.length != 9){
                        return false;
                    }
                    else{
                        return true;
                    }
                    
                }
                else{
                    return true;
                }
            },
            passValidation(){
                var errors ={
                    "NoError":false,
                    "wrongPass":false,
                    "passNotEqual":false,
                    "passTooShort":false
                }
                var actualPassInput = document.getElementById("profile_actual_pass");
                var newPass = document.getElementById("profile_new_pass");
                var newPassRep = document.getElementById("profile_new_pass_repeat");
                if(newPass != null || newPassRep != null){
                    if (newPass.value != "" || newPassRep.value != ""){
                            if (actualPassInput.value != this.userProfileData.password){
                                errors.wrongPass = true;
                                return errors;
                            }
                            else if(newPass.value.length < 8){
                                errors.passTooShort = true;
                                return errors;
                            }
                            else if(!(newPass.value == newPassRep.value)){
                                errors.passNotEqual = true;
                                return errors;
                            }
                            else{
                                this.formData.password = newPass.value;
                                errors.NoError = true;
                                return errors; 
                            }
                        }
                    else{
                       errors.NoError = true;
                       return errors; 
                    }
                }
                else{
                    errors.NoError = true;
                    return errors;
                }
            },
            goToEditMode(){
                toolBarData.paginaActual = "edit_profile";
                toolBarData.paginaAnterior ="userProfile"
                this.editionMode = true;
                this.formData = JSON.parse(JSON.stringify(this.userProfileData));
                console.log(this.FormData)
            },
            submitForm(){
                console.log(this.formData.password);
                this.userProfileData = JSON.parse(JSON.stringify(this.formData));
                this.passEditMode = false;
                this.editionMode = false; 
                toolBarData.paginaActual= toolBarData.paginaAnterior;
                toolBarData.paginaAnterior = "homeUser";

            },
            backToProfileWithoutSave(){
                this.passEditMode = false;
                this.editionMode = false;
                toolBarData.paginaActual= toolBarData.paginaAnterior;
                toolBarData.paginaAnterior = "homeUser";
                this.erroresForm = JSON.parse(JSON.stringify(this.erroresFormInitial));
            },
             goBackHome () {
                  this.$router.push('homeUser');
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
                        <md-list-item v-if="UserType == 2">
                            <span class="md-list-item-text" style="font-size:16px;font-weight:500">Centro de atención</span>
                            <md-icon>location_on</md-icon>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            
            <form ref="userForm" @submit="checkForm">
                 <md-card-header-text v-if="editionMode == true">
                    <md-list style="font-size:14px;">
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.email.emailNoValido }">
                                <label>Email</label>
                                <md-input id="profile_email"  v-model="formData.email" :placeholder="userProfileData.email" type="email"></md-input>
                                <md-icon>email</md-icon>
                                <span class="md-error">Este email no es valido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.nombre.errorNombre }">
                                <label>Nombre y Apellidos</label>
                                <md-input id="profile_name"  v-model="formData.name" ></md-input>
                                <md-icon>person</md-icon>
                                <span v-if="erroresForm.nombre.nombreNoValido" class="md-error">Nombre demasiado corto</span>
                                <span v-else-if="erroresForm.nombre.faltaApellido" class="md-error">Es necesario también un apellido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.telefono.telefonoNoValido }">
                                <label>Teléfono</label>
                                <md-input id="profile_phone" v-model="formData.phone"></md-input>
                                <md-icon>phone</md-icon>
                                <span class="md-error">Este teléfono no es válido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="UserType ==2">
                            <md-field>
                                <label>Centro de Atención</label>
                                <md-input id="profile_atention_office" placeholder="Centro de atención"></md-input>
                                <md-icon>location_on</md-icon>
                                <span class="md-error">Este teléfono no es válido</span>
                                <span class="md-error">Se requiere un teléfono</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.contrasena.errorContrasena }">
                                <label  v-if="passEditMode == true">Contraseña actual</label>
                                <label v-else>Cambiar Contraseña</label>
                                <md-input id="profile_pass_handler" v-if="passEditMode == false" v-on:focus="passFocusManager(true)"></md-input>
                                <md-icon v-if="passEditMode == false">lock</md-icon>
                                <md-input id="profile_actual_pass" v-else  type="password"></md-input>
                                <span class="md-error" v-if="erroresForm.contrasena.passActualNoValido">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="passEditMode == true" >
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.contrasena.errorContrasena }">
                                <label>Nueva Contraseña</label>
                                <md-input id="profile_new_pass"  type="password"></md-input>
                                <span class="md-error" v-if="erroresForm.contrasena.passNoIguales">La contraseña no coinciden</span>
                                <span class="md-error" v-if="erroresForm.contrasena.passMuyCorta">Mínimo 8 caracteres</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="passEditMode == true" >
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.contrasena.errorContrasena }">
                                <label>Repite la contraseña</label>
                                <md-input id="profile_new_pass_repeat" type="password"></md-input>
                                <span class="md-error" v-if="erroresForm.contrasena.passNoIguales">La contraseña no coinciden</span>
                                <span class="md-error" v-if="erroresForm.contrasena.passMuyCorta">Mínimo 8 caracteres</span>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
</form>

            </md-card>
            <div style="text-align: center;">
              <md-button v-if="editionMode == false" v-on:click="goToEditMode()" :style="buttonStyle">Editar perfil</md-button>
              <md-button v-if="editionMode == true" v-on:click="checkForm" :style="buttonStyle">Guardar cambios</md-button>
            </div>
          </div>        
    </div>
        <!--Fin datos-->
        
        
        
       

</div>


                      ` };
