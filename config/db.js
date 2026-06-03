// MongoDB connection using Mongoose (CommonJS)
const mongoose = require('mongoose');
// const url = process.env.MONGO_URI || 'mongodb://localhost:27017/ITS';
const url = process.env.MONGO_URI || 'mongodb+srv://ITS:Dishant%4012345@cluster0.vyareyd.mongodb.net/ITS?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('✅ Connected to MongoDB');
        
        // try {
        //     const db = mongoose.connection.db;
        //     const collections = await db.listCollections().toArray();
        //     const collectionNames = collections.map(c => c.name);

        //     // 1. Proactive migration from 'seomanagers' to 'manage-seo'
        //     if (collectionNames.includes('seomanagers')) {
        //         const sourceCol = db.collection('seomanagers');
        //         const targetCol = db.collection('manage-seo');

        //         const hasTarget = collectionNames.includes('manage-seo');
        //         const targetCount = hasTarget ? await targetCol.countDocuments() : 0;

        //         if (targetCount === 0) {
        //             const sourceCount = await sourceCol.countDocuments();
        //             if (sourceCount > 0) {
        //                 console.log(`🚀 Proactive Migration: Copying ${sourceCount} records from 'seomanagers' to 'manage-seo'...`);
        //                 const docs = await sourceCol.find({}).toArray();
        //                 await targetCol.insertMany(docs);
        //                 console.log('✅ Migration copy completed successfully.');
        //             }
        //         }
        //     }

        //     // 2. Initialize systemIdentifier values for standard pages
        //     const targetCol = db.collection('manage-seo');
        //     const staticMapping = {
        //         'home': 'home',
        //         'homepage': 'home',
        //         'about-us': 'about-us',
        //         'career': 'career',
        //         'contact': 'contact',
        //         'faqs': 'faqs',
        //         'blog': 'blog',
        //         'our-portfolio': 'portfolio',
        //         'portfolio': 'portfolio',
        //         'our-services': 'services',
        //         'our-service': 'services',
        //         'training': 'training',
        //         'hire': 'hire'
        //     };

        //     for (const [slug, identifier] of Object.entries(staticMapping)) {
        //         await targetCol.updateOne(
        //             { slug: slug, linkedType: 'independent' },
        //             { $set: { systemIdentifier: identifier } }
        //         );
        //     }
        //     console.log('✅ System identifiers synced in manage-seo.');
        // } catch (migrationError) {
        //     console.error('❌ Proactive database migration or sync error:', migrationError);
        // }
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));

    
    