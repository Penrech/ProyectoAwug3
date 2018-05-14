const searchObjectTemplate = {props: [],
                          data: () => ({

        showNavigation:false,
        stepperLen:2,
        tags: [],
        objectSelect: null,
        stepLibrary:{
            step1: {
                step: "1",
                text:"Añade o borra tags para describir bien el objeto que quieres encontrar",
            },
            step2: {
                step: 2,
                text:"Compara con los resultados de la lista y encuentra tu objeto",
            },
            step3:{
                step: 3,
                text: null
            }
        },
        actualStep:{
            step: "",
            text: "",
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa); background-repeat: no-repeat; background-size: 100% 50%; background-color: white;",
       
                              

    }),
        created: function () {
            //document.body.style = this.bodyStyle;
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "done";
            toolBarData.paginaActual = "SearchObject";
            toolBarData.paginaSiguiente = "SO_step2";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Encontrar un objeto";
            this.actualStep = this.stepLibrary.step1;
            this.$root.$on("goToPreviousState",this.UpdateState);
           
        },
        destroyed:function(){
            this.$root.$off("goToPreviousState",this.UpdateState);
        },
        methods: {
           
                changeStep(toStep){
                    if (toStep == 1){
                        this.actualStep = this.stepLibrary.step1;
                        toolBarData.paginaAnterior = "homeUser";
                        toolBarData.paginaActual = "SO_step1"
                        toolBarData.paginaSiguiente = "";
                        toolBarData.iconoPaginaAnterior = "keyboard_backspace";
                        //this.tags = [];
                    }
                    else if (toStep == 2){
                       this.actualStep = this.stepLibrary.step2;
                       toolBarData.paginaActual = "SO_step2";
                       toolBarData.paginaAnterior = "SO_step1";
                       toolBarData.paginaSiguiente = "";
                       this.objectSelect = null;
                       toolBarData.toolBarTitle = "Encontrar un objeto";
                       toolBarData.iconoPaginaAnterior = "clear";
                    }
                    else if (toStep == 3){
                        this.actualStep = this.stepLibrary.step3;
                        console.log(this.actualStep);
                        toolBarData.paginaActual = "SO_step3";
                        toolBarData.paginaAnterior = "SO_step2";
                        toolBarData.paginaSiguiente = "";
                        toolBarData.toolBarTitle = "Detalles del objeto";
                        toolBarData.iconoPaginaAnterior = "keyboard_backspace";
                    }

                },
                UpdateState(updateData){
                    if (updateData.objArray){
                        this.objectSelect = updateData.objArray;
                    }
                     if (updateData.tags){
                        this.tags = updateData.tags;
                    }
                    this.changeStep(updateData.nextStep);
                    console.log(this.tags);
                },
              goBackHome () {
                  this.$router.push('homeUser');
              },
             
           
        },
        template:`

<div>


        <!--inicio subnav-->
          <stepper-tool v-if="actualStep.step != 3" :step="actualStep.step" :length="stepperLen" :text="actualStep.text"></stepper-tool>
        <!-- fin toolbar de la app-->
        
        
        <!--Inicio de body-->
        <generate-tags-search v-if="actualStep.step == 1" :prevTags="tags" v-on:reciveDataStep1="UpdateState($event)"></generate-tags-search>
        <search-objects v-if="actualStep.step == 2" :prevTags="tags" v-on:backToStep1="UpdateState($event)" v-on:reciveDataStep2="UpdateState($event)"></search-objects>
        <found-object-details v-if="actualStep.step == 3" :prevTags="tags" :objSelect="objectSelect" v-on:backToStep2="UpdateState($event)"></found-object-details>
        <!--Fin de body-->

        
        
        
</div>
                      ` };
