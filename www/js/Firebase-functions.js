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
            snapshot.forEach(function(snapshot){
                oQuery_promises.push(
                    firebase.database().ref("/objetos/").orderByChild("id").equalTo(snapshot.val().idObjeto).once("value")
                )
            })
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

function getUserObjectClaimDate(objectId,userId){
    var deferred = $.Deferred();
    var deferred1 = $.Deferred();
    var userObj = [];
    var claimDate;
    firebase.database().ref("/obj-usuario/").orderByChild("idUsuario").equalTo(userId).once("value")
    .then(function(data){
        data.forEach(function(item){
            userObj.push(item.val());
            deferred1.resolve();
        })
    })
    $.when(deferred1).done(function(x){
        claimDate = userObj.find(x =>x.idObjeto === objectId).registro;
        deferred.resolve(claimDate);
    })
    return deferred.promise();
}

function getObjectClaimUsers(objectId){
    var deferred = $.Deferred();
    var deferred1 = $.Deferred();
    var usersId = [];
    var users = [];
    var promises = [];
    firebase.database().ref("/obj-usuario/").orderByChild("idObjeto").equalTo(objectId).once("value")
    .then(function(data){
            data.forEach(function(item){
                var temp = {
                    idUsuario: item.val().idUsuario,
                    registro: item.val().registro
                }
                promises.push(
                    firebase.database().ref("/usuarios/"+item.val().idUsuario).once("value")
                )
                usersId.push(temp);
            })
        deferred1.resolve();
    })
    $.when(deferred1).done(function(x){
        Promise.all(promises)
        .then(function(data){
            data.forEach(function(item){
                var temp = item.val();
                temp.id = item.key;
                users.push(temp);
                usersId.forEach(function(id){
                    if (users.find(x => x.id === id.idUsuario))
                    users.find(x => x.id === id.idUsuario).reclamado = id.registro;
                })
            })
            deferred.resolve(users);
        })
        
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
       deferred.resolve(snapshot.val().nomAp);
    })
    return deferred.promise();
}

