       // Optional JS: Highlight active link dynamically
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    }); 
      document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function changeSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    setInterval(changeSlide, 5000); // Change image every 5 seconds
});
document.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll(".testimonial-card");
    let currentIndex = 0;

    function changeTestimonial() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = index === currentIndex ? "1" : "0.5";
        });
        currentIndex = (currentIndex + 1) % testimonials.length;
    }

    setInterval(changeTestimonial, 5000);
}); 
 function showBookingBox() {
      document.getElementById("bookingBox").style.display = "block";
    }
    function calculateTotal() {
      const num = parseInt(document.getElementById("people").value);
      document.getElementById("total").textContent = `Total Price: US$${650 * num}`;
    }
    document.getElementById("searchBox").addEventListener("keyup", function () {
    const value = this.value.toLowerCase();
    const items = document.querySelectorAll("#trekList li");
    items.forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(value) ? "block" : "none";
    });
});
document.getElementById("searchBox").addEventListener("focus", function () {
    this.style.backgroundColor = "#f0f0f0";
});
function subscribe() {
  const email = document.getElementById("newsletter-email").value;
  if (email) {
    alert(`Thank you for subscribing with ${email}`);
    document.getElementById("newsletter-email").value = "";
  } else {
    alert("Please enter a valid email address!");
  }
}

function subscribeUpdate() {
  const email = document.getElementById("update-email").value;
  if (email) {
    alert(`You're now subscribed to the latest trekking updates!`);
    document.getElementById("update-email").value = "";
  } else {
    alert("Please enter your email to subscribe!");
  }
}
  const scrollTopBtn = document.getElementById('scrollTopBtn');
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/Hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Lightbox functionality for gallery images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'block';
            //increase size of image
            lightboxImg.style.width = '60%';
            lightboxImg.style.height = 'auto';
            lightboxImg.style.objectFit = 'cover';
            // add cross icon to close lightbox
            closeLightbox.style.display = 'none';
            


            // Set the lightbox to be visible
            // close button doesnot work
            // Set the source of the lightbox image to the clicked item's source
            //also add user can 



          
            lightboxImg.src = item.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
    //popup functionality
      
    

