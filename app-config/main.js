A.app({
  appName: "My First MEAN App",
  appIcon: "heart",
  menuItems: [
    {
      name: "Articles",
      icon: "book",
      entityTypeId: "Article",
    }
  ],
  onlyAuthenticated: true,
  allowSignUp: true,
  entities: function(Fields) {
    return {
      Article: {
        customView: 'articles',
        title: 'Articles',
        fields: {
          title: Fields.text("Title").required(),
          content: Fields.textarea("Content"),
          user: Fields.reference('User', 'UserInArticle').readOnly()
        },
        beforeCreate: function (Entity, User) {
          Entity.user = User;
        }
      },
      User: {
        views: {
          UserInArticle: {
            fields: {
              username: Fields.text('User name')
            },
            permissions: {
              read: null,
              write: ['admin']
            }
          }
        }
      }
    }
  }
});