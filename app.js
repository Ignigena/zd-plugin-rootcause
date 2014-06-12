(function(){

  return {
    appID: 'rootCauseObserver',

    events: {
      'app.activated':  'rootCauseChanged',
      'ticket.custom_field_23869116.changed': 'rootCauseChanged'
    },

    rootCauseChanged: function(data){
      var rcFieldId = 'custom_field_23869116',
          rcSubFieldId = 'custom_field_23837073',
          definitions = JSON.parse(this.setting('rootCauseFields'));

      if (definitions) {
        var rootCause = this.ticket().customField(rcFieldId),
            rootCauseSubmenu = this.ticketFields(rcSubFieldId).options(),
            rootCauseSubmenuValue = this.ticket().customField(rcSubFieldId);

        rootCauseSubmenu.forEach(function(field) {
          var fieldValue = field.value();
          if (rootCause && fieldValue && (!definitions[rootCause] || definitions[rootCause].indexOf(fieldValue) == -1)) {
            field.hide();
          } else {
            field.show();
          }
        });

        if (!definitions[rootCause] || definitions[rootCause].indexOf(rootCauseSubmenuValue) == -1) {
          this.ticket().customField(rcSubFieldId, null);
        }
      }
    }
  };

}());
