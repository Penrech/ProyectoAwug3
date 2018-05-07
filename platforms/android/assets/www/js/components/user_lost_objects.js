const userLostObjectsTemplate = {props: [],
                          data: () => ({
        objectsArray : [],
        showNavigation:false,
        objectSelect: [],
          stepLibrary:{
            step1: {
                step: "1",
                text:"Haz click para ver o editar los detalles de los objetos"
            },
            step2: {
                step: 2,
                text:""
            }
        },
        actualStep:{
            step: "",
            text: ""
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",
                 

    }),
        created: function () {
            window.scrollTo(0,0);
            document.body.style = this.bodyStyle;
            this.actualStep = this.stepLibrary.step1;
            this.$root.$on("goToPreviousState",this.UpdateState);
        },
       destroyed: function(){
           this.$root.$off("goToPreviousState",this.UpdateState);
       },
                                 
        methods: {
            chargeArray(update){
                console.log(update.objArray);
                this.objectsArray = update.objArray;
            },
            changeStep(toStep){
                    if (toStep == 1){
                        this.actualStep = this.stepLibrary.step1;
                        this.objectSelect = null;
                        
                    }
                    else if (toStep == 2){
                       this.actualStep = this.stepLibrary.step2;
                    }
                },
                UpdateState(updateData){
                    if (updateData.objArray){
                        var tempArray = updateData.objArray;
                        tempArray.indice = updateData.indice;
                        this.objectSelect = tempArray;
                    }
                    this.changeStep(updateData.nextStep);
                },
                deleteObj(){
                    this.objectsArray.splice(this.objectSelect.indice,1);
                    this.changeStep(1);
                }

        },
        template:`

<div >

<ULO-step1 v-on:PassArray="chargeArray($event)" v-on:recieveDataStep1="UpdateState($event)" v-if="actualStep.step == 1" :subNavText="actualStep.text" :objectsArray = "objectsArray"></ULO-step1>
<ULO-step2 v-on:backToStep1="UpdateState($event)" v-on:borrarObjeto="deleteObj" v-if="actualStep.step == 2" :objSelect = "objectSelect"></ULO-step2>
        
        
        

</div>

                      ` };
