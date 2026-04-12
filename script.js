const firebaseConfig = {
  apiKey: "AIzaSyD73Uyrrl8JDP5X_yxT2Zp1fV9oIpAvpXA",
  authDomain: "lumi-75592.firebaseapp.com",
  projectId: "lumi-75592",
  storageBucket: "lumi-75592.firebasestorage.app",
  messagingSenderId: "419726897354",
  appId: "1:419726897354:web:3b27219dd60b26dbb84433",
  measurementId: "G-23937MS0LH"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 1. SELECTING ELEMENTS
const themeToggle = document.getElementById('theme-toggle');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');
const loginForm = document.getElementById('login-form');
const phoneInput = document.getElementById('phone');
const nameInput = document.getElementById('full-name');
const errorMsg = document.getElementById('error-msg');

// 2. THEME TOGGLE LOGIC
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update Icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
});

// 3. MODAL CONTROL
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Close modal if user clicks outside of the content box
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// 4. ETHIOPIAN PHONE VALIDATION & FORM SUBMISSION
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = nameInput.value.trim();
    const phoneNumber = phoneInput.value.trim();
    const ethioRegex = /^(7|9)\d{8}$/;

    // Basic Name Validation
    if (fullName.length < 2) {
        alert("Please enter your full name.");
        nameInput.focus();
        return;
    }

    if (ethioRegex.test(phoneNumber)) {
        errorMsg.style.display = 'none';
        phoneInput.style.borderColor = 'var(--primary-color)';
        
        const fullNumber = "+251" + phoneNumber;

        // --- START OF FIREBASE INTEGRATION ---
        // This part was missing in your code!
        db.collection("patients").add({
            name: fullName,
            phone: fullNumber,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert(`Thank you, ${fullName}. Your information has been securely saved.`);
            
            // Clear form and close modal
            loginForm.reset();
            loginModal.style.display = 'none';
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert("Database Error: Could not save information.");
        });
        // --- END OF FIREBASE INTEGRATION ---

    } else {
        errorMsg.style.display = 'block';
        phoneInput.style.borderColor = 'var(--error-color)';
        phoneInput.focus();
    }
});

// Prevent non-numeric typing
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});
