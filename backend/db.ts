import prisma from "@/lib/prisma";
import { Post, User, Like } from "@prisma/client";
import * as bcrypt from "bcrypt";

async function createUser(user: any) {
    user.password = await bcrypt.hash(user.password, 10);
    try {
        const createdUser: User = await prisma.user.create({
            data: user
        })
        return createdUser
    }
    catch (e) {
        console.log(e)
        return null;
    }
}
async function getUserData(userId: number) {
    try {
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        const { password, ...result } = user;
        return result
    }
    catch (e) {
        console.log(e)
        return null
    }

}


async function likePost(userId: number, postId: number) {
    try {

        await prisma.like.create({
            data: {
                ownerId: userId,
                postId: postId
            }
        })
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likeCount: {
                    increment: 1
                }
            }
        })
        return true;
    }
    catch (e) {
        console.log(e)
        return false
    }
}

async function unlikePost(userId: number, postId: number): Promise<boolean> {
    try {

        await prisma.like.deleteMany({
            where: {
                ownerId: userId,
                postId: postId
            }
        })
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likeCount: {
                    decrement: 1
                }
            }
        })
        return true
    }
    catch (e) {
        return false
    }

}



async function getFollowingIds(userId: number): Promise<any> {
    const following = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            followings: true
        }
    })
    console.log(following);
    return following?.followings.map(follower => follower.followingId) || [];
}

async function getPostById(postId: number, userId?: number) {
    let postData;
    postData = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            commentPost: {

            }
            ,
            repost: {
                select: {
                    repostedPost: {
                        include: {
                            owner: true,
                            repost: true,
                            commentPost: true,
                            normalPost: true,
                        }
                    }

                }
            },

            owner: {
                select: {
                    displayName: true,
                    name: true,
                    avatar: true,
                }
            },
            normalPost: true,
        }
    })
    if (!postData) return null;
    if (userId) {
        const isLiked = await prisma.like.findUnique({
            where: {
                ownerId_postId: {
                    ownerId: userId,
                    postId: postId
                }
            }
        })
        if (isLiked) {
            postData.isLiked = true;
        }

    }
    return postData;
}

async function getPosts(userId: number, lastTime?: string): Promise<any> {
    lastTime = lastTime || new Date().toISOString();

    const followingIds = await getFollowingIds(userId);
    try {

        const postsData: any = await prisma.post.findMany({
            where: {
                ownerId: {
                    in: [...followingIds, userId]
                },
                createdAt: {
                    lt: lastTime
                }
            }, include: {
                commentPost: {

                }
                ,
                repost: {
                    select: {
                        repostedPost: {
                            include: {
                                owner: true,
                                repost: true,
                                commentPost: true,
                                normalPost: true,
                            }
                        }

                    }
                },

                owner: {
                    select: {
                        displayName: true,
                        name: true,
                        avatar: true,
                    }
                },
                normalPost: true,
            },
            take: 5,
            orderBy: {
                createdAt: "desc"
            }
        })

        const promises1 = postsData.map(async (post: any) => {
            if (post.type === "repost") {
                post = post.repost.repostedPost
            }
            const result = await prisma.like.findUnique({
                where: {
                    ownerId_postId: {
                        ownerId: userId,
                        postId: post.id
                    }

                }
            })
            if (result)
                post.isLiked = true;

            else post.isLiked = false;
        })

        await Promise.all([...promises1]);
        return postsData
    }
    catch (e) {
        console.log(e)
        return null
    }


}

