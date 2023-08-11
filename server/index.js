import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51MJ8ugBVm1gdl9i0aghjOHsCLV1ZfCLyoU6a9DanC2M5b3sBQSNzbpez88icuTZsuQ5MAMhqas155G5eIdKbqLsq00E3Of0mvG";
const SECRET_KEY = "sk_test_51MJ8ugBVm1gdl9i00PfoZ40iP76WoLOxBlDhlDi9vRMKxwq4akwEsV7X3ntpyI9EUcH79RQXHi0bup6pMfKN3Tzv00eQYK9Jae";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.use(express.json());

app.post("/send-payment", async (req, res) => {
  try {
   const { mount } = req.body;
    console.log(mount)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: mount, 
      currency: "pen",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});