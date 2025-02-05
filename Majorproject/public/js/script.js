// Form validation module
(() => {
  'use strict';

  class FormValidator {
    constructor() {
      this.forms = document.querySelectorAll('.needs-validation');
      this.init();
    }

    init() {
      if (this.forms.length === 0) return;

      this.forms.forEach(form => {
        form.addEventListener('submit', this.handleSubmit.bind(this));
        form.addEventListener('input', this.handleRealTimeValidation);
      });
    }

    handleSubmit(event) {
      const form = event.target;
      
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
      this.showCustomValidationMessages(form);
    }

    handleRealTimeValidation(event) {
      const input = event.target;
      if (input.tagName.toLowerCase() !== 'input') return;

      input.checkValidity() ? 
        this.clearCustomError(input) : 
        this.showCustomError(input);
    }

    showCustomValidationMessages(form) {
      form.querySelectorAll(':invalid').forEach(input => {
        this.showCustomError(input);
      });
    }

    showCustomError(input) {
      const fieldName = input.getAttribute('data-field-name') || input.name;
      const message = this.getValidationMessage(input, fieldName);
      this.displayError(input, message);
    }

    getValidationMessage(input, fieldName) {
      const messages = {
        valueMissing: `Please provide a ${fieldName}`,
        patternMismatch: `Invalid ${fieldName} format`,
        rangeUnderflow: `Minimum ${fieldName} is ${input.min}`,
        rangeOverflow: `Maximum ${fieldName} is ${input.max}`,
        customError: input.validationMessage
      };

      return messages[Object.keys(messages).find(key => input.validity[key])];
    }

    displayError(input, message) {
      const errorContainer = input.parentElement.querySelector('.invalid-feedback');
      if (errorContainer) {
        errorContainer.textContent = message;
      }
    }

    clearCustomError(input) {
      const errorContainer = input.parentElement.querySelector('.invalid-feedback');
      if (errorContainer) {
        errorContainer.textContent = '';
      }
    }
  }

  // Initialize form validation
  document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
  });

})();