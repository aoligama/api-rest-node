const { Schema } = require('mongoose');

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            string: String,
            evt_date: Number,
            to_happen: Boolean,
        },
        { timestamps: true }
    );

    schema.method('toJSON', function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Event = mongoose.model("event", schema);
    return Event;
}