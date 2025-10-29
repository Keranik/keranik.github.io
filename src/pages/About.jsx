import { useEffect } from 'react';

const About = () => {

useEffect(() => {
  document.title = 'About & Contact - COI Calculator Tools';
}, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>About COI Calculator</h2>
      <p style={{ color: '#ccc', lineHeight: '1.8' }}>
        COI Calculator is your comprehensive toolkit for factory game optimization.
        We provide tools for production planning, factory visualization, and resource management.
      </p>
      
      <h3 style={{ marginTop: '2rem' }}>Contact</h3>
      <p style={{ color: '#ccc' }}>
        Email: <a href="mailto:contact@coicalculator.com" style={{ color: '#4a90e2' }}>contact@coicalculator.com</a>
      </p>
      
      <h3 style={{ marginTop: '2rem' }}>Copyright</h3>
      <p style={{ color: '#ccc' }}>
        © {new Date().getFullYear()} COI Calculator. All rights reserved.
      </p>
    </div>
  );
};

export default About;