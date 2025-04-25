const getBaseUrl = () => {
    return import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://your-backend-url.vercel.app";
  };
  
  export default getBaseUrl;
  