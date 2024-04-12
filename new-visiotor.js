document.addEventListener("DOMContentLoaded", function() {
    // Check if a cookie exists
    if (document.cookie.includes("visited=true")) {
        // Cookie exists, do not count as a new visit
        console.log("Returning visitor");
    } else {
        // Cookie doesn't exist, count as a new visit
        console.log("New visitor");
        
        // Set a cookie to indicate that the user has visited the site
        document.cookie = "visited=true; max-age=86400; path=/; SameSite=None; Secure"; // Expires in 1 hour (3600 seconds)
        
        // Increment the unique visitor count (you may want to send this to a server for storage)
        // For demonstration purposes, I'll just log it to the console
        let count = localStorage.getItem("uniqueVisitors") || 0;
        count++;
        localStorage.setItem("uniqueVisitors", count);
        console.log("Unique visitors: " + count);
    }
});