async function getUserPosts(userId: number, lastTime?: string): Promise<any> {
    lastTime = lastTime || new Date().toISOString();

    try {

        const postsData: any = await prisma.post.findMany({
            where: {
                ownerId: userId,
                createdAt: {
                    lt: lastTime
                }
            }, include: {
                commentPost: {
                    select: {
                        post: {
                            include: {
                                repost: true,
                                commentPost: true,
                                normalPost: true,
                            }
                        },
                    }
                }
                ,
                repost: {
                    select: {
                        repostedPost: {
                            include: {
                                owner: true,
                                repost: true,
                                commentPost: true,
                                normalPost: true,
                            }
                        }

                    }
                },

                owner: {
                    select: {
                        displayName: true,
                        name: true,
                        avatar: true,
                    }
                },
                normalPost: true,
            },
            take: 5,
            orderBy: {
                createdAt: "desc"
            }
        })

        const promises1 = postsData.map(async (post: any) => {
            if (post.type === "repost") {
                post = post.repost.repostedPost
            }
            const result = await prisma.like.findUnique({
                where: {
                    ownerId_postId: {
                        ownerId: userId,
                        postId: post.id
                    }

                }
            })
            if (result)
                post.isLiked = true;

            else post.isLiked = false;
        })

        await Promise.all([...promises1]);
        return postsData
    }
    catch (e) {
        console.log(e)
        return null
    }


}

async function getUserLikePosts(userId: number, lastTime?: string): Promise<any> {
    lastTime = lastTime || new Date().toISOString();
    const userLikedPostIds = await prisma.like.findMany({
        where: {
            ownerId: userId
        },
        select: {
            postId: true
        }
    })
    const postIds = userLikedPostIds.map(post => post.postId)

    try {

        const postsData: any = await prisma.post.findMany({
            where: {
                id: {
                    in: postIds
                },
                createdAt: {
                    lt: lastTime
                }
            }, include: {
                commentPost: {
                    select: {
                        post: {
                            include: {
                                repost: true,
                                commentPost: true,
                                normalPost: true,
                            }
                        },
                    }
                }
                ,
                repost: {
                    select: {
                        repostedPost: {
                            include: {
                                owner: true,
                                repost: true,
                                commentPost: true,
                                normalPost: true,
                            }
                        }

                    }
                },

                owner: {
                    select: {
                        displayName: true,
                        name: true,
                        avatar: true,
                    }
                },
                normalPost: true,
            },
            take: 5,
            orderBy: {
                createdAt: "desc"
            }
        })

        const promises1 = postsData.map(async (post: any) => {
            if (post.type === "repost") {
                post = post.repost.repostedPost
            }
            const result = await prisma.like.findUnique({
                where: {
                    ownerId_postId: {
                        ownerId: userId,
                        postId: post.id
                    }

                }
            })
            if (result)
                post.isLiked = true;

            else post.isLiked = false;
        })

        await Promise.all([...promises1]);
        return postsData
    }
    catch (e) {
        console.log(e)
        return null
    }


}



async function createNormalPost(data: any) {
    try {
        const post = await prisma.post.create({
            data: {
                ownerId: data.ownerId,
                type: "normal",
                normalPost: {
                    create: {
                        content: data.content
                    }
                }
            }
        })
        return post;
    }
    catch (e) {
        console.log(e)
        return null
    }
}


async function commentAComment(userId: number, body: any): Promise<any> {
    ;
    try {
        console.log('123123asd023');
        const commentPost: Post = await prisma.post.create({
            data: {
                ownerId: userId,
                type: "comment",
                commentPost: {
                    create: {
                        content: body.content,
                        commentedPostId: body.commentedPostId,
                        mainPostId: body.mainPostId
                    }
                }
            }, include: {
                commentPost: true
            }
        })
        await prisma.post.update({
            where: {
                id: body.mainPostId
            },
            data: {
                commentCount: {
                    increment: 1
                }
            }
        })
        await prisma.post.update({
            where: {
                id: body.commentedPostId
            },
            data: {
                commentCount: {
                    increment: 1
                }
            }
        })
        return commentPost;
    }
    catch (e) {
        console.log(e)
        return null;
    }
}

async function commentAPost(userId: number, body: any): Promise<any> {
    try {
        const commentPOst: Post = await prisma.post.create({
            data: {
                ownerId: userId,
                type: "comment",
                commentPost: {
                    create: {
                        content: body.content,
                        mainPostId: body.mainPostId,
                        commentedPostId: body.commentedPostId
                    }
                }
            }, include: {
                commentPost: true
            }
        })
        await prisma.post.update({
            where: {
                id: body.commentedPostId
            },
            data: {
                commentCount: {
                    increment: 1
                },
            }
        })
        return commentPOst;
    }
    catch (e) {
        return null
    }
}

