Vue.component('stepper-tool', {
    props:['step','length',"text"],
     data: () => ({
         mainStyle:{
             justifyContent: "center",
             marginLeft: "14%",
             marginRight: "14%"
         },
         normalStyle:{
             margin: "0", 
             padding: "0",
             fontSize: "14px", 
             width: "35px", 
             minWidth: "35px",
             height: "35px",
             background:"none",
             fontWeight: "200",
             border: "1px solid white",
             
         },
         selectedStyle:{
             margin: "0", 
             padding: "0",
             fontSize: "14px", 
             width: "45px", 
             minWidth: "45px",
             height: "45px",
             background:"white",
             fontWeight: "200",
             border: "1px solid white",
             color: "#03a9f4"
         },
         backgroundStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa);"
             
         
        
         
     }),
    created: function(){
        if(this.length == 2){
            this.mainStyle.marginLeft = "25%";
            this.mainStyle.marginRight = "25%";
        }
            
            
    },
    methods:{
        
        
        
        
    },
    
    template: `

  <md-toolbar md-elevation="0" class="md-large md-transparent"  :style="backgroundStyle">
         <div class="md-toolbar-row" :style="mainStyle">
        
         <div class="md-toolbar-section-start">
             <md-avatar v-if="step == 1" class="md-avatar-icon" :style="selectedStyle">1</md-avatar>
             <md-avatar v-else class="md-avatar-icon" :style="normalStyle">1</md-avatar>
             <hr  style="  width: 100%;
                color: white;
                background: white;
                background-color: white;
                border-style: solid;
                border-color: white;">
        </div>
            
          <md-avatar v-if="step == 2" class="md-avatar-icon" :style="selectedStyle">2</md-avatar>
         <md-avatar  v-else class="md-avatar-icon" :style="normalStyle">2</md-avatar>
             
           <div v-if="length == 3" class="md-toolbar-section-end">
               <hr style="  width: 100%;
                color: white;
                background: white;
                background-color: white;
                border-style: solid;
                border-color: white;">
             <md-avatar v-if="step == 3" class="md-avatar-icon" :style="selectedStyle">3</md-avatar>
             <md-avatar v-else class="md-avatar-icon" :style="normalStyle">3</md-avatar>
        </div>
         
        
      </div>
          <div class="md-toolbar-row" style="justify-content:center">
          <span class="md-title" style="font-weight: 400;font-size: 12px; margin-left: 0;color: white;  white-space: normal; text-align:center">{{text}}</span>
          </div>
    </md-toolbar>

    `
});