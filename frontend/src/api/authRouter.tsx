import { useMutation } from "@tanstack/react-query";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface CreateUserRequest {
  auth0Id: string;
  email: string;
}

export const useCreateMYUser = () => {
  const {
    mutateAsync: createUser,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (newUser: CreateUserRequest) => {
      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      return response.json();
    },
  });
  return {
    createUser,
    isLoading,
    isError,
    error,
  };
};
