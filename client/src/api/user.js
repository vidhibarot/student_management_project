import { callPostApi } from ".";
export async function userLoginApi(data) {
    try {
        const response = await callPostApi({ url: "user/sign_in", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}