var PianoKeysView = Backbone.View.extend({

    initialize: function() {
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

    // event handler for clicking a Key on the piano
    keyStroke: function(e) {
        e.preventDefault();
        var keyName = $(e.target).data("keyname");
        // ignore the black keys for now...
        if (keyName.length > 1) {
            return;
        }
        this.addKeyToLog(keyName);
        this.keyStrokeEffect(keyName);
    },

    // shows the key pressed for 1 second and plays a tone.
    keyStrokeEffect: function(keyName) {
        var $key = this.$("a[data-keyname='" + keyName + "']");
        var audio = $("audio[data-keyname='" + keyName + "']")[0];
        if ($key.length > 0 && audio) {
            $key.addClass("playing");
            audio.play();
            window.setTimeout(function() {
                $key.removeClass("playing");
                audio.pause();
                audio.curentTime = 0;
            }, 1000);
        } else {
            alert("It appears that our piano is out of tune. Please come back later. :(");
        }
    },

    addKeyToLog: function(keyName) {
        var currentMelody = this.model.get("currentMelody");
        currentMelody.push(keyName);
        this.model.set({
            "currentMelody": currentMelody
        });
        this.model.trigger("change");
    }
});