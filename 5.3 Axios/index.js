import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result, error: null }); // Pass null for error
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      data: null, // Pass null for data when there's an error
      error: "No activities available at the moment. Please check back later!",
    });
  }
});

app.post("/", async (req, res) => {
  console.log("Request body:", req.body);
  const type = req.body.type;
  const participants = req.body.participants;

  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    console.log("API response:", response.data);

    const result = response.data;

    if (!result || result.length === 0) {
      console.error("Failed to make request: No data received.");
      res.render("index.ejs", { data: null, error: "No activities that match your criteria." }); // Επιστρέφει στην index.ejs
    } else {
      res.render("solution.ejs", {
        data: result[Math.floor(Math.random() * result.length)],
      });
    }
  } catch (error) {
    console.error("Failed to make request:", error.response ? error.response.data : error.message);
    res.render("index.ejs", {
      data: null,
      error: "An error occurred while fetching activities.", // Επιστρέφει στην index.ejs
    });
  }
});



app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
