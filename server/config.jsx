    Accounts.onCreateUser(function(options,user) {
    user.profile = {};
    user.profile.health = 100;
    user.profile.level = 0;
    user.profile.experience = 0;
    user.profile.maxExp = 100;
    user.profile.currentExp = 0;
    user.profile.karma = 0;
    user.profile.actions = 0;
     //etc
     return user
});
