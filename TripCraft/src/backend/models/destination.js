import mongoose from "mongoose" // this is to import the mongoose

const DestinationSchema = new mongoose.Schema({ //this is syntax to create a new schema
    Destination: String,
    Region: String,
    Tags: [String], //tags are array of strings
    CoverImg: String,
    description: String,
    bestTimeToVisit: String,
    AvgwhetherCondition: String
} , {timestamps : true });

export const Destination = mongoose.model('Destination', DestinationSchema);
    