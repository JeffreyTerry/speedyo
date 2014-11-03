#SpeedYo

Anonymous 4-minute speed chatting, using Yo.

![Imgur](http://i.imgur.com/gomOxjm.png) ![Imgur](http://i.imgur.com/PsxAW7y.png) ![Imgur](http://i.imgur.com/Ww7kNRa.png)


##What is it
SpeedYo enables users to connect and chat with anyone nearby by dynamically creating timed anonymous chatrooms. It takes advantage of the extremely simple Yo API to gives users access to this with just two taps. They Yo us, and we Yo back as soon as there is another person ready to chat. At the end of the time limit, the entire chat fades away, as if it never happened.

##Target user
We wanted to target people looking to engage in short, meaningful conversations with nearby strangers who might otherwise be afraid of approaching others because of making a bad impression.

##Inspiration
We saw that the very simple and clean Yo API was perfect for our service, as it allows anybody to Yo our service and start chatting without any pre-registration or overhead. Our goal was to take advantage of the beauty and simplicity of Yo and provide users and equally simple chat service. We think we've succeeded.

##Key Features
We're most proud of our innovative use of Yo not just as a notification system, but as a full-fledge social connection service. To do this, we built a server that receives Yo's and pairs up two people who are within a 25-mile distance. Once two users are found, both users are Yo'd with a link to their own private 4-minute chatroom. After the 4-minute time limit, or if one person leaves, the entire page fades to white and disappears forever.

Technologies Used: nodejs, expressjs, socketio, mongodb, yo-api, jquery
**--YHacks Fall 2014--**
