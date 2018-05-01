Vue.component('search-objects', {
        props: ["prevTags"],
        data: () => ({
        objectsArray : [],
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
            marginTop: "20px",
            marginRight: "auto",
            marginBottom: "10px"
        }
                              

    }),
        created: function(){
         window.scrollTo(0,0);
         this.getList();
         document.body.style= this.bodyStyle;
         this.getCurrentDate();
         toolBarData.paginaActual ="SO_step2";
         toolBarData.paginaSiguiente ="";
         toolBarData.paginaAnterior = "SO_step1";
         this.$root.$on("saveObject",this.passToNextStep);
         this.$root.$on("backToSoStep1",this.changeData);
    },
    destroyed: function(){
         this.$root.$off("saveObject",this.passToNextStep);
         this.$root.$off("backToSoStep1",this.changeData);

    },
        methods: {
            getList: function(){
            this.$http.get('https://raw.githubusercontent.com/Penrech/ProyectoAwug3/master/FakeData/UserLostList.json').then(function (response){
                this.objectsArray = response.data.userLostList;
                //this.loading = false;
                //console.log(response.data.userLostList);
            }); },
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
                this.$emit('backtoStep1',emitObj);
                },
               MarcarComoEncontrado(){

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
            <md-card  style="border-radius: 10px;width: 150px;">
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

            <li v-if="!loading" style="list-style:none;padding: 0 12px 24px 12px;"  v-for="item in objectsArray" :key="item.id">
        <md-card  style="border-radius: 10px;width: 150px;">
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
