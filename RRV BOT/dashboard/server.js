const express = require('express');
const session = require('express-session');
const path = require('path');
const { dashboardSecret } = require('../config.json');

// جلب البوت من index.js (ممكن require البوت لو كان في نفس المشروع)
const client = require('../index.js'); 

const app = express();

// إعدادات Express
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // لقراءة JSON من fetch

// جلسات لتأمين الموقع
app.use(session({
    secret: dashboardSecret,
    resave: false,
    saveUninitialized: false
}));

// صفحة تسجيل الدخول (بسيطة حالياً)
app.get('/login', (req, res) => {
    req.session.user = { username: "Admin" }; 
    res.redirect('/dashboard');
});

// صفحة الـ Dashboard
app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('dashboard', { user: req.session.user.username });
});

// ✅ API لتحديث الإعدادات
app.post('/api/update', async (req, res) => {
    if (!req.session.user) return res.status(401).json({ success: false, message: 'غير مصرح' });

    const { setting, value } = req.body;

    try {
        // مثال: تعديل رسالة الترحيب
        if (setting === "ترحيب السيرفر") {
            client.welcomeMessage = value; // حفظ القيمة في البوت مباشرة
        }

        // مثال: تفعيل/تعطيل أوامر معينة
        if (setting === "أوامر البوت") {
            client.disabledCommands = value.split(',').map(cmd => cmd.trim());
        }

        // مثال: تعديل رولز (يمكن إضافة منطق البوت لاحقاً)
        if (setting === "رولز السيرفر") {
            client.roleSettings = value; // مجرد مثال لتخزين الإعداد
        }

        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Dashboard running on port ${PORT}`));
