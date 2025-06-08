import React, { useState } from 'react';
import './App.css';
function BookAppointment() {
  const services = [
    { name: "Teeth Cleaning", price: 500 },
    { name: "Cavity Filling", price: 800 },
    { name: "Tooth Alignment", price: 2500 },
    { name: "Tooth Replacement", price: 3000 },
    { name: "Root Canal Treatment", price: 4000 },
  ];

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: '',
    servicePrice: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'service') {
      const selectedService = services.find((s) => s.name === value);
      setFormData({
        ...formData,
        service: selectedService.name,
        servicePrice: selectedService.price,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   const now = new Date();
const appointmentId = `APT-${now.getFullYear()}${(now.getMonth() + 1)
  .toString()
  .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    const formattedDate = new Date().toLocaleString();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Appointment Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f8f8f8; }
            .container { background: white; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h2 { color: #0077cc; }
            p { margin: 10px 0; }
            .id { font-weight: bold; color: #d9534f; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Appointment Confirmed</h2>
            <p class="id">Appointment ID: ${appointmentId}</p>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Contact:</strong> ${formData.contact}</p>
            <p><strong>Service:</strong> ${formData.service}</p>
            <p><strong>Cost:</strong> ₹${formData.servicePrice}</p>
            <p><strong>Preferred Date:</strong> ${formData.date}</p>
            <p><strong>Booking Time:</strong> ${formattedDate}</p>
            <br/>
            <p>Thank you for choosing <strong>Sasta Dentist</strong>.</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment_${appointmentId}.html`;
    link.click();

    URL.revokeObjectURL(url);

    alert("Appointment booked! Confirmation downloaded.");
  };

 return (
  <div className='appoint'>
    <div className='appoint-wrapper'>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Book Your Appointment</h2>

        <label>
          Full Name: <br />
          <input type="text" name="name" required onChange={handleChange} />
        </label>
        <br /><br />

        <label>
          Contact (Phone or Email): <br />
          <input type="text" name="contact" required onChange={handleChange} />
        </label>
        <br /><br />

        <label>
          Select Service: <br />
          <select name="service" required onChange={handleChange} defaultValue="">
            <option value="" disabled>Select a service</option>
            {services.map((service, index) => (
              <option key={index} value={service.name}>
                {service.name} — ₹{service.price}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        <label>
          Preferred Appointment Date: <br />
          <input type="date" name="date" required onChange={handleChange} />
        </label>
        <br /><br />

        <button type="submit">Confirm Appointment</button>
      </form>

      <div className='rules'>
        <h3>Post-Booking Procedures</h3>
        <ol>
          <li>Please arrive at the clinic 5–10 minutes before your scheduled time.</li>
          <li>Carry any prior dental reports, X-rays, or prescriptions.</li>
          <li>If you're late by more than 15 minutes, your slot may be rescheduled.</li>
          <li>In case of cancellation, notify us at least 2 hours prior.</li>
          <li>Payments can be made after the treatment</li>
          
        </ol>
      </div>
    </div>
  </div>
);


}

export default BookAppointment;
