document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".nav-button");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSection = document.querySelector(button.getAttribute("href"));
            
            // Add refresh effect
            document.body.style.opacity = "0";
            setTimeout(() => {
                document.body.style.opacity = "1";
                targetSection.scrollIntoView({ behavior: "smooth" });
            }, 300); // Simulates e-ink refresh delay
        });
    });
});
