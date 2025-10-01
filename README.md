# Scrapple

Scrapple is a full-stack Instagram profile analytics and scraping tool. It provides deep insights into any public Instagram profile, including engagement metrics, audience demographics, and content performance, all through a modern, responsive UI.

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, recharts
- **Backend:** Node.js (Next.js API routes)
- **Database:** MongoDB (via Mongoose)
- **AI Analysis:** Gemini AI (Google GenAI API)
- **Notifications:** react-toastify
- **Image Optimization:** next/image, custom proxy API for CORS
- **Web Scraping:** Puppeteer

---

## 🛠️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Subhamk2004/scrapple-InstaScrapper.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env` file in the root directory.
   - Add your MongoDB URI and Gemini/Google GenAI or use the provided below
    API key:
     ```
     MONGODB_URI=mongodb+srv://subhamrahar22_db_user:eJJZOfNK1mV8A0RA@instanalyze.jn4p0fy.mongodb.net/?retryWrites=true&w=majority&appName=instanalyze
     GEMINI_API_KEY=AIzaSyAR32U1CxcDta6ToexQh080CCk1Bdys0gw
     MAX_POSTS=6
     ```
     for `MAX_POSTS`, you can set a value between 1 and 10 to limit the number of posts to scrape and analyze, by default it is set to 6
     

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   - Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Project Flow & Architecture

### 1. **User Interaction**
- **Recent Users:**  
  - Users can select from a list of recently analyzed Instagram usernames.
  - Selecting a recent username fetches cached data instantly from MongoDB.
- **Search:**  
  - Users can search for any Instagram username.
  - If the username is new (not in cache), the full scraping and analysis pipeline runs.
  - If the username is cached, users can press the **Refresh** button to re-run the pipeline for fresh data.

### 2. **Scraping & Analysis Pipeline**
When a fresh scrape is triggered (new search or refresh), the following steps run via the `/api/scrape` endpoint:

1. **Agent Initialization:**  
   - Prepares the scraping environment and workflow.
2. **Browser Initialization:**  
   - Launches a Puppeteer browser instance.
3. **Module Setup:**  
   - Initializes scraping modules: `popupHandler`, `postScraper`, `profileScraper`.
4. **Profile Navigation:**  
   - Attempts to visit the target Instagram profile, with 2–4 retries for reliability.
5. **Popup Handling:**  
   - Closes any popups that appear after opening the profile.
6. **Profile Information Extraction:**  
   - Scrapes public profile details (bio, followers, etc.).
7. **Post Scraping:**  
   - Scrapes posts and engagement metrics, respecting the MAX_POSTS cap.
8. **AI Analysis:**  
   - Uses Gemini AI to analyze post content, mood, and engagement.
   - Infers demographic insights (geography, gender, age groups).

### 3. **Data Storage & Retrieval**
- Scraped and analyzed data is saved to MongoDB.
- Subsequent searches for the same username return cached data instantly.
- Users can refresh to update the data with a new scrape.

### 4. **Frontend Visualization**
- Displays profile details, analytics dashboard, post grid, recent users, and demographic insights in a clean, interactive UI.
- Indicates when data is cached, with a refresh option for live updates.

### 5. **Optimizations**
- **Caching:** MongoDB for fast repeat access.
- **Image Proxy:** Custom API proxies Instagram images to avoid CORS issues.
- **Font & Resource Preloading:** Improves load times.
- **Responsive UI:** Tailwind CSS for mobile/desktop compatibility.
- **Error Handling:** Robust error messages and toast notifications.

---

## 📊 Features & Data Shown

- **Profile Overview:** Username, display name, profile picture, bio, followers, following, post count, user profile insta redirection.
- **Post Analytics:** Average Likes, Average comments, posts analyzed, engagement rate, hashtags, post type.
- **AI Insights:** Content vibes, post quality analysis, color metrics, overall content mood.
- **Audience Demographics:** Geographic distribution, gender breakdown, age groups (inferred via AI).
- **Post breakdown:** Individual post metrics including likes, comments, AI-generated insights, post vibes, post caption, mood, hashtags.
- **Optimized Images:** All images are loaded via a proxy for speed and reliability.
- **Cache Indicator:** Shows when data is from cache, with option to refresh.
- **Recent Users:** Quick access to recently analyzed profiles.

---

## ⚡ Optimization Techniques

- **Database Caching:** Reduces redundant scraping and speeds up repeat queries.
- **Image Proxying:** Solves CORS issues and improves LCP (Largest Contentful Paint).
- **Preconnect/DNS Prefetch:** Minimizes resource load times for fonts and analytics.
- **Error Handling:** All API and UI actions are wrapped with robust error management.

---

## 📝 Notes

- Scrapple only works with public Instagram profiles.
- Scrapple by defaults scrapes only 6 posts, but this can be adjusted and can be increased to 10 max posts.
- More posts scraping and analysis will require more time and resources.
- For scraping 6 posts, it takes around 3-4 minutes, for maximum 10 posts it can take up to 6-7 minutes.
- More post analysis can limit the LLM.

---

## 📦 Deployment

- Scrapple is deployed on the link: https://ruthie-endocrinous-kolton.ngrok-free.dev/

---

## 🖐 Developer

Built by Subham Kumar

---
