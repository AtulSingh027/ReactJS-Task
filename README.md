

## 🛠️ Getting Started


### 1. **Install Dependencies**

Make sure you have [Node.js](https://nodejs.org/) installed.

```
npm install
```

### 2. **Start the Development Server**

```
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
src/
  Data/
    apiData.jsx         # Context provider for API data
  Pages/
    Home.jsx            # Home page with stories grid and filters
    Cards.jsx           # (Optional) Cards page for stories
    Story.jsx           # Story detail page with tabs
  App.jsx               # Main app with routing
```

---

## 🌐 API Endpoints Used

- **All Stories:**  
  `https://mxpertztestapi.onrender.com/api/sciencefiction`

- **Single Story by ID:**  
  `https://mxpertztestapi.onrender.com/api/sciencefiction/{id}`

- **Images:**  
  `https://ik.imagekit.io/dev24/{imageFileName}`

---

## 🖌️ Customization

- Update the API endpoints in `apiData.jsx` if needed.
- Tailwind CSS is used for styling. You can customize styles in your components.

---

## 📜 Scripts

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm run test` - Run tests (if any)


## 🙏 Credits

- [ReactJS](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ImageKit](https://imagekit.io/)
- [Mxpertz Test API](https://mxpertztestapi.onrender.com/)

---
