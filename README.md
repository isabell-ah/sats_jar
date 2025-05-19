

# Bitcoin Piggy Bank (Sats Jar)

**A Lightning Network-Powered Financial Education App for Families**

---

## Project Overview

**Bitcoin Piggy Bank (Sats Jar)** is a mobile application designed to help families teach children financial literacy by combining interactive education with real Bitcoin savings. The app is secured through multisignature wallet architecture and features dual interfaces tailored for both parents and children. It delivers a hands-on, gamified savings experience that evolves as children grow, introducing them to digital currency and long-term financial responsibility.

---

## Vision

To create a global financial education platform that empowers children to save, learn, and grow with Bitcoin, while giving parents the tools to guide and support their journey.

---

## Core Components

### Mobile App with Dual Interfaces

A single application that adapts its interface depending on the user role at login.

**Child Interface:**

* Simplified layout tailored to the child’s age group.
* A dynamic user experience that evolves with the child's development.
* Visual goal-setting and animated progress tracking.
* Educational missions and financial literacy challenges.
* QR code scanning for receiving Lightning payments.

**Parent Interface:**

* Dashboard for monitoring savings progress.
* Tools for setting goals, approving withdrawals, and matching contributions.
* Controls for permissions, spending limits, and notifications.
* Access to educational resources and insights on child engagement.

---

## Multisignature Lightning Wallet

A 2-of-3 multisignature architecture that provides security and parental oversight:

* Child Key: Limited access, used for educational purposes.
* Parent Key: Full control and transaction approval.
* Backup Key: Held by a trusted third party or for secure recovery.

**Withdrawal Permissions:**

* Micro withdrawals: Optional child-only access.
* Standard withdrawals: Require both child and parent approval.
* High-value withdrawals or security changes: Require parent and backup key approval.

---

## Educational Features

* Age-specific financial education content.
* Interactive "money missions" to teach core financial principles.
* Quizzes with performance feedback and in-app incentives.
* Guided learning tracks covering savings, goal-setting, Bitcoin fundamentals, and more.
* Tools for encouraging family discussions around money and responsibility.

---

## System Architecture

### Backend Services

* Lightning Network Infrastructure for managing payment channels and transactions.
* Multisignature Wallet System for key management and role-based controls.
* Application Server handling user authentication, session management, content delivery, and analytics.

### Frontend

* Built entirely in React.
* Responsive mobile-first design.
* Interface adapts based on user role and child's age.
* Lightweight, intuitive, and gamified for ease of use.

---

## Security and Parental Controls

* Role-based access ensures differentiated privileges for children and parents.
* Tiered permission structure with enforced spending limits.
* Secure key backup and recovery system.
* QR code scanning for Bitcoin deposits with transaction alerts.
* Activity logging and oversight tools within the parent dashboard.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---


