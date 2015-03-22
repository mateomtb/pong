if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user) {
    // We still want the default hook's 'profile' behavior.
    options.profile['wins'] = 0;
    options.profile['losses'] = 0;
    if (options.profile)
      user.profile = options.profile;
    return user;
  });
}