async function createRepost(userId: number, post: Post): Promise<any> {
    try {
        const repost: Post = await prisma.post.create({
            data: {
                ownerId: userId,
                type: "repost",
                repost: {
                    create: {
                        repostedPostId: post.id
                    }
                }
            }, include: {
                repost: true
            }
        })

        console.log("*******");
        console.log(post.id);

        await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                repostCount: {
                    increment: 1
                }
            }
        })
        return repost;
    }
    catch (e) {
        console.log(e)
        return null
    }
}

async function getComments(commentedPostId: number, userId: any) {

    try {
        const comments = await prisma.post.findMany({
            where: {
                commentPost: {
                    commentedPostId: commentedPostId
                }
            },
            include: {
                commentPost: {
                    // select: {
                    //     post: {
                    //         include: {
                    //             repost: true,
                    //             commentPost: true,
                    //             normalPost: true,
                    //         }
                    //     },
                    // }
                }
                ,
                repost: {
                    select: {
                        repostedPost: {
                            include: {
                                owner: true,
                                repost: true,
                                commentPost: true,
                                normalPost: true,
                            }
                        }

                    }
                },

                owner: {
                    select: {
                        displayName: true,
                        name: true,
                        avatar: true,
                    }
                },
                normalPost: true,
            }
        })

        const promises1 = comments.map(async (post: any) => {
            const result = await prisma.like.findUnique({
                where: {
                    ownerId_postId: {
                        ownerId: userId,
                        postId: post.id
                    }
                }
            })
            if (result)
                post.isLiked = true;

            else post.isLiked = false;
        })
        await Promise.all(promises1);
        return comments;
    }
    catch (e) {
        console.log(e)
        return null
    }

}
async function followAUser(user1Id: number, user2Id: number): Promise<boolean> {
    try {
        console.log(user1Id, user2Id);

        await prisma.follower.create({
            data: {
                followerId: user1Id,
                followingId: user2Id,
                follower_following: user1Id + "_" + user2Id
            }
        })
        console.log('update');
        await prisma.user.update({
            where: {
                id: user2Id
            },
            data: {
                followersCount: {
                    increment: 1
                }
            }
        })
        await prisma.user.update({
            where: {
                id: user1Id
            },
            data: {
                followingCount: {
                    increment: 1
                }
            }
        })
        return true;
    }
    catch (e) {
        console.log(e)
        return false
    }
}
async function unFollowAUser(user1Id: number, user2Id: number): Promise<boolean> {
    try {
        await prisma.follower.deleteMany({
            where: {
                followerId: user1Id,
                AND: {
                    followingId: user2Id
                }
            }
        })
        await prisma.user.update({
            where: {
                id: user2Id
            },
            data: {
                followersCount: {
                    decrement: 1
                }
            }
        })
        await prisma.user.update({
            where: {
                id: user1Id
            },
            data: {
                followingCount: {
                    decrement: 1
                }
            }
        })

        return true
    }
    catch (e) {
        console.log(e)
        return false
    }

}


type backend = {
    createUser: typeof createUser,
    getUserData: typeof getUserData,
    likePost: typeof likePost,
    unlikePost: typeof unlikePost,
    getPosts: typeof getPosts,
    commentAComment: typeof commentAComment,
    commentAPost: typeof commentAPost,
    createRepost: typeof createRepost,
    followAUser: typeof followAUser,
    unFollowAUser: typeof unFollowAUser,
    getFollowingIds: typeof getFollowingIds,
    createNormalPost: typeof createNormalPost
    getUserPosts: typeof getUserPosts,
    getUserLikePosts: typeof getUserLikePosts,
    getPostById: typeof getPostById
    getComments: typeof getComments
}
const backend: backend = {
    createUser,
    getUserData,
    likePost,
    unlikePost,
    getPosts,
    commentAComment,
    commentAPost,
    createRepost,
    followAUser,
    unFollowAUser,
    getFollowingIds,
    createNormalPost,
    getUserPosts,
    getUserLikePosts,
    getPostById,
    getComments
}
export default backend;