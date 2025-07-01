# 👨‍💻 Next.js Profile App

A profile management app built using **Next.js**, allowing users to create, update, and manage their personal profiles with interests.

## ✨ Features

- 👤 **Profile creation** with name, gender, birthday, height, weight
- 🌌 **Auto-generated Horoscope and Zodiac** from birthday
- 🧠 **State Management** using Zustand
- 🗂️ **Dynamic Interest Management**
  - Add/remove multiple interests
  - Temporarily stored in `localStorage`
- 💾 **Auto-routing** based on profile status
- 🧑‍🎨 Tailwind CSS for modern design

---

## 🔄 User Flow

1. **Authentication**
   - Users must authenticate first (via JWT stored in cookies).
   - After login, users are redirected to `/profile/main-profile`.

2. **Profile Existence Check**
   - If profile is not yet created, user is redirected to `/profile/create-profile`.

3. **Create Profile**
   - Users fill out profile details.
   - Horoscope and Zodiac are auto-filled based on birthday.
   - On submit, profile is saved to the backend.

4. **Manage Interests**
   - User can visit `/profile/interest-profile` to add/remove interests.
   - Interests are stored in `localStorage` until saved.
   - When saved, user is redirected to:
     - `/profile/create-profile` if profile was incomplete, or
     - `/profile/update-profile` if profile already existed.

5. **Update Profile**
   - User can modify all fields.
   - Interest data from `localStorage` is merged and saved to backend via `PUT /api/update-profile`.
   - On success, `localStorage` is cleared and user is redirected to `/profile/main-profile`.

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
---


## 🚀 Getting Started

```bash
npm install
npm run dev
