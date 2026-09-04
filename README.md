# 🇮🇳 Rojgar — Cooperative Gig-Services Platform
> **Smart India Hackathon (SIH 2026) — Problem Statement #26089**  
> *Cooperative Gig-Services Platform for Household and Community Services*  
> **Slogan:** *Kaam bhi, Samman bhi* (Work with Dignity, Fair Compensation, Collective Ownership)

[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-8.5%20(Android)-119EFF?logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Problem Statement Overview
Conventional commercial gig platforms (Urban Company, TaskRabbit, Handy) enforce extractive economic models on informal blue-collar laborers:
- **High Commissions:** 20% to 35% commission extracted from every transaction.
- **Algorithmic Disenfranchisement:** Arbitrary worker deactivations without appeal mechanisms or due process.
- **Absence of Social Security:** Zero health insurance, pension allocation, or sick leave provisions for gig laborers.
- **Worker Alienation:** Workers have no equity, ownership, or voting power in platform governance.

---

## 🌟 The Rojgar Solution
**Rojgar** reimagines gig labor by placing local labor cooperatives, artisan guilds, and Self-Help Group (SHG) federations at the core of the digital economy:
- **0% Extractive Platform Fee:** No predatory corporate middle-man skimming.
- **88% Direct Worker Take-Home:** Fair pricing model ensuring workers earn substantially higher hourly rates.
- **12% Cooperative Welfare & Healthcare Pool:** Automatically allocated into a municipal/ward-level cooperative reserve for accident insurance, health security, equipment subsidies, and retirement dividends.
- **Democratic Governance:** One-member, one-vote model governed by local Cooperative Societies.
- **Tri-Role Multi-Tenant Architecture:** Seamless, dedicated interfaces for **Customers**, **Workers**, and **Cooperative Society Administrators**.
- **Mobile-First & Trilingual:** Designed for India's vernacular mobile workforce with instantaneous English, Hindi (हिंदी), and Marathi (मराठी) localization.

---

## 🏗️ System Architecture

### Tri-Role Portals
1. **Customer Portal:**
   - On-demand worker discovery with proximity (km), ratings, and verification badges.
   - Interactive booking wizard with transparent fee breakdown (88% worker, 12% welfare fund, 0% platform fee).
   - Real-time job tracking with Arrival OTP verification.
   - GST & cooperative billing statements.
   - Direct ward cooperative helpdesk & SOS support.

2. **Worker Partner Portal:**
   - Dispatched jobs management with navigation to customer addresses.
   - Arrival and completion OTP verification to protect against fraudulent cancellations.
   - Incoming job requests with a 5-minute countdown acceptance window.
   - Transparent dispute handling interface with ward council arbitration.
   - Digital Cooperative ID card, NSDC skill certifications, and equity tier voting shares.

3. **Cooperative Management Dashboard:**
   - Ward executive command center with active jobs, revenue metrics, and welfare fund totals.
   - Member roster management, trade approvals, and dividend payouts.
   - Ward-wide booking dispatch oversight.
   - Democratic arbitration tribunal for customer-worker dispute resolution.

---

## 📱 Mobile Architecture (Capacitor Android)
- **Application ID:** `com.rojgar.app`
- **Native Target:** Android SDK with Gradle 8.14 wrapper.
- **Responsive Design:** Mobile-first layout with bottom tab navigation, persistent mobile header, and slide-out notifications.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / yarn
- Android Studio (for native Android APK builds)

### Installation
```bash
# Clone the repository
git clone https://github.com/ADSIB7/SolutionX-SIH2026.git
cd SolutionX-SIH2026

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Running Native Android App
```bash
# Sync web build to native Android directory
npx cap sync android

# Open project in Android Studio
npx cap open android
```

---

## 👥 Contributors

| Contributor | GitHub Username | Role |
|---|---|---|
| **Aryan Shendage** | [@ADSIB7](https://github.com/ADSIB7) | Project Lead & Full-Stack Development |
| **Srushti** | [@srushti6219](https://github.com/srushti6219) | Frontend Architecture & UI Design |
| **Shailesh** | [@shaileshXcode](https://github.com/shaileshXcode) | Contributor & Core Development |
| **Jaydeep Patare** | [@jaydeeppatare](https://github.com/jaydeeppatare) | Contributor & Core Development |

---

## 📄 License
Developed for **Smart India Hackathon 2026**.

