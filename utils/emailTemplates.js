/**
 * Email templates for Inspire Techno Solution.
 * Highly aesthetic, responsive, and modern layout.
 */

const getLogoHeader = () => {
  return `
    <div style="text-align: center; padding: 25px 20px; background-color: #fafbfc; border-bottom: 1px solid #eef2f5; border-top-left-radius: 12px; border-top-right-radius: 12px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; text-align: center;">
        <tr>
          <td align="center" style="vertical-align: middle;">
            <img src="cid:companylogo" alt="Inspire Techno Solution" style="height: 48px; width: auto; display: block; margin: 0 auto;" />
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-top: 8px;">
            <span style="font-family: 'Outfit', 'Segoe UI', Arial, sans-serif; font-size: 20px; font-weight: 700; color: #1e293b; letter-spacing: 0.5px;">Inspire Techno Solution</span>
          </td>
        </tr>
      </table>
    </div>
  `;
};

const getFooter = () => {
  return `
    <div style="background-color: #fafbfc; padding: 30px 20px; text-align: center; border-top: 1px solid #eef2f5; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; font-family: 'Segoe UI', Arial, sans-serif;">
      <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600; color: #334155;">Inspire Techno Solution</p>
      <p style="margin: 0 0 15px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
        Empowering businesses with cutting-edge technology and custom software solutions.
      </p>
      <div style="margin: 15px 0; border-top: 1px solid #eef2f5; padding-top: 15px;">
        <span style="font-size: 12px; color: #94a3b8; display: inline-block; margin: 0 8px;">
          📞 <strong>Phone:</strong> +91 93272 20484
        </span>
        <span style="font-size: 12px; color: #94a3b8; display: inline-block; margin: 0 8px;">
          📧 <strong>Email:</strong> support@inspiretechnosolution.com
        </span>
        <span style="font-size: 12px; color: #94a3b8; display: inline-block; margin: 0 8px;">
          🌐 <strong>Web:</strong> <a href="https://www.inspiretechnosolution.com" target="_blank" style="color: #d35400; text-decoration: none; font-weight: 500;">www.inspiretechnosolution.com</a>
        </span>
      </div>
      <p style="margin: 15px 0 0 0; font-size: 11px; color: #cbd5e1;">
        &copy; ${new Date().getFullYear()} Inspire Techno Solution. All rights reserved.
      </p>
    </div>
  `;
};

/**
 * Helper to render key-value details in a clean card layout
 */
const renderFields = (fields) => {
  let html = `<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 20px 0;">`;
  html += `<table width="100%" cellpadding="6" cellspacing="0" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px; border-collapse: collapse;">`;
  
  const entries = Object.entries(fields);
  for (let i = 0; i < entries.length; i++) {
    const [key, val] = entries[i];
    if (val === undefined || val === null || val === '') continue;
    
    // Highlight message / recruitment / source
    if (
      key.toLowerCase() === 'message' || 
      key.toLowerCase() === 'recruitment' || 
      key.toLowerCase() === 'sourcetype'
    ) {
      continue; // Render these outside the key-value table
    }

    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());

    html += `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td width="35%" style="color: #64748b; font-weight: 600; padding: 8px 0; vertical-align: top;">${label}</td>
        <td style="color: #1e293b; padding: 8px 0; font-weight: 500; vertical-align: top;">${val}</td>
      </tr>
    `;
  }
  
  html += `</table></div>`;
  return html;
};

/**
 * Generate User Confirmation Email HTML
 */
const getUserEmailHtml = (name, subject, introText, fields) => {
  const messageVal = fields.message || fields.recruitment || '';
  
  return `
    <div style="background-color: #f1f5f9; padding: 30px 10px; font-family: 'Segoe UI', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden;">
        <!-- Logo & Company Name Header -->
        ${getLogoHeader()}
        
        <!-- Main Content -->
        <div style="padding: 30px 25px;">
          <h2 style="margin-top: 0; color: #1e293b; font-size: 20px; font-weight: 700;">Hi ${name || 'there'},</h2>
          
          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
            ${introText}
          </p>

          <div style="border-left: 4px solid #d35400; padding-left: 15px; margin: 25px 0;">
            <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; font-weight: 700; display: block; margin-bottom: 4px;">Topic of Interest</span>
            <span style="font-size: 16px; color: #d35400; font-weight: 700;">${subject}</span>
          </div>

          <!-- Submitted Details -->
          <h3 style="color: #334155; font-size: 15px; font-weight: 600; margin: 20px 0 10px 0; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">Summary of your submission</h3>
          ${renderFields(fields)}

          <!-- Detailed message box -->
          ${messageVal ? `
            <div style="margin: 20px 0; padding: 15px; background-color: #fffaf0; border: 1px solid #fee2e2; border-left: 4px solid #f97316; border-radius: 8px;">
              <strong style="display: block; font-size: 13px; color: #c2410c; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Your Message / Request</strong>
              <p style="margin: 0; font-size: 14px; color: #1e293b; line-height: 1.5; white-space: pre-line;">${messageVal}</p>
            </div>
          ` : ''}

          <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-top: 25px;">
            One of our solution specialists will review your submission and contact you within the next 24 business hours.
          </p>

          <p style="color: #64748b; font-size: 14px; margin-top: 30px; margin-bottom: 0; line-height: 1.5;">
            Best regards,<br/>
            <span style="color: #d35400; font-weight: 600;">The Inspire Techno Solution Team</span>
          </p>
        </div>

        <!-- Footer -->
        ${getFooter()}
      </div>
    </div>
  `;
};

/**
 * Generate Admin Notification Email HTML
 */
const getAdminEmailHtml = (title, type, fields) => {
  const messageVal = fields.message || fields.recruitment || '';

  return `
    <div style="background-color: #f8fafc; padding: 30px 10px; font-family: 'Segoe UI', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.03); overflow: hidden;">
        <!-- Logo & Company Name Header -->
        ${getLogoHeader()}
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 20px 25px; text-align: left;">
          <span style="display: inline-block; background-color: #d35400; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; margin-bottom: 8px; letter-spacing: 0.5px;">
            ${type}
          </span>
          <h2 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">${title}</h2>
        </div>

        <!-- Main Content -->
        <div style="padding: 25px;">
          <p style="color: #475569; font-size: 14px; line-height: 1.5; margin-top: 0;">
            A new submission has been received from the website. Details are listed below:
          </p>

          <!-- Key-value properties -->
          ${renderFields(fields)}

          <!-- Detailed message box -->
          ${messageVal ? `
            <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #64748b; border-radius: 6px;">
              <strong style="display: block; font-size: 12px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Message / Details</strong>
              <p style="margin: 0; font-size: 14px; color: #1e293b; line-height: 1.5; white-space: pre-line;">${messageVal}</p>
            </div>
          ` : ''}

          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center;">
            This email was automatically generated by the Inspire Techno Solution server.
          </div>
        </div>
      </div>
    </div>
  `;
};

module.exports = {
  getUserEmailHtml,
  getAdminEmailHtml
};
