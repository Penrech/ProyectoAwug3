    Vue.use(VueMaterial.default);
    Vue.use(VueRouter);
   
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCy4oTUcWE3FkWeZMThJiZtPphDuLAowv8",
    authDomain: "lostandfound-201917.firebaseapp.com",
    databaseURL: "https://lostandfound-201917.firebaseio.com",
    projectId: "lostandfound-201917",
    storageBucket: "lostandfound-201917.appspot.com",
    messagingSenderId: "314216184364"
  };
firebase.initializeApp(config);
var db = firebase.firestore();
var ref = firebase.database();

var busquedas = ["galaxy","movil"];
var dbPromises = [];
var cont = [];
var results = [];
/*
// v1

for (var i = 0; i < busquedas.length; i++) {
  dbPromises.push(
      db.collection('busquedas')
        .where("name", '==', busquedas[i])
        .get()
  );
}

//v2
/*
for (var i = 0; i < busquedas.length; i++) {
  dbPromises.push(
      db.collection('busquedas')
            .doc(busquedas[i]).get()

  );
}
//v3 */
/*
for (var i = 0; i < busquedas.length; i++) {
  dbPromises.push(
      ref.ref('/tags-obj/' + busquedas[i]).once('value')
  );
}
Promise.all(dbPromises)
    .then(function(querySnapshot) {
       console.log(dbPromises);
      var len = querySnapshot.length;
      querySnapshot.forEach(function(doc){
          if(cont.indexOf(doc.val()) == -1)
              cont = cont.concat(doc.val().filter(function(item){
                  return cont.indexOf(item)<0;
              }));
          len--;
          if (len == 0){
                var dbPromises2 = [];
                for (var i = 0; i < cont.length; i++) {
                      dbPromises2.push(
                          ref.ref('/objetos/' + cont[i]).once('value')
                        )
                }
                
                Promise.all(dbPromises2)
              .then(function(newQuery){
                    newQuery.forEach(function(doc2){
                        console.log(doc2.val());
                        
                    })
                })
          }
      });
});

*//*
ref.ref('/usuarios/'+'user1').once('value').then(function(snapshot){
   console.log(snapshot);
   UserType = snapshot.val().type;
   sideBarData.userType = UserType;
    mountApp();
});*/

//array busquedas

//busquedas/*
/*
function getUserSearch(userId){
this.datosSearch = function(){
    var deferred = $.Deferred();
    var sQuery_promises = [];
    var sQuery_result =[];
    var sQuery_complete=[];
    var sQuery = firebase.database().ref("/busquedas/").orderByChild("idUsuario").equalTo(userId).once("value")
    .then(function(snapshot){
        if (snapshot.val() == null){
            deferred.resolve(null);
        }
        else{
            var len = Object.keys(snapshot.val()).length;
            snapshot.forEach(function(snapshot){
                //cada busqueda
                sQuery_result.push(snapshot.val());
                sQuery_promises.push(
                    firebase.database().ref("/tags-busqueda/").orderByChild("idBusqueda").equalTo(snapshot.val().idBusqueda).once("value")
                )
                len--;
                if (len == 0){
                    Promise.all(sQuery_promises)
                        .then(function(data){
                         data.forEach(function(data){
                             var l = Object.keys(data.val()).length;
                             data.forEach(function(item){
                                 sQuery_complete.push(item.val().tag);
                                 l--;
                                 if (l == 0){
                                     sQuery_result.find(x => x.idBusqueda === item.val().idBusqueda).tags = sQuery_complete;
                                     sQuery_complete=[];
                                     console.log(sQuery_result);
                                     deferred.resolve(sQuery_result);

                                 }
                             })
                         })
                     
                    })
                }

            })
        }

    })
       return deferred.promise();
    }
}*/
//*
    /*
var sQuery_promises = [];
var sQuery_result =[];
var sQuery_complete=[];
var sQuery = firebase.database().ref("/busquedas/").orderByChild("idUsuario").equalTo("user1").once("value")
.then(function(snapshot){
    if (snapshot.val() == null)
        sQuery_result = null;
    else{
        var len = Object.keys(snapshot.val()).length;
        snapshot.forEach(function(snapshot){
            //cada busqueda
            sQuery_result.push(snapshot.val());
            console.log(sQuery_result);
            sQuery_promises.push(
                firebase.database().ref("/tags-busqueda/").orderByChild("idBusqueda").equalTo(snapshot.val().idBusqueda).once("value")
            )
            len--;
            if (len == 0){
                Promise.all(sQuery_promises)
                    .then(function(data){
                     data.forEach(function(data){
                         var l = Object.keys(data.val()).length;
                         data.forEach(function(item){
                             sQuery_complete.push(item.val().tag);
                             l--;
                             if (l == 0){
                                 sQuery_result.find(x => x.idBusqueda === item.val().idBusqueda).tags = sQuery_complete;
                                 sQuery_complete = [];
                                 console.log(sQuery_result);
                             }
                         })
                     })
                })
            }
                
        })
    }
});*//*
var SPromise = getUserSearch("user1");
SPromise.done(US_result());

function US_result(){
    console.log("resuelta");
}*/

/*var search = new getUserLosts("user1");
search.then(function(result){
    console.log("toodo hecho");
})*/
/*
search.userSearch().then(function(datos){
   console.log(datos); 
});*/