function saveUserObject(objectId,userId){
    var deferred = $.Deferred();
    var Data = new Date();
    var currentData = Data.getTime();
    var newEntryKey = firebase.database().ref("/obj-usuario/").push().key;
    firebase.database().ref("/obj-usuario/"+newEntryKey).set({
        idObjeto: objectId,
        idUsuario: userId,
        registro: currentData
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

function orderAllObjects(orderType,visualType){
    var deferred = $.Deferred();
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();
    var restDate = new Date();
    var objArray = [];
    var objUsers = [];
    var oPromises = [];
    
    if (visualType == "todos")
        restDate = new Date(0);
    else if(visualType == "semana")
        restDate.setDate(restDate.getDate()-7);
    else if(visualType == "mes")
        restDate.setDate(restDate.getDate()-30);
    else if(visualType == "year")
        restDate.setDate(restDate.getDate() -365);
    restDate = restDate.getTime();
    
    firebase.database().ref('/objetos').orderByChild("registro").startAt(restDate).once("value")
    .then(function(data){
       if(data.val() == null)
             deferred.resolve(null);
        data.forEach(function(item){
            var temp = item.val();
            temp.reclamado = false;
            objArray.unshift(temp);
        })
        deferred1.resolve();
    })
    firebase.database().ref("/obj-usuario/").orderByChild("idObjeto").once("value")
    .then(function(data){
        data.forEach(function(item){
                if (objUsers.indexOf(item.val().idObjeto) == -1)
                    objUsers.push(item.val().idObjeto);
            })
        deferred2.resolve();
    })
    
    $.when(deferred1,deferred2).done(function(x,y){
        objUsers.forEach(function(obj){
            if(objArray.find(x => x.id === obj))
            objArray.find(x => x.id === obj).reclamado = true;
        })
        if (orderType == "reclamado"){
        objArray.sort(function(a, b) {
                a = a.reclamado;
                b = b.reclamado;
                return a>b ? -1 : a<b ? 1 : 0;
            }); }
        deferred.resolve(objArray);
    })

   return deferred.promise();   
    
}

function deleteObject(objectId){
    var deferred = $.Deferred();
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();
    var deferred3 = $.Deferred();
    var deferred4 = $.Deferred();
    var deferred5 = $.Deferred();
    var updates = {};
    var parentId = objectId.slice(3);
    var imgBigRef = firebase.storage().ref().child("640p/640P"+parentId+".jpg");
    var imgSmallRef = firebase.storage().ref().child("320p/320P"+parentId+".jpg");
    updates["/objetos/"+parentId]= {};
    
    imgBigRef.delete().then(function(){
        deferred1.resolve();
        }).catch(function(e){
        deferred.resolve(false);
        })
    
     imgSmallRef.delete().then(function(){
        deferred2.resolve();
        }).catch(function(e){
        deferred.resolve(false);
        })
    
    $.when(deferred1,deferred2).done(function(x,y){
        firebase.database().ref("/obj-usuario/").orderByChild("idObjeto").equalTo(objectId).once("value")
        .then(function(data){
        if (data.val() == null)
            deferred3.resolve();
        else{
            data.forEach(function(item){
                updates["/obj-usuario/"+item.key]= {};
            })
            deferred3.resolve();
        }
        });

        firebase.database().ref("/tags-obj/").orderByChild("idObjeto").equalTo(objectId).once("value")
        .then(function(data){
        data.forEach(function(item){
            updates["/tags-obj/"+item.key]= {};
        })
        deferred4.resolve();
        })
        
    })
    
    $.when(deferred3,deferred4).done(function(x,y){
            firebase.database().ref().update(updates)
            .then(function(data){
                  deferred.resolve(true);
             }).catch(function(e){
                 deferred.resolve(false);
             })
    })
    

    
    return deferred.promise();
    
    
} 

function saveObject(dataObject){
    var deferred = $.Deferred();
    var createImg1 = $.Deferred();
    var createImg2 = $.Deferred();
    var uploadedImg1 = $.Deferred();
    var uploadedImg2 = $.Deferred();
    var urlGetImg1 = $.Deferred();
    var urlGetImg2 = $.Deferred();
    var img1Data;
    var img2Data;
    var uploadState1;
    var uploadState2;
    var uploadImg1;
    var uploadImg2;
    var d = new Date();
    var currentData = d.getTime();
    var newEntryKey;
    var bigImgName;
    var smallImgName;
    var objId;
    var imageBigURL;
    var imageSmallURL;
    var updates = {};
    

        newEntryKey = firebase.database().ref("/objetos/").push().key;
        bigImgName = "640P"+newEntryKey+".jpg";
        smallImgName = "320P"+newEntryKey+".jpg";
        objId = "obj"+newEntryKey;
        
        var image1 = new Image();
        var image2 = new Image();
        image1.onload = function () {
            var canvas = document.createElement('canvas');
            var width = 640;
            var height = 640;
            canvas.width = width; 
            canvas.height = height; 
            canvas.getContext('2d').drawImage(this, 0, 0,width,height);
            img1Data = canvas.toDataURL('image/jpeg');
            var BASE64_MARKER = ';base64,';
            if (img1Data.indexOf(BASE64_MARKER) == -1) {
                var parts = img1Data.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = parts[1];

                return new Blob([raw], {type: contentType});
            }

            var parts = img1Data.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            img1Data=  new Blob([uInt8Array], {type: contentType});
            createImg1.resolve();
        };
         image2.onload = function () {
            var canvas = document.createElement('canvas');
            var width = 320;
            var height = 320;
            canvas.width = width; 
            canvas.height = height; 
            canvas.getContext('2d').drawImage(this, 0, 0,width,height);
            img2Data = canvas.toDataURL('image/jpeg');
             var BASE64_MARKER = ';base64,';
            if (img2Data.indexOf(BASE64_MARKER) == -1) {
                var parts = img2Data.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = parts[1];

                return new Blob([raw], {type: contentType});
            }

            var parts = img2Data.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            img2Data=  new Blob([uInt8Array], {type: contentType});
            createImg2.resolve();
        };

         image1.src = dataObject.imgUrl;
         image2.src = dataObject.imgUrl;
        
        
    
    $.when(createImg1,createImg2).done(function(x,y){
        console.log("Se crean ambas imagenes");
        uploadState1 = "initiated";
        uploadState2 = "initiated";
        uploadImg1 = firebase.storage().ref().child("/640p/"+bigImgName);
        uploadImg2=  firebase.storage().ref().child("/320p/"+smallImgName);

        
        uploadImg1.put(img1Data).then(function(snapshot){
            uploadState1 = "uploadedSucces";
            uploadedImg1.resolve();
        }).catch(function(error){
            uploadedState1 = "uploadFail";
            uploadedImg1.resolve();
        })
        uploadImg2.put(img2Data).then(function(snapshot){
            uploadState2 = "uploadedSucces";
            uploadedImg2.resolve();
        }).catch(function(error){
            uploadState2 = "uploadFail";
            uploadedImg2.resolve();
        })
                
   })
        
    $.when(uploadedImg1,uploadedImg2).done(function(x,y){
        console.log("se suben ambas imagenes");
        if (uploadState1 == "uploadedSucces" && uploadState2 == "uploadedSucces"){
            uploadImg1.getDownloadURL().then(function(url){
                urlGetImg1.resolve(url);
                
            }).catch(function(e){
                var error= {
                    uploadedSucces: false,
                    error1: "Error getting big img url",
                    error2: e.code
                }
                deferred.resolve(error);
            })
            uploadImg2.getDownloadURL().then(function(url){
                urlGetImg2.resolve(url);
                
            }).catch(function(e){
                  var error= {
                    uploadedSucces: false,
                    error1: "Error getting small img url",
                    error2: e.code
                }
                deferred.resolve(error);
            })

        }
        else if(uploadState1 == "uploadFail" && uploadState2 == "uploadFail"){
            var error={
                uploadedSucces: false,
                error1: "Error uploading both images size"
            }
            deferred.resolve(error);
        }
        else {
            if(uploadState1 == "uploadFail"){
                uploadImg2.delete().then(function(){
                    var error={
                        uploadedSucces: false,
                        error1: "Error uploading big image size",
                        error2: "small image orphan data deleted"
                    }
                    deferred.resolve(error);
                }).catch(function(e){
                    var error= {
                        uploadedSucces:false,
                        error1: "Error uploading big image size",
                        error2: "Error deleting orphan data from small image size",
                        error3: e
                    }
                    deferred.resolve(error);
                })
            }
            else if(uploadState2 == "uploadFail"){
                uploadImg1.delete().then(function(){
                    var error={
                        uploadedSucces: false,
                        error1: "Error uploading small image size",
                        error2: "big image orphan data deleted"
                    }
                    deferred.resolve(error);
                }).catch(function(error){
                    var error={
                        uploadedSucces:false,
                        error1: "Error uploading small image size",
                        error2: "Error deleting orphan data from big image size"
                    }
                    deferred.resolve(error);
                })
            }
        }
    })
    
    $.when(urlGetImg1,urlGetImg2).done(function(urlBig,urlSmall){
        console.log("se actualiza la tabla de realtime");
        imageBigURL = urlBig;
        imageSmallURL = urlSmall;
        
        var objectData = {
            id: objId,
            imgBig: imageBigURL,
            imgSmall: imageSmallURL,
            location: dataObject.location,
            phone: dataObject.phone,
            registro: currentData
        };
        updates["/objetos/"+newEntryKey]= objectData;
        
        dataObject.tags.forEach(function(tagName){
            var tagEntryKey = firebase.database().ref("/tags-obj/").push().key;
            updates["/tags-obj/"+tagEntryKey]={
                idObjeto: objId,
                tag: tagName
            }
        })
        firebase.database().ref().update(updates)
        .then(function(data){
        var error={
            uploadedSucces:true
        }
        deferred.resolve(error);
        }).catch(function(e){
            
            uploadedImg1.delete().then(function(){
            var error={
                uploadedSucces:false,
                error1: "add objetct data to dabase fail",
                error2: "big image orphan data deleted"
            }
            deferred.resolve(error);
            }).catch(function(e){
             var error={
                uploadedSucces:false,
                error1: "add objetct data to dabase fail",
                error2: "big image orphan data cant be deleted",
                error3: e
            }
            deferred.resolve(error);
            })
            
            uploadedImg2.delete().then(function(){
            var error={
                uploadedSucces:false,
                error1: "add objetct data to dabase fail",
                error2: "small image orphan data deleted"
            }
            deferred.resolve(error);
            }).catch(function(e){
            var error={
                uploadedSucces:false,
                error1: "add objetct data to dabase fail",
                error2: "small image orphan data cant be deleted",
                error3: e
            }
            deferred.resolve(error);;   
            })
        })
        
    })

    return deferred.promise();
     
}

function getLocationList(){
    var deferred = $.Deferred();
    var locations;
    
    firebase.database().ref("locations").orderByChild("name").once("value")
    .then(function(item){
        locations = item.val();
        deferred.resolve(locations);
    })
   return deferred.promise();
}

function checkProfessionalCode(code){
    var deferred = $.Deferred();
    firebase.database().ref("ProfCodes").orderByChild("name").equalTo(code).once("value")
    .then(function(result){
        if(result.val() != null){
            if(result.val()[Object.keys(result.val())[0]].user != "free"){
                deferred.resolve(false);
            }
            else{
            var temp = Object.keys(result.val())[0];
            deferred.resolve(temp);
            }
        }
        else
            deferred.resolve(false);
    })
    
    return deferred.promise();
}

function setProfessionalCode(codeId,userId){
    var deferred = $.Deferred();
    
    firebase.database().ref("ProfCodes/"+codeId+"/user").set(userId)
    .then(function(){
        deferred.resolve(true);
    }).catch(function(e){
        deferred.resolve(e);
    })
    
    return deferred.promise();
}

function registerUser(userData,pass,codeId){
    var deferred = $.Deferred();
    var deferred2= $.Deferred();
    var deferred3 = $.Deferred();
    console.log("entro en la funcion");
    AuthType = "register";
    firebase.auth().createUserWithEmailAndPassword(userData.email,pass)
        .then(function(userRegistered) {
            firebase.database().ref("usuarios/"+userRegistered.user.uid).set(userData).then(function() {
                deferred2.resolve(userRegistered.user.uid);
            }, function(error) {
                console.log(error); 
                deferred.resolve(error.code);
            });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            deferred.resolve(error);
            console.log(error);
        });
    
    $.when(deferred2).done(function(id){
        if(userData.type == 2){
            var sQuery= new setProfessionalCode(codeId,id);
            sQuery.then(function(result){
                if(true){
                    firebase.auth().signOut().then(function() {
                      deferred3.resolve();
                    }).catch(function(error) {
                      deferred.resolve(error.code);
                    });
                   
                }
                else{
                    deferred.resolve(e.code);
                }
            })
        }
        else{
             firebase.auth().signOut().then(function() {
              deferred3.resolve();
            }).catch(function(error) {
              deferred.resolve(error.code);
            });
        }
    })
    
    $.when(deferred3).done(function(x){
        AuthType = "normal";
        firebase.auth().signInWithEmailAndPassword(userData.email, pass)
        .catch(function(error){
            deferred.resolve(error);
        })
    })
    
    return deferred.promise();
}
