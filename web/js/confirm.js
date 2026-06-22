const data = JSON.parse(sessionStorage.getItem("contactData"));
const returnToFormButton = document.querySelector("#return-to-form-button");
const submitButton = document.querySelector("#submit-button");


const categoryMap = {
    trial: "体験レッスンについて",
    plan: "料金プランについて",
    lesson: "レッスン内容について",
    other: "その他"
};

document.querySelector("#confirm-name").textContent = data?.name || "未入力";
document.querySelector("#confirm-email").textContent = data?.email || "未入力";
document.querySelector("#confirm-category").textContent = categoryMap[data?.category] || "未選択";
document.querySelector("#confirm-message").textContent = data?.message || "未入力";


if (returnToFormButton) {
    returnToFormButton.addEventListener("click", () => {
        history.back();
    });
}

if (submitButton) {
    submitButton.addEventListener("click", () => {
        window.location.href = "thanks.html";
    });
}

