function getUserLosts(userId){
var deferred1 = $.Deferred();
var deferred2 = $.Deferred();
var deferredResult = $.Deferred();
this.userSearch = function(){
    var sQuery_promises = [];
    var sQuery_result =[];
    var sQuery_complete=[];
    var sQuery = firebase.database().ref("/busquedas/").orderByChild("idUsuario").equalTo(userId).once("value")
    .then(function(snapshot){
        if (snapshot.val() == null){
            deferred1.resolve(null);
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
                                     deferred1.resolve(sQuery_result);

                                 }
                             })
                         })
                     
                    })
                }

            })
        }

    })
    }
this.userObject = function(){
    var oQuery_promises = [];
    var oQuery_result =[];
    var oQuery_complete=[];
    var oQuery = firebase.database().ref("/obj-usuario/").orderByChild("idUsuario").equalTo(userId).once("value")
    .then(function(snapshot){
        if (snapshot.val() == null){
            deferred2.resolve(null);
        }
        else{
            var len = Object.keys(snapshot.val()).length;
            snapshot.forEach(function(snapshot){
                //cada busqueda
                oQuery_promises.push(
                    firebase.database().ref("/objetos/").orderByChild("id").equalTo(snapshot.val().idObjeto).once("value")
                )
                len--;
                if (len == 0){
                    Promise.all(oQuery_promises)
                    .then(function(data){
                         data.forEach(function(data){
                             data.forEach(function(data){
                                 oQuery_result.push(data.val());
                             }) 
                         })
                        deferred2.resolve(oQuery_result);
                    })
                }

            })
        }

    })
    }
this.userSearch();
this.userObject();
$.when(deferred1,deferred2).done(function(x,y){
    var res = [];
    if (x == null)
        res = y;
    else if(y == null)
        res = x;
    else if (x == null && y == null)
        deferredResult.resolve(null);
    else{
        x.forEach(function(item){
            res.push(item);
        })
        y.forEach(function(item){
            res.push(item);
        })
       res.sort(function(a, b) {;
            a = a.registro;
            b = b.registro;
            return a>b ? -1 : a<b ? 1 : 0;
        });   
    }
    deferredResult.resolve(res);
   
})
     return deferredResult.promise();
}

function getObjectTags(objectId){
    var deferred = $.Deferred();
    var tagObj= [];
    firebase.database().ref("/tags-obj/").orderByChild("idObjeto").equalTo(objectId).once("value")
        .then(function(data){
                 data.forEach(function(data){
                     tagObj.push(data.val().tag);
                 })
                deferred.resolve(tagObj);
            })
    return deferred.promise();
}

function searchObjectsByTags(tags){
    var deferred = $.Deferred();
    var objs = [];
    var promises = [];
        tags.forEach(function(tag){
            promises.push(
            firebase.database().ref("/tags-obj/").orderByChild("tag").equalTo(tag).once("value")
        )
        });
    
        Promise.all(promises)
                .then(function(data){
                 data.forEach(function(data){
                     var l = Object.keys(data.val()).length;
                     data.forEach(function(item){
                         sQuery_complete.push(item.val().tag);
                         l--;
                         if (l == 0){
                             sQuery_result.find(x => x.idBusqueda === item.val().idBusqueda).tags = sQuery_complete;
                             sQuery_complete=[];
                             deferred1.resolve(sQuery_result);

                         }
                     })
                 })

            })


}

function getUserData(userId){
  var deferred = $.Deferred();
  firebase.database().ref('/usuarios/'+ userId).once('value').then(function(snapshot){
      deferred.resolve(snapshot.val());
});
    return deferred.promise();
}

function getUserName(userId){
    var deferred = $.Deferred();
    firebase.database().ref('usuarios/'+userId).once("value").then(function(snapshot){
       console.log(snapshot.val().nomAp);
       deferred.resolve(snapshot.val().nomAp);
    })
    return deferred.promise();
}