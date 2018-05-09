Vue.component('found-object-details', {
        props: ["prevTags","objSelect"],
        data: () => ({
        uploading: false,
        tagsString: null,
        registerDate :null,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",
        loading:true,                      
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
            marginRight: "auto",
            marginBottom: "30px"
        },
        labelSpan:{
            fontSize:"16px",
            fontWeight:"500",
            marginRight: "15px"
        },
        textSpan:{
            fontSize:"16px",
            fontWeight:"500",
        },
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
        labelStyle:{
             fontSize:"16px",
            fontWeight:"500",
            marginBottom:"12px"
        },
        inputStyle:{
            fontSize:"16px",
            fontWeight:"200",
            marginTop:"12px"
        }

                              

    }),
        created: function(){
         window.scrollTo(0,0);
         document.body.style= this.bodyStyle;
         this.getFormatDate();
         this.$root.$on("backToSoStep2",this.changeData);
         console.log(this.objSelect);
         this.toStringTags();
    },
    destroyed: function(){
         this.$root.$off("backToSoStep2",this.changeData);

    },
        methods: {
             toStringTags(){
                 if(this.objSelect == null)
                    this.tagsString = this.prevTags.toString();
                 else
                    this.tagsString = this.objSelect.tags.toString();
                },
           
           /* getList: function(){
            this.$http.get('https://raw.githubusercontent.com/Penrech/ProyectoAwug3/master/FakeData/PruebasBuscarPorTags.json').then(function (response){
                var tempObjectsArray;
                tempObjectsArray = response.data.searchedObjects;
                this.compareWithTags(tempObjectsArray);
                
            }); },*/
                getFormatDate(){
                    if (this.objSelect){
                    var myDate = new Date(this.objSelect.registro);
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    this.registerDate = date + '/' + month + '/' + year;
                    }
                    else{
                    this.registerDate = new Date().getTime();
                    }
                },
                changeData(){
                     var emitObj = {
                       nextStep: 2
                   }
                this.$emit('backToStep2',emitObj);
                },
               guardarObjeto(){


               }
           
        },
        template:`


<div>

        
        
        <!--Inicio datos-->
        
    <div  v-if="objSelect != null" style="margin-top:2em;margin-left: 5.25%;margin-right: 5.25% ">
        <div  style="width: 100%">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
                <md-card-header>
                 <md-card-header-text >
                    <md-list id="details_obj_list" style="font-size:14px;">
                       <md-list-item style="justify-content:center">
                      <img :src="objSelect.img" alt="" style="width:100%;border-radius:7px">
                        </md-list-item>
                        <md-list-item style="margin-top:1.5em">
                            <md-field>
                                <label :style="labelStyle">Tags :</label>
                                 <md-textarea v-model="objSelect.tags" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Localización:</label>
                                <md-textarea v-model="objSelect.location" md-autogrow :style="inputStyle" disabled></md-textarea>
                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Número de ayuda:</label>
                                <md-textarea v-model="objSelect.phone" md-autogrow :style="inputStyle" disabled></md-textarea>

                            </md-field>
                        </md-list-item>
                        <md-list-item>
                            <md-field>
                                <label :style="labelStyle">Fecha de registro:</label>
                                <md-textarea v-model="registerDate" md-autogrow :style="inputStyle" disabled></md-textarea>

                            </md-field>
                        </md-list-item>
                    </md-list>
                </md-card-header-text>
              </md-card-header>
            </md-card>

            <div style="text-align: center;">
              <md-button  v-on:click="guardarObjeto" :style="buttonStyle">Guardar objeto</md-button>
            </div>
          </div>        
    </div>

    <div  v-else style="margin-top:2em;margin-left: 5.25%;margin-right: 5.25% ">
        <div  style="width: 100%">
            <md-card class="md-elevation-0" style=" border-radius: 10px;">
           <!-- <md-card-media-cover style="    overflow: hidden;" >

            <md-card-media md-ratio="1:1">
              <img src="" alt="">
            </md-card-media>-->

            <md-card-area>
                <md-card-header style=" display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                flex-direction: column;padding: 15%">

                <img class="md-icon md-size-3x" :style="heartStyle2" src="icon/heartBreak.svg"></img>

                <span class="md-title" style="font-size:16px;font-weight:600;line-height: 1.4; text-align:center; color:black;margin-bottom:10px">Lo sentimos</span>
                <span class="md-title" style="font-size:14px;font-weight:400;line-height: 1.4; text-align:center; color:black;">Vuelve a intentarlo más tarde. Puedes guardar tu búsqueda para realizar este proceso más rápidamente la próxima vez.</span>
              </md-card-header>

            </md-card-area>
        <!-- </md-card-media-cover>-->
        </md-card>


            <div style="text-align: center;">
              <md-button  v-on:click="guardarObjeto" :style="buttonStyle">Guardar busqueda</md-button>
            </div>
          </div>        
    </div>
        <!--Fin datos-->
        
        
        
       

</div>

                      ` });
