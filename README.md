# 🌾 Kisan-Vibe: AI Guardian for Farmers

> **Submission for:** Google DeepMind "Vibe Code" with Gemini 3 Pro Hackathon

**Kisan-Vibe** is an AI-powered agricultural assistant that acts as both an expert **Agronomist** and a **Legal/Financial Advisor**. It uses Google's Gemini 3 Pro to democratize agricultural science and eliminate the bureaucratic hurdles of crop insurance for Indian farmers.

[![Demo Video](https://img.shields.io/badge/Watch-Demo_Video-red?style=for-the-badge&logo=youtube)](YOUR_YOUTUBE_VIDEO_LINK_HERE)
---

## 🚨 The Problem
In India, farmers face a dual tragedy:
1.  **Crop Loss:** Diseases like Blight or Rust destroy seasons.
2.  **Financial Loss:** Despite government insurance schemes (like *PMFBY*), **70% of claims are rejected** due to complex paperwork, lack of evidence, and inability to prove localized calamity.

## 💡 The Solution
Kisan-Vibe uses **Multimodal AI (Gemini 2.0 Flash Experimental)** to bridge the gap.
* **For the Farmer:** It diagnoses the disease from a photo AND instantly matches it to the specific government insurance clause that covers that loss.
* **For the Government:** It provides a fraud-proof, geo-tagged "Proof of Loss" and a real-time heatmap of disease outbreaks.

---

## ✨ Key Features

### 1. 🧪 AI Crop Doctor (Science)
* **Instant Diagnosis:** Identifies crop diseases (e.g., *Alternaria solani*) with scientific accuracy using Gemini Vision.
* **Severity Scoring:** Analyzes lesion patterns to determine if the damage is "Claim-Worthy."

### 2. 📜 Bureaucracy Breaker (Business)
* **Scheme Matcher:** Automatically cross-references the visual diagnosis with complex government policy PDFs.
* **1-Click Claim:** Pre-fills insurance forms with technical data, reducing rejection rates.

### 3. 🛡️ Trust & Verification
* **Geo-Tagging:** Captures immutable location and time metadata to prove the farmer was at the field.
* **Fraud Detection:** AI verifies if the image is original or downloaded.

### 4. 🌍 Regional Risk Radar
* **Community Impact:** Every scan contributes to a live dashboard, warning nearby farmers of spreading outbreaks.

---

## 🛠️ Tech Stack

* **AI Engine:** Google Gemini 2.0 Flash Experimental (via Google AI Studio)
* **Frontend:** Next.js / React (Vibe Coded)
* **Styling:** Tailwind CSS

---

## 🚀 Run Locally

This project contains everything you need to run the app locally.

**Prerequisites:** Node.js installed.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Configure API Key:**
    Create a `.env.local` file in the root directory and add your Gemini API key:
    ```bash
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run the app:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Visit `http://localhost:3000` to see the app running.

---

## 🧠 How We Used Gemini
We utilized **Gemini 2.0 Flash** for its "System 2" reasoning capabilities:
1.  **Vision Analysis:** To distinguish between nutrient deficiency and fungal infection from a simple photo.
2.  **Document Reasoning:** To parse dense government PDFs and extract specific eligibility clauses relevant to the user's specific crop loss.

---


---

Made with ❤️ and 🤖 using Google AI Studio.
