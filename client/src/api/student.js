import { callPostApi, callGetApi } from ".";
export async function studentListApi(data) {
    try {
        const response = await callPostApi({ url: "student/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getStudentById(id) {
    try {
        const response = await callGetApi({ url: `student/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getDepartmentList() {
    try {
        const response = await callGetApi({ url: 'student/department/list' });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function studentAddApi(data) {
    try {
        const response = await callPostApi({ url: "student/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function studentfeesApi(data) {
    try {
        const response = await callPostApi({ url: "fees/payment", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function studentfeesconfirmApi(data) {
    try {
        const response = await callPostApi({ url: "fees/confirm", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}