const { body, validationResult } = require("express-validator");

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message:  "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

exports.validationWhyChooseITS = [
    body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 character'),
    body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 character'),
];

exports.validateYoastSEO = [
    body('seo_keyphrase')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 200 })
      .withMessage('SEO Keyphrase cannot exceed 200 characters'),
    body('seo_title')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 200 })
      .withMessage('SEO Title cannot exceed 200 characters'),
    body('meta_description')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 300 })
      .withMessage('Meta Description cannot exceed 300 characters'),
    body('cover_image')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Cover Image URL cannot exceed 1000 characters'),
    body('page_description')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Page Description cannot exceed 1000 characters'),
    body('googletags')
      .optional({ checkFalsy: true })
      .trim(),
];

exports.validateWebsiteSettings = [
    body('favicon')
      .optional({ checkFalsy: true })
      .trim()
      .isString()
      .withMessage('Favicon must be a valid URL string'),
    body('logo_img')
      .optional({ checkFalsy: true })
      .trim()
      .isString()
      .withMessage('Logo image must be a valid URL string'),
    body('address')
      .optional()
      .isArray()
      .withMessage('Address must be an array of strings'),
    body('emails')
      .optional()
      .isArray()
      .withMessage('Emails must be an array of email objects'),
    body('emails.*.email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Email address must be valid'),
    body('emails.*.emailType')
      .optional()
      .trim()
      .isIn(['hr', 'sales', 'contact'])
      .withMessage('Email type must be hr, sales, or contact'),
    body('phone')
      .optional()
      .isArray()
      .withMessage('Phone must be an array of strings'),
    body('phone.*')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Each phone number must be a valid string'),
    body('social_media')
      .optional()
      .isArray()
      .withMessage('Social media must be an array of objects'),
    body('social_media.*.socialMediaName')
      .optional({ checkFalsy: true })
      .trim()
      .isString()
      .withMessage('Social media name must be a string'),
    body('social_media.*.link')
      .optional({ checkFalsy: true })
      .trim()
      .isString()
      .withMessage('Social media link must be a string'),
    body('social_media.*.image')
      .optional({ checkFalsy: true })
      .trim()
      .isString()
      .withMessage('Social media image must be a string'),
];