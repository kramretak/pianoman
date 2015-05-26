var PianoView = Backbone.View.extend({
    
    initialize: function() {
        this.model = new PianoModel(),
        this.template = _.template($("#tpl-piano-app").html());
        this.isPlaying = false;
        this.$el = $(".pianoman");
    },
    
    render: function() {
        // render main Piano wrapper
        this.$el.append(this.template());

        this.renderSubViews();

        this.addCustomListeners();
    },

    renderSubViews: function() {

        // render sub view for piano keys
        this.pianoKeysView = new PianoKeysView({
            model: this.model,
        });
        this.pianoKeysView.render();
        this.$(".piano-keys").html(this.pianoKeysView.el);

        // render sub view for key stroke log view
        this.pianoLogView = new PianoLogView({
            model: this.model,
            el: this.$(".piano .piano-log")
        });
        this.pianoLogView.render();        
    },

    addCustomListeners: function() {
        var self = this;
        // add a couple listeners yo when the Logger wants to:
        //  a. add a key to the queue.
        //  b. play a Key on the Piano
        this.pianoLogView.on("addKey", function(keyName) {
            self.pianoKeysView.addKeyToLog(keyName);
        });
        this.pianoLogView.on("playKey", function(keyName) {
            self.pianoKeysView.keyStrokeEffect(keyName);
        });
    }
});