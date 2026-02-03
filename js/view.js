// js/view.js

// 1. Get the Question ID from the URL
const params = new URLSearchParams(window.location.search);
const qId = params.get("id");

document.addEventListener("DOMContentLoaded", async () => {
    if (!qId) {
        alert("No question specified!");
        window.location.href = "index.html";
        return;
    }

    const token = getToken(); // Ensure util.js is loaded

    // Toggle Login/Logout Buttons
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const answerFormSection = document.getElementById("answer-form-section");

    if (loginBtn) loginBtn.style.display = token ? "none" : "inline-block";
    if (logoutBtn) logoutBtn.style.display = token ? "inline-block" : "none";

    // Hide Answer Form if not logged in
    if (!token && answerFormSection) {
        answerFormSection.style.display = "none";
    }

    await loadQuestion();
    await loadAnswers();

    document.getElementById("answer-form")?.addEventListener("submit", postAnswer);
});

// --- LOAD QUESTION (USING YOUR ORIGINAL LOGIC) ---
async function loadQuestion() {
    try {
        // 1. Fetch ALL questions (Since your backend might not support fetching just one)
        const res = await fetch(`${API_BASE}/questions`);
        
        if (!res.ok) throw new Error("Failed to fetch questions");

        const questions = await res.json();
        
        // 2. Find the specific question using Javascript
        const question = questions.find(q => q._id === qId);

        if (!question) {
            document.getElementById("q-title").innerText = "Question not found";
            document.getElementById("q-description").innerText = "This question may have been deleted.";
            return;
        }

        // 3. Update the UI with the data
        document.getElementById("q-title").innerText = question.title;
        document.getElementById("q-description").innerHTML = question.description; // careful with innerHTML security
        
        // Handle Author
        const authorName = question.author ? question.author.username : "Anonymous";
        document.getElementById("q-author").innerText = authorName;

        // 4. Generate Tag Pills (The New Design)
        const tagsContainer = document.getElementById("q-tags");
        if (question.tags && question.tags.length > 0) {
            // Check if tags is a string or array
            let tagsArray = Array.isArray(question.tags) ? question.tags : question.tags.split(',');
            
            tagsContainer.innerHTML = tagsArray
                .map(tag => `<span class="tag">#${tag.trim()}</span>`)
                .join("");
        } else {
            tagsContainer.innerHTML = "<span class='tag'>General</span>";
        }

    } catch (err) {
        console.error("Error loading question:", err);
        document.getElementById("q-title").innerText = "Error Loading Question";
    }
}

// --- LOAD ANSWERS (Updated with Thumbs Up/Down) ---
async function loadAnswers() {
    const list = document.getElementById("answers-list");
    
    try {
        const res = await fetch(`${API_BASE}/answers/${qId}`);
        const answers = await res.json();

        list.innerHTML = ""; 

        if (answers.length === 0) {
            list.innerHTML = "<p style='color:#cbd5e1; font-style:italic;'>No answers yet. Be the first to help!</p>";
            return;
        }

        answers.forEach(a => {
            const card = document.createElement("div");
            card.className = "answer-card"; 

            const date = new Date(a.createdAt).toLocaleDateString();
            const author = a.author ? a.author.username : "User";
            const voteCount = (a.upvotes || 0) - (a.downvotes || 0);

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; color:#94a3b8; font-size:0.85rem; margin-bottom:10px;">
                    <span><strong>${author}</strong> answered on ${date}</span>
                </div>
                
                <p style="margin-bottom:15px; font-size: 1rem; color: #e2e8f0;">${a.content}</p>
                
                <div style="display:flex; gap:15px; align-items:center; border-top:1px solid rgba(255,255,255,0.1); padding-top:12px;">
                    <span style="font-weight:bold; color: #fff; margin-right: 5px;">${voteCount} Votes</span>
                    
                    <button onclick="vote('${a._id}', 'up')" class="vote-btn up-btn">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    
                    <button onclick="vote('${a._id}', 'down')" class="vote-btn down-btn">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                </div>
            `;
            list.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        list.innerHTML = "<p style='color:red;'>Error loading answers.</p>";
    }
}
// --- POST ANSWER ---
async function postAnswer(e) {
    e.preventDefault();
    const contentInput = document.getElementById("answer-input");
    const content = contentInput.value;
    const errorBox = document.getElementById("answer-error");
    const token = getToken();

    if (!token) return (errorBox.innerText = "Login required to post.");

    try {
        const res = await fetch(`${API_BASE}/answers/${qId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        });

        const data = await res.json();
        if (!res.ok) return (errorBox.innerText = data.message);

        document.getElementById("answer-form").reset();
        errorBox.style.color = "#4ade80";
        errorBox.innerText = "Posted successfully!";
        setTimeout(() => (errorBox.innerText = ""), 3000);
        
        loadAnswers(); // Reload
    } catch {
        errorBox.innerText = "Failed to post answer";
    }
}

// --- VOTE ---
async function vote(answerId, type) {
    const token = getToken();
    if (!token) return alert("Login to vote");

    try {
        const res = await fetch(`${API_BASE}/answers/${type}vote/${answerId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
            loadAnswers();
        } else {
            const data = await res.json();
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
    }
}