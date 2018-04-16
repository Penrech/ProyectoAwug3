    Vue.use(VueMaterial.default);
    Vue.use(VueRouter);

//    Vue.material.registerTheme('about', {
//          primary: {
//            color: 'indigo',
//            hue: 'A200'
//          },
//          accent: {
//            color: 'grey',
//            hue: 300
//          }
//        });

//Vue.material.setCurrentTheme('about');
var UserType = 2;
var toolBarData = {paginaActual: "",paginaAnterior:"",iconoPaginaAnterior:"",paginaSiguiente:"",iconoPaginaSiguiente:"",toolBarTitle:""};
var sideBarData = {showNavigation: false, userType: UserType};

function init(){
    

    
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
            {path: '/userprofile', name: 'userProfile',  component: userProfileTemplate}
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
        methods: {

        }
            
      }).$mount('#app');
    
    //router.push('settings');
    router.push({ name: 'homeUser'})
}

        

