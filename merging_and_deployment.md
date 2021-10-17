## Development Process
1. Select a feature that you're going to be working on.
2. Pull the code from Github repository to your local machine to make sure your local repo is up to date.
3. Create a new branch and start developing the feature.
4. Push the code to Github once finished and passed all tests.
5. Make a pull request to merge the feature's branch into the main branch.
6. Once the pull request is successful, delete the feature's branch.
---
## Commits
Keep each commit message concise and relevant.  

- The first line should concisely describe the implemented feature (like a release note).
- Optionally describe lengthier details on the following lines.
- Specify if the commit containts breaking changes.
- Refactoring should be done in separate commits.
---
## Deployment
Automatically deploy to Heroku when we merge to the main branch.

Setup Github action to autmatically deploy code:
1. Create workflow.
3. Create a GitHub secret.
4. Edit main.yml file.
5. Commit main.yml file.
6. Test workflow.
