require('dotenv').config();
const express =  require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/auth.routes');
const userRoute  = require('./routes/user.routes');
const instructorRoute = require('./routes/instructor.routes');
const courseRoute = require('./routes/course.routes');
const userCourseRoute = require('./routes/useraCourse.routes');
const stirpeRoute = require('./routes/stripePayement.routes');
const cartRoute = require('./routes/cart.routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use (cors());


app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/instructor',instructorRoute);
app.use('/api/course',courseRoute);
app.use('/api/userCourse',userCourseRoute);
app.use('/api/payment',stirpeRoute);
app.use('/api/cart',cartRoute)
app.listen(port ,()=>{
    console.log("listining on port ",port);
})
