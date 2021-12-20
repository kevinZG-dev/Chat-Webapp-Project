# Chat application - final project

The aim of this project is to developp an Web App with React and Node.js. This Web app allows users to chat with others people throught differents channels. Please follow the instructions below to run the project and understand all the functionnalities.

## Usage

_how to start and use the application, run the tests, ..._

- Clone this repository, from your local machine:
  ```
  git clone
  cd WebTech/project
  ```
- Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:
  ```yaml
  # Install Go (linux)
  apt install golang-go
  # Install Go (macos)
  brew install go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make build
  make examples
  ```
  Note, the provided `.gitignore` file ignores the `dex` folder.
- Now that Dex is built and configured, you can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve ../dex-config/config.yaml
  ```
- Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  npm install
  # Start the back-end
  bin/start
  ```
- Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  npm install
  # Start the front-end
  npm start
  ```

## Author

Kevin Zheng: zheng.kevin.ts@gmail.com <br/>
Maxime Attal: maxime.attal.gabriel@gmail.com <br/>

## Tasks

Project management

### Naming covention (2/2pts)

We tried to respect as much as possible naming convention by respecting a lowercase first letter for folders names, an uppercase first letter for .js files and React Components. We also respect variable and function naming such as toggle for boolean state and handle for handle functions.

### Project structure (4/4pts)

We kept the project structure provided by the professor

- Back-End :
  - bin
  - db
  - lib
  - test
  - package.json
- Dex-Config :
  - config.yml
- Front-End :
  - public
  - src
  - package.json

### Code quality (4/4pts)

We respect indentation of 2 spaces and unnecessary line spaces. We use as much as possible react functionnalities such as the hook useState to have a good React Web app.

### Design, UX (4/4pts)

Our application is UX and design oriented, indeed the layout was done by maxime who is an amateur in ux design. THe application is simple to use and very intuitive and the layout is responsive and even possible to use on mobile phone. We choose a dark theme as default theme with some blue and violet and a light theme with some white and light blue. For design components we use meterial ui library such as textfield, button, dialogs, switch ...

### Git and DevOps (3/4pts)

We both use, during the developpement of the project, our GitHub repository to exchange the features we developped. Each of us work in different branch for each feature and when it is functionnal, we create a pull request and then merge into the main branch. We integrate a CI CD in our project development until we had to modify back-end, since this moment, some test functions do not work. We search a lot of time to modify test function to make it work but unsuccessfuly, we decided to take off CI CD. Morever, we tried to put our application in a docker image and then launch with docker compose back-end, dex server, and front-end but again unsuccesfuly. You can see that work in docker branch.

Application development

### Welcome screens (4/4pts)
We make a welcome screen when a new user arrives in the website good looking with a background linear gradient. This page inform about the web app and our slogan, and we display a screen of the light mode of the website when connected and invite people to try themself. In addition there are a login button from MUI library which redirect to connect with dex.

For the welcome page after they log in, we allow people to create a channels and access to there settings managment. This welcome screen have a background lineat gradient 


- New channel creation  
  _place your graduation and comments_
- Channel membership and access  
  _place your graduation and comments_
- Ressource access control  
  _place your graduation and comments_
- Invite users to channels  
  _place your graduation and comments_
- Message modification  
  _place your graduation and comments_
- Message removal  
  _place your graduation and comments_
- Account settings  
  _place your graduation and comments_
- Gravatar integration  
  _place your graduation and comments_
- Avatar selection  
  _place your graduation and comments_
- Personal custom avatar  
  _place your graduation and comments_

## Bonus

_place your graduation and comments_
