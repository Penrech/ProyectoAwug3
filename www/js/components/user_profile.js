const userProfileTemplate = {props: [], 
                          data: () => ({
        userProfileData:"",
        formData: null,
        locationsObj: [],
        locationsShowed:[],
        locationSelectedObj: {},
        locationSelectedString: null,
        loadingSelect: true,
        snackBar:false,
        duration:3000,
        uploading:false,
        localizacionEscrita:null,
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
            marginTop: "1.5em"
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
            this.userProfileData = user;
            this.formData = JSON.parse(JSON.stringify(user));
            this.locationSelectedObj = user.location;
            this.locationSelectedString = user.location.name;
            let _this = this;
            var lQuery = new getLocationList();
            lQuery.then(function(result){
                _this.locationsObj = result;
                _this.loadingSelect = false;
            })
            
        },
        destroyed: function(){
            this.$root.$off("backToProfile",this.backToProfileWithoutSave);
        },
        methods: {
            checkForm(){
                 let _this = this;
                 this.erroresForm = JSON.parse(JSON.stringify(this.erroresFormInitial));
                 var emailOk = this.emailValidation();
                 var nameOk = this.nameValidation();
                 console.log(emailOk);
                 console.log(nameOk);
                 var phoneOk = this.phoneValidation();
                 var passOK = this.passValidation();
                 if (!emailOk.NoError){
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

                if (emailOk.NoError && nameOk.NoError && passOK.NoError && phoneOk){
                    var emailDef = $.Deferred();
                    var passDef = $.Deferred();
                    this.formData.location = this.locationSelectedObj;
                    var Cuser = firebase.auth().currentUser;
                    this.uploading = true;
                    if (emailOk.NoChange){
                        emailDef.resolve();
                    }
                    else{
                    Cuser.updateEmail(this.formData.email).then(function() {
                      emailDef.resolve();
                    }).catch(function(error) {
                      console.log(error);
                      _this.snackBar = true;
                    });
                    }
                    if(passOK.NullPass){
                        passDef.resolve();
                    }
                    else{
                        Cuser.updatePassword(this.formData.pass).then(function() {
                          passDef.resolve();
                        }).catch(function(error) {
                          _this.snackBar = true;
                        });
                    }
                    $.when(emailDef,passDef).done(function(){
                        _this.submitForm();
                    })
                    
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
                var errors = {
                    "NoError":false,
                    "NoChange":false
                }
                if(this.formData.email == this.userProfileData.email){
                    errors.NoError = true;
                    errors.NoChange = true;
                    return errors;
                }
                else{
                 if (this.formData.email != ""){
                        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email))
                            {
                            errors.NoError = true;
                            return errors;
                            }
                        else{
                            errors.NoError = false;
                            return errors;
                        }
                  }
                 else{
                     errors.NoError = true;
                     return errors;
                 }
                }
            },
            nameValidation(){
                var errors ={
                    "NoError": false,
                    "tooShortName": false,
                    "NoSurname":false
                }
                var words = this.formData.nomAp.trim().split(/\s+/);
                console.log(words.length);
                if (this.formData.nomAp != ""){
                    if (this.formData.nomAp.length < 3){
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
                console.log(this.formData.phone);
                console.log(this.formData.length);
                if (this.formData.phone != ""){
                    if (this.formData.phone.toString().length != 9){
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
                    "NullPass":false,
                    "wrongPass":false,
                    "passNotEqual":false,
                    "passTooShort":false
                }
                var actualPassInput = document.getElementById("profile_actual_pass");
                var newPass = document.getElementById("profile_new_pass");
                var newPassRep = document.getElementById("profile_new_pass_repeat");
                if(newPass != null || newPassRep != null){
                    if (newPass.value != "" || newPassRep.value != ""){
                            if (actualPassInput.value != this.userProfileData.pass){
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
                                this.formData.pass = newPass.value;
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
                    errors.NullPass = true;
                    return errors;
                }
            },
            goToEditMode(){
                toolBarData.paginaActual = "edit_profile";
                toolBarData.paginaAnterior ="userProfile"
                this.formData = JSON.parse(JSON.stringify(user));
                this.editionMode = true;
                console.log("entro aqui en go to edit mode");
            },
            submitForm(){
                console.log(this.formData);
                firebase.database().ref('usuarios/'+userIdTest).set(this.formData);
                this.userProfileData = user;
                this.uploading = false;
                this.passEditMode = false;
                this.editionMode = false; 
                toolBarData.paginaActual= toolBarData.paginaAnterior;
                toolBarData.paginaAnterior = "homeUser";
                console.log("envio el formulario");
                console.log(toolBarData.paginaActual);

            },
            backToProfileWithoutSave(){
                this.passEditMode = false;
                this.editionMode = false;
                this.uploading = false;
                toolBarData.paginaActual= toolBarData.paginaAnterior;
                toolBarData.paginaAnterior = "homeUser";
                this.erroresForm = JSON.parse(JSON.stringify(this.erroresFormInitial));
            },
            getLocations(searchTerm){
            this.locationsShowed = new Promise(resolve => {
                window.setTimeout(() => {
                if (!searchTerm) {
                resolve(this.locationsObj)
                } else {
                const term = searchTerm.toLowerCase()

                resolve(this.locationsObj.filter(({ name }) => name.toLowerCase().includes(term)))
                }
                }, 500)
                })
            },
             goBackHome () {
                  this.$router.push('homeUser');
              }
        },
        watch:{
            locationSelectedString : function(val){
            if(this.UserType != 1){
                console.log(val);
                if (val.idPoint){
                    console.log("es un objeto");
                    this.locationSelectedObj = val;
                    this.locationSelectedString = val.name;
                }
            }
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

                <md-card-header-text v-if="editionMode == false">
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
                                <label>Nombre</label>
                                <md-input id="profile_name"  v-model="formData.nom" ></md-input>
                                <md-icon>person</md-icon>
                                <span v-if="erroresForm.nombre.nombreNoValido" class="md-error">Nombre demasiado corto</span>
                                <span v-else-if="erroresForm.nombre.faltaApellido" class="md-error">Es necesario también un apellido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.nombre.errorNombre }">
                                <label>Apellido</label>
                                <md-input id="profile_name"  v-model="formData.apellido" ></md-input>
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
                            <md-progress-bar v-if="loadingSelect"  md-mode="query" style="width:100%"></md-progress-bar>
                            <div v-else style="width:100%">
                                <md-autocomplete v-model="locationSelectedString" :md-options="locationsShowed" @md-changed="getLocations" @md-opened="getLocations">
                                    <label>Centro de Atención</label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                                </md-autocomplete>
                                
                            </div>
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
            <div v-if="uploading" class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:1.5em">
                <div  style="--md-theme-default-primary: white;">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </div>
            </div>
            <div v-else style="text-align: center;">
              <md-button v-if="editionMode == false" v-on:click="goToEditMode()" :style="buttonStyle">Editar perfil</md-button>
              <md-button v-if="editionMode == true" v-on:click="checkForm" :style="buttonStyle">Guardar cambios</md-button>
            </div>
          </div>        
    </div>
        <!--Fin datos-->
        
 <!-- SnackBar errores -->
    <!--snackBar errores-->
    <md-snackbar md-position="center" :md-duration="duration" :md-active.sync="snackBar" md-persistent>
      <span>Error actualizando perfil</span>
      <md-button class="md-primary" @click="snackBar = false">OK</md-button>
    </md-snackbar>
        
        
       

</div>


                      ` };
