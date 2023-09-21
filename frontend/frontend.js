document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const loginForm = document.getElementById("loginForm");
    const userList = document.getElementById("userList");

    registrationForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch("/auth/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
        }
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            alert(`Token: ${data.token}`);
        } catch (error) {
            console.error(error);
        }
    });

    // Fetch user list (requires admin role)
    fetch("/auth/users", {
        headers: {
            Authorization: `Bearer YOUR_JWT_TOKEN`, // Include a valid JWT token here
        },
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((user) => {
                const li = document.createElement("li");
                li.textContent = user.username;
                userList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error(error);
        });
});
