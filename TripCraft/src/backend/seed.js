import mongoose from "mongoose"
import { Destination } from "./models/destination.js" //named exprot
import { Places } from "./models/places.js";

let a = await mongoose.connect("mongodb://localhost:27017/DestinationDeatils");

await Destination.insertMany([{
    Destination: "aasdf",
    Region: "qbv",
    Tags: ["asdf"], //tags are array of strings
    CoverImg: "asdfwe",
    description: "WebGLTransformFeedback",
    bestTimeToVisit: "cvaw",
    AvgwhetherCondition: "wrvq"
}, {
    Destination: "qbvds",
    Region: "kty",
    Tags: ["tyn"], //tags are array of strings
    CoverImg: "jth",
    description: "rtwb",
    bestTimeToVisit: "qef",
    AvgwhetherCondition: "adf"
}])

await Places.insertMany([{
    destinationId: "varanasi",
    region: "Uttar Pradesh",
    bestime: "October to March",
    spots: [
      "Dashashwamedh Ghat",
      "Kashi Vishwanath Temple",
      "Assi Ghat",
      "Sarnath"
    ],
    food: "Kachori Sabzi, Banarasi Paan, Malaiyyo",
    budget: "₹5,000 - ₹12,000 per person",
    travel: "Well connected by flights and trains from major Indian cities.",
    activities: "Ganga Aarti, Temple Visits, Boat Ride, Heritage Walk"
  },

  {
    destinationId: "coorg",
    region: "Karnataka",
    bestime: "October to March",
    spots: [
      "Abbey Falls",
      "Dubare Elephant Camp",
      "Raja's Seat",
      "Coffee Plantations"
    ],
    food: "Pandi Curry, Kadumbuttu, Bamboo Shoot Curry",
    budget: "₹8,000 - ₹16,000 per person",
    travel: "Nearest airports are Mysore and Mangalore. Best reached by road.",
    activities: "Coffee Plantation Tours, Trekking, Camping, Wildlife Watching"
  }])

console.log("run succeed");
mongoose.connection.close()