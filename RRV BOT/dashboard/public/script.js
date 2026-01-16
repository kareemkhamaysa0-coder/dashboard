// مثال: التعامل مع أزرار تعديل الإعدادات
document.addEventListener('DOMContentLoaded', () => {

    // كل زر تعديل
    const buttons = document.querySelectorAll('.card button');

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const cardTitle = button.parentElement.querySelector('h2').innerText;

            // طلب رسالة جديدة من المستخدم
            const newValue = prompt(`ضع الإعداد الجديد لـ "${cardTitle}":`);
            if (!newValue) return alert('لم يتم إدخال قيمة.');

            try {
                // إرسال التغيير إلى السيرفر (API لاحقًا يربط البوت)
                const response = await fetch('/api/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ setting: cardTitle, value: newValue })
                });

                const data = await response.json();
                if (data.success) {
                    alert('تم التحديث بنجاح!');
                } else {
                    alert('حدث خطأ أثناء التحديث.');
                }
            } catch (err) {
                console.error(err);
                alert('حدث خطأ أثناء الاتصال بالسيرفر.');
            }
        });
    });

});
