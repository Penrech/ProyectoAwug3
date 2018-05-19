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
//var db = firebase.firestore();
var ref = firebase.database();
console.log(firebase);
var st= firebase.storage();


var busquedas = ["disco","duro","negro","toshiba"];
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
var SPromise = getUserSearch("user");
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
/**//*
var tQuery = new deleteUserSearch("Sea-LCK0WKHnzLvaUAvsWv-","user2");
tQuery.then(function(result){
    console.log(result);
})
/*
var sQuery = new saveUserObject("obj1525949003","user2");
sQuery.then(function(result){
    console.log(result);
})
/*
var tagS = new searchObjectsByTags(busquedas);
tagS.then(function(result){
    console.log(result);
})//*/
/*
var dQuery = deleteUserObject("obj1525949003","user2");
dQuery.then(function(result){
    console.log(result);
})*//*
var tQuery = new saveUserSearch(busquedas,"user2");
tQuery.then(function(result){
    console.log(result);
})*/
//getObjectClaimUsers("obj1525949254");/*
/*
var image= document.createElement("image");

var objData={
    imgUrl: "img/bolso.png",
    location: "Calle de prueba 6",
    phone: 666111222,
    tags:["bolso","copia","rosa","claro"]
};
var gQuery = new saveObject(objData,"upload");
gQuery.then(function(result){
    console.log(result);
})*/
/*
var dataJsonCorrected={};
var dataKeys=[];
var object = [];
var dataJsonDef;
console.log("Esto va o que");
dataLocations.Punt.forEach(function(item,index){
   var key = "point"+index;
   dataKeys.push(key);
      var temp = item.Tooltip;
    var name = temp.split("-");
    console.log(key);
    var nameA = name[0].toLowerCase();
    var nameB = name[1].toLowerCase();
    nameB = nameB.slice(1);
    var nameDef = nameA + nameB;
    var point= {
        idPoint: index,
        name: nameDef,
        lat: item.Coord.Latitud,
        lon: item.Coord.Longitud
    }
  dataJsonCorrected[key] = point;
  object.push(point);

})
/*
dataJsonCorrected.forEach(function(item,index){
   dataKeys.find(x => x === "point"+index).push(item);
  
})*//*
object.locations = dataJsonCorrected;*//*
console.log(object);
(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)


*/
var user;
var UserType;
var userIdTest;/*
var query = new getLocationList();
query.then(function(result){
    console.log(result);
    x = "point202";
    var seleccionar = Object.values(result[x]);
    console.log(seleccionar);
    console.log("olaa");
})
/*var userSearch= new getUserData(userIdTest);
userSearch.then(function(result){
    UserType = result.type;
   sideBarData.userType = UserType;
    mountApp();
});*/

/*userRef.on('value', function(snapshot){
    user = snapshot.val();
    UserType = user.type;
    sideBarData.userType = UserType;
    mountApp();
userRef.off();
});*/


var toolBarData = {paginaActual: "",paginaAnterior:"",iconoPaginaAnterior:"",paginaSiguiente:"",iconoPaginaSiguiente:"",toolBarTitle:""};
var sideBarData = {showNavigation: false, userType: UserType};

function init(){
        var deferred = $.Deferred();
        var deferred2 = $.Deferred();
        userIdTest = "user2";
        var userSearch= new getUserData(userIdTest);
        userSearch.then(function(result){
        UserType = result.type;
        sideBarData.userType = UserType;
        deferred.resolve();
        console.log("Entro aqui");
        });
    
        $.when(deferred).done(function(){
            console.log("Entro aqui tambien");
            firebase.database().ref("usuarios/"+userIdTest).on('value', function(snapshot){
            user = snapshot.val();
            console.log(deferred2.state());
            if (deferred2.state() == "pending")
                deferred2.resolve();
            });
        })
    
        $.when(deferred2).done(function(){
            mountApp();
        })
    
        

        
    /*
        
        
    
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
            {path: '/searchObject', name: 'searchObject',  component: searchObjectTemplate,props:true},
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
            else if (toolBarData.paginaActual == "ALO_Step3")
                this.$root.$emit ("backToALOStep2");
            else if (toolBarData.paginaActual == "ALO_Step2")
                this.$root.$emit ("backToALOStep1");
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

        

