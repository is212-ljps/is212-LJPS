# IS212-LJPS

![CI/CD](https://github.com/lanceljr/is212-LJPS/actions/workflows/CI_GCP.yml/badge.svg)
![Integration Tests](https://github.com/lanceljr/is212-LJPS/actions/workflows/intTest_merge.yml/badge.svg)
![Unit Tests](https://github.com/lanceljr/is212-LJPS/actions/workflows/unit_test_merge.yml/badge.svg)
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=ljps)

# Pre-requisites
### Clone codebase
Clone our repository or download the zip file.

```bash
git clone https://github.com/is212-ljps/is212-LJPS.git
```

### Environmental variables
Create `.env.local` files for both the `backend` and `ljps_frontend` folders. Note: testing env variables can be found in [the confluence page](https://g4t7.atlassian.net/wiki/spaces/IGD/pages/5799984/Tech+How-To) 

```
# Backend
host=localhost
user=root
password=
testingHost=
testingUsername=
testingPassword=

# Frontend 
NEXT_PUBLIC_BACKEND=http://localhost:8080
```
### Setting up your database
Ensure that you have your MySQL database set up in the background. In `ljps_sql_setup.sql` line 80 if you have your wamp64 in a different drive or folder, update the path before running the script. To import data, there are 2 ways
1. Copy paste the LMSRawData folder into your `/wamp64/tmp/` directory and then run the script in wamp
2. Run it through the console `mysql -u root -p ljps < ljps_sql_setup.sql` Note: add your own credentials if necessary

# Installation

Go to the folder of the files in your local and use the package manager npm to install dependencies.

```bash
cd backend
npm install 

cd ljps_frontend
npm install
```

# Running the Application 

```bash
cd backend
npm run start

cd ljps_frontend
npm run dev
```
The backend service is running on port `8080` while the frontend is running on port `3000`
# Running tests 

### Unit tests
The unit tests are in the `service/__tests__` folder which contains tests ending with `.test.js`. Please add your tests in this file so all the tests can be run together.
```bash
cd backend
npm test
```

### Integration tests
The integration tests are done based on our API endpoints that we are exposing. They are inside the `src/intTest/__tests__` folder which contains tests ending with `.integration.js`
```bash
cd backend
npm test
```


# CI/CD

### Vercel
Everytime a pull request (PR) is opened, temporary deploy will be made to vercel for our frontend which the developer can use to perferm manual tests. The deploy can be found [here](https://vercel.com/ljps/ljps). After the PR is merged, a full deploy will be made which will be our staging server.

### Google Cloud Run
After each PR merge, the backend code will be deployed to google cloud run. The service can be accessed at this [url](https://ljps-backend-staging-irfr6eefiq-as.a.run.app)

