var PianoModel = Backbone.Model.extend({
    defaults: {
        keyStructure: "C,CD,D,DE,E,F,FG,G,GA,A,AB,B",
        currentMelody: []
    }
});