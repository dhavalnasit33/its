"use client";

import React from "react";
import { motion as motionFramer } from "framer-motion";
import {
  SiWhatsapp,
  SiSlack,
  SiHubspot,
  SiSalesforce,
  SiShopify,
  SiZapier,
  SiZendesk,
  SiGoogledrive,
  SiWordpress,
  SiNotion,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import Row from "@/components/Row";
import Section from "@/components/Section";

const INTEGRATIONS = [
  { name: "WhatsApp", icon: SiWhatsapp, color: "#25D366" },
  { name: "Slack", icon: SiSlack, color: "#4A154B" },
  { name: "Microsoft Teams", icon: FaMicrosoft, color: "#6264A7" },
  { name: "Zendesk", icon: SiZendesk, color: "#03363D" },
  { name: "Salesforce", icon: SiSalesforce, color: "#00A1E0" },
  { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
  { name: "Shopify", icon: SiShopify, color: "#7AB55C" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B" },
  { name: "Google Drive", icon: SiGoogledrive, color: "#34A853" },
  { name: "Zapier", icon: SiZapier, color: "#FF4A00" },
  { name: "Notion", icon: SiNotion, color: "#000000" },
];

export default function Integrations() {
  return (
    <Section className="bg-white py-20!">
      <Row>
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motionFramer.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D27E2B] mb-5 shadow-sm"
          >
            Connected Ecosystem
          </motionFramer.span>
          <motionFramer.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="common-h2 text-[#0F172A]"
          >
            Seamless <span className="text-[#D27E2B]">Integrations</span>
          </motionFramer.h2>
          <div className="w-12 h-1 bg-[#D27E2B] mx-auto mt-4 rounded-full" />
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 max-w-5xl mx-auto">
          {INTEGRATIONS.map((integ, index) => {
            const Icon = integ.icon;
            return (
              <motionFramer.div
                key={integ.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-gray-200/80 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#D27E2B]/30 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-gray-100"
                  style={{ color: integ.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold text-[#0F172A]">{integ.name}</span>
              </motionFramer.div>
            );
          })}

          {/* Plus More Card */}
          <motionFramer.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: INTEGRATIONS.length * 0.04 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#0F172A] border border-[#0F172A] rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 shadow-md cursor-pointer hover:bg-[#D27E2B] hover:border-[#D27E2B] transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white/10 text-white">
              <LuPlus className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold text-white">+ More</span>
          </motionFramer.div>
        </div>
      </Row>
    </Section>
  );
}
