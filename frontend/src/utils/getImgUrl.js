export const getImgUrl = (name) => {
    if (!name) return "/books/default.jpg"; // fallback image
    // Handle full URLs directly
    if (name.startsWith("http")) return name;
  
    // Return relative path for local images
    return `/books/${name}`;
  };



  