import React, { useState, useEffect } from 'react';
// import { FaUser, FaLock, FaEye, FaArrowRight, FaHeartbeat, FaHistory, FaFileMedical, FaUserMd, FaBell, FaSearch, FaSignOutAlt, FaPhoneAlt, FaRobot, FaCamera, FaPills, FaChevronRight, FaMapMarkerAlt, FaLocationArrow, FaCalendarCheck, FaPrescriptionBottleAlt, FaHeart, FaCalendarDay, FaClock, FaVideo, FaEllipsisV, FaTimes, FaEyeSlash, FaSpinner, FaMicrophone, FaPhoneSlash, FaVenus, FaAllergies, FaStomach, FaWind, FaSpa, FaStar, FaStarHalfAlt, FaWalking, FaDirections, FaExclamationTriangle } from 'react-icons/fa';
// Change this import
import { FaUser, FaLock, FaEye, FaArrowRight, FaHeartbeat, FaHistory, FaFileMedical, FaUserMd, FaBell, FaSearch, FaSignOutAlt, FaPhoneAlt, FaRobot, FaCamera, FaPills, FaChevronRight, FaMapMarkerAlt, FaLocationArrow, FaCalendarCheck, FaPrescriptionBottleAlt, FaHeart, FaCalendarDay, FaClock, FaVideo, FaEllipsisV, FaTimes, FaEyeSlash, FaSpinner, FaMicrophone, FaPhoneSlash, FaVenus, FaAllergies, FaWind, FaSpa, FaStar, FaStarHalfAlt, FaWalking, FaDirections, FaExclamationTriangle, FaBone } from 'react-icons/fa';
import './Home.css';

