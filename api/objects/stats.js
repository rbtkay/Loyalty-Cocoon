const mysqlconnection = require('../../database/connection');

//FIXME: Refactor
exports.countProductVendor = (req, res) => {
    const username = req.query.username;

    mysqlconnection.query('select count(product_id) as productsCount from product_t where product_isOffered = 1 and user_username = ?',
        [username],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
}

//FIXME: Refactor
exports.countPurchasePerMonth = (req, res) => {
    const username = req.query.username;

    mysqlconnection.query('select * from purchase_t where vendor_id = ?',
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
            });
            res.status(202).json(countPurchase);
        });
}

//FIXME: Refactor
exports.getLocoPerMonth = (req, res) => {
    const { username } = req.query;

    mysqlconnection.query('SELECT purchase_t.*,product_t.product_name, product_t.product_loco, product_t.product_category FROM purchase_t, product_t WHERE purchase_t.product_id = product_t.product_id and purchase_t.vendor_id = ?',
        [username],
        (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                console.log(result);
                res.status(200).send(result);
            } else {
                res.status(404).send('No Purchase available');
            }
        })
}
