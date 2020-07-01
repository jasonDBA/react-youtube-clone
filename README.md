# Youtube Clone Project

## Description
This video briefly depicts the Youtube Clone site using React.js, Node.js, MongoDB. <br/>
The first part shows how to download a project clone from GitHub and render the site. <br/>
The second part describes the features and functions of the site. <br/>
<br/>
[Visit YouTube Video](https://youtu.be/r16x6Hv3mnQ)

## Motivation
In school I graduated in April 2020, I learned HTML, CSS, and JS in relation to web developement. <br/>
However, in practice, I wanted to use a JS library for the US, and I stumbled upon React.js, which is popular these days (created by Facebook). 
Frequently enjoying Youtube, I have been curious about the algorithm applied to the function of updating and subscribing to videos.
This motivated me to create a personal website by cloning some functions of the Youtube. 
In the project, Node.js is used for the back-end, and React.js is used for the front-end.

## Installation
1. Download ffmpeg and set an environmental path: [How?](https://www.youtube.com/watch?v=qjtmgCb8NcE)
2. Download the clone (it is a root directory)
3. Open a terminal
4. Go to the root dir
5. Install Node Package Manager --- **npm install**
6. Change the dir to the client --- **cd client**
7. Install Node Package Manager --- **npm install**
8. In the project, go to **server > config** dir
9. Create '**dev.js**' file
10. Put your MongoDB info
11. Save it
12. Open a terminal in the root dir
13. Run Node Package Manager --- **npm run dev**


## Tech/Framework used
**React.js**: A JavaScript library for building user interfaces
 - URL: https://reactjs.org/ <br/>

**Node.js**: An asynchronous event-driven JavaScript runtime designed to build scalable network applications
 - URL: https://nodejs.org/ <br/>

**MongoDB**: A document-oriented NoSQL database used for high volume data storage
 - URL: https://www.mongodb.com/ <br/>

**Redux**: A predictable state container for JavaScript apps
 - URL: https://redux.js.org/ <br/>

**React Hooks**: A new addition in React 16.8. They let you use state and other React features without writing a class
 - URL: https://reactjs.org/docs/hooks-intro.html <br/>
 
## Dependencies
- The below is React.js dependencies installed by 'npm install' command line
```
   "dependencies": {
    "antd": "^3.24.1",
    "axios": "^0.19.2",
    "core-js": "^3.6.4",
    "formik": "^1.5.8",
    "moment": "^2.24.0",
    "react": "^16.8.6",
    "react-app-polyfill": "^1.0.6",
    "react-dom": "^16.8.6",
    "react-dropzone": "^11.0.1",
    "react-icons": "^3.7.0",
    "react-redux": "^7.1.0-rc.1",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.4.1",
    "redux": "^4.0.0",
    "redux-promise": "^0.6.0",
    "redux-thunk": "^2.3.0",
    "yup": "^0.27.0"
```
 
- The below is Node.js dependencies installed by 'npm install' command line
```
   "dependencies": {
    "@ant-design/icons": "^4.2.1",
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "debug": "^4.1.1",
    "express": "^4.17.1",
    "fluent-ffmpeg": "^2.1.2",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.24.0",
    "mongoose": "^5.9.19",
    "multer": "^1.4.2",
    "react-redux": "^5.0.7",
    "saslprep": "^1.0.3",
    "supports-color": "^7.1.0"
  },
  "devDependencies": {
    "concurrently": "^5.2.0",
    "nodemon": "^2.0.4"
  }
```
 
## Features
- **Log In/Out**: The user's data can be read by logging in/out of the account
- **Register**: Consisting of Name, Last Name, Email, Password, and Confirm. Registered user data is stored in the 'user' db
- **Home**: Displays recommended videos
- **Subscription**: Displays subsribed videos
- **Video Upload**: Once logged in, the user can upload videos stored in the local directory
- **Comments**: Users can leave a comment in the video they are watching
- **Likes / Dislikes**: Users can select the Likes/Dislikes button for the video or comment they are watching 
 

[Visit YouTube Video](https://youtu.be/r16x6Hv3mnQ)
 
