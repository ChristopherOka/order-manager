export default function testEmail() {
    const name = "Chris";
    const products = [
        {
            productName: "Shortbread",
            productQty: 2,
            imagePath:
                "https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/santa_assortment.webp?t=2022-09-16T02%3A44%3A52.784Z",
        },
        {
            productName: "Chocolate Chip",
            productQty: 1,
            imagePath:
                "https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/santa_assortment.webp?t=2022-09-16T02%3A44%3A52.784Z",
        },
        {
            productName: "Chocolate Chip",
            productQty: 1,
            imagePath:
                "https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/santa_assortment.webp?t=2022-09-16T02%3A44%3A52.784Z",
        },
        {
            productName: "Chocolate Chip",
            productQty: 1,
            imagePath:
                "https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/santa_assortment.webp?t=2022-09-16T02%3A44%3A52.784Z",
        },
        {
            productName: "Chocolate Chip",
            productQty: 1,
            imagePath:
                "https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/santa_assortment.webp?t=2022-09-16T02%3A44%3A52.784Z",
        },
        {
            productName: "Chocolate Chip",
            productQty: 1,
            imagePath:
                "https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/santa_assortment.webp?t=2022-09-16T02%3A44%3A52.784Z",
        },
        {
            productName: "Chocolate Chip",
            productQty: 1,
            imagePath:
                "https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/santa_assortment.webp?t=2022-09-16T02%3A44%3A52.784Z",
        },
    ];
    const order_cost = 20.0;
    const delivery_date = "December 25th";
    const payment_type = "E-Transfer";
    let body = `
    <div>
        <div style="width: 100%; height: 8rem; margin-top: 3rem">
            <div style="width: fit-content; margin: auto;">
                <img style="height: 8rem; width: 8rem;" src="https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/public/mrave_logo.png?t=2022-09-15T01%3A36%3A49.534Z"/>
            </div>
        </div>
        <div style="margin-top: 2rem; margin-bottom: 0.75rem">
            <h1 style="text-align: center; font-size: 2.5rem; font-weight: bold">Your Cookie Order</h1>
        </div>
        <table style="max-width: 60%; margin: auto;">
        <tbody>
        `;
    products.forEach((product, index) => {
        if (index % 3 === 0) {
            body += `<tr>`;
        }
        body += `
        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem">
                ${product.productName}
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=${product.imagePath}/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        ${product.productQty}x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        ${product.productPrice}
                    </p>
                </div>
            </div>
            
        </td>
        `;
        if ((index + 1) % 3 === 0 && index !== 0) {
            body += `</tr>`;
        }
    });
    body += `</tbody></table>
             <div style="margin: 1rem 0;">
                <p style="text-align: center; font-size: 2rem; font-weight: bold;">Total Cost: $${order_cost}</p>
             </div>
             <div style="border-radius: 5px; border: 2px solid rgb(230, 230, 230); padding: 2rem; max-width: 40%; margin: auto;">
                <div>
                    <h2 style="text-align: center; font-size: 1.5rem; font-weight: bold;">Order Details</h2>
                </div>
                <div style="margin-top: 0.3rem;">
                    <p style="text-align: center; font-size: 1.5rem;">Delivery Date: ${delivery_date}</p>
                </div>
                <div style="margin-top: 0.1rem;">
                    <p style="text-align: center; font-size: 1.5rem;">Payment Method: ${payment_type}</p>
                </div>
                <div style="margin-top: 0.2rem;">
                    <p style="text-align: center; font-size: 1.2rem; font-style: italic">${
                        payment_type === "E-Transfer"
                            ? "Please direct E-Transfer to martharave@yahoo.com"
                            : "Please pay cash at time of delivery"
                    }</p>
                </div>
                <div style="margin-top: 0.2rem;">
                    <p style="text-align: center; font-size: 1.2rem; font-style: italic">* if there are any additional fees, I will email you directly with the correct total</p>
                </div>
             </div>
             <div style="margin: auto; width: fit-content;border-radius: 5px; border: 2px solid rgb(230, 230, 230); margin-top: 1rem; margin-bottom: 3rem;">
                <div style="padding: 2rem;">
                    <p style="font-size: 1.5rem">Please feel free to email me if you have any questions at <a href="mailto:martharave@yahoo.com">martharave@yahoo.com</a><br><br>I look forward to baking holiday treats for you!<br><br>Sincerely,<br>Martha</p>
                </div>
             </div>`;
    body += `</div>`;
    body = `       <!DOCTYPE html>
    <html style="font-family: Verdana, sans-serif; color: rgb(22, 22, 22);">
    <body>
        <div style="width: 100%; height: 8rem; margin-top: 3rem">
            <div style="width: fit-content; margin: auto;">
                <img style="height: 8rem; width: 8rem;" src="https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/public/mrave_logo.png?t=2022-09-15T01%3A36%3A49.534Z"/>
            </div>
        </div>
        <div style="margin-top: 2rem; margin-bottom: 0.75rem">
            <h1 style="margin: 0;text-align: center; font-size: 2.5rem; font-weight: bold">Your Cookie Order</h1>
        </div>
        <table style="max-width: 60%; margin: auto;">
        <tbody>
        <tr>
        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="margin: 0;color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem; white-space: nowrap;">
                Toblerone Shortbread
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/toblerone_shortbread.webp/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="margin: 0; color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        3x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="margin: 0;color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        $45
                    </p>
                </div>
            </div>
        </td>

        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="margin: 0;color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem; white-space: nowrap;">
                Gingerbread Snowflake
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/gingerbread_snowflake.webp?t=2022-09-16T02%3A43%3A36.156Z/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="margin: 0; color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        1x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="margin: 0;color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        $20
                    </p>
                </div>
            </div>
        </td>

        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="margin: 0;color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem; white-space: nowrap;">
                Sugar Cookie Snowflake
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/sugar_cookie_snowflake.webp/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="margin: 0; color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        1x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="margin: 0;color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        $20
                    </p>
                </div>
            </div>
        </td>
        </tr><tr>
        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="margin: 0;color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem; white-space: nowrap;">
                Lemon & Ginger Shortbread
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/lemon_ginger_shortbread.webp?t=2022-09-16T02%3A44%3A28.794Z/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="margin: 0; color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        1x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="margin: 0;color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        $10
                    </p>
                </div>
            </div>
        </td>

        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="margin: 0;color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem; white-space: nowrap;">
                Pecan Dusters
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/pecan_dusters.webp?t=2022-09-16T02%3A44%3A40.385Z/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="margin: 0; color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        1x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="margin: 0;color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        $10
                    </p>
                </div>
            </div>
        </td>

        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="margin: 0;color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem; white-space: nowrap;">
                Graham Toffee Bark
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/graham_toffee_bark.webp?t=2022-09-16T02%3A43%3A59.929Z/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="margin: 0; color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        1x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="margin: 0;color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        $9
                    </p>
                </div>
            </div>
        </td>
        </tr><tr>
        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="margin: 0;color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem; white-space: nowrap;">
                Cherry Shortbread
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/cherry_shortbread.webp?t=2022-09-15T02%3A52%3A53.127Z/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="margin: 0; color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        1x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="margin: 0;color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        $9
                    </p>
                </div>
            </div>
        </td>

        <td style="padding-bottom: 1rem; padding: 0 0.5rem;">
            <h3 style="margin: 0;color:rgb(22, 22, 22); line-height: 1.75rem; font-size: 1.125rem; text-align: center; padding-bottom: 0.25rem; white-space: nowrap;">
                Chocolate Toffee Shortbread
            </h3>
            <div style="border: 1.5px solid rgb(230, 230, 230); margin:auto; background-color: rgb(250, 250, 250); border-radius: 0.375rem; overflow: hidden; width: 10rem; height: 10rem; position: relative">
                <div style="border-radius: 0.375rem; height: 100%;">
                    <img style="inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" src=https://wefopjbwswtxrkbsmzvn.supabase.co/storage/v1/object/public/product-images/chocolate_toffee_shortbread.webp/>
                </div>
            </div>
            <div style="width: fit-content; margin: auto; padding-top: 0.4rem;">
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem; margin-right: 0.2rem;">
                    <p style="margin: 0; color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        1x
                    </p>
                </div>
                <div style="display: inline-block; background-color: rgb(22, 22, 22); border-radius: 0.375rem; height: 2rem; width: 3.5rem;">
                    <p style="margin: 0;color: rgb(250, 250, 250); font-weight: bold; text-align: center; font-size: 1.5rem; line-height: 2rem">
                        $9
                    </p>
                </div>
            </div>
        </td>
        </tbody></table>
             <div style="margin: 1rem 0;">
                <p style="margin: 0;text-align: center; font-size: 2rem; font-weight: bold;">Total Cost: $132</p>
             </div>
             <div style="border-radius: 5px; border: 2px solid rgb(230, 230, 230); padding: 2rem; max-width: 40%; margin: auto;">
                <div>
                    <h2 style="margin: 0;text-align: center; font-size: 1.5rem; font-weight: bold;">Order Details</h2>
                </div>
                <div style="margin-top: 0.3rem;">
                    <p style="margin: 0;text-align: center; font-size: 1.5rem;">Delivery Date: 2022-12-08</p>
                </div>
                <div style="margin-top: 0.1rem;">
                    <p style="margin: 0;text-align: center; font-size: 1.5rem;">Payment Method: E-Transfer</p>
                </div>
                <div style="margin-top: 0.2rem;">
                    <p style="margin: 0;text-align: center; font-size: 1.2rem; font-style: italic">Please direct E-Transfer to martharave@yahoo.com</p>
                </div>
                <div style="margin-top: 0.2rem;">
                    <p style="margin: 0;text-align: center; font-size: 1.2rem; font-style: italic">* if there are any additional fees, I will email you directly with the correct total</p>
                </div>
             </div>
             <div style="margin: auto; width: fit-content;border-radius: 5px; border: 2px solid rgb(230, 230, 230); margin-top: 1rem; margin-bottom: 3rem;">
                <div style="padding: 2rem;">
                    <p style="margin: 0;font-size: 1.5rem">Please feel free to email me if you have any questions at <a href="mailto:martharave@yahoo.com">martharave@yahoo.com</a><br><br>I look forward to baking holiday treats for you!<br><br>Sincerely,<br>Martha</p>
                </div>
             </div></div></body></html>`;
    return <div dangerouslySetInnerHTML={{ __html: body }}></div>;
}
