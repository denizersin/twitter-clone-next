import { useMutation } from "@tanstack/react-query";

export default function useActionMutate(options) {
    const { onSuccess } = options;
    return useMutation({
        mutationFn: async (data) => {
            const { action, id } = data;
            const result = await fetch(`http://localhost:3000/api/post/like?&postid=${id}&action=${action}`, {
                method: "POST",
            }).then(res => res.json());
            return result;
        },
        onSuccess
    });


}