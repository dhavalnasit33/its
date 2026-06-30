"use client";

import React from "react";
import { FAQS } from "@/data/constants";
import CommonFAQ from "@/components/FAQ";

export default function FAQ() {
  return <CommonFAQ faqs={FAQS} />;
}

