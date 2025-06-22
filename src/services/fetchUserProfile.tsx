import { useApiCall } from "@/hooks/useApiCall";

export const useUserProfileMaster = () => {
    const { callApi } = useApiCall();

    const fetchUserProfileDetails = async (id) => {

        try {
            const response = await callApi({
                url: `UserProfile/GetUserDetails?userId=${id}`,
                method: "GET",
                showToast: true,
                data: {},
            });

            if (!response) {
                throw new Error("No data returned from the API");
            }

            return response;
        } catch (error) {
            throw new Error(`Failed to fetch all users: ${error}`);
        }
    }

    const updateUserProfileDetails = async (generalData) => {

        try {
            return await callApi({
                url: `UserProfile/UpdateUserDetails`,
                method: "PUT",
                showToast: true,
                toast: false,
                data: generalData,
            });
        } catch (error) {
            throw new Error(`Failed to update user: ${error}`);
        }
    }

    return {
        fetchUserProfileDetails,
        updateUserProfileDetails,
    };
};



