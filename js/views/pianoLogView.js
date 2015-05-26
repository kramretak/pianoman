var PianoLogView = Backbone.View.extend({

    initialize: function(options) {
        var self = this;
        this.template = _.template($("#tpl-piano-log").html());
        this.model.on('change', this.render, this);

        // add global window keypress listener here (since we can't add it to
        // our events hash, which is scoped to just this View)
        $(window).on("keyup", function(e) {
            self.keyInput(e);
        })
    },

    events: {
        "click .play": "playMelody",
        "click .reset": "resetMelody"
    },

    render: function() {
        var self = this;
        var logElement = this.template({
            melody: self.model.get("currentMelody"),
            emptyLog: self.model.get("currentMelody").length === 0
        });
        this.$el.html(logElement);
    },

    playMelody: function() {
        var self = this;
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.$(".play").prop("disabled", true);
            this.melody = this.model.get("currentMelody");
            this.keyIndex = 0;
            // play first key immediately, don't want to wait 1 sec
            self.playKey();
            // play all other keys with a 1 sec interval
            this.interval = setInterval(function() {
                self.playKey();
            }, 1000);
        }        
    },
    playKey: function() {
        if (this.keyIndex >= this.melody.length) {
            this.isPlaying = false;
            this.$(".play").prop("disabled", false);
            clearInterval(this.interval);
        } else {
            var keyName = this.melody[this.keyIndex].toLowerCase();
            this.trigger("playKey", keyName);
            this.keyIndex++;
        }
    },

    keyInput: function(e) {
        // retrieve the character that was typed
        var keyName = String.fromCharCode(e.keyCode).toLowerCase();
        // if the key (letter) exists, then play that key on the piano and add
        // it to the queue
        if (_.indexOf(this.model.get("keyStructure"), keyName) > -1) {
            this.trigger("playKey", keyName);
            this.trigger("addKey", keyName);

        // if a non-matching character was typed, re-render the view (and as
        // a result, undoing the value that was typed)
        // + reinforce typing the right letters, with an annoying little BZZ! :)
        } else {
            var errorSound = $("audio[data-keyname='error']")[0];
            errorSound.play();
            this.render();
        }
    },
    
    resetMelody: function() {
        if (confirm("Are you sure that you want to erase your composition??")) {
            this.model.set({
                "currentMelody": []
            });
            this.model.trigger("change");
        }
    }
});