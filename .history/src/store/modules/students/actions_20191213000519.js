export function getRequest(data) {
    return {
        type: '@student/GET_REQUEST',
        payload: { data },
    };
}

export function responseSuccess(students) {
    return {
        type: '@student/RESPONSE_SUCCESS',
        payload: { students },
    };
}

export function registerRequest(student) {
    return {
        type: '@student/REGISTER_REQUEST',
        payload: { student },
    };
}

export function updateRequest(id, student) {
    return {
        type: '@student/UPDATE_REQUEST',
        payload: { id, student },
    };
}

export function deleteRequest(id) {
    return {
        type: '@student/DELETE_REQUEST',
        payload: { id },
    };
}

export function requestFailure() {
    return {
        type: '@student/REQUEST_FAILURE',
    };
}

export function showStudents(show) {
    return {
        type: '@student/SHOW_STUDENTS',
        payload: { show },
    };
}
