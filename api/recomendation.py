import sys
# import seaborn as sns
import pandas as pd
import mysql.connector 
from mysql.connector import Error
import json
try:
    mySQLconnection = mysql.connector.connect(
            host='localhost',
            database='cocoondb',
            user='root',
            password='')
    
    query = "select cust_id, product_id, count(cust_id) as count from purchase_t group by product_id, cust_id"
    
    # cursor = mySQLconnection.cursor()
    # cursor.execute(query)
    # print(cursor.fetchall())
    df = pd.read_sql_query(sql=query, con=mySQLconnection)
    # sns.set_style('white')
    # print("Total number of rows in python_developers is - ", cursor.rowcount)
    # print ("Printing each row's column values i.e.  developer record")
    
    # for row in records:
    #     print("Id = ", row[0], )
    #     print("CustomerId = ", row[1])
    #     print("VendorId  = ", row[2])
    #     print("purchaseDate  = ", row[3], "\n")
    # print(df)
    # cursor.close()
    
except Error as e:
    print("Error while connecting to Cocoon", e)
    
finally:
    if(mySQLconnection .is_connected()):
        mySQLconnection.close()
        # print("MySQL connection is closed")

id = sys.argv[1]
# print(id)

productIds = id.split(',')
if len(productIds) >= 5:
    ids = productIds[-5:]
else:
    ids = productIds
# print(ids)

returnArray = []



def rec(id):
    meanArray = df.groupby('product_id')['count'].mean()
    countArray = df.groupby('product_id')['count'].count()

    # sns.set_style('white')

    mean = meanArray.sort_values(ascending=False)
    #average of the total purchases over the amount of customers that bought it
    count = countArray.sort_values(ascending=False)

    purchases = pd.DataFrame(mean)
    purchases['purchases_numbers'] = pd.DataFrame(count)

    # print(purchases)
    # print(purchases['purchases_numbers'])

    temp = df.pivot_table(index='cust_id', columns='product_id', values='count')

    purchasesmat = temp.fillna(0)

    # print(temp)
    # print(purchasesmat)

    var_user_purchases = purchasesmat[id]

    similar_to_var = purchasesmat.corrwith(var_user_purchases)

    # print(similar_to_var)
    # 
    corr_var = pd.DataFrame(similar_to_var, columns=['Correlation'])
    corr_var.dropna(inplace=True)

    corr_var.sort_values('Correlation', ascending=False)

    # print(purchases)
    # 
    corr_var = corr_var.join(purchases['purchases_numbers'],how='left', lsuffix='_left', rsuffix='_right')
    # print(corr_var)
    # #corr_var is a dataframe, so is purchases so we join them for
    result = corr_var[corr_var['purchases_numbers']>0].sort_values('Correlation', ascending=False).head(5)
    # print(result)
    # print(result.index.get_values())
    return result.index.to_numpy(dtype=str) #returns an array
    # print('result')
    # print(result)

obj = []
for item in ids:
    # rec(item)
    # returnArray.append('/')
    # returnArray.append(item)
    # caca = rec(int(item))
    npArray = rec(int(item)).tolist()
    let = { "id": item, 
            "recommended": npArray}
    obj.append(let)
    # li = npArray.tolist()
    # print(json.dumps(li))
    # returnArray.append(json.dumps(rec(int(item)).values))
# rec(126)
else:
    # print(obj)
    print(json.dumps(obj))

# json.dumps(result)