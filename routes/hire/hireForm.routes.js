const express = require("express");
const HireForm = require("../../models/hire/hireForm");
const router = express.Router();
const axios = require("axios");
const nodemailer = require("nodemailer");
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const path = require("path");
const { protect } = require("../../middlewares/auth");
const { getUserEmailHtml, getAdminEmailHtml } = require("../../utils/emailTemplates");

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
 *   name: HireForm
 *   description: API for hire requests
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HireForm:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - recruitment
 *         - subject
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the hire request
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john@example.com
 *         phone:
 *           type: string
 *           example: +91-9876543210
 *         recruitment:
 *           type: string
 *           example: Website development for e-commerce
 *         subject:
 *           type: string
 *           example: Need a full-stack developer team
 *         message:
 *           type: string
 *           example: We want to build an e-commerce platform with payment integration.
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/hire-form:
 *   post:
 *     summary: Submit a new hire request
 *     tags: [HireForm]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - recruitment
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: +91-9876543210
 *               recruitment:
 *                 type: string
 *                 example: Website development for e-commerce
 *               subject:
 *                 type: string
 *                 example: Need a full-stack developer team
 *               message:
 *                 type: string
 *                 example: We want to build an e-commerce platform with payment integration.
 *               captchaToken:
 *                 type: string
 *                 description: Google reCAPTCHA token
 *                 example: "03AGdBq26K..."
 *     responses:
 *       201:
 *         description: Hire form submitted successfully
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
 *                   $ref: '#/components/schemas/HireForm'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

// POST /api/hire-form
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      recruitment,
      subject,
      message,
      //  captchaToken
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !recruitment || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // if (!captchaToken) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Captcha is required",
    //     });
    // }

    // const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, // no JSON body, Google expects form-encoded
    //     {
    //         params: {
    //             secret: RECAPTCHA_SECRET,
    //             response: captchaToken,
    //         },
    //     }
    // );
    // if (!response.data.success) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Captcha verification failed"
    //     });
    // }

    const newHireForm = new HireForm({
      name,
      email,
      phone,
      recruitment,
      subject,
      message,
    });

    const savedHireForm = await newHireForm.save();
    // --- Admin Mail ---
    let adminMailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `📌 New Hire Request - ${subject}`,
      html: getAdminEmailHtml(
        `Hire Developer Request: ${subject}`,
        "Hire Request",
        {
          name: name,
          email: email,
          phone: phone,
          subject: subject,
          recruitment: recruitment,
          message: message,
        }
      ),
    };
    await transporter.sendMail(adminMailOptions);

    // --- User Mail ---
    let userMailOptions = {
      from: `"Inspire Techno Solution" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We Received Your Hire Request - Inspire Techno Solution",
      html: getUserEmailHtml(
        name,
        subject,
        "We have received your hire request. Our recruitment and consulting team will review your requirements and get back to you shortly.",
        {
          email: email,
          phone: phone,
          subject: subject,
          recruitment: recruitment,
          message: message,
        }
      ),
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "../../assets/logo.png"),
          cid: "companylogo",
        },
      ],
    };
    await transporter.sendMail(userMailOptions);

    res.status(201).json({
      success: true,
      message: "Hire form submitted successfully",
      data: savedHireForm,
    });
  } catch (error) {
    console.error("Error submitting hire form:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//GET API

/**
 * @swagger
 * /api/hire-form:
 *   get:
 *     summary: Get all hire requests with pagination and optional subject filter
 *     tags: [HireForm]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter hire requests by subject (case-insensitive)
 *     responses:
 *       200:
 *         description: List of hire requests with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HireForm'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     current:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       500:
 *         description: Server error
 */

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, category = "" } = req.query;
    let query = {};

    if (category) {
      query = {
        ...query,
        subject: { $regex: category, $options: "i" }, // case-insensitive search
      };
    }

    const skip = (page - 1) * limit;

    const [hireForms, total] = await Promise.all([
      HireForm.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      HireForm.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: hireForms,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("Error retrieving hire forms:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/**
 * @swagger
 * /api/hire-form/{id}:
 *   delete:
 *     summary: Delete a hire request by ID
 *     tags: [HireForm]
 *     security:
 *       - bearerAuth: []   # Protect middleware
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hire request ID
 *     responses:
 *       200:
 *         description: Hire request deleted successfully
 *       404:
 *         description: Hire request not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHireForm = await HireForm.findByIdAndDelete(id);
    if (!deletedHireForm) {
      return res.status(404).json({
        success: false,
        message: "Hire form not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Hire form deleted successfully",
      data: deletedHireForm,
    });
  } catch (error) {
    console.error("Error deleting hire form:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
