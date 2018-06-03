Vue.component('ALO-step3', {
        props: ["objSelect"],
        data: () => ({
        loading:true,
        usersClaim: [],
        usersDateString: [],
        objectDate:null,
        ucLen:null,
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
        labelStyle:{
             fontSize:"16px",
            fontWeight:"500",
            marginBottom:"12px"
        },
        inputStyle:{
            fontSize:"16px",
            fontWeight:"200",
            marginTop:"12px"
        },
        inputStyle2:{
            fontSize:"16px",
            fontWeight:"200",
            marginTop:"12px",
            color:"#03a9f4",
            webkitTextFillColor:"#03a9f4"
        }

                              

    }),
        created: function(){
        window.scrollTo(0,0);
        toolBarData.iconoPaginaAnterior = "keyboard_backspace";
        toolBarData.iconoPaginaSiguiente = "";
        toolBarData.paginaActual = "ALO_step3";
        toolBarData.paginaSiguiente = "";
        toolBarData.paginaAnterior = "ALO_step2";
        toolBarData.toolBarTitle = "Reclamantes del objeto";
        this.getObjectDateForEmail();
        let _this = this;
        var uQuery = new getObjectClaimUsers(this.objSelect.id);
        uQuery.then(function(result){
            _this.usersClaim = result;
            _this.ucLen = Object.keys(result).length;
            _this.getFormatDate();
            _this.loading = false;
        })
        this.$root.$on("backToALOStep2",this.changeData);

    },
    destroyed: function(){
         this.$root.$off("backToALOStep2",this.changeData);
    },
        methods: {
             getFormatDate(){
                    let _this = this;
                    this.usersClaim.forEach(function(date){
                    var myDate = new Date(date.reclamado);
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    _this.usersDateString.push(date + '/' + month + '/' + year);
                        
                    })
                   
                },
             getObjectDateForEmail(){
                    var myDate = new Date(this.objSelect.registro);
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    this.objectDate = date + '/' + month + '/' + year;
                 
             },
  
                changeData(){
                     var emitObj = {
                       nextStep: 2
                   }
                this.$emit('backToStep2',emitObj);
                },
            callNumber(){
                  window.location.href="tel:"+this.objSelect.phone;
              }, 
            mailTo(indice){
                var email = this.usersClaim[indice].email;
                var subject="Objeto Perdido";
                var body ="Le recordamos que su objeto perdido hallado el "+this.objectDate+" en "+this.objSelect.location.name+" se encuentra en nuestros almacenes. LLame al "+this.objSelect.phone+" para obtener información de cuando y como recogerlo.";
                subject = subject.replace(/\s/g, "%20");
                body = body.replace(/\s/g, "%20");
                window.location.href="mailto:"+email+"?subject="+subject+"&body="+body;
            }
            
        },
        template:`


<div>

        
        
        <!--Inicio datos-->
        
    <div  style="margin-top:2em;margin-left: 5.25%;margin-right: 5.25% ">

    <div v-if="loading" class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div  style="margin-top:50%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
    </div>

        <div v-if="!loading" style="width: 100%;padding-bottom: 2.5em;">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
                <md-card-header style="padding-top:0">
                 <md-card-header-text >
                    <md-list id="claim_obj_list" style="font-size:14px;">
                      <div  v-for="(item,index) in ucLen" >
                       <md-list-item style="justify-content:center;margin-top:16px">
                            <md-list style="padding-bottom:0">
                                <md-list-item>
                                <md-field>
                                <label :style="labelStyle">Nombre :</label>
                                 <md-textarea md-autogrow v-model="usersClaim[index].nom" :style="inputStyle" disabled></md-textarea>
                                </md-field>
                                </md-list-item>
                                <md-list-item>
                                <md-field>
                                <label :style="labelStyle">Apellido :</label>
                                 <md-textarea md-autogrow v-model="usersClaim[index].apellido" :style="inputStyle" disabled></md-textarea>
                                </md-field>
                                </md-list-item>
                                <md-list-item>
                                <md-field @click.native="mailTo(index)">
                                <label :style="labelStyle">Email :</label>
                                 <md-textarea md-autogrow v-model="usersClaim[index].email" :style="inputStyle2" disabled></md-textarea>
                                </md-field>
                                </md-list-item>
                                <md-list-item>
                                <md-field @click.native="callNumber">
                                <label :style="labelStyle" >Teléfono :</label>
                                 <md-textarea md-autogrow v-model="usersClaim[index].phone" :style="inputStyle2" disabled></md-textarea>
                                </md-field>
                                </md-list-item>
                                <md-list-item>
                                <md-field>
                                <label :style="labelStyle">Fecha de reclamo :</label>
                                 <md-textarea md-autogrow v-model="usersDateString[index]"  :style="inputStyle" disabled></md-textarea>
                                </md-field>
                                </md-list-item>
                            </md-list>
                        </md-list-item>
                        <md-divider v-if="index < ucLen-1"></md-divider>
                      </div>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            </md-card>

            
          </div>        
    </div>

        <!--Fin datos-->
 
        
       

</div>

                      ` });
