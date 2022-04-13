# graphql-backend-test-task

## Task:

1. Create a nodejs graphql server with a query to fetch a list of commits from facebook/react repository using github rest api as a data source. Commit list should provide minimal information including sha, message, html url, commiter info, date.
2. Add pagination to query for listing commits
3. Protect your graphql server using api key authorization. Store your api keys using an ORM and sqlite inmemory database
4. Add a mutation to generate new api key
5. Add a query for displaying ‘Hello World’ which is accessible for users without authorization
