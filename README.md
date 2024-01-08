# AWA1 Project
An IRC web client

## Idea
The idea is to make a web component, this component would be a foldable chat box
peoples would be presented with a hovering button that once clicked would open a
dragable window (web dragable window, not a seperate tab). This window would contain the basic chat features, such as :
- Chat history
- Username controls
- Chat input
- Formatter helper (maybe, it's probably not supported by the IRC protocol)
- Emoji input

Also, this chatbox would persist through page changes, allowing the use to browse the website all the while chatting with peoples.

### Theme
This web client would follow the visual theme of the following [HEXO theme](https://github.com/Yue-plus/hexo-theme-arknights).

### Backend
For this to work, the client needs to connect to some form of chat room.
This will be handled by an [IRC server](https://www.inspircd.org/). The client
will connect to said IRC through a websocket and will handle the communication with the server.

### Animations
In order for this project to make sense in the AWA1 module context, this chat,
will make heavy use of animations, svg effects, text effects, and the like.

## TODO
- [x] Foldable chat
- [x] Persistent through page changes
- [x] Popup dragable window