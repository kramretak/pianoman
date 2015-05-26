var PianoModel = Backbone.Model.extend({
    defaults: {
        keyStructure: "c,cd,d,de,e,f,fg,g,ga,a,ab,b",
        currentMelody: []
    }
});