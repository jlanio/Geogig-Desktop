## Repository and Branches

The GeoGig repository is located on GitHub: github.com/jlanio/Geogig-Desktop

We maintain two branches:

**dev** `- this is where live development happens, we ask that incoming pull requests be made against this branch.`\
**master** `- this represents the latest stable release`

## Pull Requests

Participation is encouraged using the github fork and pull request workflow

Building
---------

To build Geogig-Desktop from source, follow these steps.\
  Note: To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

- Clone the GeoGig source code repository.
  We encourage branch **dev**:\
  `$git checkout  -b origin/dev`
## To Use After cloning

```bash
# Go into the repository
cd Geogig-Desktop
# Install dependencies
npm install
# Setting environment (downloa geogig command line)
node postinstall.js
# Run the app
npm start
```
