const searchObjectTemplate = {props: [],
                          data: () => ({

        stepperLen:2,
        searchFromUserList:null,
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
            toolBarData.iconoPaginaAnterior = "keyboard_backspace";
            toolBarData.iconoPaginaSiguiente = "done";
            toolBarData.paginaActual = "SearchObject";
            toolBarData.paginaSiguiente = "SO_step2";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Encontrar un objeto";
            if (Object.keys(this.$route.params).length > 0)
            this.searchFromUserList = this.$route.params;
            if (this.searchFromUserList != null){
                this.tags = this.searchFromUserList.tags;
                this.actualStep = this.stepLibrary.step2;
            }
            else
                this.actualStep = this.stepLibrary.step1;
            this.$root.$on("goToPreviousState",this.UpdateState);
           
        },
        destroyed:function(){
            this.$root.$off("goToPreviousState",this.UpdateState);
        },
        methods: {
           
                changeStep(toStep){
                    if (toStep == 1){
                        if (this.searchFromUserList != null){
                         this.$router.push('userLostObjects');
                        }
                        else{
                        this.actualStep = this.stepLibrary.step1;
                        toolBarData.paginaAnterior = "homeUser";
                        toolBarData.paginaActual = "SO_step1"
                        toolBarData.paginaSiguiente = "";
                        toolBarData.iconoPaginaAnterior = "keyboard_backspace";
                        }
                    }
                    else if (toStep == 2){
                       this.actualStep = this.stepLibrary.step2;
                       this.objectSelect = null;
                    }
                    else if (toStep == 3){
                        this.actualStep = this.stepLibrary.step3;
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
                },
              goBackHome () {
                  this.$router.push('homeUser');
              },
             
           
        },
        template:`

<div>


        <!--inicio subnav-->
          <stepper-tool v-if="actualStep.step != 3 && searchFromUserList == null" :step="actualStep.step" :length="stepperLen" :text="actualStep.text"></stepper-tool>
        <!-- fin toolbar de la app-->
        
        
        <!--Inicio de body-->
        <generate-tags-search v-if="actualStep.step == 1" :prevTags="tags" v-on:reciveDataStep1="UpdateState($event)"></generate-tags-search>
        <search-objects v-if="actualStep.step == 2" :prevTags="tags" v-on:backToStep1="UpdateState($event)" :searched="searchFromUserList" v-on:reciveDataStep2="UpdateState($event)"></search-objects>
        <found-object-details v-if="actualStep.step == 3"  :searched="searchFromUserList" :prevTags="tags" :objSelect="objectSelect" v-on:backToStep2="UpdateState($event)"></found-object-details>
        <!--Fin de body-->

        
        
        
</div>
                      ` };
