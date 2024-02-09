export async function getHello() {
    // const response = await fetch("https://enapiwek-api.onrender.com/hello");
    const response = await fetch("http://localhost:8080/hello");
    const responseData = await response.text();

    if (!response.ok) {
        throw new Error("Failed to GET response from /hello");
    }

    return responseData;
}

export async function getReviews() {
    // const response = await fetch(
    //     "https://enapiwek-api.onrender.com/review"
    // );
    const response = await fetch("http://localhost:8080/review");
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to GET response from /review/read");
    }

    console.log(responseData);

    return responseData;
}

export async function postReview(reviewData) {
    const finalReviewData = {
        id: 2,
        rating: reviewData.rating,
        comment: reviewData.comment,
        clientName: reviewData.clientName,
        hashRevID: "test1234",
        userID: reviewData.userID,
        createdAt: "",
    };

    console.log(finalReviewData);

    const response = await fetch("http://localhost:8080/review", {
        // const response = await fetch(
        //     "https://enapiwek-api.onrender.com/review",
        //     {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseData = await response.text();
    console.log("responseData login");
    console.log(responseData);

    return responseData;
}
