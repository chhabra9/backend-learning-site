
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {createUserCourse} = require('../models/UserCourses.model');
const createPayementIntentController  = async(req,res)=>{
    const items = req.body;
    const paymentIntent  = await stripe.paymentIntents.create({
        amount: items.amount,
        currency: 'inr'
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
      });
}
const createCheckOutSessionController =  async (req, res) => {
try{
    const data = req.body.map((item)=>{
        return {
            price_data: {
              currency: 'inr',
              unit_amount: item.price*100,
              product_data: {
                name: item.title,
                description: item.description,
              },
            },
            quantity: 1,
          }
    })
    const session = await stripe.checkout.sessions.create({
        line_items: data,
        mode: 'payment',
        success_url: 'http://localhost:4200',
        cancel_url: 'http://localhost:4200',
        metadata:{
            email:req.query.email,
            course_ids:req.body[0].course_id,
        
        }

      });
    res.status(200).json({url:session.url})
}catch(err){
        res.status(500).json(err.message)
    }
  };
  const webHookController = async(request,response)=> {
    const event = request.body;
  let checkout;
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        break;
      case 'checkout.session.completed':
         checkout = event.data.object;
        break;
      default:
    }
  
    // Return a response to acknowledge receipt of the event
    response.json({received: true});
    if(checkout){
        const courseId = event.data.object.metadata.course_ids;
        const email = event.data.object.metadata.email
        await createUserCourse({email,courseId});
    }
  };
module.exports = {createPayementIntentController,createCheckOutSessionController,webHookController};