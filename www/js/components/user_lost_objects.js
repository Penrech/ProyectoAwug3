const userLostObjectsTemplate = {props: ["goToHome"],
                          data: () => ({
        objectsArray : [
            {id: "1", img: "img/bolso.png",state:"1"},
            {id: "2", img: "img/bolso.png",state:"1"},
            {id: "3", img: "img/bolso.png",state:"2"}
                       ],
       /* activeNavigation: false,*/
        showNavigation:false
    }),
        methods: {
              completeProfile () {
                
              },
              goToLostObjetcts () {
                
              }
           
        },
        template:`

<div >

      <md-toolbar md-elevation="0" class="md-large md-transparent" ><!--inicio toolbar-->
      <div class="md-toolbar-row " style="text-align: center">
  

          <md-button class="md-icon-button" @click="goToHome()">
            <md-icon style="color:white">keyboard_backspace</md-icon>
          </md-button>
        
          
        <h3 class="md-title " style="flex: 1 ; margin-left: 0;color: white ">Mis objetos perdidos</h3>


          <md-button class="md-icon-button" v-on:click="showNavigation = true" >
            <md-icon style="color:white">menu</md-icon>
          </md-button>

      </div>
 
        <div class="md-toolbar-row" style="justify-content: center;">
        <h5 class="md-title" style="font-weight: 600;font-size: 14px; margin-left: 0;color: white">Haz click para ver o editar los detalles de los objetos</h5>
      </div>
    </md-toolbar><!-- fin toolbar de la app-->
        
        
        <!--Inicio de botones-->
        
    <div class="md-layout md-gutter" style="margin-left: 6.25%; ">
        <div class="md-layout-item">
           <md-card  style="border-radius: 10px;width: 150px;margin-bottom: 12px">
      <md-card-media-cover >
        <md-card-media md-ratio="1:1">
          <img src="img/bolso.png" alt="bolso">
        </md-card-media>

        <md-card-area style="margin-bottom: 70%;">

          <md-card-actions>

            <md-button class="md-icon-button" style="background-color: #ffae34; width: 30px;
    min-width: 30px;
    height: 30px;" disabled>
              <md-icon style="font-size: 14px!important">done</md-icon>
            </md-button>
              
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
        </div>
        
        <div class="md-layout-item">
             <md-card  style="border-radius: 10px;width: 150px;margin-bottom: 12px">
      <md-card-media-cover >
        <md-card-media md-ratio="1:1">
          <img src="img/bolso.png" alt="bolso">
        </md-card-media>

        <md-card-area style="   margin-bottom: 70%;">

          <md-card-actions>

            <md-button class="md-icon-button" style="background-color: #ffae34;max-width: 20px;width: 30px;
    min-width: 30px;
    height: 30px;" disabled>
              <md-icon style="font-size: 14px!important">done</md-icon>
            </md-button>
              
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
        </div>
        
        
        
       
        
    </div>
        <!--Fin de botones-->
        
        
        

</div>

                      ` };
