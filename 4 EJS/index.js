import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

// Εύρεση της τρέχουσας διαδρομής αρχείου
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
// Ρύθμιση του φακέλου views
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    const today = new Date();
    let day = today.getDay();

 
    let type="weekday";
    let adv="You better work b!";
    if(day===0 || day===6){
        type="weekend";
        adv="Relax and enjoy your company";
    }



    console.log(day);
  res.render("index", { dayType: type, advice: adv });
});
