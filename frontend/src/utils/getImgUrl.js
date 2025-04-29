export const getImgUrl = (name) => {
    // Handle full URLs directly
    if (name.startsWith("http")) return name;
  
    // Return relative path for local images
    return `/books/${name}`;
  };



  