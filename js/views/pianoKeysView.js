var PianoKeysView = Backbone.View.extend({
    el: $(".piano-keys"),
    initialize: function(options) {
        this.keyTemplate = _.template($("#tpl-piano-key").html());
    },
    events: {
        "click li > a": "keyStroke",
    },
    render: function() {
        var self = this;
        var keyStructure = this.model.get("keyStructure").split(",");

        this.$el.empty();
        // render each Piano key, based on the keys defined in the model
        _.each(keyStructure, function(keyName) {
            var key = self.keyTemplate({
                keyName: keyName.toLowerCase(),
                blackKey: keyName.length > 1
            });
            self.$el.append(key);
        });
    },
    keyStroke: function(e) {
        e.preventDefault();
        var keyName = $(e.target).data("keyname");
        var currentMelody = this.model.get("currentMelody");
        currentMelody.push(keyName);
        this.model.set({
            "currentMelody": currentMelody
        });
        this.model.trigger("change");
    }
});