const { Octokit } = require("@octokit/core");

const octokit = new Octokit();
/**
 * fetch facebook/react commits from github repo 
 * @param {Number} limit 
 * @param {Number} offset 
 * @returns {Array} commits
 */
const getRepoCommits = async (limit = 1, offset = 10) =>{
    if(limit <= 0 || offset <= 0) limit =1, offset =1;
   
   const commits =  await octokit.request(`GET /repos/{owner}/{repo}/commits?page=${limit}&per_page=${offset}`, {
        owner: 'facebook',
        repo: 'react'
      })
return commits.data;
}


module.exports = {getRepoCommits};
