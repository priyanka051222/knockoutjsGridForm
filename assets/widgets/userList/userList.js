define(["knockout", "text!./userList.html"],
function (ko, userListTemplate) {
    function userListViewModel(params) {
        var self = this;
        self.gridColumns = ko.observable('Transactions List');
        self.gridData = ko.observableArray([]);
        function init(){
          console.log("m called");
          $.getJSON("/api/getUserList", function(data) {
                self.gridData(data);
                ko.postbox.notifySubscribers(data, "updateGrid");
          })
        }

        ko.postbox.subscribe(function(newValue) {
               init();

       }, this, "userCreated");
        init();

        return self;
    }
    return { viewModel: userListViewModel, template: userListTemplate };
});
