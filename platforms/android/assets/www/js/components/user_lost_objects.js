const userLostObjectsTemplate = {props: [],
                          data: () => ({
        objectsID : [],
        searchID : [],
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
            },
            step3:{
                step: 3,
                text:""
            },
            step4:{
                step: 4,
                text:""
            },
        },
        actualStep:{
            step: "",
            text: ""
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",
                 

    }),
        created: function () {
            if (UserType == 1){
            window.scrollTo(0,0);
            document.body.style = this.bodyStyle;
            this.actualStep = this.stepLibrary.step1;
            this.$root.$on("goToPreviousState",this.UpdateState);
            }
        },
       destroyed: function(){
           this.$root.$off("goToPreviousState",this.UpdateState);
       },
                                 
        methods: {
            chargeArray(update){
                console.log(update.objArray);
                this.objectsID = update.objArray;
                this.searchID= update.searchArray;
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
                   if (this.objectSelect.img){
                       var index = this.objectsID.indexOf(this.objectSelect.id);
                       this.objectsID.splice(index,1);
                       firebase.database().ref('/usuarios/user1/objetos').set(this.objectsID).then(this.changeStep(1));
                   
                   }
                   else{
                    var index = this.searchID.indexOf(this.objectSelect.id);
                    this.searchID.splice(index,1);
                    firebase.database().ref('/usuarios/user1/busquedas').set(this.searchID).then(this.changeStep(1));
                   }

                }

        },
        template:`

<div >

<ULO-step1 v-on:PassArray="chargeArray($event)" v-on:recieveDataStep1="UpdateState($event)" v-if="actualStep.step == 1" :subNavText="actualStep.text"></ULO-step1>
<ULO-step2 v-on:backToStep1="UpdateState($event)" v-on:borrarObjeto="deleteObj" v-if="actualStep.step == 2" :objSelect = "objectSelect"></ULO-step2>
        
        
        

</div>

                      ` };
