const uploadObjectTemplate = {props: [],
                          data: () => ({

        showNavigation:false,
        imageData: null,
        userTestData:{
            location: "C/ Guadalajara Nº 1-3 08006,Barcelona",
            phone: "+34 628 826 123"
        },
        stepperLen:3,
        tags: [],
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
            //document.body.style = this.bodyStyle;
            toolBarData.iconoPaginaAnterior = "clear";
            toolBarData.iconoPaginaSiguiente = "done";
            toolBarData.paginaActual = "uploadObject";
            toolBarData.paginaSiguiente = "";
            toolBarData.paginaAnterior = "homeUser";
            toolBarData.toolBarTitle = "Nuevo objeto perdido";
            this.actualStep = this.stepLibrary.step3;
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
                        toolBarData.paginaActual = "UO_step1"
                        toolBarData.paginaSiguiente = "";
                        this.tags = [];
                    }
                    else if (toStep == 2){
                       this.actualStep = this.stepLibrary.step2;
                       toolBarData.paginaActual = "UO_step2"
                       toolBarData.paginaAnterior = "UO_step1";
                       if (this.tags.length >0)
                           toolBarData.paginaSiguiente = "UO_step3";
                       else
                            toolBarData.paginaSiguiente = "";
                    }
                    else if (toStep == 3){
                        this.actualStep = this.stepLibrary.step3;
                        toolBarData.paginaActual = "UO_step3"
                        toolBarData.paginaAnterior = "UO_step2"; 
                    }
                },
                UpdateState(updateData){
                    if (updateData.imgUrl != "unChanged"){
                        this.imageData = updateData.imgUrl;}
                    this.changeStep(updateData.nextStep);
                    if (updateData.tags){
                        this.tags = updateData.tags;
                    }
                    console.log("path imagen: "+this.imageData);
                    console.log("paso a step: "+updateData.nextStep);
                },
              goBackHome () {
                  this.$router.push('homeUser');
              },
             
           
        },
        template:`

<div>


        <!--inicio subnav-->
          <stepper-tool :step="actualStep.step" :length="stepperLen" :text="actualStep.text"></stepper-tool>
        <!-- fin toolbar de la app-->
        
        
        <!--Inicio de body-->
        <capture-img v-if="actualStep.step == 1" v-on:reciveDataStep1="UpdateState($event)"></capture-img>
        <generate-tags v-if="actualStep.step == 2" :imgSrc="imageData" :prevTags="tags" v-on:backtoStep1="UpdateState($event)" v-on:reciveDataStep2="UpdateState($event)"></generate-tags>
        <save-object v-if="actualStep.step == 3" :imgSrc="imageData" :prevTags="tags" :location="userTestData.location" :phone="userTestData.phone" v-on:backtoStep2="UpdateState($event)"></save-object>
        <!--Fin de body-->

        
        
        
</div>
                      ` };
