
# Twitter Clone

I have created a Twitter clone using Next.js. I have focused on the new app directory structure and server/client component features. This new approach of using server components in the frontend makes it easy to create full-stack apps and provides better performance. To enhance the user experience, I render the initial states on the backend and retrieve the HTML, then I manage the state with react-query, similar to how I manage single-page apps.

# Preview 


## 🔗 Links
[Youtube Preview](https://www.youtube.com/watch?v=1EwvgZ-Lx0k)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` ="mysql://usernama:password@127.0.0.1:3306/db_name"
`NEXTAUTH_URL`=http://localhost:3000

//random secret keys
`NEXTAUTH_SECRET`=lsdkmlskdmflksdkskmsdnkj
`SECRET_KEY`=eefeijfkskjhfuhudhfudd
## Installation

Install my-project with npm

```bash
  npm install 
  
  npx prisma migrate dev --name init

  npm run dev
```
    
## Main Tech Stack

**Client:** React, React-Query, TailwindCSS, Typescript, 

**Server:** NextJS

**Server Helper Libs:** Next-Auth(Authentiaction) Prisma(ORM), jsonWebToken, bcrypt

**Database:** MySQL


## Screenshots
**Tables and relations:**
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-29-01-19-34.png)

**route: / (root path)**: Here, I fetch the data on the backend and generate initial posts (around 10 posts) to render them in the initial HTML. When a user visits this route, they will see the initial posts directly, as shown in the preview video. Then, I manage the queries and actions with react-query, especially infiniteQuery (infinite scroll), to render more posts.
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-31-00-50-41.png)

**route: /post/[postid]**: This dynamic route displays a specific post and its comments. I render these posts using a single component called TweetDisplay, which I render recursively. There could be infinite comments. All components have their own separate states, including react-query states.
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-31-00-43-10.png)

**route: /user/[userid]/[tweets-type]**: This route takes two dynamic paths: userid and tweets-type. The tweets-type is used to list the selected menu on the navbar under profile information. The default path is [user-tweets]. When the user clicks on "Likes" in the navbar, the path will be user/uid/user-likes. I saw this on Twitter and implemented it in this project. Here, I also render initial posts on the server and manage the posts in the same way as I manage the posts in the root path.
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-31-01-06-45.png)



**route: /search**: This is the search page to find users based on their display name and username.
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-31-01-02-28.png)








