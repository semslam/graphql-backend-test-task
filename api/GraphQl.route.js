const { graphqlHTTP } = require("express-graphql");
const isAuthorized = require("../middleware/ApiKeyVerification")
const queriesSchema = require("../models/graphql/FetchCommitsAndCreateKeySchema");
const {hashPassword,generateAccessToken} = require("../lib/encryptAndDecrypt")
const {getRepoCommits} = require("../services/FbReactCommitServices");
const {createKey,find} =  require("../services/ApiKeysServices")



module.exports = (router) => {
const root = { 
    hello:()=>{
      return "Hello Word"
    },
    fetchCommits: async({limit, offset},req)=>{
      if (!req.isAuth) {
        throw new Error('Missing Authorization Header!');
      } 
      return await getRepoCommits(limit, offset);
    },
    createKey: async (query,req)=>{
  
        const {email, password} = query.input
        if (!req.isAuth) {
          throw new Error('Missing Authorization Header!');
        }
        const result = await find(email);
      if(result) throw new Error('User already exist!!')

        const hashPass = await hashPassword(password);
        const accessToken =  generateAccessToken({email})
        const {id,email: username,token} = await createKey({email,hashPass,accessToken})
        console.log(token)
      
        return {
          id:id,
          email:username,
          apiKey:token
        };
      
    }
}


router.use(isAuthorized);
router.use('/queries', graphqlHTTP({
    schema: queriesSchema,
    rootValue:root,
    graphiql: true,
}));

return router;
}


// query{
//   hello
//   fetchCommits(limit:1, offset:10){
//     sha
//     html_url
//     commit{
//       message
//       author{
//         date
//       }
//     }
//     committer{
//       login
//       id
//       node_id
//       avatar_url
//       gravatar_id
//       url
//       html_url
//       followers_url
//       following_url
//       gists_url
//       starred_url
//       subscriptions_url
//       organizations_url
//       repos_url
//       events_url
//       received_events_url
//       type
//       site_admin
//     }
//   }
// }

// create key
// mutation createKey($input: ApiKeyInput) {
//   createKey( input:$input){
//     id
//   	email
//   	apiKey
//   }
// }

// key input
// {
//   "input": {
//     "email":"semslam007@gmail.com",
//     "password":"1234567"
//   }
// }