/*
var oQuery = firebase.database().ref("obj-usuario").equalTo("user1")
.then(oQfun);
var oQuery_result = function oQfun(snapshot){

}
*/



/*
db.collection("usuarios").where("email","==","johndoe@prueba.es")
.get()
 .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           console.log(doc.id, " => ", doc.data());
            user = doc.data();
            UserType = user.type;
            sideBarData.userType = UserType;
            mountApp();
            //console.log(doc);
            //console.log("Last id => ",doc.data().name)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });*/
/*ref.ref('/objetos/').orderByChild("registro").once("value").then(function(querySnapshot){
     querySnapshot.forEach(function(doc) {
                console.log(doc.val());
        });
        
});*/
var userSearch= new getUserData("user1");
userSearch.then(function(result){
    UserType = result.type;
   sideBarData.userType = UserType;
    mountApp();
});
var user;
var UserType;

/*userRef.on('value', function(snapshot){
    user = snapshot.val();
    UserType = user.type;
    sideBarData.userType = UserType;
    mountApp();
userRef.off();
});*/


var toolBarData = {paginaActual: "",paginaAnterior:"",iconoPaginaAnterior:"",paginaSiguiente:"",iconoPaginaSiguiente:"",toolBarTitle:""};
var sideBarData = {showNavigation: false, userType: UserType};

function init(){/*
    
    const routes = [
                //{path: '/inbox', name: 'inbox', component: MailListTemplate},
            {path: '/settings', name: 'settings',  component: SettingsTemplate},
            {path: '/simplelist', name: 'simplelist', component: SimpleListTemplate},
            {path: '/uploadobject', name: 'uploadObject',  component: uploadObjectTemplate},
            {path: '/login', name: 'login',  component: loginTemplate},
            {path: '/register', name: 'register',  component: registerTemplate, props: true},    
            {path: '/registrationtype', name: 'registrationType',  component: registrationTypeTemplate},
            {path: '/homeuser', name: 'homeUser',  component: HomeUserTemplate},
            {path: '/userlostobjects', name: 'userLostObjects',  component: userLostObjectsTemplate},
            {path: '/userprofile', name: 'userProfile',  component: userProfileTemplate},
            {path: '/searchObject', name: 'searchObject',  component: searchObjectTemplate},
            {path: '/allLostObjects', name: 'allLostObjects',  component: allLostObjectsTemplate}
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
        methods: {
           HandlerBackButton(){
            if (toolBarData.paginaActual == "UO_step2")
                this.$root.$emit("backToUoStep1");
            else if (toolBarData.paginaActual == "UO_step3")
                this.$root.$emit("backToUoStep2");
            else if (toolBarData.paginaActual == "edit_profile")
                this.$root.$emit ("backToProfile");
            else if (toolBarData.paginaActual == "SO_step2")
                this.$root.$emit ("backToSoStep1");
            else if (toolBarData.paginaActual == "SO_step3")
                this.$root.$emit ("backToSoStep2");
            else if (toolBarData.paginaActual == "ULO_step2")
                this.$root.$emit ("backToULOStep1");
            else if (toolBarData.paginaAnterior == "homeUser")
                this.$router.push("homeUser");
            else
                window.history.back();
    
}
        }
            
      }).$mount('#app');
    
    //router.push('settings');
    router.push({ name: 'homeUser'})*/
}
function mountApp(){
        
    const routes = [
                //{path: '/inbox', name: 'inbox', component: MailListTemplate},
            {path: '/settings', name: 'settings',  component: SettingsTemplate},
            {path: '/simplelist', name: 'simplelist', component: SimpleListTemplate},
            {path: '/uploadobject', name: 'uploadObject',  component: uploadObjectTemplate},
            {path: '/login', name: 'login',  component: loginTemplate},
            {path: '/register', name: 'register',  component: registerTemplate, props: true},    
            {path: '/registrationtype', name: 'registrationType',  component: registrationTypeTemplate},
            {path: '/homeuser', name: 'homeUser',  component: HomeUserTemplate},
            {path: '/userlostobjects', name: 'userLostObjects',  component: userLostObjectsTemplate},
            {path: '/userprofile', name: 'userProfile',  component: userProfileTemplate},
            {path: '/searchObject', name: 'searchObject',  component: searchObjectTemplate},
            {path: '/allLostObjects', name: 'allLostObjects',  component: allLostObjectsTemplate}
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
        methods: {
           HandlerBackButton(){
            if (toolBarData.paginaActual == "UO_step2")
                this.$root.$emit("backToUoStep1");
            else if (toolBarData.paginaActual == "UO_step3")
                this.$root.$emit("backToUoStep2");
            else if (toolBarData.paginaActual == "edit_profile")
                this.$root.$emit ("backToProfile");
            else if (toolBarData.paginaActual == "SO_step2")
                this.$root.$emit ("backToSoStep1");
            else if (toolBarData.paginaActual == "SO_step3")
                this.$root.$emit ("backToSoStep2");
            else if (toolBarData.paginaActual == "ULO_step2")
                this.$root.$emit ("backToULOStep1");
            else if (toolBarData.paginaAnterior == "homeUser")
                this.$router.push("homeUser");
            else if (toolBarData.paginaActual == "homeUser"){
                
            }
            else
                window.history.back();
    
}
        }
            
      }).$mount('#app');
    
    //router.push('settings');
    router.push({ name: 'homeUser'})
}

        

