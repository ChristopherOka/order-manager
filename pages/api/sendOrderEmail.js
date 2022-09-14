export default async function sendOrderEmail(req, res) {
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
        templateId: 1,
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

    await fetch("https://api.sendinblue.com/v3/smtp/email?&", options)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => {
            res.status(500).json({ error });
            return;
        });

    res.status(200).json({ message: "Email sent" });
}
