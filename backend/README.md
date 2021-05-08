# Backend

## Useful Refs
- [using typescript in a nodejs express project](https://www.pullrequest.com/blog/intro-to-using-typescript-in-a-nodejs-express-project/)
- [expressjs api](https://expressjs.com/en/4x/api.html#express)
- [cloud firestore add/read data from db (nodejs)](https://firebase.google.com/docs/firestore/quickstart?authuser=0#node.js)

## Running Instructions
- Install dependencies with `npm i`
- Whenever changes are made run `npm run build` (compiles ts to js)
- To run `npm run exec` and server will listen on port 3000

## Notes
Must export appl. and yelp creditionals as an environment variable: `export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"`
and `export YELP_APPLICATION_CREDENTIALS="/home/user/Downloads/.json"`