var PianoLogView = Backbone.View.extend({
    initialize: function(options) {
        this.template = _.template($("#tpl-piano-log").html());
        this.model.on('change', this.render, this);
        this.$pianoEl = options.$pianoEl
    },
    events: {
        "click .play": "playMelody"
    },
    render: function() {
        var self = this;
        var logElement = this.template({
            melody: self.model.get("currentMelody")
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
                self.$pianoEl.find("li a").removeClass("playing");
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
            var $key = this.$pianoEl.find("a[data-keyname='" + keyName + "']");
            var audioFile = $("audio[data-keyname='" + keyName + "']")[0];
            $key.addClass("playing");
            this.keyIndex++;
            if (audioFile) {
                audioFile.play();
            }
        }
    }
});