export const BASE_URL = 'https://strangers-things.herokuapp.com/api';
export const COHORT_NAME = '2108-UIC-RM-WEB-PT';
export const API_URL = BASE_URL + '/' + COHORT_NAME;

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
}

export const fetchAllPosts = async () => {
    const token = getTokenFromLocalStorage();

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data.data.posts

    } catch (error) {
        console.log("An error occurred while fetching all posts.")
        throw error
    }

}


export const createNewPost = async (title, description, price, location, willDeliver) => {
    const token = getTokenFromLocalStorage();

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: willDeliver
                }
            })
        })
        return await response.json();

    } catch (error) {
        console.log("An error occurred while trying to create a new post.")
        throw error
    }
}


export const updatePost = async (editTitle, editDescription, editPrice, editLocation, editWillDeliver, id) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: editTitle,
                    description: editDescription,
                    price: editPrice,
                    location: editLocation,
                    willDeliver: editWillDeliver
                }
            })
        })
        return await response.json()

    } catch (error) {
        console.log("An error occurred while trying to edit a post.")
    }
}


export const deletePost = async (id) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
        })
        const result = await response.json()
        return result;
    } catch (error) {
        console.log("An error occurred while trying to delete a post.")
        throw error
    }
}


export const postMessage = async (message, id) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${API_URL}/posts/${id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: message
                }
            })
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("An error occurred while trying to create a message.")
        throw error
    }
}


export const register = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })

        })
        const token = await response.json();
        return token.data.token;

    } catch (error) {
        console.log("An error occurred while trying to register a new user.")
    }
}


export const login = async (username, password) => {

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        const res = await response.json();
        return res.data.token;
    }
    catch (error) {
        console.log("An error occurred while trying to login.")
        throw error;
    }
}


export const getMessage = async () => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log("An error occurred while trying to fetch messages.")
        throw error;
    }
}
