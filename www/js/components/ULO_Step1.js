Vue.component('ULO-step1', {props: ["subNavText"],
                          data: () => ({
        objectsArrayTemp: [],
        userObjRef:null,
        userSearchRef:null,
        initialQuery:[],
        nextQueryObj:[],
        nextQuerySearch:[],
        objectsId:[],
        searchId:[],
        noData: false,
        qLen:0,
        lastQueryLen: 0,
        loading:true,
        objectSelect: {
            id: null,
            index:null
        },
        heartStyle1:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginTop: "0px",
            marginRight: "auto",
            marginBottom: "10px"
            
        },
         heartStyle2:{
            fontSize: "22px!important",
            color:"#00c9fa",
            marginTop: "20px",
            marginRight: "auto",
            marginBottom: "10px"
        }
                              

    }),
        created: function () {
            window.scrollTo(0,0);
            /*this.userObjRef=  firebase.database().ref('/usuarios/user1/objetos').once("value");
            this.userSearchRef=  firebase.database().ref('/usuarios/user1/busquedas').once("value");*/
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "ULO_step1";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Mis objetos perdidos";
            this.initialQuery.push(this.userObjRef);
            this.initialQuery.push(this.userSearchRef);
            var data = new getUserLosts(userIdTest);
            let _this = this;
            data.then(function(result){
                if (result == null)
                    _this.noData = true;
                else
                    _this.objectsArrayTemp = result;
                _this.loading = false;
            })

            /*console.log(this.initialQuery);
            Promise.all(this.initialQuery)
            .then(this.getInitialDataRaw); */
            
        
        },
        methods: {
            
            /*getData(){
                //array busquedas
                var Queries=[];
                //busquedas
                var sQuery_promises;
                var sQuery_result;
                var sQuery = firebase.database().ref("busquedas").orderByChild("idUsuario").equalTo("user1")
                .then(function sQfun(snapshot){
                    if (snapshot.val() == null)
                        sQuery_result= null;
                    else{
                        sQuery_result = snapshot.val();
                        snapshot.forEach(function(snapshot){
                            //cada busqueda
                            sQuery_result.push(
                                firebase.database().("tags-busqueda").orderByChild("idBusqueda").equalTo(snapshot.val().idBusqueda)
                            )
                        })
                    }
                })
                //objetos
                var oQuery = firebase.database().ref("obj-usuario").orderByChild("idUsuario").equalTo("user1")
                .then(oQfun);
                var oQuery_result = function oQfun(snapshot){
                    
                }
                
                Promise.all(sQuery_promises)
                    .then(function(data){
                     data.forEach(function(data){
                         console.log(data);
                     })
                })
                
                
            }
           
          /* getInitialDataRaw(querySnapshot) {
            this.qLen = querySnapshot.length;
            querySnapshot.forEach(this.getInitialDataSpecific); 
           },
            
            getInitialDataSpecific(doc){
                
                if (doc.key == "busquedas"){
                    if (doc.val()){
                    empty = false;
                    this.searchId = doc.val();
                    for (var i = 0; i < this.searchId.length; i++) {
                    this.nextQuerySearch.push(
                    firebase.database().ref('/busquedas/' + this.searchId[i]).once('value')
                );}
                        Promise.all(this.nextQuerySearch)
                        .then(this.getNextDataRaw);
            
                }
                }
                else if(doc.key == "objetos"){
                    if (doc.val()){
                    console.log("entro en objetos");
                    empty = false;
                    this.objectsId = doc.val();
                    for (var i = 0; i < this.objectsId.length; i++) {
                    this.nextQueryObj.push(
                    firebase.database().ref('/objetos/' + this.objectsId[i]).once('value')
                );}
                     Promise.all(this.nextQueryObj)
                    .then(this.getNextDataRaw);
                } 
                }
                this.qLen--;
                if (this.qLen == 0){
                    if(this.nextQueryObj.length ==0 && this.nextQuerySearch.length==0)
                        this.noData = true;
                    this.loading = false;
                }
           
            },
            
            getNextDataRaw(querySnapshot) {
            console.log(this.nextQueryObj);
            console.log(querySnapshot);
            if (this.lastQueryLen == 0){this.lastQueryLen = querySnapshot.length;};
            querySnapshot.forEach(this.getNextDataSpecific);
            },
            
            getNextDataSpecific(doc){
                var info = doc.val();
                info.id = doc.key;
                this.objectsArrayTemp.push(info);
                this.lastQueryLen--;
                if (this.lastQueryLen == 0){
                    this.loading = false;
                    var emitObj={
                        searchArray: this.searchId,
                        objArray: this.objectsId
                    };
                    this.$emit("PassArray",emitObj);
                }
            },*/

              selectObject(clave,indice){
                console.log("Entro aqui");
                clave = "user-object-"+clave;
                var emitObj;
                this.objectSelect.id = clave;
                this.objectSelect.index = indice;
                emitObj = {
                        indice: indice,
                        objArray : this.objectsArrayTemp[indice],
                        nextStep : 2
                    }
                    
                
                this.$emit("recieveDataStep1",emitObj);

            },
            toStringTags(data){
               return data.join(", ");
                },


        },
        template:`

<div>

      
<!--inicio subnav-->
  <md-toolbar v-if="subNavText != '' " md-elevation="0" class="md-transparent" >
        <div class="md-toolbar-row" style="justify-content: center;">
        <span class="md-title" style="font-weight: 600;font-size: 14px; margin-left: 0;color: white;  white-space: normal; text-align:center">{{subNavText}}</span>
      </div>
    </md-toolbar>
<!-- fin subnav-->

<!--inicio subnav2-->
  <md-toolbar v-if="noData" md-elevation="0" class="md-transparent" >
        <div class="md-toolbar-row" style="justify-content: center;">
        <span class="md-title" style="font-weight: 300;font-size: 16px; margin-left: 0;color: white;  white-space: normal; text-align:center">No has añadido ningún objeto a la lista</span>
      </div>
    </md-toolbar>
<!-- fin subnav2-->
        
        
        <!--Inicio de botones-->
        
    <ul class="md-layout md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div v-if="loading" style="margin-top:25%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <li style="list-style:none;padding: 0 12px 24px 12px;"  v-for="(item,index) in objectsArrayTemp" :key="item.id">
    <md-card :id="'user-object-'+item.id" @click.native="selectObject(item.id,index)" style="border-radius: 10px;width: 150px;">
      <md-card-media-cover style="    overflow: hidden;" >
        <md-card-media md-ratio="1:1">
          <img v-if="item.img" :src="item.img" alt="">
        </md-card-media>

        <md-card-area v-if="!item.img" style="top:0;bottom:unset;">
            <md-card-header style="padding-top: 10px;">
            
        
             <md-avatar v-if="item.updates > 0" class="md-avatar-icon" style="margin-right: 0;font-size: 14px; width: 30px; min-width: 20px;height: 30px;background-color: limegreen;
    font-weight: 500;float:right;margin-bottom:-10px;">{{item.updates}}</md-avatar>

            <img class="md-icon" v-if="item.updates > 0" :style="heartStyle1" src="icon/heartBreak.svg"></img>
            <img class="md-icon" v-else :style="heartStyle2" src="icon/heartBreak.svg"></img>
         
            <span class="md-title" style="font-size:14px;font-weight:600;line-height: 1.4; text-align:center; color:#00c9fa;margin-bottom:10px">Objeto no encontrado</span>
            <span class="md-subhead" style="font-size:12px;font-weight:200; line-height: 1.2; text-align:center;color:#d9d9d9" >{{toStringTags(item.tags)}}</span>
          </md-card-header>

        </md-card-area>
      </md-card-media-cover>
    </md-card>
        </li>
        
    
        
    </ul>
        <!--Fin de botones-->
        
        
        
</div>

                      ` });
