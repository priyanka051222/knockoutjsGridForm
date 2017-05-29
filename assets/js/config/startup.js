define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function ($, ko, router) {


    //REUSABLE COMPONENTS
    ko.components.register('greeter', { require: 'assets/js/components/greeter/greeting' });
    ko.components.register('paginationgrid', { require: 'assets/js/components/paginationGrid/paginationGrid' });

    //WIDGETS
    ko.components.register('userList', { require: 'assets/widgets/userList/userList' });
    ko.components.register('registration', { require: 'assets/widgets/registration/registration' });


    //PAGES
    ko.components.register('home', {
      template: { require: 'text!assets/pages/home.html' }
    });
    ko.components.register('aboutUs', {
        template: { require: 'text!assets/pages/aboutUs.html' }
    });
    ko.components.register('deposits', {
        template: { require: 'text!assets/pages/deposits.html' }
    });
    ko.components.register('withdrawal', {
        template: { require: 'text!assets/pages/withdrawal.html' }
    });
    ko.postbox = new ko.subscribable();



    ko.applyBindings({ route: router.currentRoute});
});
