const registerTemplate = {props: ["registerType"], 
                          data: () => ({
        activeNavigation: false,
        showNavigation:false,
        locationsObj: [],
        locationsShowed:[],
        locationSelectedObj: {},
        locationSelectedString: null,
        snackBar:false,
        duration:3000,
        uploading:false,
        validationErrors:false,
        formData:{
          nom:"",
          apellido:"",
          email:"",
          location:"",
          phone:"",
          type:""
        },
        professionalCode:{
            name:"",
            id:""
        },
        credentialsData:{
          newPassWritten:"",
          newPassRepited:""
        },
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
        erroresForm:{
            nombre:{
                errorNombre:false,
                NoNombre:false,
                NombreNoValido:false
            },
            apellido:{
                errorApellido:false,
                NoApellido:false,
                ApellidoNoValido:false
            },
            email:{
                emailNoValido:false
            },
            telefono:{
                telefonoNoValido:false
            },
            location:{
                locationVacia:false
            },
            codigoProfesional:{
                codigoNoValido:false
            },
            contrasena:{
                errorContrasena:false,
                NoContrasena:false,
                contrasenaMuyCorta:false,
                contrasenaNoCoincide:false
            }
        },
          erroresFormInitial:{
            nombre:{
                errorNombre:false,
                NoNombre:false,
                NombreNoValido:false
            },
            apellido:{
                errorApellido:false,
                NoApellido:false,
                ApellidoNoValido:false
            },
            email:{
                emailNoValido:false
            },
            telefono:{
                telefonoNoValido:false
            },
            location:{
                locationVacia:false
            },
            codigoProfesional:{
                codigoNoValido:false
            },
            contrasena:{
                errorContrasena:false,
                NoContrasena:false,
                contrasenaMuyCorta:false,
                contrasenaNoCoincide:false
            }
        }
                              
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
            if (this.registerType == 2){
                let _this = this;
                var lQuery = new getLocationList();
                lQuery.then(function(result){
                    _this.locationsObj = result;
                })
            }
        },
        methods: {
            checkForm(){
               var deferred = $.Deferred();
               let _this = this;
               this.validationErrors = false;
               this.erroresForm = JSON.parse(JSON.stringify(this.erroresFormInitial));
               this.uploading= true;
               if((typeof this.formData.nom) != "string" || this.formData.nom.length <2 || this.formData.nom.length > 15 || this.formData.nom.length == 0)
                   {
                       console.log("nameFail");
                     if(typeof this.formData.nom != "string"){
                         this.erroresForm.nombre.NombreNoValido = true;
                     }
                     else{
                        if(this.formData.nom.length == 0)
                            this.erroresForm.nombre.NoNombre = true;
                        else
                            this.erroresForm.nombre.NombreNoValido = true;
                     }
                     this.erroresForm.nombre.errorNombre = true;
                      this.validationErrors = true;
                     this.uploading= false;
                   };
               if((typeof this.formData.apellido) != "string" || this.formData.apellido.length <2 || this.formData.apellido.length > 15 || this.formData.apellido.length == 0)
                   {
                       console.log("nameFail");
                     if(typeof this.formData.apellido != "string"){
                         this.erroresForm.apellido.ApellidoNoValido = true;
                     }
                     else{
                        if(this.formData.apellido.length == 0)
                            this.erroresForm.apellido.NoApellido = true;
                        else
                            this.erroresForm.apellido.ApellidoNoValido = true;
                     }
                     this.erroresForm.apellido.errorApellido = true;
                     this.uploading= false;
                    this.validationErrors = true;
                   };
               
               if(this.formData.phone.toString().length != 9){
                    this.erroresForm.telefono.telefonoNoValido = true;
                    this.validationErrors = true;
                    this.uploading = false;
               };

                 if(this.credentialsData.newPassWritten.length <6){
                      if(this.credentialsData.newPassWritten.length == 0){
                          this.erroresForm.contrasena.NoContrasena = true;
                      }
                     else{
                         this.erroresForm.contrasena.contrasenaMuyCorta = true;
                     }
                        this.erroresForm.contrasena.errorContrasena = true;
                        this.validationErrors = true;
                        this.uploading = false;
                    }
                
                 if(this.credentialsData.newPassWritten != this.credentialsData.newPassRepited){
                        this.erroresForm.contrasena.contrasenaNoCoincide = true;
                        this.erroresForm.contrasena.errorContrasena = true;
                        this.validationErrors = true;
                        this.uploading = false;
                    }
            
               if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email))){
                    console.log("el emial no es valido");
                    this.erroresForm.email.emailNoValido = true;
                    this.validationErrors = true;
                    this.uploading = false;
                }
               if(this.registerType == 1){
                   deferred.resolve();
               }
               if(this.registerType == 2){
                   if (!this.locationSelectedObj.idPoint){
                       this.erroresForm.location.locationVacia = true;
                       this.validationErrors = true;
                       this.uploading = false;
                   }
                   var cQuery= new checkProfessionalCode(this.professionalCode.name);
                   cQuery.then(function(result){
                       if (result == false){
                           _this.erroresForm.codigoProfesional.codigoNoValido = true;
                           _this.validationErrors = true;
                           _this.uploading = false;
                       }
                       else{
                           _this.professionalCode.id = result;
                           console.log(result);
                           deferred.resolve();
                       }
                   })
                   
               }
              $.when(deferred).done(function(){
                  console.log("entro aqui en deferred antes de validation");
                  console.log(_this.validationErrors);
                  if (!_this.validationsErrors){
                      console.log(_this.registerType);
                      if (_this.registerType == 2){
                          _this.formData.location = _this.locationSelectedObj;
                          _this.formData.type = 2;
                      }
                      else{
                          _this.formData.type = 1;
                      }
                      console.log(_this.formData);
                      var uQuery = new registerUser(_this.formData,_this.credentialsData.newPassWritten,_this.professionalCode.id);
                      uQuery.then(function(result){
                          console.log(result);
                          _this.snackBar = true;
                          _this.uploading = false;
                      })
                      
                  }
              })
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
            goToLogin(){
                this.$router.push('login');
            }
        },
         watch:{
            locationSelectedString : function(val){
            if(this.registerType != 1){
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

        <md-toolbar md-elevation="0" class="md-large md-transparent" ><!--inicio subnavbar-->
    <div class="md-toolbar-row" style="margin-bottom: 10px;">
        
        <img class="md-icon md-size-4x" src="icon/logoWhite.svg" stlye="color:blue;"/>
     
        </div>
    <div style ="text-align: center; margin: 0 auto">
        <h1 class="md-headline" style="color: white; font-size:30px">Registro</h1>
    </div>
      
    </md-toolbar><!-- fin subnavbar-->
        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 10.25%;margin-right: 10.25%;padding-bottom:3em">
            <md-card class="md-elevation-0" style=" border-radius: 10px;box-shadow: 0px 5px 35px -15px rgba(51,51,51,0.5);">
              
        <form id="userForm">
                 <md-card-header-text>
                    <md-list style="font-size:14px; margin: 10px;">
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.email.emailNoValido }">
                                <label>Correo electrónico</label>
                                <md-input id="register_email" v-model="formData.email" placeholder="Email" type="email"></md-input>
                                <md-icon>email</md-icon>
                                <span class="md-error">Email no es válido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.nombre.errorNombre }">
                                <label>Nombre</label>
                                <md-input id="profile_name"  v-model="formData.nom" ></md-input>
                                <md-icon>person</md-icon>
                                <span v-if="erroresForm.nombre.NoNombre" class="md-error">Rellena el nombre</span>
                                <span v-if="erroresForm.nombre.NombreNoValido" class="md-error">Nombre no valido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.apellido.errorApellido }">
                                <label>Apellido</label>
                                <md-input id="profile_name"  v-model="formData.apellido" ></md-input>
                                <md-icon>person</md-icon>
                                <span v-if="erroresForm.apellido.NoApellido" class="md-error">Rellena el apellido</span>
                                <span v-if="erroresForm.apellido.ApellidoNoValido" class="md-error">Apellido no válido</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field  v-bind:class="{ 'md-invalid': erroresForm.telefono.telefonoNoValido }">
                                <label>Teléfono</label>
                                <md-input id="register_phone" v-model="formData.phone" placeholder="Teléfono"></md-input>
                                <md-icon>phone</md-icon>
                                <span class="md-error">Este número no es válido</span>
                            </md-field>
                        </md-list-item>
                         <md-list-item v-if="registerType == 2">
                            <div style="width:100%">
                                <md-autocomplete  v-bind:class="{ 'md-invalid': erroresForm.location.locationVacia }" v-model="locationSelectedString" :md-options="locationsShowed" @md-changed="getLocations" @md-opened="getLocations">
                                    <label>Centro de Atención</label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                                    <span class="md-error">Selecciona una localización</span>
                                </md-autocomplete>
                            </div>
                        </md-list-item>
                        <md-list-item v-if="registerType == 2">
                            <md-field  v-bind:class="{ 'md-invalid': erroresForm.codigoProfesional.codigoNoValido }">
                                <label>Código Profesional</label>
                                <md-input id="register_check_Pcode" v-model="professionalCode.name" placeholder="Código profesional"></md-input>
                                <md-icon>verified_user</md-icon>
                                <span class="md-error">Este código no es válido</span>
                            </md-field>
                        </md-list-item>
                        
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.contrasena.errorContrasena }">
                                <label>Contraseña</label>
                                <md-input id="register_pass" v-model="credentialsData.newPassWritten" placeholder="Contraseña" type="password"></md-input>
                                <span v-if="erroresForm.contrasena.NoContrasena" class="md-error">Rellena la contraseña</span>
                                <span v-if="erroresForm.contrasena.contrasenaMuyCorta" class="md-error">Mínimo 6 caracteres</span>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field v-bind:class="{ 'md-invalid': erroresForm.contrasena.contrasenaNoCoincide }">
                                <label>Repite la contraseña</label>
                                <md-input id="register_pass_repeat" v-model="credentialsData.newPassRepited"  placeholder="Repite la contraseña" type="password"></md-input>
                                <span class="md-error">Las contraseñas no coinciden</span>
                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
</form>

            </md-card>
            <div v-if="uploading" class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:1.5em">
                <div  style="--md-theme-default-primary: #03a9f4;">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </div>
            </div>
            <div v-else class="md-layout md-gutter md-alignment-center-center" style="padding-left:0; text-align:center">
            <md-list>
                <md-list-item>
                  <md-button v-on:click="checkForm" :style="buttonStyle">Registrarse</md-button>
                </md-list-item>
                <md-list-item style="margin-left: auto;
                    margin-right: auto;">
              <span  v-on:click="goToLogin" style=" color:grey;font-size:14px;font-weight: 500;">Ya tengo una cuenta</span>
                </md-list-item>
            </md-list>
            </div>        
    </div>
        <!--Fin datos-->
        
        
        
       

</div>


                      ` };
