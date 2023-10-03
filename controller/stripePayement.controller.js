
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {createUserCourses} = require('../models/UserCourses.model');
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
  let courseIds =req.body.courses.map((item)=>{
    return item.course_id
  })
  let sCourseIds = JSON.stringify(courseIds);
    const data = req.body.courses.map((item)=>{
        return {
            price_data: {
              currency: 'inr',
              unit_amount: item.price*100+(item.price*100*0.18),
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
          tax_id_collection: {
            enabled: true,
          },
        mode: 'payment',
        success_url: 'http://localhost:4200',
        cancel_url: 'http://localhost:4200',
        metadata:{
            userId:req.params.user_id,
             course_ids:sCourseIds,
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
        let courseId =JSON.parse( event.data.object.metadata.course_ids);
        const userId = event.data.object.metadata.userId
       await createUserCourses(userId,courseId);
    }
  };
module.exports = {createPayementIntentController,createCheckOutSessionController,webHookController};