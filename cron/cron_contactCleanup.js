const { CronJob } = require('cron');
const path = require('path');
const fs = require('fs');
const Contact = require('../models/footer/contact_footer')
const ApplyPosition = require('../models/career/applyForPosition')
const Enquiry = require('../models/enquiry/Enquiry')

// Run daily at 00:05 (server time). Fields: sec min hour day month dow
const job_delete_record = new CronJob("0 5 0 * * *", async () => {
    console.log("⏰ Running daily cleanup job...");

    // compute cutoff as start of today minus 15 full days
    // this keeps records from the last 15 days inclusive, and deletes anything *before* that

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const cutoff = new Date(today.getTime() - (15 * 24 * 60 * 60 * 1000));
    console.log(`🗓️ Cutoff (keep >= this date): ${cutoff.toISOString().slice(0, 10)}`);

    try {
        // find records strictly older than the 15-day window
        const expiredContacts = await Contact.find({ createdAt: { $lt: cutoff } });

        for (const contact of expiredContacts) {
            if (contact.fileUrl) {
                const absolutePath = path.isAbsolute(contact.fileUrl)
                    ? contact.fileUrl
                    : path.join(process.cwd(), contact.fileUrl);
                try {
                    await fs.promises.unlink(absolutePath);
                    console.log(`🗑 Deleted file: ${absolutePath}`);
                } catch (error) {
                    if (error.code !== 'ENOENT') {
                        console.error("❌ File delete error:", error);
                    } else {
                        console.warn(`⚠️ File not found (already gone): ${absolutePath}`);
                    }
                }
            }

            await Contact.findByIdAndDelete(contact._id);
            console.log(`🗑 Deleted record: ${contact.firstname} ${contact.lastname}`);
        }
        console.log(`✅ Cleanup complete in Contact. Removed ${expiredContacts.length} records.`);

        // find records strictly older than 15-day window in apply position
        const expiredApplyPositions = await ApplyPosition.find({ createdAt: { $lt: cutoff } });

        for (const applyPosition of expiredApplyPositions) {
            if (applyPosition.fileUrl) {
                const absolutePath = path.isAbsolute(applyPosition.fileUrl)
                    ? applyPosition.fileUrl
                    : path.join(process.cwd(), applyPosition.fileUrl);
                try {
                    await fs.promises.unlink(absolutePath);
                    console.log(`🗑 Deleted file: ${absolutePath}`);
                } catch (error) {
                    if (error.code !== 'ENOENT') {
                        console.error("❌ File delete error:", error);
                    } else {
                        console.warn(`⚠️ File not found (already gone): ${absolutePath}`);
                    }
                }
            }
            await ApplyPosition.findByIdAndDelete(applyPosition._id);
            console.log(`🗑 Deleted record: ${applyPosition.name}`);
        }
        console.log(`✅ Cleanup complete in Apply position. Removed ${expiredApplyPositions.length} records.`);

        // find expired enquiries strictly older than 15-day window
        const expiredEnquiries = await Enquiry.find({ createdAt: { $lt: cutoff } });

        for (const enquiry of expiredEnquiries) {
            if (enquiry.fileUrl) {
                const absolutePath = path.isAbsolute(enquiry.fileUrl)
                    ? enquiry.fileUrl
                    : path.join(process.cwd(), enquiry.fileUrl);
                try {
                    await fs.promises.unlink(absolutePath);
                    console.log(`🗑 Deleted file: ${absolutePath}`);
                } catch (error) {
                    if (error.code !== 'ENOENT') {
                        console.error("❌ File delete error:", error);
                    } else {
                        console.warn(`⚠️ File not found (already gone): ${absolutePath}`);
                    }
                }
            }
            await Enquiry.findByIdAndDelete(enquiry._id);
            console.log(`🗑 Deleted record: ${enquiry.name}`);
        }
        console.log(`✅ Cleanup complete in Enquiries. Removed ${expiredEnquiries.length} records.`);
    } catch (error) {
        console.error("❌ Cleanup job error:", error);
    }
})

job_delete_record.start();

// ================================
// TEST CRON JOB FOR 5-MINUTE BUFFER
// ================================
// Run every minute (so we can quickly test)
// const job_delete_record_test = new CronJob("0 */1 * * * *", async () => {
//     console.log("⏰ Running 5-minute test cleanup job...");

//     const now = new Date();
//     // Round down to the current minute
//     now.setSeconds(0, 0);

//     // Keep only the last 5 minutes of records
//     const cutoff = new Date(now.getTime() - (5 * 60 * 1000));

//     console.log(`🗓️ Cutoff (keep >= this time): ${cutoff.toISOString()}`);

//     try {
//         // Find records strictly older than cutoff
//         const expiredContacts = await Contact.find({ createdAt: { $lt: cutoff } });

//         for (const contact of expiredContacts) {
//             if (contact.fileUrl) {
//                 const absolutePath = path.isAbsolute(contact.fileUrl)
//                     ? contact.fileUrl
//                     : path.join(process.cwd(), contact.fileUrl);

//                 try {
//                     await fs.promises.unlink(absolutePath);
//                     console.log(`🗑 Deleted file: ${absolutePath}`);
//                 } catch (err) {
//                     if (err.code !== 'ENOENT') {
//                         console.error("❌ File delete error:", err);
//                     } else {
//                         console.warn(`⚠️ File not found (already gone): ${absolutePath}`);
//                     }
//                 }
//             }

//             await Contact.findByIdAndDelete(contact._id);
//             console.log(`🗑 Deleted record: ${contact._id}`);
//         }

//         console.log(`✅ Cleanup complete IN CONTACT. Removed ${expiredContacts.length} records.`);

//         // find recorde in strictly older than cutoff in applyposition
//         const expiredApplyPositions = await ApplyPosition.find({ createdAt: { $lt: cutoff } });

//         for (const applyPosition of expiredApplyPositions) {
//             if (applyPosition.fileUrl) {
//                 const absolutePath = path.isAbsolute(applyPosition.fileUrl)
//                     ? applyPosition.fileUrl
//                     : path.join(process.cwd(), applyPosition.fileUrl);


//                 try {
//                     await fs.promises.unlink(absolutePath);
//                     console.log(`🗑 Deleted file: ${absolutePath}`);
//                 } catch (err) {
//                     if (err.code !== 'ENOENT') {
//                         console.error("❌ File delete error:", err);
//                     } else {
//                         console.warn(`⚠️ File not found (already gone): ${absolutePath}`);
//                     }
//                 }
//             }

//             await ApplyPosition.findByIdAndDelete(applyPosition._id);
//             console.log(`🗑 Deleted record: ${applyPosition._id}`);
//         }

//         console.log(`✅ Cleanup complete in Aplly position. Removed ${expiredApplyPositions.length} records.`);



//     } catch (err) {
//         console.error("❌ Cleanup job error:", err);
//     }
// });

// job_delete_record_test.start();

module.exports = job_delete_record;

// module.exports = job_delete_record_test