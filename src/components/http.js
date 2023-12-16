export async function getHello() {
    const response = await fetch("https://enapiwek-api.onrender.com/hello");
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to GET response from /hello");
    }

    return responseData;
}
