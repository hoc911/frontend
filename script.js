document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const generateButton = document.getElementById('generateButton');
    const generatedContent = document.getElementById('generatedContent');

    imageUpload.addEventListener('change', () => {
        generateButton.disabled = !imageUpload.files[0];
    });

    generateButton.addEventListener('click', () => {
        const file = imageUpload.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            // **هام: استبدل هذا بعنوان URL لخادم الواجهة الخلفية الخاص بك**
            const backendURL = 'https://backend-server-3m7y.onrender.com';

            fetch(backendURL, {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.html) {
                    generatedContent.innerHTML = data.html;
                } else if (data.error) {
                    alert(`خطأ: ${data.error}`);
                }
            })
            .catch(error => {
                console.error('حدث خطأ أثناء التواصل مع الخادم:', error);
                alert('حدث خطأ أثناء معالجة الطلب. الرجاء المحاولة مرة أخرى.');
            });
        } else {
            alert('الرجاء اختيار صورة أولاً.');
        }
    });
});
