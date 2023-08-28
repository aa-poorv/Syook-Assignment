Setup:-

1. Run (npm install)
2. download request sending software postman or visual studio thunder Client
   extension.
3. Setup Node.js and MongoDB.
4. Run (npm run dev)

Functioning:-

Auth:

1. Here I have implemented Authentication and Authorization using json web
   token.
2. For Authentication we use signup and signin endpoints.
3. For Authorization we have 3 roles available Admin Delivery and User. i.e. we
   have different routes according to role provided to a login User.
4. using http://localhost:3000/auth/signup post request to signup user with
   username, email, array of roles provided to user and password.(array of roles
   should be added to access different routes)
5. Admin routes only alow with Admin role, customer route allow admin, delivery
   and user roles whereas delivery route allow admin and delivery roles.
6. Now a http://localhost:3000/auth/signin to login the user here we provide
   email and password to login to access further API endpoints.
7. Whereas there is http://localhost:3000/auth/logout post request option to
   logout of the currently logged in user.

admin:

1. http://localhost:3000/admin/addVehicle post request to add new Vehicle.
2. http://localhost:3000/admin/vehicles get request see all vehicles.
3. http://localhost:3000/admin/addItem post request to add new Item.
4. http://localhost:3000/admin/updateItem/:id post request to update a Item
   value with body containing value name or price whatever we need to update.
   here id is of item to be updated. 5.http://localhost:3000/admin/availVehicles
   get request see all vehicles that are available for transporting services.
5. http://localhost:3000/updateVehicle/:id post request to update the Vehicle
   provided by id with providing values such as vehicleType or city whatever
   needs to be edited.

customer:

1. http://localhost:3000/customer/items get request to get all the items
   available for service.
2. http://localhost:3000/customer/newOrder/:id post request to create new order
   to transport with the id being id of the item to included in the order.

delivery:

1. http://localhost:3000/delivery/confirm/:id post request to confirm, the order
   has been delivered successfully where id is id of the order delivered.
