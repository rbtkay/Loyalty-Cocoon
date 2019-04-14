const mysqlconnection = require('../../database/connection');

exports.countProductVendor = (req, res) => {
    const username = req.query.username;

    mysqlconnection.query('select count(product_id) as productsCount from product_t where product_offered = 1 and user_username = ?',
        [username],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
}

exports.countPurchasePerMonth = (req, res) => {
    const username = req.query.username;

    mysqlconnection.query('select * from purchase_t where vendor_username = ?',
        [username],
        (err, result) => {
            if (err) throw err;

            let countPurchase = 0;
            result.map(purchase => {
                const month = purchase['purchase_date'].split('-')[1];
                const d = new Date();
                const currentMonth = (d.getMonth() + 1).toString();
                if (month === currentMonth) {
                    countPurchase++;
                }
                // console.log(currentMonth);
            })
            res.status(202).json(countPurchase);
        })
}