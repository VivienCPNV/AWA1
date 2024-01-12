# AWA1 Project
An IRC web client

## Idea
The idea is to make a web component, this component would be a foldable chat box
people would be presented with a hovering button that once clicked would open a
dragable window (web dragable window, not a separate tab). This window would contain the basic chat features, such as :
- Chat history
- Username controls
- Chat input
- Formatter helper (maybe, it's probably not supported by the IRC protocol)
- Emoji input

Also, this chatbox would persist through page changes, allowing the user to browse the website all the while chatting with people.

### Theme
This web client would follow the visual theme of the following [HEXO theme](https://github.com/Yue-plus/hexo-theme-arknights).

### Backend
For this to work, the client needs to connect to some form of chat room.
This will be handled by an [IRC server](https://www.inspircd.org/). The client
will connect to said IRC through a websocket and will handle the communication with the server.

### Animations
For this project to make sense in the AWA1 module context, this chat,
will make heavy use of animations, svg effects, text effects, and the like.
The following libraries were used to make the animations:
- [AnimeJS](https://animejs.com/)
- [JqueryUI](https://jqueryui.com/)

## Running the project
### Prerequisites
    - An internet connection
    - A php installation
### Running the project
Running this project is very simple, it is a simple static html page.
To do so open a terminal and type the following commands:
```shell
$ cd /path/to/container/folder
$ git clone git@github.com:VivienCPNV/AWA1.git
$ cd AWA1
$ php -S localhost:8080
```
After that visit [http://localhost:8080](http://localhost:8080/)
## Directory structure
```
├───css                     // CSS files of the project
│   └───images              // Images needed for jquery-ui
├───img                     // Other images used by the project           
└───js                      // All the scripts needed by the project
    ├───anime.min.js        // Anime js used for animations
    ├───index.js            // Main js file handles setting up the page
    ├───jquery-ui.min.js    // Jquery-UI for draggable and resizable window
    ├───jquery.min.js       // Jquery
    └───parser.js           // Parser for IRC messages
```
## Integration
This project only includes the basic html/css/js for this specific
component. You're free to use this repo to integrate this component
on your website. An example of integration was provided in the [releases](https://github.com/VivienCPNV/AWA1/releases/tag/latest).
To run this example, download it, extract it somewhere and run the following commands:
```shell
$ cd /path/to/container/folder
$ php -S localhost:4000
```
After that visit [http://localhost:4000](http://localhost:4000)
## TODO
- [x] Foldable chat
- [x] Persistent through page changes
- [x] Popup draggable window (in browser)
- [ ] Popup browser window