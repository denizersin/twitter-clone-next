import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfinitePosts(options) {

    return useInfiniteQuery({
        initialData: options.initialData,
        queryKey: options.queryKey,
        getNextPageParam: (prevData, pages) => {
            if (prevData.length < 5) return;
            const lastCreatedAt = prevData[prevData.length - 1].createdAt;
            return lastCreatedAt.toISOString();
        },
        queryFn: async (lastTime) => {
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            lastTime = lastTime.pageParam || new Date().toISOString();
            const data = await options.getDataByLastTime(lastTime);
            if (data.succsess) {
                data.data.forEach((post) => {
                    post.createdAt = new Date(post.createdAt);
                });
                return data.data;
            }
            return null;
        },

    })
}