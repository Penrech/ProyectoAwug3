Vue.component('Up-step2', {props: [], 
                          data: () => ({

        formData: null,
        credentialsData:{
          actualPassWritten:null,
          newPassWritten:null,
          newPassRepited:null
        },
        snackBar:false,
        duration:3000,
        uploading:false,
        erroresForm:{
            email:{
                emailNoValido: false,
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
            contrasena:{
                errorContrasena: false,
                passActualNoValido:false,
                passNoIguales: false,
                passMuyCorta: false
            }
        },
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
        }
    }),
        created: function(){
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "editCredentials";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior ="userProfile"
            toolBarData.toolBarTitle = "Mi perfil";
            this.formData = JSON.parse(JSON.stringify(user));
            
        },
        destroyed: function(){
            
        },
        methods: {
            checkForm(){
                let _this = this;
                var deferred1 = $.Deferred();
                var deferred2 = $.Deferred();
                var deferred3 = $.Deferred();
                this.erroresForm = JSON.parse(JSON.stringify(this.erroresFrominitial));
                this.uploading= true;
                if(this.credentialsData.actualPassWritten.length < 6){
                    this.erroresForm.contrasena.errorContrasena = true;
                    this.erroresForm.contrasena.passActualNoValido = true;
                    this.uploading = false;
                }
                else if(this.credentialsData.newPassWritten.length <6 || (this.credentialsData.newPassWritten != this.credentialsData.newPassRepited)){
                    if (this.credentialsData.newPassWritten.length <6){
                        this.erroresForm.contrasena.passMuyCorta = true;
                    }else{
                        this.erroresForm.contrasena.passNoIguales = true;
                    }
                    this.erroresForm.contrasena.errorContrasena = true;
                    this.uploading = false;
                }
                else if(this.formData.email == "" || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)){
                    this.erroresForm.email.emailNoValido = true;
                    this.uploading = false;
                }
                else{
                var user = firebase.auth().currentUser;
                var credentials = firebase.auth.EmailAuthProvider.credential(
                user.email,
                this.credentialsData.actualPassWritten
                ); 
                    
                user.reauthenticateWithCredential(credentials)
                .then(function(){
                    deferred1.resolve(true);
                }).catch(function(error){
                    deferred1.resolve(error);
                })
                    
                $.when(deferred1).done(function(data){
                    if (data == true){
                        user.updateEmail(this.formData.email).then(function() {
                            deferred2.resolve(true);
                        }).catch(function(error) {
                            deferred2.resolve(error);
                        });
                        user.updatePassword(newPassword).then(function() {
                            deferred3.resolve(true);
                        }).catch(function(error) {
                            deferred3.resolve(error);
                        });
                    }
                    else{
                        _this.snackBar = true;
                        console.log(data);
                        _this.uploading = false;
                    }
                });
                
                $.when(deferred2,deferred3).done(function(data1,data2){
                    if (data1 == true && data2 == true){
                         firebase.database().ref("usuarios/"+userIdTest).set(this.formData);
                           .then(function(result){
                                _this.goBackToProfile();
                            }).catch(function(error){
                                this.uploading = false;
                                console.log(error);
                                _this.snackBar = true;
                            })
                    }
                    else{
                        if(data1 != true){
                            console.log("data1",data1);
                        }
                        else if(data2 != true){
                             console.log("data2",data2);
                        }
                        _this.uploading = false;
                        _this.snackBar = true;
                    }
                })
               
                } 
            },
           goBackToProfile () {
              var emitObj={
                  nextStep:1
              }
              this.$emit("backToStep1",emitObj);
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
            
            <form ref="credentialsForm" >
                 <md-card-header-text>
                    <md-list style="font-size:14px;">
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.contrasena.errorContrasena }">
                                <label>Contraseña actual</label>
                                <md-input v-model="credentialsData.actualPassWritten" type="password"></md-input>
                                <span class="md-error" v-if="erroresForm.contrasena.passActualNoValido">Contraseña incorrecta</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.email.emailNoValido }">
                                <label>Cambiar email</label>
                                <md-input  v-model="formData.email" type="email"></md-input>
                                <md-icon>email</md-icon>
                                <span class="md-error">Este email no es valido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.contrasena.errorContrasena }">
                                <label>Nueva Contraseña</label>
                                <md-input v-model="credentialsData.newPassWritten" type="password"></md-input>
                                <span class="md-error" v-if="erroresForm.contrasena.passNoIguales">La contraseña no coinciden</span>
                                <span class="md-error" v-if="erroresForm.contrasena.passMuyCorta">Mínimo 6 caracteres</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.contrasena.errorContrasena }">
                                <label>Repite la contraseña</label>
                                <md-input v-model="credentialsData.newPassRepited" type="password"></md-input>
                                <span class="md-error" v-if="erroresForm.contrasena.passNoIguales">La contraseña no coinciden</span>
                                <span class="md-error" v-if="erroresForm.contrasena.passMuyCorta">Mínimo 6 caracteres</span>
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
