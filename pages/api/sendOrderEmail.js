export default async function sendOrderEmail(req, res) {
    console.log(req.body);

    let messageBody = `
    <div>
        <div style="display: flex; justify-content: center; height: 8rem; margin-top: 3rem">
            <img src="https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/public/mrave_logo.png?t=2022-09-15T01%3A36%3A49.534Z"/>
        </div>
        <div style="margin-top: 2rem; margin-bottom: 0.75rem">
            <h1 style="text-align: center; font-size: 2.5rem; font-weight: bold">Your Cookie Order</h1>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; max-width: 60%; margin: auto;">
        `;
    Object.keys(req.body.cart).map((item) => {
        const product = req.body.products.find(
            (product) => product.product_id == item.replace("product_", "")
        );
        messageBody += `
        <div style="display: flex; flex-direction:column; align-items: center">
            <h3 style="color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem">
                ${product.product_name}
            </h3>
            <div style="box-shadow: 0 0 #0000,0 0 #0000,0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1); background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem">
                    <img style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src="${product.product_img_api_path}"/>
                </div>
                <div style="background-color: rgb(22, 22, 22); border-radius: 0.375rem; position: absolute; height: 2rem; width: 3.5rem; left: 0; bottom: 0; margin-left: 0.5rem; margin-bottom: 0.5rem">
                    <p style="color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        ${req.body.cart[item]}x
                    </p>
                </div>
            </div>
        </div>
        `;
    });
    messageBody += `</div>
             <div style="margin-top: 1rem;">
                <p style="text-align: center; font-size: 2rem; font-weight: bold;">Total Cost: $${
                    req.body.order_cost
                }</p>
             </div>
             <div style="box-shadow: 0 10px 15px 0px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1); padding: 2rem; max-width: 40%; margin: auto;">
                <div style="margin-top: 1rem;">
                    <h2 style="text-align: center; font-size: 1.5rem; font-weight: bold;">Order Details</h2>
                </div>
                <div style="margin-top: 0.3rem;">
                    <p style="text-align: center; font-size: 1.5rem;">Delivery Date: ${
                        req.body.delivery_date
                    }</p>
                </div>
                <div style="margin-top: 0.1rem;">
                    <p style="text-align: center; font-size: 1.5rem;">Payment Method: ${
                        req.body.payment_type
                    }</p>
                </div>
                <div style="margin-top: 0.2rem;">
                    <p style="text-align: center; font-size: 1.2rem; font-style: italic">${
                        req.body.payment_type === "E-Transfer"
                            ? "Please direct E-Transfer to martharave@yahoo.com"
                            : "Please pay cash at time of delivery"
                    }</p>
                </div>
                <div style="margin-top: 0.2rem;">
                    <p style="text-align: center; font-size: 1.2rem; font-style: italic">* if there are any additional fees, I will email you directly with the correct total</p>
                </div>
             </div>
             <div style="display: flex; justify-content: center; margin-top: 1rem; margin-bottom: 3rem;">
                <div style="box-shadow: 0 10px 15px 0px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1); padding: 2rem; max-width: 40%;">
                    <p style="font-size: 1.5rem">Please feel free to email me if you have any questions at <a href="mailto:martharave@yahoo.com">martharave@yahoo.com</a><br><br>I look forward to baking holiday treats for you!<br><br>Sincerely,<br>Martha</p>
                </div>
             </div>`;
    messageBody += `</div>`;
    console.log(messageBody);

    let reqHeaders = new Headers();
    reqHeaders.append("api-key", process.env.SENDINBLUE_API_KEY);
    reqHeaders.append("content-type", "application/json");
    reqHeaders.append("accept", "application/json");

    let reqBody = JSON.stringify({
        sender: {
            email: "marthamrave@gmail.com",
            name: "Martha Rave Cookies",
        },
        subject: "Your Order from Martha Rave Cookies",
        htmlContent: messageBody,
        messageVersions: [
            {
                to: [
                    {
                        email: req.body.email,
                        name: req.body.name,
                    },
                ],
            },
            {
                to: [
                    {
                        email: "marthamrave@gmail.com",
                        name: "Martha Rave",
                    },
                ],
                subject: "You've received a new order!",
            },
        ],
    });

    const options = {
        method: "POST",
        headers: reqHeaders,
        body: reqBody,
    };

    // await fetch("https://api.sendinblue.com/v3/smtp/email?&", options)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => {
    //         res.status(500).json({ error });
    //         return;
    //     });

    res.status(200).json({ message: "Email sent" });
}
