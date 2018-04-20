const uploadObjectTemplate = {props: [],
                          data: () => ({

        showNavigation:false,
        imageData: null,
        stepperLen:3,
        stepLibrary:{
            step1: {
                step: "1",
                text:"Sube una fotografía para crear tags automáticamente"
            },
            step2: {
                step: 2,
                text:"Añade o borra tags para describir bien el objeto"
            },
            step3:{
                step:3,
                text:"Revisa que la información del objeto sea correcta"
            } 
        },
        actualStep:{
            step: "",
            text: ""
        },
        bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa); background-repeat: no-repeat; background-size: 100% 50%; background-color: white;",
       
                              

    }),
        created: function () {
            document.body.style = this.bodyStyle;
            toolBarData.iconoPaginaAnterior = "clear";
            toolBarData.iconoPaginaSiguiente = "done";
            toolBarData.paginaActual = "uploadObject";
            toolBarData.paginaSiguiente = "";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Nuevo objeto perdido";
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
                    }
                    else if (toStep == 2){
                       this.actualStep = this.stepLibrary.step2;
                       toolBarData.paginaAnterior = "UO_step1";    
                    }
                    else if (toStep == 3){
                        this.actualStep = this.stepLibrary.step3;
                        toolBarData.paginaAnterior = "UO_step2"; 
                    }
                },
                UpdateState(updateData){
                    this.imageData = updateData.imgUrl;
                    this.changeStep(updateData.nextStep);
                    console.log("path imagen: "+this.imageData);
                    console.log("paso a step: "+updateData.nextStep);
                },
              goBackHome () {
                  this.$router.push('homeUser');
              }
           
        },
        template:`

<div>


        <!--inicio subnav-->
          <stepper-tool :step="actualStep.step" :length="stepperLen" :text="actualStep.text"></stepper-tool>
        <!-- fin toolbar de la app-->
        
        
        <!--Inicio de body-->
        <capture-img v-if="actualStep.step == 1" v-on:reciveDataStep1="UpdateState($event)"></capture-img>
        <!--Fin de body-->

        
        
        
</div>
                      ` };
