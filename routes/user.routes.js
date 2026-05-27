const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { protect } = require('../middlewares/auth');

// Nodemailer Transporter Configuration (Gmail SMTP)
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

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user authentication and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: john@example.com
 *         password:
 *           type: string
 *           example: secret123
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: john@example.com
 *         password:
 *           type: string
 *           example: secret123
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         role:
 *           type: array
 *           items:
 *             type: string
 *         profile_picture:
 *           type: string
 */

/**
 * @swagger
 * /api/auth-user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message: 
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid input or email already in use
 *       500:
 *         description: Server error
 */
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // console.log(firstName, lastName, email, password);
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'First name, last name, email, and password are required' });
        }

        if (firstName.length < 2 || firstName.length > 30) {
            return res.status(400).json({ message: 'First name must be between 2 and 30 characters' });
        }

        if (lastName.length < 2 || lastName.length > 30) {
            return res.status(400).json({ message: 'Last name must be between 2 and 30 characters' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({
            firstName,
            lastName,
            name: `${firstName} ${lastName}`,
            email,
            password,
            roles: ['Admin'],
            profile_picture: ''
        });

        await user.save();
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.roles,
                profile_picture: user.profile_picture,
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

/**
 * @swagger
 * /api/auth-user/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message: 
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        user.lastLogin = new Date();
        await user.save();
        const token = generateToken(user._id);
        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.roles,
                profile_picture: user.profile_picture,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login",
        });
    }
});

/**
 * @swagger
 * /api/auth-user/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized
 */
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                plan: user.plan,
                roles: user.roles,
                profile_picture: user.profile_picture,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});

/**
 * @swagger
 * /api/auth-user/update:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid input or email already exists
 *       401:
 *         description: Unauthorized
 */
router.put('/update', protect, async (req, res) => {
    try {
        const { firstName, lastName, email, password, profile_picture } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
            user.email = email;
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (firstName || lastName) {
            user.name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        }

        if (password) {
            user.password = password; // pre-save hook will hash it
        }

        if (profile_picture !== undefined) {
            user.profile_picture = profile_picture;
        }

        await user.save();

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                profile_picture: user.profile_picture,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error during profile update"
        });
    }
});

/**
 * @swagger
 * /api/auth-user/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: Reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Email is required
 *       500:
 *         description: Server error
 */
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this email'
            });
        }

        // Generate cryptographically secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token (SHA-256) to save in database securely
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Store hashed token and 15-minute expiry in User document
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Construct password reset link (pointing to frontend application)
        const frontendUrl = process.env.FRONTEND_URL ||  'http://localhost:3001'; //process.env.Loc_url ||
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        // Premium HTML email template (White / Light Slate Base Theme)
        const htmlMessage = `
            <div style="font-family: 'Outfit', 'Inter', sans-serif; background-color: #f8fafc; padding: 40px 20px; color: #1e293b; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.02);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #0284c7; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">ITS Password Recovery</h2>
                    <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Secure Account Management Service</p>
                </div>
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.05);">
                    <p style="font-size: 16px; line-height: 1.6; color: #0f172a; margin-top: 0; font-weight: 600;">Hello ${user.name || 'User'},</p>
                    <p style="font-size: 15px; line-height: 1.6; color: #334155;">We received a request to reset your password. Click the button below to secure your account and set a new password. This link is valid for <strong>15 minutes</strong>.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" target="_blank" style="background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 15px; font-weight: 600; border-radius: 6px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.2), 0 2px 4px -1px rgba(37, 99, 235, 0.2); transition: transform 0.2s ease;">Reset Password</a>
                    </div>
                    
                    <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin-bottom: 0;">If you did not request a password reset, please ignore this email or contact support. Your password will remain completely secure.</p>
                </div>
                <div style="text-align: center; margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 ITS Global Tech. All rights reserved.</p>
                </div>
            </div>
        `;

        await transporter.sendMail({
            from: `"ITS Support" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Password Recovery Request - ITS',
            html: htmlMessage,
        });

        res.status(200).json({
            success: true,
            message: 'If an account exists with that email, a password reset link has been sent.'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error occurred while requesting password reset.'
        });
    }
});

/**
 * @swagger
 * /api/auth-user/reset-password/{token}:
 *   post:
 *     summary: Reset password using the verification token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Cryptographic reset token received in email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: newSecretPassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid or expired token or password validation error
 *       500:
 *         description: Server error
 */
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        // Hash incoming token to match with stored SHA-256 value
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // Find user by hashed token and ensure token hasn't expired yet
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired password reset token'
            });
        }

        // Set the new password and clear the reset token fields
        user.password = password; // Trigger Mongoose hook to bcrypt-hash password
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful. You can now log in.'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error occurred during password reset.'
        });
    }
});


/**
 * @swagger
 * /api/auth-user/logout:
 *   post:
 *     summary: Log out user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});


module.exports = router;
