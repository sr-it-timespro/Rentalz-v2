

const getPaypalConfiguration = async (req, res) => {

    const paypalConfig = {}

    try {

        paypalConfig.PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
        res.json(paypalConfig);
    } catch (error) {

        console.log(error);

        res.status(404);
        res.json({
            message: error
        })
    }
}


export { getPaypalConfiguration };