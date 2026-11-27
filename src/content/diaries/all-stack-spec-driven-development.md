---
title: "All-stack, আর vibe coding কেন বন্ধ করছি"
description: "JoulesLabs-এ নতুন All-stack রোল, একজন ডেভেলপারের দুই প্রজেক্ট, আর vibe coding ছেড়ে spec-driven agentic development-এ যাওয়ার কথা।"
pubDate: 2026-11-27
category: ai
tags:
  - ai
  - all-stack
  - spec-driven
  - development
heroImage: "/images/all-stack-spec-driven-banner.webp"
heroImageAlt: "All-stack ও Spec-driven development নিয়ে ব্যানার চিত্র"
lang: bn
---

আপনারা অনেকেই জানেন, আমরা JoulesLabs-এ ইতিমধ্যেই আমাদের development আর business strategy AI-তে move করেছি। তারই ধারাবাহিকতায় হাউজে একটা নতুন রোল introduce করেছি। নাম দিয়েছি **All-stack**।

এই রোলটির কাজ হলো, এক সাবানই কাপড় কাচা, সেই সাবানই গোসল।

এখন আর আলাদা করে কোনো full-stack ডেভেলপার থাকবে না। একজন ডেভেলপারই প্রজেক্টের দিকগুলো দেখবেন।

- Backend করবেন
- Database design করবেন
- Infrastructure দেখবেন
- Frontend করবেন
- Security audit করবেন
- Product-এর QA করবেন
- Client communication-ও তিনি করবেন

কিছু ক্ষেত্রে product-এর জন্য market research-ও করবেন। Competitor analysis, এই টাইপের জায়গায় তিনিই কাজ করবেন। আমরা software service company, তাই এই রোল framework আর language agnostic।

এখানে কয়েকটা উদ্দেশ্য। একজন developer, যিনি সকল language বা সকল framework-এ কাজ করতে পারবেন। তিনি একাই almost সকল জায়গায় contribute করবেন। জুনিয়র আর মিড লেভেলের গ্যাপটাকে মিনিমাইজ করে ফেলা। ফাইনালি, একজন ডেভেলপার মিড লেভেলের দুটি প্রজেক্ট parallel হ্যান্ডেল করবেন।

## 🟢 সিনিয়র, Project Manager, DevOps কোথায়

তবে একটা বিষয় রেখেছি। প্রতিটা প্রজেক্টের সাথেই একজন সিনিয়র, একজন Project Manager, আর একজন DevOps involved থাকবেন। এরা on demand basis-এ guidance দিবেন। পুরো প্রজেক্টে তারা কোনো কাজ করবেন না।

সিনিয়র মূলত এই জায়গাগুলোতে কাজ করবেন।

- প্রজেক্ট bootstrapping করা
- প্রজেক্টের scope define করা
- প্রজেক্টের engineering design করা
- প্রজেক্টের security measure করা

Deployment-এর জন্য, বা deployment automation-এর জন্য, DevOps help করবেন। Critical জায়গায় Project Manager ক্লায়েন্টের সাথে communication করে দিবেন। আর বাকি পুরোটা manage করবেন আমাদের all-stack ডেভেলপার।

## 🟢 হাউজের ছোট পরীক্ষা

তাই এই বিষয়টা নিয়ে R&D করার জন্য হাউজে একটা ছোট পরীক্ষা চালিয়েছি। Recently একটা নতুন কাজ আসে। এই কাজটিতে পরিকল্পনা ছিল পুরোপুরি agentic development করা। Single একটা লাইনও কোনো developer লিখবেন না। সাথে ওই ডেভেলপার এমন language আর framework-এ কাজ করবেন, যেখানে তিনি আগে কখনো কাজ করেননি। আর সে একই সাথে দুটি প্রজেক্ট হ্যান্ডেল করবেন।

সিদ্ধান্ত নেই, house থেকে একজন .NET ডেভেলপারকে choose করার, যিনি অলরেডি আরেকটি প্রজেক্টে কমপ্লিটলি involve। Frontend-এ তার কাজের অভিজ্ঞতাও নেই। তাকে Laravel-এর একটা project দেয়া হলো, যেখানে Frontend, Backend, আর অন্যান্য কার্যাবলী রয়েছে।

এখানে আমরা দুটো জিনিস ভিন্ন করেছি। Vibe coding-এর পরিবর্তে পুরোটা spec-driven agentic development-এ চলে গেছি। প্রজেক্ট developer-কে handover করার আগে tools আর technology-র best practice ডিফাইন করে দিয়েছি। কি করা যাবে, কি করা যাবে না, সেটা strictly মেনশন করা হয়েছে। Proper harness রেডি করা, skillset সেটআপ করা, একটা complete PRD রেডি করা। এই কাজগুলো তাকে করে দেয়া হয়েছে।

আমাদের finding হচ্ছে, AI ব্যবহারের সবথেকে কঠিন পার্ট হচ্ছে AI-কে control করতে পারা। তাই AI কি করবে আর কি করতে পারবে না, সেই জিনিসটা কঠিনভাবে ডিফাইন করে দেয়া হয়েছে, যাতে developer আর Agent-এর ভুল হওয়ার সম্ভাবনা অনেকটা কমে যায়।

Spec-driven development-এর জন্য আমরা OpenSpec framework ব্যবহার করি। এখানে প্রতিটি feature-কে Git-এর commit-এর মতো ছোট ছোট করে নেয়া হয়। ফলে একেকটা feature development বেশ ছোট হয়। রিভিউ করা যায়। কোড সম্পর্কে ধারণা নেয়া যায়। Feature আর প্রজেক্টের context বোঝা সহজ হয়। হাতে কোড লিখলে পুরো প্রজেক্ট সম্পর্কে ডেভেলপারের যে লেভেলের ধারণা থাকে, এভাবে করলেও সেই লেভেলের ধারণা থাকে। আর Git-এর commit-গুলো specific আর readable হয়।

## 🟢 যা দেখেছি

যাই হোক, ফাইনালি এই R&D successfully শেষ হয়েছে। আমাদের .NET ডেভেলপার PHP, Laravel, আর NextJS Frontend application সফলভাবে সম্পন্ন করেছেন। সাথে তিনি আরেকটি বড় প্রজেক্টেও actively involve ছিলেন। অর্থাৎ parallelly দুটি প্রজেক্টের development সম্পন্ন করেছেন।

আমি যখন developer-এর সাথে কথা বলি, তখন দেখতে পাই আগের মতোই confidence আছে। আগে যখন হাতে code করতেন, তখন code আর product সম্পর্কে তার যে level-এর confidence ছিল, এখন এই project সম্পর্কেও সেই একই level। তিনি বলেন না, "এই feature-টা কিভাবে কাজ করে একটু দেখতে হবে", কিংবা "কেন issue হয়েছে, Claude-কে জিজ্ঞেস করতে হবে"।

এই R&D সফল হওয়ায় ধীরে ধীরে সবার উপরে এটা implement করার পরিকল্পনা করছি। এখন কোম্পানিতে vibe coding ধীরে ধীরে বন্ধ করার পথে। প্রতিটা developer-কে spec-driven development-এ forcefully move করানো হচ্ছে। যারা vibe coding করেন, আর যারা spec-driven development করেন, এই দুইয়ের পার্থক্য চোখে পড়ার মতো। আর ধীরে ধীরে আমাদের সকল ডেভেলপারকে All-stack ডেভেলপার হিসেবে শিফট করানো হচ্ছে।

আসলে, জীবন যেখানে যেমন সেভাবেই চলতে হয়, আর কি 🙂
