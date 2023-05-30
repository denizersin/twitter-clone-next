import { useQuery } from "@tanstack/react-query";

export default function useUserData(options) {

    return useQuery({
        initialData: options.initialData || null,
        queryKey: ["user"],
        enabled:false,
        queryFn: async () => {
            const data = await fetch(`http://localhost:3000/api/user`, {
                method: "GET",
            }).then(res => res.json());
            if (data.succsess) {
                return data.data;
            }
            return null;
        }
    })

}