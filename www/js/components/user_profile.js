const userProfileTemplate = {props: [], 
        data: () => ({
        ActualStep:1,
        
       
    }),
        created: function(){
          
        },
        destroyed: function(){
            
        },
        methods: {
         UpdateStep(update){
             console.log("entro aqui");
             console.log("proximo")
            this.ActualStep = update.nextStep;
         }
           
        },
        template:`

<div>

<Up-step1 v-if="ActualStep == 1" v-on:goToStep="UpdateStep($event)"></Up-step1>
<Up-step2 v-if="ActualStep == 2" v-on:backToStep1="UpdateStep($event)"></Up-step2>
<Up-step3 v-if="ActualStep == 3" v-on:backToStep1="UpdateStep($event)"></Up-step3>

</div>


                      ` };
