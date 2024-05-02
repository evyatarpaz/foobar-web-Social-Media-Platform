# Welcome to foobar! 🚀

Foobar is a cutting-edge social network designed to provide users with a seamless experience for connecting, sharing, and interacting online. Foobar is built using React for the frontend and is connected to a server for data storage and retrieval. Users can create profiles, make posts, comment on posts, and connect with other users. FooBar provides a fast and responsive social networking experience, making it easy for users to stay connected and share their thoughts and experiences with others.
If you would like to check the server code and run it check this following GitHub repository and follow the READEME file : https://github.com/Eliaddr119/Foobar-Server
---
## These following components form the FooBar platform, providing essential features for user authentication, post and comments uploading, and social interaction:
### SignUp 📝 
The SignUp component allows new users to create an account on the platform. It presents a form with fields for entering a username, password, display name and a profile picture. After successful registration, users are directed to the Sign-in page.
![Screenshot 2024-03-14 224057](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/73c4e5ea-a98e-4620-af41-c79de55638f1)

### SignIn 🔐
The SignIn component provides a form for users to authenticate themselves and access the platform. It includes fields for entering their username and password. Upon successful authentication, users are redirected to the FeedPage.

### FeedPage 📰
The FeedPage is the central component where users can view a feed of posts from themselves and their friends. It includes functionalities for creating new posts, liking and commenting on posts, and viewing profiles.
The FeedPage component in FooBar displays a dynamic feed of posts, showing up to 20 posts from friends and up to 5 posts from users who are not friends of the current user. This design ensures that users stay connected with their friends' activities while also discovering new content from other users in order to make new connctions. The feed is designed to provide a balanced mix of familiar and fresh content, enhancing the overall social networking experience on the platform.
![Screenshot 2024-03-14 225700](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/d7811ada-7ce8-4f82-bd97-4a6774396699)


#### Main features of the feed
- Dark mode - Dark mode is a feature in the FeedPage component of FooBar that provides users with an alternative color scheme for the interface. When enabled, the dark mode changes the background color of the feed page to a dark shade.
 ![Screenshot 2024-03-14 225725](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/6947e118-c9ef-4f67-b6e8-33e5d66d572e)
- Upload a post - This component is appearing first in the page so the user can quickly share thoughts with his friends.
  ![Screenshot 2024-03-14 230437](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/561f07f9-7a58-43c7-b9b6-1a5e961fa013)
- The posts list - When loading the feed page, 25 fresh posts are fetched from the foobar server and are shown to the user.
- Comment on posts - The user can press the comment button to comment on posts. The new comments are saver on the server.
- Pressing the comments amount will open the comments section.
  ![Screenshot 2024-03-14 230542](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/f5974164-91c4-4d1a-9958-093d04653343)
  ![Screenshot 2024-03-14 230557](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/7f3b9c12-a094-481e-8111-4cad1dd0deee)
- Notice that only the user who wrote the post or comment can edit and delete what he uploaded.
![Screenshot 2024-03-14 230805](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/ed208da4-be84-4196-af1c-3ff187bdee63)
- Liking a post - Like any social networks Foobar lets the user to like posts from other users, the likes are also sent and saved by the server, so when you login to the app at a later date you can see which posts you liked.
![Screenshot 2024-03-14 231106](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/f599efa0-861d-4d4d-b22a-a0a1c1d775b9)
- Pressing the user's name or picture of any post will direct the user to the user's profile

## UserProfile
The UserProfile component displays information about a specific user. It includes the user's profile picture, name, and a feed of their posts. Users can also see their friends list and other relevant information. The UserProfile component allows users to customize their profile.
![Screenshot 2024-03-14 231414](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/4c7e0024-d013-4511-92f0-7a564b8d87aa)

#### Main features of the feed
- Seeing friends and friend requests.
- If the two users are friends, the profile will display the user's posts and friends. However, if they are not friends, the profile will show an "Add Friend" button instead. This feature encourages users to connect with each other and fosters a sense of community within the platform.
![Screenshot 2024-03-14 231735](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/c192138c-2023-4755-8562-ff71742333cd)
Now we can see that Yael got the friend request from Eliad.
![Screenshot 2024-03-14 231928](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/7e5b54c4-a69f-4943-b1c9-db85c9783bca)
When Yael accepts the friend request, she can see Eliad's posts and he also shows up in her friends.
![Screenshot 2024-03-14 232042](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/88d25cd0-9288-44ed-9666-c94c1bbcdd4d)
if Yael will go to Eliad's profile she can see his posts an friends
![Screenshot 2024-03-14 232239](https://github.com/Eliaddr119/foobar_part2_web/assets/120579427/671d9e97-ad15-4d45-b124-d0ee48dca387)


## How to Run the App

To run the app locally, follow these steps:

1. Clone the repository:

`git clone https://github.com/Eliaddr119/foobar_part2_web.git`

2. Navigate to the project directory:

`cd foobar`

3. Install dependencies:

`npm install`

4. Start the development server:

`npm start`

This command will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 
The page will reload automatically when you make changes.
You will also need to run the server and Mongo DB

---

## Running Tests

To run tests for the app, execute:

`npm test`

This command will run all tests associated with the application.

