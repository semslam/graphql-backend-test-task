const { buildSchema } = require("graphql");

const FacebookReactCommits = `
type Author{
  date:String
}
type Commit{
  message: String
  author:Author
}
type Committer{
  login:String
  id:Int
  node_id:String
  avatar_url:String
  gravatar_id:String
  url:String
  html_url:String
  followers_url:String
  following_url:String
  gists_url:String
  starred_url:String
  subscriptions_url:String
  organizations_url:String
  repos_url:String
  events_url:String
  received_events_url:String
  type:String
  site_admin:Boolean
}
type FacebookReactCommits {
    sha: String
    html_url: String
    commit: Commit
    committer:Committer
  }
`;

const ApiKeys =`
input ApiKeyInput{
  email:String
  password:String
}
type ApiKey{
  id:Int
  email:String
  apiKey:String
}
`

const queriesSchema = buildSchema(`
  type Query {
    hello: String
    getApiKey(email:String): ApiKey
    getApiKeys:[ApiKey]
    fetchCommits(limit:Int!, offset:Int!):[FacebookReactCommits]
  }
  type Mutation {
    createKey(input:ApiKeyInput): ApiKey
  }
  ${ApiKeys}
  ${FacebookReactCommits}

`);

module.exports = queriesSchema;

