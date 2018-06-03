    Vue.use(VueMaterial.default);
    Vue.use(VueRouter);
   
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCy4oTUcWE3FkWeZMThJiZtPphDuLAowv8",
    authDomain: "lostandfound-201917.firebaseapp.com",
    databaseURL: "https://lostandfound-201917.firebaseio.com",
    projectId: "lostandfound-201917",
    storageBucket: "lostandfound-201917",
    messagingSenderId: "314216184364"
  };
firebase.initializeApp(config);
var ref = firebase.database();
var st= firebase.storage();


var user;
var UserType;
var AuthType="normal";
var userIdTest = null;

function startListeners(thisV){

firebase.auth().onAuthStateChanged(function(usuario) {
if(AuthType == "normal"){
var deferred = $.Deferred();
var deferred2 = $.Deferred();
var deferred3 = $.Deferred();
  if (usuario) {
    // User is signed in.
    userIdTest = usuario.uid;
    firebase.database().ref("usuarios/"+userIdTest).on('value', function(snapshot){
                user = snapshot.val();
            if (deferred.state() == "pending")
                deferred.resolve(user);
            });  
  } else {
    // No user is signed in.
    user = null;
    UserType= null;
    userIdTest= null;
    if(toolBarData.paginaActual != "login")
        deferred3.resolve();
  }
    
   $.when(deferred).done(function(x){
        UserType = x.type;
        sideBarData.userType = UserType;
        thisV.showSidepanel = true;
        thisV.$router.push("homeUser");
    })
    $.when(deferred3).done(function(){
        thisV.showSidepanel = false;
        sideBarData.showNavigation = false;
        thisV.$router.push("login");
    })
}
});
}



var toolBarData = {paginaActual: "",paginaAnterior:"",iconoPaginaAnterior:"",paginaSiguiente:"",iconoPaginaSiguiente:"",toolBarTitle:""};
var sideBarData = {showNavigation: false, userType: UserType};

function init(){
    mountApp();

}
function mountApp(){
    
    
        
    const routes = [

            {path: '/uploadobject', name: 'uploadObject',  component: uploadObjectTemplate},
            {path: '/login', name: 'login',  component: loginTemplate},
            {path: '/register', name: 'register',  component: registerTemplate, props: true},    
            {path: '/registrationtype', name: 'registrationType',  component: registrationTypeTemplate},
            {path: '/homeuser', name: 'homeUser',  component: HomeUserTemplate},
            {path: '/userlostobjects', name: 'userLostObjects',  component: userLostObjectsTemplate},
            {path: '/userprofile', name: 'userProfile',  component: userProfileTemplate},
            {path: '/searchObject', name: 'searchObject',  component: searchObjectTemplate,props:true},
            {path: '/allLostObjects', name: 'allLostObjects',  component: allLostObjectsTemplate},
            {path: '/inicio', name: 'inicio',  component: inicioTemplate}
            ];

        const router = new VueRouter({
                routes // short for `routes: routes`
            });

   const app = new Vue({
        el: '#app',
        router,
        data: { showNavigation: false,
                showSidepanel: false,
                bodyStyle:"background: linear-gradient(to right, #03a9f4, #81d4fa)",
              message: 'Hola!'},
        created: function(){
            document.addEventListener("backbutton",this.HandlerBackButton,false);
        },
        mounted:function(){

            let _this = this;
            startListeners(_this);
        },
        methods: {
           HandlerBackButton(){
            if (toolBarData.paginaActual == "UO_step2")
                this.$root.$emit("backToUoStep1");
            else if (toolBarData.paginaActual == "UO_step3")
                this.$root.$emit("backToUoStep2");
            else if (toolBarData.paginaActual == "userProfile")
                this.$root.$emit ("backFromProfileToHome");
            else if (toolBarData.paginaActual == "editProfile")
                this.$root.$emit ("backToUserProfile");
            else if (toolBarData.paginaActual == "editCredentials")
                this.$root.$emit ("backToUserProfile");
            else if (toolBarData.paginaActual == "SO_step2")
                this.$root.$emit ("backToSoStep1");
            else if (toolBarData.paginaActual == "SO_step3")
                this.$root.$emit ("backToSoStep2");
            else if (toolBarData.paginaActual == "ULO_step2")
                this.$root.$emit ("backToULOStep1");
            else if (toolBarData.paginaActual == "ALO_Step3")
                this.$root.$emit ("backToALOStep2");
            else if (toolBarData.paginaActual == "ALO_Step2")
                this.$root.$emit ("backToALOStep1");
            else if (toolBarData.paginaAnterior == "homeUser")
                this.$router.push("homeUser");
            else if (toolBarData.paginaActual == "homeUser"){
                
            }
            else if(toolBarData.paginaActual == "login"){}
            else if(toolBarData.paginaActual == "register"){
                this.$root.$emit ("backToRegisterType");
            }
            else if(toolBarData.paginaActual == "registrationType"){
                this.$root.$emit ("backToLogin");
            }
            else
                window.history.back();
    
}
        }
            
      }).$mount('#app');
    
    //router.push('settings');
    router.push({ name: 'inicio'})
}

        

