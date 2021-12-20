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

## Project management

### Naming covention (2/2pts) ✅

We tried to respect as much as possible naming convention by respecting a lowercase first letter for folders names, an uppercase first letter for .js files and React Components. We also respect variable and function naming such as toggle for boolean state and handle for handle functions.

### Project structure (4/4pts) ✅

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

### Code quality (4/4) ✅

We respect indentation of 2 spaces and unnecessary line spaces. We use as much as possible react functionnalities such as the hook useState to have a good React Web app.

### Design, UX (4/4) ✅

Our application is UX and design oriented, indeed the layout was done by maxime who is an amateur in ux design. THe application is simple to use and very intuitive and the layout is responsive and even possible to use on mobile phone. We choose a dark theme as default theme with some blue and violet and a light theme with some white and light blue. For design components we use meterial ui library such as textfield, button, dialogs, switch ...

### Git and DevOps (3/4) ✅

We both use, during the developpement of the project, our GitHub repository to exchange the features we developped. Each of us work in different branch for each feature and when it is functionnal, we create a pull request and then merge into the main branch. We integrate a CI CD in our project development until we had to modify back-end, since this moment, some test functions do not work. We search a lot of time to modify test function to make it work but unsuccessfuly, we decided to take off CI CD. Morever, we tried to put our application in a docker image and then launch with docker compose back-end, dex server, and front-end but again unsuccesfuly. You can see that work in docker branch.

## Application development 

### Welcome screens (4/4) ✅
We make a welcome screen when a new user arrives in the website good looking with a background linear gradient. This page inform about the web app and our slogan, and we display a screen of the light mode of the website when connected and invite people to try themself. In addition there are a login button from MUI library which redirect to connect with dex.

For the welcome page after they log in, we allow people to create a channels and access to there settings managment. This welcome screen have a background lineat gradient 


### New channel creation (6/6) ✅

People, when they are connected, have the possibilities to create a new channel in two different manners, from the welcome page by clicking in the create channel icon and from the channels drawer by clicking in the add button. A dialog appears and they can enter the channel name which is required and some members. The creator pf the channel is automatically the first user and the creator of the channel. The members texfield is shielded so they only can invite people who are in the users database. They can cancel the creation or send the form and persist the channel in the database. Once created, the channel is accessible at anytime for its users in the list of channels in the drawer.

### Channel membership and access (4/4) ✅

If the user log in for the first time, he is created automatically in the database. When the user create a channel, the user ID is associated with the created channel (the creator). Finally, every request sent to the back-end contain the user access token in the http header with its identity to be validate by the authentication middleware.

### Ressource access control (4/4) ✅

The user only have the access to the channel he created or the channels he was invited to. For that the back-end only send the channels who he is members when he log in. 
We stored the user logged in in cookie of browser otherwize when we refresh the page, the user in context is undefined. After we remove cookie when he logout.

### Invite users to channels  (6/6) ✅

The user have the possibility to invite other users in a channel at the begenning when he create the channel or after the creation of the channel throught a dialog screen. The user can only invite users who are present in the users database, and only who are not already present in the channel, otherwize the textfield said to enter valid users or users already in the channel. We update the channel after the validation of the form and it perist the updated channel in the database and display in reel time on the user screen. After have invite new users, they can have access on the channel.

### Message modification (2/2) ✅

The user can send a message and can edit it after sending. Users can only edit messages they have sent and not those of other users. The user must to click on the more action button and a dropdown menu appears and he have the choice to edit or delete a message. The modification of messages are persistent in the database and it display in reel time on the screen of the user. 

### Message removal (2/2) ✅

The user can send a message and can delete it. He also can only remove messages they have sent and not those of other users. The menu dropdown when clicking on more action button appears and he can remove the message. It is persistent in database and it display in reel time on the screen of the user.


### Account settings (4/4) ✅

Users can manage their account settings in two manners, the first by clicking on their avatar on the header and click on the menu dropdown (which display the account logged in) and click on settings, or in the welcome page, he can access on it by clicking on the settings button. An dialog appears and it shows five settings:

- The avatar of the user (Can edit it by clicking on it and select the one he wants)
- His email in a textfield which he cannot edit it (disable)
- His fullname if it is already set or he can set because it's empty by default
- His phone number if it is already set or he can also set
- A switch to switch to the light mode or dark mode (it works and keep the choice of the user even when he will log in in future). It's dark mode by default 

All of this value is persistent in database when the user valid the form and it update in reel time in front. The header display well the avatar after the modification in settings. The theme mode is also registered for the user in the database so when he will log in in future it will keep his preference theme.

### Gravatar integration (2/2) ✅

We integrate gravatar service in our application, it associates the email of the user with an abstract image or the user can also choose a photo of themself. It is the avatar of the user by default when he is log in for the first time and he can change after by selecting an avatar we provide. 

### Avatar selection (4/4) ✅

The user have the possibilities to select an avatar among a selection of avatars that we provide in the settings dialog. A menu dropdown are displayed when he clicks on his avatar, and he change his avatar if he wants. This modification is persistent in the database for the user when he valid the form. It is updated and displayed in reel time in front. 

### Personal custom avatar  ❌

Unfortunately we could not do this part because of the deadline but we saw that we can use the react-dropzone to make it work.

## Bonus

- We provide the possibilities to users to delete a channel if he is the creator of this channel, all of the other users of this channel don't have the empowerment to delete it. 

- We provide two theme in our web application, a dark mode (by default) and a light mode. The user can change his preference of theme in the settings panel thanks to the switch of theme. The preference of each user are persistent when they valid the form and keep their settings and theme, stored in the database. They will have the preferred theme at each connection
