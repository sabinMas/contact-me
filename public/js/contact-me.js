// /js/contact-me.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-me-form");
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const email = document.getElementById("email");
  const linkedin = document.getElementById("linkedin");
  const meet = document.getElementById("meet");
  const meetOther = document.getElementById("meet-other");
  const mailingList = document.getElementById("mailing-list");
  const emailFormatFieldset = document.getElementById("email-format-fieldset");

  const emailFormatRadios = document.querySelectorAll("input[name='email-format']");

  const errors = {
    fname: document.getElementById("fname-error"),
    lname: document.getElementById("lname-error"),
    email: document.getElementById("email-error"),
    linkedin: document.getElementById("linkedin-error"),
    meet: document.getElementById("meet-error"),
    meetOther: document.getElementById("meet-other-error"),
    emailFormat: document.getElementById("email-format-error"),
  };

  function clearErrors() {
    Object.values(errors).forEach(span => {
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

    // Email optional, but format if present
    const emailVal = email.value.trim();
    const wantsMailingList = mailingList.checked;

    if (wantsMailingList && !emailVal) {
      errors.email.textContent = "Email is required when joining the mailing list.";
      isValid = false;
    } else if (emailVal && !validateEmailFormat(emailVal)) {
      errors.email.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // If mailing list checked, require email format radio
    if (wantsMailingList) {
      const anyChecked = Array.from(emailFormatRadios).some(r => r.checked);
      if (!anyChecked) {
        errors.emailFormat.textContent = "Please choose an email format.";
        isValid = false;
      }
    }

    // LinkedIn optional, but must start with specific URL if provided
    const linkedinVal = linkedin.value.trim();
    if (linkedinVal && !linkedinVal.startsWith("https://linkedin.com/in/")) {
      errors.linkedin.textContent = "LinkedIn URL must start with \"https://linkedin.com/in/\".";
      isValid = false;
    }

    // How we met required
    const meetVal = meet.value;
    if (!meetVal) {
      errors.meet.textContent = "\"How we met\" is required.";
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    }
  });

  // Optional challenge: show/hide email format fieldset based on mailing list checkbox
  mailingList.addEventListener("change", () => {
    if (mailingList.checked) {
      emailFormatFieldset.style.display = "block";
    } else {
      emailFormatFieldset.style.display = "none";
      // Clear radio selection and related error
      emailFormatRadios.forEach(r => r.checked = false);
      errors.emailFormat.textContent = "";
    }
  });

  // Optional challenge: show/hide "Other" textbox based on dropdown
  meet.addEventListener("change", () => {
    if (meet.value === "other") {
      meetOther.style.display = "block";
    } else {
      meetOther.style.display = "none";
      meetOther.value = "";
      errors.meetOther.textContent = "";
    }
  });
});
