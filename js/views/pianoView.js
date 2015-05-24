var PianoView = Backbone.View.extend({
    el: $(".piano-app"),
    initialize: function() {
        this.model = new PianoModel(),
        this.template = _.template($("#tpl-piano-app").html());
        this.isPlaying = false;
    },
    render: function() {
        // render main Piano wrapper
        this.$el.append(this.template());

        // render sub view for piano keys
        var pianoKeysView = new PianoKeysView({
            model: this.model,
            el: this.$(".piano-keys")
        });
        pianoKeysView.render();

        var self = this;
        // render sub view for key stroke log view
        var pianoLogView = new PianoLogView({
            model: this.model,
            el: this.$(".piano-log"),
            $pianoEl: this.$(".piano-keys")
        });
        pianoLogView.render();
    },
    keyStroke: function(e) {
        e.preventDefault();
        var keyName = $(e.target).data("keyname");
        var currentMelody = this.model.get("currentMelody");
        this.model.set({
            "currentMelody": currentMelody.push(keyName)
        });
        console.log(this.model.get("currentMelody"));
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
                self.$("li a").removeClass("playing");
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
            var $key = this.$("a[data-keyname='" + keyName + "']");
            var audio = $("audio[data-keyname='" + keyName + "']")[0];
            console.log(keyName, $key, audio);
            $key.addClass("playing");
            audio.play();
            this.keyIndex++;
        }
    }
});