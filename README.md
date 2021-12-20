# Blabla application - final project

The aim of this project is to developp an Web App with React and Node.js. This Web app allows users to chat with others people throught differents channels. Please follow the instructions below to run the project and understand all the functionnalities.

## Usage

_how to start and use the application, run the tests, ..._

- Clone this repository, from your local machine:
  ```
  git clone https://github.com/maximeattal/WebTech.git
  cd WebTech
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

### Ressource access control (4/4)

The user only have the access to the channel he created or the channels he was invited to. For that the back-end only send the channels who he is members when he log in. 
We stored the user logged in in cookie of browser otherwize when we refresh the page, the user in context is undefined. After we remove cookie when he logout.

### Invite users to channels  (6/6)

The user have the possibility to invite other users in a channel at the begenning when he create the channel or after the creation of the channel throught a dialog screen. The user can only invite users who are present in the users database, and only who are not already present in the channel, otherwize the textfield said to enter valid users or users already in the channel. We update the channel after the validation of the form and it perist the updated channel in the database and display in reel time on the user screen. After have invite new users, they can have access on the channel.

### Message modification (2/2)

The user can send a message and can edit it after sending. Users can only edit messages they have sent and not those of other users. The user must to click on the more action button and a dropdown menu appears and he have the choice to edit or delete a message. The modification of messages are persistent in the database and it display in reel time on the screen of the user. 

### Message removal (2/2)

The user can send a message and can delete it. He also can only remove messages they have sent and not those of other users. The menu dropdown when clicking on more action button appears and he can remove the message. It is persistent in database and it display in reel time on the screen of the user.


- Account settings  
  _place your graduation and comments_
- Gravatar integration  
  _place your graduation and comments_

### Avatar selection (4/4)

The user have the possibilities to select an avatar among a selection of avatars that we provide in the settings dialog. A menu dropdown are displayed when he clicks on his avatar, and he change his avatar if he wants. This modification is persistent in the database for the user when he valid the form. It is updated and displayed in reel time in front. 


- Personal custom avatar  
  _place your graduation and comments_

## Bonus

_place your graduation and comments_
