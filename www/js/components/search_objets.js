Vue.component('search-objects', {
        props: ["prevTags"],
        data: () => ({
        objectsArray : [],
        objectSelect: {
            id: null,
            index:null
        },
        uploading: false,
        registerDate: null,
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
            marginTop: "30px",
            marginRight: "auto",
            marginBottom: "10px"
        },
        cardStyle1:" border-radius: 10px; width: 150px;"
        ,
        cardStyle2:" border-radius: 10px; width: 150px; border: 6px orange solid"
        
                              

    }),
        created: function(){
         window.scrollTo(0,0);
         this.getList();
         document.body.style= this.bodyStyle;
         this.getCurrentDate();
         /*toolBarData.paginaActual ="SO_step2";
         toolBarData.paginaSiguiente ="";
         toolBarData.paginaAnterior = "SO_step1";*/
         this.$root.$on("detailsFoundObject",this.DetallesDeObjeto);
         this.$root.$on("backToSoStep1",this.changeData);
    },
    destroyed: function(){
         this.$root.$off("detailsFoundObject",this.DetallesDeObjeto);
         this.$root.$off("backToSoStep1",this.changeData);

    },
        methods: {

            selectObject(clave,indice){
                console.log("Entro aqui");
                clave = "found-object-"+clave;
                if (this.objectSelect.id != null){
                    if (this.objectSelect != clave){
                        document.getElementById(this.objectSelect.id).style= this.cardStyle1;
                        document.getElementById(clave).style = this.cardStyle2;
                        this.objectSelect.id = clave;
                        this.objectSelect.index = indice;
                    }           
                }
                else{
                    document.getElementById(clave).style = this.cardStyle2;
                    this.objectSelect.id = clave;
                    this.objectSelect.index = indice;
                    toolBarData.paginaSiguiente = "SO_step3";
                }
            
            },
            getList: function(){
            this.$http.get('https://raw.githubusercontent.com/Penrech/ProyectoAwug3/master/FakeData/PruebasBuscarPorTags.json').then(function (response){
                var tempObjectsArray;
                tempObjectsArray = response.data.searchedObjects;
                this.compareWithTags(tempObjectsArray);
                
            }); },
            /*    if (!this.tagsArray.includes(this.toBeAdded) && this.toBeAdded.length >= 2){
                            this.tagsArray.push(this.toBeAdded);*/
             compareWithTags(tempArray){
                 var tempArrayCaseInsensitive = tempArray;
                 for (i = 0; i < tempArray.length;i++){
                      var cont = 0;
                      for(j = 0; j < this.prevTags.length;j++){
                           for(k=0; k< tempArrayCaseInsensitive[i].tags.length;k++){
                             /* if(tempArray[i].tags.includes(this.prevTags[j])){
                                  cont++;
                              }*/
                               if (tempArrayCaseInsensitive[i].tags[k].toUpperCase() == this.prevTags[j].toUpperCase()){
                                   cont++;
                               }
                           }
                      }
                      if (cont >= 2){
                          var array = tempArray[i];
                          array.coincidencias = cont;
                          if (this.objectsArray.length > 0){
                              if (this.objectsArray[this.objectsArray.length-1].coincidencias > cont){
                                  this.objectsArray.push(array);
                              }
                              else{
                                  this.objectsArray.unshift(array);
                              }
                          }
                          else{
                              this.objectsArray.push(array);
                          }
                          
                      }
                 }
                 console.log(this.objectsArray);
                 this.loading = false;
             },
             getCurrentDate(){
                    var myDate = new Date();
                    var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
                    var date = ('0' + myDate.getDate()).slice(-2);
                    var year = myDate.getFullYear();
                    this.registerDate = date + '/' + month + '/' + year;
                },
                changeData(){
                     var emitObj = {
                       nextStep: 1
                   }
                this.$emit('backToStep1',emitObj);
                },
               DetallesDeObjeto(){
                   console.log("Entro aqui tambien");
                   var emitObj;
                   if (this.objectSelect.id == "found-object-none"){
                       emitObj = {
                           nextStep:3,
                       }
                   }
                   else{
                       emitObj = {
                           nextStep:3,
                           objArray : this.objectsArray[this.objectSelect.index]
                       }
                   }
                   console.log(emitObj);
                   this.$emit('reciveDataStep2',emitObj);

               }
           
        },
        template:`

<div >        
        <!--Inicio de botones-->
        
    <ul class="md-layout md-gutter md-alignment-top-center" style="padding-left:0;margin-top:0">

        <div v-if="loading" style="margin-top:25%;--md-theme-default-primary: white;">
             <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

            <li v-if="!loading" style="list-style:none;padding: 0 12px 24px 12px;">
            <md-card  id="found-object-none" @click.native="selectObject('none',null)" style="border-radius: 10px;width: 150px;">
            <md-card-media-cover style="    overflow: hidden;" >

            <md-card-media md-ratio="1:1">
              <img src="" alt="">
            </md-card-media>

            <md-card-area style="top:0;bottom:unset;">
                <md-card-header>

                <img class="md-icon" :style="heartStyle2" src="icon/heartBreak.svg"></img>

                <span class="md-title" style="font-size:14px;font-weight:600;line-height: 1.4; text-align:center; color:#00c9fa;margin-bottom:10px">Mi objeto no está</span>
              </md-card-header>

            </md-card-area>
          </md-card-media-cover>
        </md-card>
            </li>

            <li v-if="!loading" style="list-style:none;padding: 0 12px 24px 12px;"  v-for="(item,index) in objectsArray" :key="item.id" >
        <md-card :id="'found-object-'+item.id" @click.native="selectObject(item.id,index)" :style="cardStyle1">
          <md-card-media-cover style="    overflow: hidden;" >
            <md-card-media md-ratio="1:1">
              <img :src="item.img" alt="">
            </md-card-media>
          </md-card-media-cover>
        </md-card>
            </li>
 
    
        
    </ul>
        <!--Fin de botones-->
        
        
        

</div>

                      ` });
