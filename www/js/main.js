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


function init(){
    
    
    const routes = [
                //{path: '/inbox', name: 'inbox', component: MailListTemplate},
            {path: '/settings', name: 'settings',  component: SettingsTemplate},
            {path: '/simplelist', name: 'simplelist', component: SimpleListTemplate},
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
            toggleSidebar(){
                if(this.showNavigation == true){
                    return true;
                }
                else{
                    return false;
                }
                this.showNavigation = !this.showNavigation;
                
            },
            goToRegistrationType: function(){
                document.body.style = "";
                this.showNavigation = false;
                    //this.$refs.sidebar.toggle();
                    router.push('registrationType');
                },
            goToHome: function(){
                document.body.style = "";
                this.showNavigation = false;
                    //this.$refs.sidebar.toggle();
                    router.push('homeUser');
                },
            goToSettings: function(){
                this.showNavigation = false;
                    //this.$refs.sidebar.toggle();
                    router.push({ name: 'settings'})
                },
             goToUserProfile: function(){
                  document.body.style = this.bodyStyle;
                this.showNavigation = false;
                    //this.$refs.sidebar.toggle();
                    router.push({ name: 'userProfile'})
                },
            goToSimpleList: function(){
                this.showNavigation = false;
                    //this.$refs.sidebar.toggle();
                    router.push('simplelist');
                },
             goToUserLostObjects: function(){
                    this.showNavigation = false;
                    document.body.style = this.bodyStyle;
                    //this.$refs.sidebar.toggle();
                    router.push('userLostObjects');
                }
        }
            
      }).$mount('#app');
    
    //router.push('settings');
    router.push({ name: 'homeUser'})
}

        

