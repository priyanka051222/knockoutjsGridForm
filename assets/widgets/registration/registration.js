define(["knockout", "text!./registration.html"],
    function(ko, homeTemplate) {
        var FileModel = function(name, src) {
            var self = this;
            this.name = name;
            this.src = src;
        };

        function homeViewModel(params) {
            var self = this;
            self.firstName = ko.observable();
            self.lastName = ko.observable();
            self.dob = ko.observable();
            self.stateSelect = ko.observable();
            $.getJSON('api/getCountries',
                null,
                function(response) {
                    self.countries(response);
                    self.states = ko.observableArray(response[0].states);
                    self.stateSelect("");
                });
            self.selectedCountry = ko.observable();
            self.country = ko.observable();
            self.shouldShowMessage = ko.observable(false);
            self.message= ko.observable();
            self.countries = ko.observableArray();
            self.createUser = ko.observable();
            self.createUser.subscribe(function(newValue) {
                  var userObject = {
                    "First Name":self.firstName(),
                    "Last Name":self.lastName(),
                    "Dob":self.dob(),
                    "Country":self.selectedCountry(),
                    "State":self.stateSelect()
                  };

                  $.post('/api/createUser',userObject).then(function(response){
                      self.message(response.message);
                      self.shouldShowMessage(true);
                      self.userCreated = ko.observable();
                      ko.postbox.notifySubscribers(newValue, "userCreated");
                      self.firstName("");
                      self.lastName("");
                       self.dob("");
                       self.selectedCountry("");
                       self.stateSelect("");
                  });

              });

            self.files = ko.observableArray([]);
            self.fileSelect = function(elemet, event) {
                var files = event.target.files; // FileList object

                // Loop through the FileList and render image files as thumbnails.
                for (var i = 0, f; f = files[i]; i++) {

                    // Only process image files.
                    if (!f.type.match('image.*')) {
                        continue;
                    }

                    var reader = new FileReader();

                    // Closure to capture the file information.
                    reader.onload = (function(theFile) {
                        return function(e) {
                            self.files.push(new FileModel(escape(theFile.name), e.target.result));
                        };
                    })(f);
                    // Read in the image file as a data URL.
                    reader.readAsDataURL(f);
                };
            };
            return self;
        }
        return {
            viewModel: homeViewModel,
            template: homeTemplate
        };
    });
