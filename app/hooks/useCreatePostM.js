import { useMutation } from "@tanstack/react-query";

export default function useCreatePostM(options) {
    return useMutation({
        mutationKey: options.mutationKey
        , mutationFn: async (newPost) => {
            console.log(newPost)
            const result = await fetch('http://localhost:3000/api/post/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost),
            }).then(res => res.json());
            return result;
        },
        onSuccess: options.onSuccess,
    })
}