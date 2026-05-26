const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const nodemailer = require("nodemailer");
const Enquiry = require("../../models/enquiry/Enquiry");
const { protect } = require("../../middlewares/auth");
const secureUpload = require("../../middlewares/secureUpload");

const router = express.Router();
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

/**
 * @swagger
 * tags:
 *   name: Enquiry
 *   description: Unified API for all form submissions (Career, Training, Contact, Hire)
 */

// POST /api/enquiries - Public Submission
router.post("/", secureUpload("uploads/enquiries"), async (req, res) => {
    try {
        const {
            type,
            name,
            firstname,
            lastname,
            email,
            phone,
            message,
            subject,
            graduation,
            experience,
            positionApplied,
            currentCTC,
            noticePeriod,
            location,
            selectedCourse,
            budget,
            recruitment,
            source,
            captchaToken,
        } = req.body;

        // Basic Validation
        if (!type || !email || !phone || !message) {
            if (req.file?.path) fs.unlink(req.file.path, () => { });
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // reCAPTCHA verification (Optional - uncomment if needed)
        /*
        if (!captchaToken) {
            if (req.file?.path) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ success: false, message: "Captcha is required" });
        }
        const captchaResponse = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
            params: { secret: RECAPTCHA_SECRET, response: captchaToken }
        });
        if (!captchaResponse.data.success) {
            if (req.file?.path) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ success: false, message: "Captcha verification failed" });
        }
        */

        // Handle Name Logic
        let finalName = name;
        if (!finalName && firstname) {
            finalName = lastname ? `${firstname} ${lastname}` : firstname;
        }

        const fileUrl = req.file ? path.join("uploads/enquiries", req.file.filename) : null;

        const newEnquiry = new Enquiry({
            type,
            name: finalName || "Anonymous",
            firstname,
            lastname,
            email,
            phone,
            message,
            subject,
            graduation,
            experience,
            positionApplied: mongoose.Types.ObjectId.isValid(positionApplied) ? positionApplied : null,
            currentCTC,
            noticePeriod,
            location,
            selectedCourse,
            budget,
            recruitment,
            source: source || "footer_form",
            fileUrl,
        });

        const savedEnquiry = await newEnquiry.save();

        // Populate position if Career
        let populatedEnquiry = savedEnquiry;
        if (type === "Career" && savedEnquiry.positionApplied) {
            populatedEnquiry = await savedEnquiry.populate("positionApplied", "name");
        }

        // --- Send Admin Email ---
        const adminMailOptions = {
            from: `"${finalName}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: `📩 New ${type} Request: ${subject || finalName}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:8px; max-width:700px; margin:auto;">
                    <h2 style="color:#333;">New ${type} Submission</h2>
                    <table style="width:100%; border-collapse: collapse; margin-top:15px;">
                        <tr><td style="padding:8px; border:1px solid #ddd;"><b>Type:</b></td><td style="padding:8px; border:1px solid #ddd;">${type}</td></tr>
                        <tr><td style="padding:8px; border:1px solid #ddd;"><b>Name:</b></td><td style="padding:8px; border:1px solid #ddd;">${finalName}</td></tr>
                        <tr><td style="padding:8px; border:1px solid #ddd;"><b>Email:</b></td><td style="padding:8px; border:1px solid #ddd;">${email}</td></tr>
                        <tr><td style="padding:8px; border:1px solid #ddd;"><b>Phone:</b></td><td style="padding:8px; border:1px solid #ddd;">${phone}</td></tr>
                        ${subject ? `<tr><td style="padding:8px; border:1px solid #ddd;"><b>Subject/Topic:</b></td><td style="padding:8px; border:1px solid #ddd;">${subject}</td></tr>` : ""}
                        ${selectedCourse ? `<tr><td style="padding:8px; border:1px solid #ddd;"><b>Course:</b></td><td style="padding:8px; border:1px solid #ddd;">${selectedCourse}</td></tr>` : ""}
                        ${populatedEnquiry.positionApplied ? `<tr><td style="padding:8px; border:1px solid #ddd;"><b>Position:</b></td><td style="padding:8px; border:1px solid #ddd;">${populatedEnquiry.positionApplied.name}</td></tr>` : ""}
                        <tr><td style="padding:8px; border:1px solid #ddd;"><b>Message:</b></td><td style="padding:8px; border:1px solid #ddd;">${message}</td></tr>
                    </table>
                    <br/>
                    <p style="color:#555;">Best Regards,<br/>Inspire Techno Solution Website</p>
                </div>
            `,
            attachments: fileUrl ? [{ filename: req.file.filename, path: path.join(process.cwd(), fileUrl) }] : [],
        };
        await transporter.sendMail(adminMailOptions);

        // --- Send User Confirmation Email ---
        const userMailOptions = {
            from: `"Inspire Techno Solution" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `✅ We received your ${type} request`,
            html: `
                <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:8px; max-width:600px; margin:auto;">
                    <h2 style="color:#333;">Hi ${finalName},</h2>
                    <p>Thank you for reaching out to <b>Inspire Techno Solution</b> regarding your <b>${type}</b> request.</p>
                    <p>We have received your details and our team will get back to you shortly.</p>
                    <hr style="margin:20px 0;"/>
                    <p style="font-size:12px; color:#777; text-align:center;">
                        📞 +91 93272 20484 | 📧 support@inspiretechnosolution.com
                    </p>
                </div>
            `,
        };
        await transporter.sendMail(userMailOptions);

        res.status(201).json({ success: true, message: `${type} enquiry submitted successfully`, data: populatedEnquiry });
    } catch (error) {
        if (req.file?.path) fs.unlink(req.file.path, () => { });
        console.error("Enquiry Submission Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// GET /api/enquiries - Admin List
router.get("/", protect, async (req, res) => {
    try {
        const { page = 1, limit = 10, type = "", search = "", status = "" } = req.query;
        let query = {};

        if (type) query.type = type;
        if (status) query.status = status;
        if (search) {
            const regex = new RegExp(search, "i");
            query.$or = [{ name: regex }, { email: regex }, { phone: regex }, { subject: regex }];
        }

        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            Enquiry.find(query)
                .populate("positionApplied", "name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            Enquiry.countDocuments(query),
        ]);

        res.json({
            success: true,
            data,
            pagination: { current: Number(page), pages: Math.ceil(total / limit), total },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// GET /api/enquiries/stats/group - Admin Stats Grouped by Time Periods (Current vs past ranges)
router.get("/stats/group", protect, async (req, res) => {
    try {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");

        const formattedTodayDate = `${yyyy}-${mm}-${dd}`;
        const formattedMonth = `${yyyy}-${mm}`;
        const formattedYear = `${yyyy}`;

        // Helper to get ISO week string
        function getISOWeek(date) {
            const tempDate = new Date(date.valueOf());
            tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));
            const yearStart = new Date(tempDate.getFullYear(), 0, 1);
            const weekNo = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
            return `${tempDate.getFullYear()}-W${String(weekNo).padStart(2, "0")}`;
        }
        const formattedWeek = getISOWeek(today);

        // Daily (Today) range
        const startOfToday = new Date(today);
        startOfToday.setHours(0, 0, 0, 0);
        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999);

        // Weekly (This Week) range - starting Sunday
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        // Monthly (This Month) range
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        // Yearly (This Year) range
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        startOfYear.setHours(0, 0, 0, 0);
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        endOfYear.setHours(23, 59, 59, 999);

        const [dailyCount, weeklyCount, monthlyCount, yearlyCount] = await Promise.all([
            Enquiry.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),
            Enquiry.countDocuments({ createdAt: { $gte: startOfWeek, $lte: endOfWeek } }),
            Enquiry.countDocuments({ createdAt: { $gte: startOfMonth, $lte: endOfMonth } }),
            Enquiry.countDocuments({ createdAt: { $gte: startOfYear, $lte: endOfYear } })
        ]);

        res.json({
            success: true,
            data: {
                daily: [
                    {
                        count: dailyCount,
                        date: formattedTodayDate
                    }
                ],
                weekly: [
                    {
                        count: weeklyCount,
                        week: formattedWeek
                    }
                ],
                monthly: [
                    {
                        count: monthlyCount,
                        month: formattedMonth
                    }
                ],
                yearly: [
                    {
                        count: yearlyCount,
                        year: formattedYear
                    }
                ]
            }
        });
    } catch (error) {
        console.error("❌ Error fetching enquiry stats:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// GET /api/enquiries/:id - Admin Detail
router.get("/:id", protect, async (req, res) => {
    try {
        const data = await Enquiry.findById(req.params.id).populate("positionApplied", "name");
        if (!data) return res.status(404).json({ success: false, message: "Enquiry not found" });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// PUT /api/enquiries/:id - Admin Update (Status/Notes)
router.put("/:id", protect, async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const data = await Enquiry.findByIdAndUpdate(req.params.id, { status, adminNotes }, { new: true });
        if (!data) return res.status(404).json({ success: false, message: "Enquiry not found" });
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// DELETE /api/enquiries/:id - Admin Delete
router.delete("/:id", protect, async (req, res) => {
    try {
        const data = await Enquiry.findById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Enquiry not found" });

        // Delete associated file if exists
        if (data.fileUrl) {
            const absolutePath = path.join(process.cwd(), data.fileUrl);
            if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
        }

        await Enquiry.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Enquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// POST /api/enquiries/bulk-delete - Admin Bulk Delete
router.post("/bulk-delete", protect, async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) return res.status(400).json({ success: false, message: "Invalid IDs" });

        const enquiries = await Enquiry.find({ _id: { $in: ids } });
        enquiries.forEach(enq => {
            if (enq.fileUrl) {
                const absolutePath = path.join(process.cwd(), enq.fileUrl);
                if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
            }
        });

        await Enquiry.deleteMany({ _id: { $in: ids } });
        res.json({ success: true, message: "Bulk delete successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
