document.addEventListener('DOMContentLoaded', function() {
    const viewMenuButton = document.querySelector('#hero .menu-button');

    if (viewMenuButton) {
        viewMenuButton.addEventListener('click', function(event) {
            alert('Welcome to Jonny’s Deli! Please enjoy our delicious menu.');
            
            // Since it's an anchor tag, prevent the default behavior of immediately navigating to the link.
            // It allows the alert to be shown before navigating to the menu page.
            event.preventDefault();

            // After user acknowledges the alert, navigate to the menu page.
            window.location.href = viewMenuButton.href;
        });
    }
    
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;

            if(name.length < 2 || !email.includes('@')) {
                alert("Please enter a valid name and email.");
                return;
            }

            alert("Thank you for contacting Jonny's Deli, we will get back to you as soon as we possibly can. If you require immediate assistance, please give us a call or visit our location at any time within our hours of operation. Thank you.");
            contactForm.reset();
        });
    }
});
