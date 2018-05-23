Vue.component('Up-step2', {props: [], 
                          data: () => ({
        formData: null,
        locationsObj: [],
        locationsShowed:[],
        locationSelectedObj: {},
        locationSelectedString: null,
        loadingSelect: true,
        snackBar:false,
        duration:3000,
        uploading:false,
        erroresForm:{
            nombre:{
                errorNombre:false,
                nombreMuyCorto: false,
                nombreMuyLargo: false,
                nombreNumerico:false
            },
            apellido:{
                errorApellido:false,
                apellidoMuyCorto: false,
                apellidoMuyLargo: false,
                apellidoNumerico:false
            },
            telefono:{
                telefonoNoValido: false,
            },
        },
        erroresFormInitial:{
            nombre:{
                errorNombre:false,
                nombreMuyCorto: false,
                nombreMuyLargo: false,
                nombreNumerico:false
            },
            apellido:{
                errorApellido:false,
                apellidoMuyCorto: false,
                apellidoMuyLargo: false,
                apellidoNumerico:false
            },
            telefono:{
                telefonoNoValido: false,
            },
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
        },
    }),
        created: function(){
            window.scrollTo(0,0);
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "editProfile";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior ="userProfile"
            toolBarData.toolBarTitle = "Mi perfil";
            this.formData = JSON.parse(JSON.stringify(user));
            if (UserType == 2){
                this.locationSelectedObj = user.location;
                this.locationSelectedString = user.location.name;
                let _this = this;
                var lQuery = new getLocationList();
                lQuery.then(function(result){
                    _this.locationsObj = result;
                    _this.loadingSelect = false;
                })
            }
            this.$root.$on("backToUserProfile",this.goBackToProfile);
        },
        destroyed: function(){
            this.$root.$off("backToUserProfile",this.goBackToProfile);
        },
        methods: {
           checkForm(){
               let _this = this;
                this.erroresForm = JSON.parse(JSON.stringify(this.erroresFormInitial));
               this.uploading= true;
               if((typeof this.formData.nom) != "string" || this.formData.nom.length <2 || this.formData.nom.length > 15)
                   {
                       console.log("nameFail");
                     if(typeof this.formData.nom != "string"){
                         this.erroresForm.nombre.nombreNumerico = true;
                     }
                     else{
                         if(this.formData.nom.length <2){
                             this.erroresForm.nombre.nombreMuyCorto = true;
                         }
                         else{
                            this.erroresForm.nombre.nombreMuyLargo = true;
                         } 
                     }
                     this.erroresForm.nombre.errorNombre = true;
                     this.uploading= false;
                   }
               else if((typeof this.formData.apellido) != "string" || this.formData.apellido.length <2 || this.formData.apellido.length > 15)
                   {
                       console.log("apellidoFail");
                       console.log(typeof this.formData.apellido);
                       console.log(this.formData.apellido.length);
                     if(typeof this.formData.apellido != "string"){
                         this.erroresForm.apellido.apellidoNumerico = true;
                     }
                     else{
                         if(this.formData.apellido.length <2){
                             this.erroresForm.apellido.apellidoMuyCorto = true;
                         }
                         else{
                            this.erroresForm.apellido.apellidoMuyLargo = true;
                         } 
                     }
                     this.erroresForm.apellido.errorApellido = true;
                     this.uploading= false;
                   }
               
               else if(this.formData.phone.toString().length != 9){
                    this.erroresForm.telefono.telefonoNoValido = true;
                    this.uploading = false;
               }
               else{
                if (this.UserType == 2){
                    this.formData.location = this.locationSelectedObj;
                }
                console.log("no hay errores");
                firebase.database().ref("usuarios/"+userIdTest).set(this.formData)
               .then(function(result){
                    console.log("saldre de aqui a profile");
                    _this.$root.$emit("backBeforeCharge");
                    _this.goBackToProfile();
                }).catch(function(error){
                    _this.snackBar = true;
                    _this.uploading = false;
                    console.log(error);
                })
               }
               
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
             goBackToProfile () {
                 console.log("entro aqui");
                  var emitObj={
                      nextStep:1
                  }
                  this.$emit("backToStep1",emitObj);
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
                 <md-card-header-text>
                    <md-list style="font-size:14px;">
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.nombre.errorNombre }">
                                <label>Nombre</label>
                                <md-input id="profile_name"  v-model="formData.nom" ></md-input>
                                <md-icon>person</md-icon>
                                <span v-if="erroresForm.nombre.nombreMuyCorto" class="md-error">Nombre demasiado corto</span>
                                <span v-if="erroresForm.nombre.nombreMuyLargo" class="md-error">Máximo 15 carácteres</span>
                                <span v-if="erroresForm.nombre.nombreNumerico" class="md-error">El nombre no debe de ser numérico</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.apellido.errorApellido }">
                                <label>Apellido</label>
                                <md-input id="profile_name"  v-model="formData.apellido" ></md-input>
                                <md-icon>person</md-icon>
                                <span v-if="erroresForm.apellido.apellidoMuyCorto" class="md-error">Apellido demasiado corto</span>
                                <span v-if="erroresForm.apellido.apellidoMuyLargo" class="md-error">Máximo 15 caracteres</span>
                                <span v-if="erroresForm.apellido.apellidoNumerico" class="md-error">El apellido no debe de ser numérico</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.telefono.telefonoNoValido }">
                                <label>Teléfono</label>
                                <md-input id="profile_phone" v-model="formData.phone" type="number"></md-input>
                                <md-icon>phone</md-icon>
                                <span class="md-error">Este teléfono no es válido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item v-if="UserType ==2">
                            <div style="width:100%">
                                <md-autocomplete v-model="locationSelectedString" :md-options="locationsShowed" @md-changed="getLocations" @md-opened="getLocations">
                                    <label>Centro de Atención</label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                                </md-autocomplete>
                            </div>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            

            </md-card>
            <div v-if="uploading" class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:1.5em">
                <div  style="--md-theme-default-primary: white;">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </div>
            </div>
            <div v-else style="text-align: center;">
              <md-button v-on:click="checkForm" :style="buttonStyle">Guardar cambios</md-button>
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


                      ` });
