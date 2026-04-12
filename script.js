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

    // Basic Name Validation: Check if it's at least 2 characters
    if (fullName.length < 2) {
        alert("Please enter your full name.");
        nameInput.focus();
        return;
    }

    if (ethioRegex.test(phoneNumber)) {
        errorMsg.style.display = 'none';
        phoneInput.style.borderColor = 'var(--primary-color)';
        
        const fullNumber = "+251" + phoneNumber;
        
        // Success Message including the Name
        alert(`Thank you, ${fullName}. A verification code has been sent to ${fullNumber}`);
        
        console.log("Data:", { name: fullName, phone: fullNumber });
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
