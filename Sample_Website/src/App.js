import React, { useState, useEffect } from 'react';
import logo from './Assets/drawing.png';
import './App.css';
import BookAppointment from './Appointment';

function App() {
  const collection = [
    {
      label: 'First image',
      imgPath: require('./Assets/align.jpeg'),
      text: 'Get your teeth aligned',
    },
    {
      label: 'Second image',
      imgPath: require('./Assets/image2.jpeg'),
      text: 'Be free from caries',
    },
    {
      label: 'Third image',
      imgPath: require('./Assets/Replacement.jpeg'),
      text: 'Replace your damaged teeth',
    },
    {
      label: 'Fourth image',
      imgPath: require('./Assets/OIP.jpeg'),
      text: 'Get your teeth cleaned',
    },
  ];

  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('home'); 

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % collection.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [collection.length]);

  return (
    <div>
      <header className="header">
        <img className="logo" src={logo} alt="Sasta Dentist Logo" />
        <div className="branding">
          <h1>Sasta Dentist</h1>
          <h3>No compromise in quality</h3>
        </div>
        <h2>Call us: 1234567890</h2>
      </header>

      <nav className="navbar">
        <a className="nav-item" onClick={() => setCurrentPage('home')}>Home</a>
        <a className="nav-item" onClick={() => setCurrentPage('appointment')}>Book Appointment</a>
      </nav>

      <main className="main-container">
        {currentPage === 'home' && (
          <>
            <section className="about">
              <h2>About Us</h2>
              <p>
                <strong>Sasta Dentist</strong> is committed to providing high-quality dental care at prices that make sense.
                We believe everyone deserves access to safe, effective, and honest dentistry — without inflated costs or unnecessary procedures.
              </p>
              <p>
                Our clinic is equipped with modern tools and staffed by skilled professionals who put patient comfort and transparency first.
                Whether it's a routine check-up, cleaning, filling, or full smile restoration, we deliver care that’s both personal and professional.
              </p>
              <p>
                Located in <strong>BTM Layout, Bangalore</strong>, we serve individuals and families looking for affordable dental solutions.
                Book your visit today and experience dental care that values your health — and your wallet.
              </p>
            </section>

            <section className="feature-card">
              <img src={collection[index].imgPath} alt={collection[index].label} />
              <p className="feature-text">{collection[index].text}</p>
            </section>
          </>
        )}

        {currentPage === 'appointment' && <BookAppointment />}
      </main>

      <footer className="footer">
        <p>
          <i>
            <a href="mailto:kishore2476@gmail.com" target="_blank" rel="noopener noreferrer">
              Email us: SastaDentist@gmail.com
            </a>
          </i>
        </p>
        <p>
          Address: Sasta Dentist Clinic<br />
          #24, 1st Cross, 3rd Main Road<br />
          BTM Layout Stage 2, Bangalore - 560076<br />
          Karnataka, India
        </p>
        <p>
          <a href="tel:+911234567890">Call us: +91 12345 67890</a>
        </p>
        <p>Mon – Sat: 9am – 8pm | Sunday: Closed</p>
        <p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </p>
        <p>&copy; 2025 Sasta Dentist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
