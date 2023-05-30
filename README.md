
# Twitter Clone

I made twitter clone with nextjs. I focused on new app directory and server/client component futures. This new backend on fronted approach with server components makes creating full-stack aps so easy and provides more performance. For better User Exp. I render first states on backend and get html then i manage state with react-query the way i manage single page apps.

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

**route: / (root path)**: here i get data on backend and generate initial posts (like 10 posts) and render for initial html. So when user visit this route, user sees initial posts directly as i show on preview video. Then i manage query and action with react-query especially infiniteQuery(infinite scroll) to render more posts.
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-31-00-50-41.png)

**route: /post/[postid]**: this dynamic route displays a spesific post and comments. I rendered this posts by just one component named TweetDisplay. I rendered recursively. It could be infinite comments. All componenst have their own seperated states includes react-query states. 
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-31-00-43-10.png)

**route: /user/[userid]/[tweets-type]**: This route takes two dynamic path: userid and tweets-type. tweets-type is to list selected menu on navbar under profile informations. default path is [user-tweets] when click Likes on navbar it will be user/uid/user-likes. i saw it on twitter and implemented this project. Here also i render initial posts on server and manage posts same way as i manage posts root path.
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-31-01-06-45.png)



**route: /search**: Search page to find user with display/and username
![App Screenshot](https://www.linkpicture.com/q/Screenshot-from-2023-05-31-01-02-28.png)








