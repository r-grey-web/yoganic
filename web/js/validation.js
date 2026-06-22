const form = document.querySelector(".contact-form");

if (form) {
    const nameInput = document.querySelector("#name");
    const nameError = nameInput.closest(".contact-form__item").querySelector(".error-message");
    const emailInput = document.querySelector("#email");
    const emailError = emailInput.closest(".contact-form__item").querySelector(".error-message");
    const categorySelect = document.querySelector("#category");
    const categorySelectError = categorySelect.closest(".contact-form__item").querySelector(".error-message");
    const messageTextarea = document.querySelector("#message");
    const messageTextareaError = messageTextarea.closest(".contact-form__item").querySelector(".error-message");
    const privacyInput = document.querySelector("#privacy");
    const privacyError = privacyInput.closest(".contact-form__privacy").querySelector(".error-message");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 入力内容確認ページから戻った場合、データの復元処理
    const saveData = JSON.parse(sessionStorage.getItem("contactData"));

    if (saveData) {
        nameInput.value = saveData.name;
        emailInput.value = saveData.email;
        categorySelect.value = saveData.category;
        messageTextarea.value = saveData.message;
    }

    // エラー表示
    function showError(input, errorElement, message) {
        input.classList.add("is-error");
        input.setAttribute("aria-invalid", "true");
        errorElement.textContent = message;
    }
    // エラーを非表示
    function clearError(input, errorElement) {
        input.classList.remove("is-error");
        input.setAttribute("aria-invalid", "false");
        errorElement.textContent = "";
    }

    // 入力し始めたら、エラー解除
    // 名前
    nameInput.addEventListener("input", () => {
        clearError(nameInput, nameError);
    });
    // メール
    emailInput.addEventListener("input", () => {
        clearError(emailInput, emailError);
    });
    // セレクトボックス
    categorySelect.addEventListener("change", () => {
        clearError(categorySelect, categorySelectError);
    });
    // お問い合わせ内容
    messageTextarea.addEventListener("input", () => {
        clearError(messageTextarea, messageTextareaError);
    });
    // 同意チェック
    privacyInput.addEventListener("change", () => {
        clearError(privacyInput, privacyError);
    });

    // 送信ボタン押下
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

        // バリデーションチェック
        // 名前
        if (nameInput.value.trim() === "") {
            isValid = false;
            showError(nameInput, nameError, "お名前を入力してください");
        } else {
            clearError(nameInput, nameError);
        }
        // メール
        if (emailInput.value.trim() === "") {
            isValid = false;
            showError(emailInput, emailError, "メールアドレスを入力してください");
        } else if (!emailPattern.test(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, emailError, "メールアドレスの形式が正しくありません");
        } else {
            clearError(emailInput, emailError);
        }
        // セレクトボックス
        if (categorySelect.value === "") {
            isValid = false;
            showError(categorySelect, categorySelectError, "お問い合わせ種別を選択してください");
        } else {
            clearError(categorySelect, categorySelectError);
        }
        // お問い合わせ内容
        if (messageTextarea.value.trim() === "") {
            isValid = false;
            showError(messageTextarea, messageTextareaError, "お問い合わせ内容を入力してください");
        } else {
            clearError(messageTextarea, messageTextareaError);
        }
        // 同意チェック
        if (!privacyInput.checked) {
            isValid = false;
            showError(privacyInput, privacyError, "個人情報の取り扱いに同意し、チェックしてください");
        } else {
            clearError(privacyInput, privacyError);
        }
        // 送信時にエラーがあったら最初のエラー項目へフォーカス
        if (!isValid) {
            const firstError = form.querySelector(".is-error");
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        // 入力完了 → 内容確認ページへ
        if (isValid) {
            const contactData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                category: categorySelect.value,
                message: messageTextarea.value.trim(),
            };

            sessionStorage.setItem(
                "contactData", JSON.stringify(contactData));

            window.location.href = "confirm.html";
        }
    });
}