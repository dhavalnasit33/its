require("dotenv").config();
const mongoose = require("mongoose");
const Enquiry = require("../models/enquiry/Enquiry");
const OpenningPosition = require("../models/career/openningPosition");

const url = process.env.MONGO_URI || 'mongodb+srv://ITS:Dishant%4012345@cluster0.vyareyd.mongodb.net/ITS?retryWrites=true&w=majority';

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("✅ Connected to MongoDB");

        // Clear existing enquiries to start fresh for test
        console.log("Clearing existing enquiries...");
        await Enquiry.deleteMany({});
        console.log("🧹 Cleared old enquiries.");

        // Fetch or create a dummy opening position for career references
        let position = await OpenningPosition.findOne();
        if (!position) {
            console.log("No OpeningPosition found. Creating a temporary one for testing references...");
            position = await OpenningPosition.create({
                name: "Senior MERN Stack Developer",
                openning: ["2"],
                qualifications: "B.Tech/M.Tech in CS/IT or equivalent",
                experience: "3 Years - 4 Years"
            });
            console.log(`Created temporary job opening: ${position._id}`);
        }

        const positionId = position._id;

        const testData = [
            // ==================== CAREER FORMS ====================
            {
                type: "Career",
                name: "Amit Sharma",
                email: "amit.sharma@example.com",
                phone: "+91-9876543210",
                message: "I am a skilled MERN developer with 4 years of experience building scalable SaaS products.",
                graduation: "B.Tech in Computer Science",
                experience: "3 Years - 4 Years",
                positionApplied: positionId,
                currentCTC: "8.5 LPA",
                noticePeriod: "1 Month",
                source: "career_page",
                status: "Pending"
            },
            {
                type: "Career",
                name: "Priya Patel",
                email: "priya.patel@example.com",
                phone: "+91-8765432109",
                message: "Highly motivated UI/UX designer. I love creating beautiful, user-centered digital interfaces.",
                graduation: "Master of Design (M.Des)",
                experience: "2 Years - 3 Years",
                positionApplied: positionId,
                currentCTC: "6.0 LPA",
                noticePeriod: "Immediate Joiner",
                source: "career_page",
                status: "Reviewed"
            },
            {
                type: "Career",
                name: "Rohan Mehta",
                email: "rohan.mehta@example.com",
                phone: "+91-7654321098",
                message: "Applying for the Mobile App Developer opening. Strong skills in React Native and Flutter.",
                graduation: "BCA",
                experience: "1 Year - 2 Years",
                positionApplied: positionId,
                currentCTC: "4.5 LPA",
                noticePeriod: "15 Days",
                source: "career_page",
                status: "Contacted",
                adminNotes: "Good profile. Interview scheduled for Tuesday at 3 PM."
            },
            {
                type: "Career",
                name: "Sneha Reddy",
                email: "sneha.reddy@example.com",
                phone: "+91-6543210987",
                message: "Fresh graduate with excellent node.js knowledge and coding contest achievements.",
                graduation: "B.Tech in Information Technology",
                experience: "Fresher",
                positionApplied: positionId,
                currentCTC: "0 LPA",
                noticePeriod: "Immediate Joiner",
                source: "career_page",
                status: "Pending"
            },

            // ==================== TRAINING FORMS ====================
            {
                type: "Training",
                name: "Vikram Malhotra",
                email: "vikram.m@example.com",
                phone: "+91-9543216789",
                message: "I want to join the Full Stack Development weekend batch. Please share details regarding fees.",
                selectedCourse: "Full Stack Development",
                location: "Ahmedabad",
                source: "training_page",
                status: "Pending"
            },
            {
                type: "Training",
                name: "Anjali Verma",
                email: "anjali.v@example.com",
                phone: "+91-9432187654",
                message: "Looking for Mobile App Development course with job assistance. Let me know if demo sessions are available.",
                selectedCourse: "Mobile App Development",
                location: "Surat",
                source: "training_page",
                status: "Contacted",
                adminNotes: "Sent course catalog and batch options. Callback on Friday."
            },
            {
                type: "Training",
                name: "Divyesh Solanki",
                email: "divyesh@example.com",
                phone: "+91-9321098765",
                message: "Interested in UI/UX Design course. Do you offer online interactive classes?",
                selectedCourse: "UI/UX Design",
                location: "Vadodara",
                source: "training_page",
                status: "Reviewed"
            },
            {
                type: "Training",
                name: "Meera Nair",
                email: "meera.nair@example.com",
                phone: "+91-9210987654",
                message: "I want to learn frontend React from basics. Please suggest a suitable course.",
                selectedCourse: "Web Development",
                location: "Rajkot",
                source: "training_page",
                status: "Pending"
            },

            // ==================== CONTACT FORMS ====================
            {
                type: "Contact",
                name: "John Miller",
                firstname: "John",
                lastname: "Miller",
                email: "john@nexustech.com",
                phone: "+1-415-555-2671",
                subject: "Hire Developer(s)",
                budget: "$5,000 - $10,000",
                message: "Looking to outsource our React frontend dashboard maintenance. Need 2 developers for a 3-month contract.",
                source: "contact_page",
                status: "Pending"
            },
            {
                type: "Contact",
                name: "Karan Johar",
                firstname: "Karan",
                lastname: "Johar",
                email: "karan.j@productions.in",
                phone: "+91-9988776655",
                subject: "Web Development",
                budget: "₹2,00,000 - ₹5,00,000",
                message: "Need a beautiful production portfolio website with rich video integration and high performance SEO.",
                source: "footer_form",
                status: "Contacted",
                adminNotes: "Client wants a very premium look. Setup meeting with tech leads."
            },
            {
                type: "Contact",
                name: "Sarah Jenkins",
                firstname: "Sarah",
                lastname: "Jenkins",
                email: "sarah.j@glowfitness.com",
                phone: "+1-202-555-0143",
                subject: "Mobile App Development",
                budget: "$15,000 - $25,000",
                message: "We need a hybrid fitness tracking app for Android and iOS devices. Connected to wearable APIs.",
                source: "contact_page",
                status: "Pending"
            },
            {
                type: "Contact",
                name: "Rajesh Gupta",
                firstname: "Rajesh",
                lastname: "Gupta",
                email: "rgupta@traders.com",
                phone: "+91-9898989898",
                subject: "Other Services",
                budget: "₹50,000 - ₹1,00,000",
                message: "Need custom CRM integration for our distribution network.",
                source: "footer_form",
                status: "Closed",
                adminNotes: "Completed requirement gathering. Closed because the client decided to go with internal tools."
            },

            // ==================== HIRE FORMS ====================
            {
                type: "Hire",
                name: "David Hales",
                email: "david@halescorp.org",
                phone: "+44-20-7946-0958",
                subject: "E-Commerce Web Application Development",
                recruitment: "Dedicated Full-Stack Developer Team (React + Node + Shopify)",
                message: "We are migrating our legacy brick-and-mortar operations to a fully custom Shopify headless app. Seeking 3 developers.",
                source: "hire_page",
                status: "Pending"
            },
            {
                type: "Hire",
                name: "Nikhil Chawla",
                email: "nikhil.chawla@fintechlabs.in",
                phone: "+91-9560012345",
                subject: "Fintech Mobile Application",
                recruitment: "Senior Flutter Developers + QA Engineers",
                message: "Building a micro-lending application. Security and offline sync are highly critical features.",
                source: "hire_page",
                status: "Reviewed"
            },
            {
                type: "Hire",
                name: "Elena Rostova",
                email: "elena@novasystems.io",
                phone: "+357-22-345678",
                subject: "Enterprise SaaS Portal Design & Dev",
                recruitment: "UI/UX Designers + React Frontend Developers",
                message: "Looking for team extensions to deliver high-fidelity designs and interactive components for our CRM suite.",
                source: "hire_page",
                status: "Contacted",
                adminNotes: "Call scheduled for Thursday at 4 PM IST to discuss rate cards."
            }
        ];

        console.log("Inserting 15 unified test enquiries...");
        const result = await Enquiry.insertMany(testData);
        console.log(`🎉 Seeded successfully! Inserted ${result.length} test enquiries!`);

    } catch (err) {
        console.error("❌ Seed failed:", err);
    } finally {
        await mongoose.connection.close();
        console.log("Disconnected from MongoDB.");
    }
}

seed();
