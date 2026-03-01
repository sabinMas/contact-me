// /js/contact-me.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-me-form");
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");
  const linkedin = document.getElementById("linkedin");
  const meet = document.getElementById("meet");
  const mailingList = document.getElementById("mailing-list");
  const emailFormat = document.getElementById("email-format");

  const emailFormatRadios = document.querySelectorAll(
    "input[name='email-format']",
  );

  const errors = {
    fname: document.getElementById("fname-error"),
    lname: document.getElementById("lname-error"),
    email: document.getElementById("email-error"),
    linkedin: document.getElementById("linkedin-error"),
    meet: document.getElementById("meet-error"),
    emailFormat: document.getElementById("email-format-error"),
  };

  function clearErrors() {
    Object.values(errors).forEach((span) => {
      if (span) span.textContent = "";
    });
  }

  function validateEmailFormat(value) {
    // Very simple regex: something@something.something
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  form.addEventListener("submit", (e) => {
    clearErrors();
    let isValid = true;

    const emailVal = email.value.trim();

    // First name required
    if (!fname.value.trim()) {
      errors.fname.textContent = "First name is required.";
      isValid = false;
    }

    // Last name required
    if (!lname.value.trim()) {
      errors.lname.textContent = "Last name is required.";
      isValid = false;
    }

    // email is required
    if (!emailVal) {
      if (errors.email) errors.email.textContent = "Email is required.";
      isValid = false;
    } else if (!validateEmailFormat(emailVal)) {
      if (errors.email)
        errors.email.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // LinkedIn optional, but must start with specific URL if provided
    const linkedinVal = linkedin.value.trim();
    if (linkedinVal && !linkedinVal.includes("https://linkedin.com/in/")) {
      errors.linkedin.textContent =
        'LinkedIn URL must start with "https://linkedin.com/in/".';
      isValid = false;
    }

    // How we met required
    const meetVal = meet.value;
    if (!meetVal) {
      errors.meet.textContent = '"How we met" is required.';
      isValid = false;
    }

  });
});
