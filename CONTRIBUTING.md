## Repository and Branches

The GeoGig repository is located on GitHub: github.com/jlanio/Geogig-Desktop

We maintain two branches:

**dev** - `this is where live development happens, we ask that incoming pull requests be made against this branch.`\
**master** - `this represents the latest stable release`

## Pull Requests

Participation is encouraged using the github fork and pull request workflow

Building
---------

To build Geogig-Desktop from source, follow these steps.
##### *Note: To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.*
From your command line:

- Clone the GeoGig source code repository.
  We encourage branch **dev**:\
  `git clone https://github.com/jlanio/Geogig-Desktop.git -b dev`

## After cloning

```bash
# Go into the repository
cd Geogig-Desktop
# Install dependencies
npm install
# Setting environment (download geogig command line)
npm run postinstall
# Run the app
npm start
```

## Packing application for distribution
```bash
# Go into the repository
cd Geogig-Desktop
# Packing
npm run build:win
# A folder named release will be created with the application installer (.exe)
npm run win:exe

```
