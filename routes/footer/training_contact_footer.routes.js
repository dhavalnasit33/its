const express = require("express");
const TranningContact = require("../../models/footer/tranning_contact_footer");
const { protect } = require("../../middlewares/auth");
const nodemailer = require("nodemailer");
const path = require("path");
const { getUserEmailHtml, getAdminEmailHtml } = require("../../utils/emailTemplates");
const axios = require("axios");

const router = express.Router();
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;


// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * @swagger
 * tags:
 *   name: TranningContact
 *   description: API for training footer contacts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TranningContact:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - phone
 *         - message
 *         - location
 *         - selectedCourse
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         fullname:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         message:
 *           type: string
 *         location:
 *           type: string
 *         selectedCourse:
 *           type: string
 *           enum:
 *             - Web Development
 *             - Full Stack Development
 *             - Mobile App Development
 *             - UI/UX Design
 *             - Web Design
 *             - Other Services
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/tranning-contact:
 *   post:
 *     summary: Submit a new training contact form
 *     tags: [TranningContact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - phone
 *               - message
 *               - location
 *               - selectedCourse
 *               - token
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *               location:
 *                 type: string
 *               selectedCourse:
 *                 type: string
 *                 enum: ["Web Development","Full Stack Development","Mobile App Development","UI/UX Design","Web Design","Other Services"]
 *               token:
 *                 type: string
 *                 description: Google reCAPTCHA token
 *     responses:
 *       201:
 *         description: Contact saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/TranningContact'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

router.post("/", async (req, res) => {
    try {
        const { fullname, email, phone, message, location, selectedCourse, token } = req.body;

        if (!fullname || !email || !phone || !message || !location || !selectedCourse) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Verify reCAPTCHA
        if (!token) {
            return res.status(400).json({ success: false, message: "reCAPTCHA is required" });
        }

        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null, // no JSON body, Google expects form-encoded
            {
                params: {
                    secret: RECAPTCHA_SECRET,
                    response: token,
                },
            }
        );

        // if (!response.data.success) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Captcha verification failed"
        //     });
        // }
        // Save contact to DB
        const tranningContact = new TranningContact({
            fullname,
            email,
            phone,
            message,
            location,
            selectedCourse
        });
        await tranningContact.save();

        // ======================
        // 📧 Send Admin Email
        // ======================
        const adminMailOptions = {
            from: `"${fullname}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: "📩 New Training Contact Form Submission",
            html: getAdminEmailHtml(
                `Training Contact Request: ${selectedCourse}`,
                "Training Enquiry",
                {
                    fullName: fullname,
                    email: email,
                    phone: phone,
                    location: location,
                    selectedCourse: selectedCourse,
                    message: message,
                }
            ),
            attachments: [
                {
                    filename: "logo.png",
                    path: path.join(process.cwd(), "assets/logo.png"),
                    cid: "companylogo",
                },
            ],
        };

        await transporter.sendMail(adminMailOptions);

        // ======================
        // 📧 Send Confirmation to User
        // ======================
        const userMailOptions = {
            from: `"Inspire Techno Solution" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "✅ Thank you for contacting us about Training",
            html: getUserEmailHtml(
                fullname,
                selectedCourse,
                "Thank you for contacting Inspire Techno Solution about our training programs. One of our training specialists will connect with you soon.",
                {
                    email: email,
                    phone: phone,
                    location: location,
                    selectedCourse: selectedCourse,
                    message: message,
                }
            ),
            attachments: [
                {
                    filename: "logo.png",
                    path: path.join(process.cwd(), "assets/logo.png"),
                    cid: "companylogo",
                },
            ],
        };

        await transporter.sendMail(userMailOptions);

        // Final Response
        res.status(201).json({
            success: true,
            message: "Training Contact saved successfully & emails sent",
            data: tranningContact,
        });

    } catch (error) {
        console.error("❌ Error in Training Contact:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


/**
 * @swagger
 * /api/tranning-contact:
 *   get:
 *     summary: Get all training contacts (with pagination and search)
 *     tags: [TranningContact]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of training contacts
 */

router.get("/", protect, async (req, res) => {
    try {
        const { page = 1, limit = 10, category = '', value = '', status = '' } = req.query;
        let query = {};

        if (category && category !== 'all') {
            query.selectedCourse = category;
        }

        if (status && status !== 'all') {
            query.status = status;
        }

        if (value) {
            const regex = new RegExp(value, 'i');
            query.$or = [
                { fullname: regex },
                { email: regex },
                { location: regex },
            ];
        }

        const skip = (page - 1) * limit;
        const [contacts, count] = await Promise.all([
            TranningContact.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            TranningContact.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            data: contacts,
            pagination: {
                current: Number(page),
                pages: Math.ceil(count / limit),
                total: count,
            },
        });

    } catch (error) {
        console.error("❌ Error getting training contacts:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


// GET /api/tranning-contact/stats - Admin Status Stats Counts
router.get("/stats", protect, async (req, res) => {
    try {
        const [total, pending, reviewed, contacted, closed] = await Promise.all([
            TranningContact.countDocuments({}),
            TranningContact.countDocuments({ status: "Pending" }),
            TranningContact.countDocuments({ status: "Reviewed" }),
            TranningContact.countDocuments({ status: "Contacted" }),
            TranningContact.countDocuments({ status: "Closed" }),
        ]);
        res.json({
            success: true,
            data: { total, pending, reviewed, contacted, closed }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


/**
 * @swagger
 * /api/tranning-contact/{id}:
 *   get:
 *     summary: Get a training contact by ID
 *     tags: [TranningContact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact details
 *       404:
 *         description: Contact not found
 */
router.get("/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await TranningContact.findById(id);
        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        console.error("❌ Error getting training contact by ID:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


/**
 * @swagger
 * /api/tranning-contact/{id}:
 *   put:
 *     summary: Update status and notes of a training contact by ID
 *     tags: [TranningContact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Pending", "Reviewed", "Contacted", "Closed"]
 *               adminNotes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 */
router.put("/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNotes } = req.body;
        const contact = await TranningContact.findById(id);
        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        if (status) contact.status = status;
        if (adminNotes !== undefined) contact.adminNotes = adminNotes;

        await contact.save();
        res.status(200).json({ success: true, message: "Contact updated successfully", data: contact });
    } catch (error) {
        console.error("❌ Error updating training contact:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


/**
 * @swagger
 * /api/tranning-contact/bulk-delete:
 *   post:
 *     summary: Delete multiple training contacts
 *     tags: [TranningContact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Contacts deleted successfully
 */
router.post("/bulk-delete", protect, async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ success: false, message: "Invalid IDs" });
        }
        await TranningContact.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ success: true, message: "Bulk delete successful" });
    } catch (error) {
        console.error("❌ Error bulk deleting training contacts:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


/**
 * @swagger
 * /api/tranning-contact/{id}:
 *   delete:
 *     summary: Delete a training contact by ID
 *     tags: [TranningContact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
router.delete("/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await TranningContact.findById(id);
        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }
        await TranningContact.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Contact deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting training contact:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
