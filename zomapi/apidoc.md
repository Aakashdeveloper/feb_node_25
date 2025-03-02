// Page1 (Home Page)

# List of All City(GET)
* http://localhost:9811/location

# List of All Restaurants (GET)
* http://localhost:9811/restaurants?stateId=3

# Restaurants WRT City(GET)
* http://localhost:9811/restaurants

# List of All Meal (GET)
* http://localhost:9811/mealtype

// Page 2 (Listing Page)

# Restaurants WRT MealType(GET)
* http://localhost:9811/filters/1
# List of Rest Wrt Mealtype + cusisine (GET)
* http://localhost:9811/filters/1?cuisineId=1
# List of Rest Wrt mealtype + cost (Get)
* http://localhost:9811/filters/1?lcost=500&hcost=1000
# Sort on basis of Price (GET)
http://localhost:9811/filters/1?sortKey=restaurant_name&sortOrder=1&cuisineId=1
# Pagination (GET)
http://localhost:9811/filters/1?skip=4&limit=2



//Page3 (Details Page)
# Deatils of Rest Wrt to ID (GET)
* http://localhost:9811/details/651394d817e34ede35314c52
# Menu wrt Rest (GET)
* http://localhost:9811/menu/2


//Page4 
# Details of Selected Item (POST)
* http://localhost:9811/menuDetails
# Place the order (POST)
http://localhost:9811/placeOrder
{
      
        "orderId": 1,
        "name": "Amit",
        "email": "amit@gmail.com",
        "address": "Hom 65",
        "phone": 8934645457,
        "cost": 612,
        "menuItem": [
            45,
            34,
            41
        ],
        "status": "Pending"
    }


//Page5
# List of Orders wrt email(GET)
* http://localhost:9811/orders
* http://localhost:9811/orders?email="a@a.com"
# Update order status( PUT)
http://localhost:9811/updateOrder

{
    "_id": "67c285f0d37f569acc47c87b",
    "status": "Delevered"
}
# Delete Order (DELETE)
http://localhost:9811/deleteOrder
{
     "_id": "67c285f0d37f569acc47c87b"
}



