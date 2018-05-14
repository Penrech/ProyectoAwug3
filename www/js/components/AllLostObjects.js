const allLostObjectsTemplate = {props: [],
                          data: () => ({
        objectSelect: null,
        showNavigation:false,
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",
        actualStep:1,
        
                              

    }),
        created: function () {
            window.scrollTo(0,0);
            document.body.style = this.bodyStyle;
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "menu";
            toolBarData.paginaActual = "allLostObjects";
            toolBarData.paginaSiguiente = "activarMenu";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Lista de objetos perdidos";
            this.$root.$on("goToPreviousState",this.UpdateState);
        
        },
        deleted: function(){
            this.$root.$off("goToPreviousState",this.UpdateState);
        },
        methods: {
            
            changeStep(toStep){
                    if (toStep == 1){
                        this.actualStep = 1;
                    }
                    else if (toStep == 2){
                       this.actualStep = 2;
                    }
                    else if (toStep == 3){
                        this.actualStep = 3;
                    }

                },
                UpdateState(updateData){
                    if (updateData.objArray){
                        this.objectSelect = updateData.objArray;
                    }
                    this.changeStep(updateData.nextStep);
                },
           
        },
        template:`

<div >

 <ALO-step1 v-if="actualStep == 1" v-on:receiveDataStep1="UpdateState($event)"></ALO-step1>
 <ALO-step2 v-if="actualStep == 2" v-on:receiveDataStep2="UpdateState($event)" :objSelect="objectSelect" v-on:backToStep1="UpdateState($event)"></ALO-step2>
 <ALO-step3 v-if="actualStep == 3" :objSelect="objectSelect" v-on:backToStep2="UpdateState($event)"></ALO-step3>
 
</div>

                      ` };
