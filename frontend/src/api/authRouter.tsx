import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface CreateUserRequest {
  auth0Id: string;
  email: string;
}

export const useCreateMYUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutateAsync: createUser,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (newUser: CreateUserRequest) => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
    },
  });
  return {
    createUser,
    isLoading,
    isError,
    error,
  };
};
