export async function getHello() {
    // const response = await fetch("https://enapiwek-api.onrender.com/hello");
    const response = await fetch("http://localhost:8080/hello");
    const responseData = await response.text();

    if (!response.ok) {
        throw new Error("Failed to GET response from /hello");
    }

    return responseData;
}
