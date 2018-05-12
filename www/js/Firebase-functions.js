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

function searchObjectsByTags(tags,userId){
    var deferred = $.Deferred();
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();
    var objs = [];
    var promises = [];
    var Opromises= [];
    var Upromises = [];
    var objsData = [];
    var objsInUserList = [];
    var objFound = 0;
        tags.forEach(function(tag){
            promises.push(
            firebase.database().ref("/tags-obj/").orderByChild("tag").equalTo(tag).once("value")
        )
        });
    
        Promise.all(promises)
                .then(function(data){
                 data.forEach(function(data){
                     if (data.val() != null){
                     data.forEach(function(item){
                         if (objs.find(x => x.idObjeto === item.val().idObjeto))
                             objs.find(x => x.idObjeto === item.val().idObjeto).cont = objs.find(x => x.idObjeto === item.val().idObjeto).cont +1;
                         else{
                             var temp = item.val();
                             temp.cont = 1;
                             delete temp.tag;
                             objs.push(temp)
                         }
                     })
                     objFound++;}
                 })
                    if (objFound != 0){
                      objs.sort(function(a, b) {
                            a = a.cont;
                            b = b.cont;
                            return a>b ? -1 : a<b ? 1 : 0;
                        });
                      objs.forEach(function(item){
                          Opromises.push(
                          firebase.database().ref("/objetos/").orderByChild("id").equalTo(item.idObjeto).once("value")
                          )
                      });
                      var userObj = firebase.database().ref("/obj-usuario/").orderByChild("idUsuario").equalTo(userId).once("value");
                      Promise.all(Opromises).then(function(data){deferred1.resolve(data)});
                      userObj.then(function(data){deferred2.resolve(data)});
                      $.when(deferred1,deferred2).done(function(data1,data2){
                          data2.forEach(function(lowestItem){
                              objsInUserList.push(lowestItem.val().idObjeto);
                           })
                          data1.forEach(function(item){
                              item.forEach(function(subItem){
                                  var temp = subItem.val();
                                  if (objsInUserList.indexOf(temp.id) != -1){
                                      temp.objInUserList = true;}
                                  else{
                                      temp.objInUserList = false;}
                                  objsData.push(temp);     
                              })
                          })
                          deferred.resolve(objsData);
                          
                      })
                    }
                    else
                    deferred.resolve(null);
            })

    return deferred.promise();
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

function saveUserObject(objectId,userId){
    var deferred = $.Deferred();
    
    var newEntryKey = firebase.database().ref("/obj-usuario/").push().key;
    firebase.database().ref("/obj-usuario/"+newEntryKey).set({
        idObjeto: objectId,
        idUsuario: userId
    }).then(function(data){
        deferred.resolve(true);
    }).catch(function(e){
        deferred.resolve(false);
    })
   
    return deferred.promise();
}

function saveUserSearch(tags,userId){
    var deferred = $.Deferred();
    var updates = {};
    var newEntryKey = firebase.database().ref("/busquedas/").push().key;
    var Data = new Date();
    var currentData = Data.getTime();
    var idSearch = "Sea"+newEntryKey;
    var searchData ={
        idBusqueda: idSearch,
        idUsuario: userId,
        registro: currentData
    }
    
    updates["/busquedas/"+newEntryKey]=searchData;
    tags.forEach(function(item){
        var newTagEntryKey = firebase.database().ref("/tags-busqueda/").push().key;
        updates["/tags-busqueda/"+newTagEntryKey]={
            idBusqueda: idSearch,
            tag: item
        };
    })
    
     firebase.database().ref().update(updates)
         .then(function(data){
          deferred.resolve(true);
     }).catch(function(e){
         deferred.resolve(false);
     })
    
    return deferred.promise();
    
}

function deleteUserSearch(searchId,userId){
    var deferred = $.Deferred();
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();
    var promises = [];
    var userSearch = [];
    var tagSearch = [];
    var seaToDelete;
    var updates = {};
   
    firebase.database().ref("/tags-busqueda/").orderByChild("idBusqueda").equalTo(searchId).once("value")
        .then(function(data){
        data.forEach(function(item){
            updates["/tags-busqueda/"+item.key]={};
        })
        deferred1.resolve();
    })
    firebase.database().ref("/busquedas/").orderByChild("idUsuario").equalTo(userId).once("value")
        .then(function(data){
         data.forEach(function(item){
            var temp= {
                key: item.key,
                idBusqueda: item.val().idBusqueda
            }
            userSearch.push(temp);
        })
        seaToDelete = userSearch.find(x => x.idBusqueda === searchId);
        updates["/busquedas/"+seaToDelete.key]={};
        deferred2.resolve();
    })
    $.when(deferred1,deferred2).done(function(data1,data2){
           firebase.database().ref().update(updates)
            .then(function(data){
                  deferred.resolve(true);
             }).catch(function(e){
                 deferred.resolve(false);
             })
    })
        
   return deferred.promise();
}

function deleteUserObject(objectId,userId){
    var deferred = $.Deferred();
    var promises = [];
    var userObj = [];
    var objToDelete;
   
    firebase.database().ref("/obj-usuario/").orderByChild("idUsuario").equalTo(userId).once("value")
        .then(function(data){
        data.forEach(function(item){
            var temp= {
                key: item.key,
                idObjeto: item.val().idObjeto
            }
            userObj.push(temp);
        })
        objToDelete = userObj.find(x => x.idObjeto === objectId);
        firebase.database().ref("/obj-usuario/"+objToDelete.key).remove()
        .then(function(data){
            deferred.resolve(true);
        }).catch(function(e){
            deferred.resolve(false);
        })
    })
    return deferred.promise();
}