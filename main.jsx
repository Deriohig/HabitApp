
// Define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");
Habits = new Mongo.Collection("habits");
Profiles = new Mongo.Collection("profiles"); 

if (Meteor.isClient) {
  // This code is executed on the client only
   Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

   

   getModal = function getModals(user, callback) {
    Meteor.call('getModal', user, callback);
}
 
  Meteor.startup(function () {
    
              var userId = Meteor.userId();          
   
  });
};


if (Meteor.Server) {
  // This code is executed on the client only
   
  
};