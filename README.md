# Solution to technical assessment

The source code for this solution can be found in the front-end folder. The back-end folder contains the server that runs the eligibility endpoint service. The user interface can be seen by running 

```
docker-compose up
```

from within this folder. This command will launch the front and backend and the UI can then be seen at http://localhost:3001

tests for the frontend can be run using 
```
npm test
```
from within the front-end folder

The backend folder contains a simple Eligibility Service that returns the following at the following endpoints 

/api/111 - CUSTOMER_ELIGIBLE

/api/666 - CUSTOMER_INELIGIBLE

/api/999 - status 500 internal server error

/api/222 (or any other value) - status 404 {acc_number} is not valid 
