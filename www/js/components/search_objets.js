Vue.component('search-objects', {
        props: ["prevTags"],
        data: () => ({
        objectsArray : [],
        qLen: 0,
        objIDTemp:[],
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
         //this.getList();
         document.body.style= this.bodyStyle;
         this.compareTags();
         //this.getCurrentDate();
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
                console.log(clave);
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
            
            compareTags(){
                var dbPromises=[];
                for (var i = 0; i < this.prevTags.length; i++) {
                  dbPromises.push(
                      ref.ref('/tags-obj/' + this.prevTags[i]).once('value')
                  );
                }
                Promise.all(dbPromises).then(this.getDataRaw);
            },
            
            getDataRaw(querySnapshot){
                console.log(dbPromises);
               this.qLen = querySnapshot.length;
               querySnapshot.forEach(this.getDataObjRaw);
            },
            
            getDataObjRaw(doc){
                console.log(doc.val());
                let _this = this;
            if (doc.val() != null){
              if(this.objIDTemp.indexOf(doc.val()) == -1)
                  this.objIDTemp = this.objIDTemp.concat(doc.val().filter(function(item){
                      return _this.objIDTemp.indexOf(item)<0;
                  }));
                }
              this.qLen--;
              if (this.qLen == 0){
                    if (this.objIDTemp.length == 0)
                        this.loading = false;
                    var dbPromises2 = [];
                    for (var i = 0; i < this.objIDTemp.length; i++) {
                          dbPromises2.push(
                              ref.ref('/objetos/' + this.objIDTemp[i]).once('value')
                            )
                    }

                    Promise.all(dbPromises2)
                  .then(this.getDataObjSpecific);
              }
             

            },
            getDataObjSpecific(newQuery){
                        let _this = this;
                        var len = newQuery.length;
                        newQuery.forEach(function(doc2){
                            _this.objectsArray.push(doc2.val());
                            len--;
                            if (len == 0 )
                                console.log(_this.objectsArray);
                                _this.loading = false;

                        })
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
        <md-card :id="'found-object-'+item.name" @click.native="selectObject(item.name,index)" :style="cardStyle1">
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
