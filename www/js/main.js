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
            {path: '/settings', name: 'settings',  component: SettingsTemplate}
            ,{path: '/simplelist', name: 'simplelist', component: SimpleListTemplate},
            {path: '/homeUser', name: 'homeUser',  component: HomeUserTemplate}/*,
            {path: '/userLostObjects', name: 'userLostObjects',  component: userLostObjects}*/

            ];

        const router = new VueRouter({
                routes // short for `routes: routes`
            });

    const app = new Vue({
        el: '#app',
        router,
        data: { showNavigation: false,
                showSidepanel: false,
              message: 'Hola!'},
        methods: {
            goToInbox: function(){
                this.showNavigation = false;
                    //this.$refs.sidebar.toggle();
                    router.push('inbox');
                },
            goToSettings: function(){
                this.showNavigation = false;
                    //this.$refs.sidebar.toggle();
                    router.push({ name: 'settings'})
                },
            goToSimpleList: function(){
                this.showNavigation = false;
                    //this.$refs.sidebar.toggle();
                    router.push('simplelist');
                }/*,
             goToUserLostObjects: function(){
                    //this.$refs.sidebar.toggle();
                    router.push('userLostObjects');
                }*/
        }
            
      }).$mount('#app');
    
    //router.push('settings');
    router.push({ name: 'homeUser'})
}

        