// Import images from Assets folder
import logo from './Assets/logo.png';
import otcMedicineImg from './Assets/otc medicine.jpg';
import mapImg from './Assets/map.jpg';
import doctorPhoto from './Assets/doctorphoto.jpg';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(true);
  const [greeting, setGreeting] = useState('Good morning');
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState('connecting'); // 'connecting', 'connected'
  const [aiStatus, setAiStatus] = useState('input'); // 'input', 'processing', 'results'

  useEffect(() => {
    updateGreeting();
  }, []);

  const updateGreeting = () => {
    const hour = new Date().getHours();
    let newGreeting;

    if (hour < 12) {
      newGreeting = 'Good morning';
    } else if (hour < 18) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }

    setGreeting(newGreeting);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password');
      return;
    }

    // Simulate authentication
    setIsLoading(true);

    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  const logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      setUsername('');
      setPassword('');
      setActiveModal(null);
    }
  };

  const callDoctor = () => {
    // Open Google Meet in a new tab
    window.open('https://meet.google.com/dzh-aojj-hqr', '_blank');
    
    // Show calling modal
    setActiveModal('call');
    setCallStatus('connecting');
    
    // Simulate call connection
    setTimeout(() => {
      setCallStatus('connected');
    }, 3000);
  };
  

  const endCall = () => {
    setActiveModal(null);
    setCallStatus('connecting');
  };

  const aiPrescriber = () => {
    setActiveModal('ai');
    setAiStatus('input');
  };

  const analyzeSymptoms = () => {
    setAiStatus('processing');

    // Simulate AI processing
    setTimeout(() => {
      setAiStatus('results');
    }, 2500);
  };

  const scanPrescription = () => {
    setActiveModal('scan');
  };

  const startCameraScan = () => {
    alert("Camera scan functionality would be implemented here");
  };

  const uploadPrescription = () => {
    alert("Prescription upload functionality would be implemented here");
  };

  const otcMedicine = () => {
    setActiveModal('otc');
  };

  const showCategory = (category) => {
    alert(`Showing ${category} medicines`);
  };

  const findNearestCenters = () => {
    // Open Google Maps in a new tab
    window.open('https://www.google.com/maps/@18.6229332,73.7360171,13z?entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoASAFQAw%3D%3D', '_blank');
    
    // Show map modal
    setActiveModal('map');
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  // Render modals based on activeModal state
  const renderModal = () => {
    switch (activeModal) {
      case 'call':
        return (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Connecting to a doctor</h3>
                <button className="close-modal" onClick={() => setActiveModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                {callStatus === 'connecting' ? (
                  <>
                    <div className="calling-animation">
                      <div className="circle"></div>
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                    <p>Searching for available gynecologists...</p>
                  </>
                ) : (
                  <div className="call-connected">
                    <div className="doctor-avatar">
                      <img src={doctorPhoto} alt="Dr. Smith" />
                    </div>
                    <h4>Dr. Sarah Smith</h4>
                    <p>Gynecologist</p>
                    <div className="call-timer">00:00:05</div>
                    <div className="call-controls">
                      <button className="btn-icon btn-danger" onClick={endCall}>
                        <FaPhoneSlash />
                      </button>
                      <button className="btn-icon">
                        <FaMicrophone />
                      </button>
                      <button className="btn-icon">
                        <FaVideo />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={endCall}>
                  Cancel Call
                </button>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3><FaRobot /> AI Medicine Prescriber</h3>
                <button className="close-modal" onClick={() => setActiveModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                {aiStatus === 'input' ? (
                  <>
                    <div className="symptom-input">
                      <label htmlFor="symptoms">Describe your symptoms:</label>
                      <textarea id="symptoms" rows="4" placeholder="E.g. Headache, fever, nausea..."></textarea>
                    </div>
                    <div className="additional-info">
                      <div className="info-item">
                        <label>Duration:</label>
                        <select>
                          <option>Less than 1 day</option>
                          <option>1-3 days</option>
                          <option>3-7 days</option>
                          <option>More than 1 week</option>
                        </select>
                      </div>
                      <div className="info-item">
                        <label>Severity:</label>
                        <select>
                          <option>Mild</option>
                          <option>Moderate</option>
                          <option>Severe</option>
                        </select>
                      </div>
                    </div>
                  </>
                ) : aiStatus === 'processing' ? (
                  <div className="ai-loading">
                    <div className="ai-animation">
                      <FaRobot />
                      <div className="dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                    <p>Our AI is analyzing your symptoms...</p>
                  </div>
                ) : (
                  <div className="ai-results">
                    <div className="result-header">
                      <h4>Analysis Results</h4>
                      <div className="confidence">85% confidence</div>
                    </div>
                    <div className="diagnosis">
                      <h5>Possible Condition:</h5>
                      <p>Urinary Tract Infection (UTI)</p>
                    </div>
                    <div className="recommendations">
                      <h5>Recommended Actions:</h5>
                      <ul>
                        <li>Drink plenty of water</li>
                        <li>Take Cranberry supplements</li>
                        <li>Consult a doctor if symptoms persist</li>
                      </ul>
                    </div>
                    <div className="medication">
                      <h5>Suggested Medication:</h5>
                      <div className="med-card">
                        <div className="med-info">
                          <h6>Phenazopyridine (Azo)</h6>
                          <p>Pain reliever for urinary symptoms</p>
                        </div>
                        <div className="med-dosage">
                          200mg every 8 hours as needed
                        </div>
                      </div>
                    </div>
                    <div className="disclaimer">
                      <p><FaExclamationTriangle /> This is not a substitute for professional medical advice.</p>
                    </div>
                  </div>
                )}
              </div>
              {aiStatus === 'input' && (
                <div className="modal-footer">
                  <button className="btn-primary" onClick={analyzeSymptoms}>
                    <FaSearch /> Analyze Symptoms
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'scan':
        return (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3><FaCamera /> Prescription Scanning</h3>
                <button className="close-modal" onClick={() => setActiveModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body scan-options">
                <div className="scan-option" onClick={startCameraScan}>
                  <div className="option-icon">
                    <FaCamera />
                  </div>
                  <h4>Scan with Camera</h4>
                  <p>Take a photo of your prescription</p>
                </div>
                <div className="scan-option" onClick={uploadPrescription}>
                  <div className="option-icon">
                    <FaArrowRight />
                  </div>
                  <h4>Upload Image</h4>
                  <p>Select from your device</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'otc':
        return (
          <div className="modal-overlay">
            <div className="modal-content wide-modal">
              <div className="modal-header">
                <h3><FaPills /> OTC Medicine Dispensing</h3>
                <button className="close-modal" onClick={() => setActiveModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="search-box">
                  <FaSearch />
                  <input type="text" placeholder="Search for symptoms or medicines..." />
                </div>
                <div className="otc-categories">
                  <h4>Common Categories</h4>
                  <div className="category-grid">
                    <div className="category-card" onClick={() => showCategory('pain')}>
                      <FaAllergies />
                      <span>Pain Relief</span>
                    </div>
                    <div className="category-card" onClick={() => showCategory('allergy')}>
                      <FaAllergies />
                      <span>Allergy</span>
                    </div>
                    <div className="category-card" onClick={() => showCategory('digestive')}>
                      <FaBone />
                      <span>Digestive Health</span>
                    </div>
                    <div className="category-card" onClick={() => showCategory('cold')}>
                      <FaWind />
                      <span>Cold & Flu</span>
                    </div>
                    <div className="category-card" onClick={() => showCategory('skin')}>
                      <FaSpa />
                      <span>Skin Care</span>
                    </div>
                    <div className="category-card" onClick={() => showCategory('women')}>
                      <FaVenus />
                      <span>Women's Health</span>
                    </div>
                  </div>
                </div>
                <div className="popular-meds">
                  <h4>Popular for Gynecology</h4>
                  <div className="med-grid">
                    <div className="med-card">
                      <div className="med-image">
                        <img src={otcMedicineImg} alt="Medicine" />
                      </div>
                      <div className="med-info">
                        <h5>Monistat</h5>
                        <p>For yeast infections</p>
                        <div className="med-details">
                          <span className="med-type">Cream</span>
                          <span className="med-dose">1-day treatment</span>
                        </div>
                      </div>
                    </div>
                    <div className="med-card">
                      <div className="med-image">
                        <img src={otcMedicineImg} alt="Medicine" />
                      </div>
                      <div className="med-info">
                        <h5>Plan B</h5>
                        <p>Emergency contraception</p>
                        <div className="med-details">
                          <span className="med-type">Tablet</span>
                          <span className="med-dose">One dose</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="modal-overlay">
            <div className="modal-content wide-modal">
              <div className="modal-header">
                <h3><FaMapMarkerAlt /> Nearby Gynecology Centers</h3>
                <button className="close-modal" onClick={() => setActiveModal(null)}>
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body map-modal">
                <div className="map-container">
                  <img src={mapImg} alt="Map" className="map-image" />
                  <div className="map-markers">
                    <div className="marker" style={{ top: '30%', left: '40%' }}>
                      <FaMapMarkerAlt />
                      <div className="marker-tooltip">
                        <h5>Women's Health Clinic</h5>
                        <p>1.2 miles away</p>
                        <div className="rating">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                          <span>4.5 (128)</span>
                        </div>
                      </div>
                    </div>
                    <div className="marker" style={{ top: '50%', left: '60%' }}>
                      <FaMapMarkerAlt />
                      <div className="marker-tooltip">
                        <h5>City Gynecology Center</h5>
                        <p>2.1 miles away</p>
                        <div className="rating">
                          <FaStar /><FaStar /><FaStar /><FaStar /><FaTimes />
                          <span>4.0 (87)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locations-list">
                  <h4>Nearby Centers</h4>
                  <div className="location-card">
                    <div className="location-info">
                      <h5>Women's Health Clinic</h5>
                      <p><FaMapMarkerAlt /> 123 Medical Dr, Suite 100</p>
                      <div className="location-meta">
                        <span className="distance"><FaWalking /> 15 min</span>
                        <span className="rating"><FaStar /> 4.5</span>
                      </div>
                    </div>
                    <button className="btn-icon"><FaDirections /></button>
                  </div>
                  <div className="location-card">
                    <div className="location-info">
                      <h5>City Gynecology Center</h5>
                      <p><FaMapMarkerAlt /> 456 Health Ave</p>
                      <div className="location-meta">
                        <span className="distance"><FaWalking /> 25 min</span>
                        <span className="rating"><FaStar /> 4.0</span>
                      </div>
                    </div>
                    <button className="btn-icon"><FaDirections /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="home">
      {!isLoggedIn ? (
        /* Login Page */
        <div className="login-container">
          <div className="login-header">
            <img src={logo} alt="GynoVend Logo" className="logo" />
            <h2>Welcome to GynoVend</h2>
            <p>Your personalized gynecology care platform</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <FaUser />
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <FaLock />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="toggle-password"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="toggle-password"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <FaSpinner className="fa-spin" /> Authenticating
                </>
              ) : (
                <>
                  Login <FaArrowRight />
                </>
              )}
            </button>
            <div className="login-footer">
              <a href="#" className="forgot-password">Forgot password?</a>
              <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
            </div>
          </form>
        </div>
      ) : (
        /* Dashboard */
        <div className="dashboard">
          <header>
            <div className="header-left">
              <h1><FaHeartbeat /> GynoVend</h1>
              <div className="user-greeting">
                <span id="greetingText">{greeting}</span>, <span id="usernameDisplay">{username}</span>
                <div className="user-status">
                  <i className="fas fa-circle status-active"></i> <span>Active</span>
                </div>
              </div>
            </div>

            <nav>
              <ul>
                <li><a href="#" className="active"><FaHistory /> History</a></li>
                <li><a href="#"><FaFileMedical /> Records</a></li>
                <li><a href="#"><FaUserMd /> Doctors</a></li>
                <li><a href="#"><FaBell /> Alerts</a></li>
              </ul>
            </nav>

            <div className="header-right">
              <div className="search-box">
                <FaSearch />
                <input type="text" placeholder="Search..." />
              </div>
              <button className="btn-logout" onClick={logout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </header>

          <div className="dashboard-content">
            <div className="quick-actions">
              <div className="action-card emergency" onClick={callDoctor}>
                <div className="action-icon">
                  <FaPhoneAlt />
                </div>
                <h3>Online Consulting</h3>
                <p>Immediate doctor consultation</p>
              </div>

              <div className="action-card ai" onClick={aiPrescriber}>
                <div className="action-icon">
                  <FaRobot />
                </div>
                <h3>AI Prescriber</h3>
                <p>Smart medicine recommendations</p>
              </div>

              <div className="action-card scan" onClick={scanPrescription}>
                <div className="action-icon">
                  <FaCamera />
                </div>
                <h3>Scan Rx</h3>
                <p>Digitize your prescriptions</p>
              </div>
            </div>

            <div className="main-grid">
              <div className="feature-card" onClick={otcMedicine}>
                <div className="card-header">
                  <h3><FaPills /> OTC Medicines</h3>
                  <div className="card-badge">New</div>
                </div>
                <img src={otcMedicineImg} alt="OTC Medicine" />
                <p>Get safe over-the-counter recommendations for common symptoms</p>
                <button className="btn-secondary">
                  Explore <FaChevronRight />
                </button>
              </div>

              <div className="feature-card map-card" onClick={findNearestCenters}>
                <div className="card-header">
                  <h3><FaMapMarkerAlt /> Nearby Centers</h3>
                  <div className="card-badge">Live</div>
                </div>
                <img src={mapImg} alt="Nearest Medical Centers" className="map-image" />
                <div className="map-overlay">
                  <button className="btn-primary">
                    <FaLocationArrow /> Locate Centers
                  </button>
                </div>
              </div>

              <div className="stats-card">
                <h3>Your Health Stats</h3>
                <div className="stat-item">
                  <div className="stat-info">
                    <FaCalendarCheck />
                    <span>Last Consultation</span>
                  </div>
                  <div className="stat-value">15 days ago</div>
                </div>
                <div className="stat-item">
                  <div className="stat-info">
                    <FaPrescriptionBottleAlt />
                    <span>Active Medications</span>
                  </div>
                  <div className="stat-value">2</div>
                </div>
                <div className="stat-item">
                  <div className="stat-info">
                    <FaHeart />
                    <span>Next Checkup</span>
                  </div>
                  <div className="stat-value">In 2 weeks</div>
                </div>
              </div>
            </div>

            <div className="upcoming-section">
              <h2><FaCalendarDay /> Upcoming Appointments</h2>
              <div className="appointment-card">
                <div className="appointment-details">
                  <div className="doctor-avatar">
                    <img src={doctorPhoto} alt="Dr. Smith" />
                  </div>
                  <div className="appointment-info">
                    <h4>Dr. Sarah Smith</h4>
                    <p>Routine Checkup</p>
                    <div className="appointment-time">
                      <FaClock /> Tomorrow, 10:30 AM
                    </div>
                  </div>
                </div>
                <div className="appointment-actions">
                  <button className="btn-icon"><FaVideo /></button>
                  <button className="btn-icon"><FaEllipsisV /></button>
                </div>
              </div>
            </div>
          </div>

          {showNotification && (
            <div className="notification-toast">
              <div className="toast-icon">
                <FaBell />
              </div>
              <div className="toast-content">
                <h4>New Feature Available</h4>
                <p>Try our new AI symptom checker</p>
              </div>
              <button className="toast-close" onClick={hideNotification}>
                <FaTimes />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Render active modal */}
      {activeModal && renderModal()}
    </div>
  );
};

export default Home;