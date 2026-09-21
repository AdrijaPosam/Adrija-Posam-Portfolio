# Adrija Posam - Personal Portfolio Website

A modern, responsive, and high-performance personal portfolio website built for **Adrija Posam**, Computer Science Engineering (AIML Specialisation) student at GITAM University.

## 🌟 Highlights & Features

- **Academic Distinction**: Prominently showcases 9.47 CGPA at GITAM University (2024–2028).
- **Core Technical Focus**: Highlights Java, Python, MySQL, and core computer science foundations (Operating Systems, OOP, Computer Architecture).
- **Leadership & Community Timeline**:
  - Social Media Intern — TMCG, GITAM University (2026)
  - Sublead for Outreach — Homecoming 2025 (Directorate of External Relations)
  - Volunteer — Convocation Ceremony (2025)
  - Public Relations Member — Meta Developer Communities Club
  - Marketing Member — Vastranova SIG
- **Interactive UI**:
  - 🌓 **Dark / Light Mode** switcher with automatic system preference detection & local storage persistence.
  - 🔍 **Interactive Skills Filter** allowing visitors to view skills by category (Programming, Core CS, Database, Soft Skills).
  - 📊 **Animated Metrics Counters** for CGPA, campus roles, club positions, and graduation year.
  - 📋 **1-Click Copy to Clipboard** for Email and Phone number with custom toast notifications.
  - 📱 **Fully Responsive Layout** with a smooth mobile drawer navigation menu.
  - 🖨️ **Print & PDF Resume Optimization**: Pressing `Ctrl + P` or clicking "Resume / PDF" formats the page into a clean, distraction-free resume document.

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch (Zero Installation)
Simply double-click [`index.html`](index.html) or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option 2: Run with Python Local HTTP Server
Run the following in PowerShell or terminal inside this directory:
```powershell
python -m http.server 3000
```
Then visit: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Free Deployment Options

### Deploy to GitHub Pages (Recommended)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, select source: **Deploy from a branch**.
   - Select branch: `main` and folder: `/ (root)`, then click **Save**.
   - Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

### Deploy to Netlify / Vercel
- **Netlify**: Drag and drop the `adrija-posam-portfolio` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Import the GitHub repository on [vercel.com](https://vercel.com) with standard static project defaults.

---

## 🛠️ Project Structure

```
adrija-posam-portfolio/
├── index.html         # Main semantic HTML5 webpage
├── css/
│   └── styles.css     # Theme variables, glassmorphism, animations & print stylesheet
├── js/
│   └── main.js        # Theme toggler, counters, skill filters, copy utility, mobile drawer
└── README.md          # Documentation & deployment guide
```

---

## 📬 Contact Details Integrated
- **Email**: `adrijaposam@gmail.com`
- **Phone**: `+91 8106698963`
- **LinkedIn**: [linkedin.com/in/adrija-posam](https://linkedin.com/in/adrija-posam)
- **Location**: Visakhapatnam, Andhra Pradesh, India
