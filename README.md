# graphql-backend-test-task

## Task:

1. Create a nodejs graphql server with a query to fetch a list of commits from facebook/react repository using github rest api as a data source. Commit list should provide minimal information including sha, message, html url, commiter info, date.
2. Add pagination to query for listing commits
3. Protect your graphql server using api key authorization. Store your api keys using an ORM and sqlite inmemory database
4. Add a mutation to generate new api key?
5. Add a query for displaying ‘Hello World’ which is accessible for users without authorization

# Instructions
1. Open your terminal and navigate to the graphql-backend-test-task folder. Run those commands below. 
```
$ npm install
```
2. Run this to start the API game.
```
$ nodemon
```
## Header Authorization Signature
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbXNsYW0wMDc3N0BnbWFpbC5jb20iLCJpYXQiOjE2NTAyMDY4NjUsImV4cCI6MTY4MTc0Mjg2NX0.2h_beEyTulfcfigwNxyUPpw3yzjLAzaXLEroPQ0qRAk
```
## GraphQl URL Path (POST) `/graphql/queries`

## Query | Fetching Facebook/React and Hello world Payload Example:
```
query{
  hello
  fetchCommits(limit:1, offset:10){
    sha
    html_url
    commit{
      message
      author{
        date
      }
    }
    committer{
      login
      id
      node_id
      avatar_url
      gravatar_id
      url
      html_url
      followers_url
      following_url
      gists_url
      starred_url
      subscriptions_url
      organizations_url
      repos_url
      events_url
      received_events_url
      type
      site_admin
    }
  }
}
```
## Mutation | Create ApiKey Payload Example.
```
mutation createKey($input: ApiKeyInput) {
  createKey( input:$input){
    id
  	email
  	apiKey
  }
}
```
## Mutation | Create ApiKey Input Payload Example.
```
{
  "input": {
    "email":"semslam007@gmail.com",
    "password":"1234567"
  }
}
```