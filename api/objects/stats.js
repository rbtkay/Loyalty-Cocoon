const mysqlconnection = require('../../database/connection');

exports.countProductVendor = (req, res) => {
    const username = req.query.username;

    mysqlconnection.query('select count(product_t.product_id) as productsCount, user_t.user_username from product_t, user_t where product_t.product_isOffered = 1 and user_t.user_username = ? and user_t.user_id = product_t.user_id',
        [username],
        (err, result) => {
            if (err) throw err;
            res.send(result);
        });
}

exports.countPurchasePerMonth = (req, res) => {
    const username = req.query.username;

    mysqlconnection.query('select purchase_t.*, user_t.user_username from purchase_t, user_t where user_t.user_username = ? and purchase_t.vendor_id = user_t.user_id',
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

exports.getLocoPerMonth = (req, res) => {
    const { username } = req.query;

    mysqlconnection.query('SELECT purchase_t.*,product_t.product_name, product_t.product_loco, product_t.product_category, user_t.user_username FROM purchase_t, product_t, user_t WHERE purchase_t.product_id = product_t.product_id and user_t.user_username = ? and user_t.user_id = purchase_t.vendor_id',
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
