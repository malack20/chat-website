import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

const API_BASE_URL = "http://localhost:5000";

type AuthMode = "login" | "register";

// Placeholder components for other pages
const ProfilePage: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [location, setLocation] = useState('');
  const [shareLocation, setShareLocation] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>(['https://via.placeholder.com/100', 'https://via.placeholder.com/100']);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos([...photos, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [bio, setBio] = useState('I love coding and hiking!');
  const [datingGoals, setDatingGoals] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const totalSteps = 7;

  const interestOptions = [
    'Reading', 'Travel', 'Sports', 'Music', 'Cooking', 'Hiking', 'Art', 'Photography', 'Fitness', 'Gaming',
    'Dancing', 'Writing', 'Movies', 'Theater', 'Yoga', 'Meditation', 'Gardening', 'Pets', 'Volunteering', 'Technology',
    'Fashion', 'Shopping', 'Foodie', 'Wine Tasting', 'Coffee', 'Beer', 'Partying', 'Concerts', 'Festivals', 'Camping',
    'Swimming', 'Running', 'Cycling', 'Skiing', 'Surfing', 'Climbing', 'Fishing', 'Hunting', 'Bowling', 'Golf',
    'Tennis', 'Basketball', 'Soccer', 'Baseball', 'Hockey', 'Cricket', 'Rugby', 'Martial Arts', 'Boxing', 'Wrestling',
    'Anime', 'Comics', 'Board Games', 'Video Games', 'Programming', 'Science', 'History', 'Philosophy', 'Religion'
  ];

  const handleInterestChange = (interest: string) => {
    setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          setShareLocation(true);
        },
        () => alert('Location access denied')
      );
    }
  };

  const nextStep = () => {
    if (step === 4 && photos.length < 2) {
      alert('Please add at least 2 photos before proceeding.');
      return;
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here
    console.log('Saving profile');
    alert('Profile saved!');
    setShowConfirm(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3>Step 1: Basic Info</h3>
            <label>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label><br />
            <label>Age: <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} required /></label><br />
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Step 2: Gender</h3>
            <label>Gender: <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select></label><br />
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Step 3: Interests</h3>
            <p>Select your interests:</p>
            {interestOptions.map(interest => (
              <label key={interest}>
                <input type="checkbox" checked={interests.includes(interest)} onChange={() => handleInterestChange(interest)} />
                {interest}
              </label>
            ))}<br />
          </div>
        );
      case 4:
        return (
          <div>
            <h3>Step 4: Photos</h3>
            <p>Your photos (at least 2 required):</p>
            {photos.map((photo, idx) => <img key={idx} src={photo} alt="Profile" style={{ width: '100px', margin: '5px' }} />)}
            <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} style={{ display: 'block', marginTop: '10px' }} />
            <p>Choose from gallery or take a photo</p>
            {photos.length < 2 && <p style={{ color: 'red' }}>Add at least 2 photos to continue.</p>}
          </div>
        );
      case 5:
        return (
          <div>
            <h3>Step 5: Bio</h3>
            <label>Bio: <textarea value={bio} onChange={(e) => setBio(e.target.value)} required /></label><br />
          </div>
        );
      case 6:
        return (
          <div>
            <h3>Step 6: Dating Goals</h3>
            <p>What are you looking for?</p>
            {[
              'Casual Dating',
              'Long-term Relationship',
              'Marriage',
              'Friendship First',
              'Hookups',
              'Travel Partner',
              'Study Buddy',
              'Business Networking',
              'Fitness Partner',
              'Adventure Companion',
              'Cultural Exchange',
              'Language Practice',
              'Just Chatting'
            ].map(goal => (
              <label key={goal} style={{ display: 'block', margin: '8px 0' }}>
                <input 
                  type="checkbox" 
                  checked={datingGoals.includes(goal)} 
                  onChange={() => setDatingGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal])} 
                  style={{ marginRight: '8px' }}
                />
                {goal}
              </label>
            ))}
          </div>
        );
      case 7:
        return (
          <div>
            <h3>Step 7: Privacy</h3>
            <label>Location: <input type="text" value={location} readOnly placeholder="Click to share location" /></label>
            <button type="button" onClick={handleLocationRequest}>Share Location</button>
            <label><input type="checkbox" checked={shareLocation} onChange={(e) => setShareLocation(e.target.checked)} /> Allow matching with nearby people</label><br />
            {showConfirm && (
              <div style={{ color: 'red', margin: '10px 0' }}>
                Are you sure you want to share your phone number? <button type="button" onClick={() => setShowConfirm(false)}>Cancel</button> <button type="submit">Yes, Share</button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Profile Setup</h1>
      <div style={{ marginBottom: '20px' }}>
        Step {step} of {totalSteps}
      </div>
      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div style={{ marginTop: '20px' }}>
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < totalSteps ? (
            <button type="button" onClick={nextStep} style={{ marginLeft: '10px' }}>Next</button>
          ) : (
            !showConfirm && <button type="submit" style={{ marginLeft: '10px' }}>Save Profile</button>
          )}
        </div>
      </form>
    </div>
  );
};

const MatchesPage: React.FC = () => {
  const navigate = useNavigate();
  const [shareLocation] = useState(true); // Mock: assume location shared
  const [isPremium] = useState<boolean>(localStorage.getItem("isPremium") === "true");
  const [userLikes, setUserLikes] = useState<string[]>([]); // Track who current user liked
  const [mutualMatches, setMutualMatches] = useState<string[]>([]); // Track mutual matches
  const [viewingProfile, setViewingProfile] = useState<any>(null); // Profile being viewed

  const matches = [
    { 
      name: 'Jane Smith', 
      age: 24, 
      interests: 'Reading, Travel, Photography', 
      distance: shareLocation ? '2 km away' : 'Location not shared', 
      profileImage: 'https://picsum.photos/100/100?random=1',
      bio: 'Book lover and world traveler. Always up for an adventure! 📚✈️',
      location: 'Nairobi, Kenya',
      occupation: 'Graphic Designer',
      datingGoals: ['Long-term Relationship', 'Travel Partner', 'Cultural Exchange'],
      photos: [
        'https://picsum.photos/300/400?random=1',
        'https://picsum.photos/300/400?random=11',
        'https://picsum.photos/300/400?random=21'
      ]
    },
    { 
      name: 'Alex Johnson', 
      age: 28, 
      interests: 'Sports, Music, Cooking', 
      distance: shareLocation ? '5 km away' : 'Location not shared', 
      profileImage: 'https://picsum.photos/100/100?random=2',
      bio: 'Fitness enthusiast and amateur chef. Love making people smile! 💪🍳',
      location: 'Mombasa, Kenya',
      occupation: 'Personal Trainer',
      datingGoals: ['Casual Dating', 'Fitness Partner', 'Friendship First'],
      photos: [
        'https://picsum.photos/300/400?random=2',
        'https://picsum.photos/300/400?random=12',
        'https://picsum.photos/300/400?random=22'
      ]
    },
    {
      name: 'Sarah Kimani',
      age: 26,
      interests: 'Art, Yoga, Coffee',
      distance: shareLocation ? '3 km away' : 'Location not shared',
      profileImage: 'https://picsum.photos/100/100?random=4',
      bio: 'Creative soul with a passion for mindfulness and good coffee. 🧘‍♀️☕',
      location: 'Nakuru, Kenya',
      occupation: 'Artist',
      datingGoals: ['Long-term Relationship', 'Adventure Companion', 'Cultural Exchange'],
      photos: [
        'https://picsum.photos/300/400?random=4',
        'https://picsum.photos/300/400?random=14',
        'https://picsum.photos/300/400?random=24'
      ]
    },
    {
      name: 'David Oduya',
      age: 32,
      interests: 'Technology, Hiking, Photography',
      distance: shareLocation ? '7 km away' : 'Location not shared',
      profileImage: 'https://picsum.photos/100/100?random=5',
      bio: 'Tech geek who loves the outdoors. Always exploring new trails! 🏔️📱',
      location: 'Eldoret, Kenya',
      occupation: 'Software Engineer',
      datingGoals: ['Long-term Relationship', 'Adventure Companion', 'Business Networking'],
      photos: [
        'https://picsum.photos/300/400?random=5',
        'https://picsum.photos/300/400?random=15',
        'https://picsum.photos/300/400?random=25'
      ]
    }
  ];

  const likes = [
    { 
      name: 'Bob Wilson', 
      age: 30, 
      interests: 'Movies, Gaming, Coding', 
      profileImage: 'https://picsum.photos/100/100?random=3',
      bio: 'Movie buff and gamer. Love discussing the latest blockbusters! 🎬🎮',
      location: 'Kisumu, Kenya',
      occupation: 'Game Developer',
      datingGoals: ['Friendship First', 'Long-term Relationship', 'Business Networking'],
      photos: [
        'https://picsum.photos/300/400?random=3',
        'https://picsum.photos/300/400?random=13',
        'https://picsum.photos/300/400?random=23'
      ]
    },
    {
      name: 'Grace Wanjiku',
      age: 25,
      interests: 'Dancing, Fashion, Socializing',
      profileImage: 'https://picsum.photos/100/100?random=6',
      bio: 'Dance lover and fashion enthusiast. Life is too short not to dance! 💃👗',
      location: 'Thika, Kenya',
      occupation: 'Dance Instructor',
      datingGoals: ['Casual Dating', 'Friendship First', 'Just Chatting'],
      photos: [
        'https://picsum.photos/300/400?random=6',
        'https://picsum.photos/300/400?random=16',
        'https://picsum.photos/300/400?random=26'
      ]
    }
  ];

  const handleLike = (name: string) => {
    if (!userLikes.includes(name)) {
      setUserLikes(prev => [...prev, name]);
      
      // Check if this creates a mutual match
      const likedByUser = likes.find(like => like.name === name);
      if (likedByUser) {
        // Mutual match! Add to mutual matches
        setMutualMatches(prev => [...prev, name]);
        alert(`It's a match! You and ${name} liked each other. You can now chat!`);
      }
    }
  };

  const viewProfile = (profile: any) => {
    setViewingProfile(profile);
  };

  if (viewingProfile) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => setViewingProfile(null)}
          style={{ 
            marginBottom: '20px', 
            padding: '10px 20px', 
            background: '#6c757d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Matches
        </button>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {/* Profile Photos */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '20px' }}>
              {viewingProfile.photos.map((photo: string, idx: number) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${viewingProfile.name} photo ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: idx === 0 ? '3px solid #007bff' : '1px solid #ddd'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Profile Info */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <img
                src={viewingProfile.profileImage}
                alt={`${viewingProfile.name} profile`}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #007bff'
                }}
              />
              <div>
                <h1 style={{ margin: '0 0 5px 0' }}>{viewingProfile.name}, {viewingProfile.age}</h1>
                <p style={{ margin: '0', color: '#666' }}>{viewingProfile.occupation}</p>
                <p style={{ margin: '0', color: '#666' }}>📍 {viewingProfile.location}</p>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3>About</h3>
              <p style={{ lineHeight: '1.6' }}>{viewingProfile.bio}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3>Interests</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {viewingProfile.interests.split(', ').map((interest: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      background: '#e9ecef',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3>Dating Goals</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {viewingProfile.datingGoals?.map((goal: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      background: '#ffe4e1',
                      color: '#d63384',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      border: '1px solid #f8d7da'
                    }}
                  >
                    💕 {goal}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3>Distance</h3>
              <p>{viewingProfile.distance}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => handleLike(viewingProfile.name)} 
                disabled={userLikes.includes(viewingProfile.name)}
                style={{ 
                  padding: '12px 24px', 
                  background: userLikes.includes(viewingProfile.name) ? '#ccc' : '#28a745', 
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: userLikes.includes(viewingProfile.name) ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                {userLikes.includes(viewingProfile.name) ? '✓ Liked' : '❤️ Like'}
              </button>
              
              {mutualMatches.includes(viewingProfile.name) ? (
                <button 
                  onClick={() => navigate('/chat')} 
                  style={{ 
                    padding: '12px 24px', 
                    background: '#ff69b4', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  💕 Chat (Matched!)
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/chat')} 
                  style={{ 
                    padding: '12px 24px', 
                    background: '#007bff', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  💬 Message
                </button>
              )}
              
              <button 
                style={{ 
                  padding: '12px 24px', 
                  background: '#dc3545', 
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                👎 Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Matches Page</h1>
      <p>Here are your potential matches.</p>
      {!isPremium && (
        <div style={{ border: '2px solid gold', padding: '15px', margin: '10px 0', background: '#fff8dc' }}>
          <h3>🔒 Premium Feature: See Who Liked You!</h3>
          <p>Someone has liked your profile! Upgrade to Premium to see who it is and start chatting.</p>
          <button 
            onClick={() => navigate('/premium')} 
            style={{ 
              background: 'gold', 
              color: 'black', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '5px', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Upgrade to Premium - See Who Liked You
          </button>
        </div>
      )}
      {isPremium && (
        <div style={{ border: '2px solid gold', padding: '10px', margin: '10px 0' }}>
          <h3>People Who Liked You (Premium)</h3>
          {likes.map((like, idx) => (
            <div key={idx} style={{ margin: '5px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={like.profileImage}
                alt={`${like.name} profile`}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid #ddd'
                }}
              />
              <div>
                <strong>{like.name}</strong> - Age: {like.age}, Interests: {like.interests}
                <button onClick={() => viewProfile(like)} style={{ marginLeft: '10px', background: '#17a2b8', color: 'white' }}>👁️ View Profile</button>
                <button onClick={() => navigate('/chat')} style={{ marginLeft: '10px' }}>Message</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {mutualMatches.length > 0 && (
        <div style={{ border: '2px solid #ff69b4', padding: '10px', margin: '10px 0', background: '#ffe4e1' }}>
          <h3>💕 It's a Match! You can chat now!</h3>
          {mutualMatches.map((match, idx) => {
            const matchData = likes.find(like => like.name === match) || matches.find(m => m.name === match);
            return (
              <div key={idx} style={{ margin: '5px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={matchData?.profileImage}
                  alt={`${match} profile`}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid #ddd'
                  }}
                />
                <div>
                  <strong>{match}</strong> - You both liked each other!
                  <button onClick={() => viewProfile(matchData)} style={{ marginLeft: '10px', background: '#17a2b8', color: 'white' }}>👁️ View Profile</button>
                  <button onClick={() => navigate('/chat')} style={{ marginLeft: '10px', background: '#ff69b4', color: 'white' }}>Start Chatting</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        {matches.map((match, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img
              src={match.profileImage}
              alt={`${match.name} profile`}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ddd'
              }}
            />
            <div style={{ flex: 1 }}>
              <h3>{match.name}</h3>
              <p>Age: {match.age}, Interests: {match.interests}</p>
              <p>Distance: {match.distance}</p>
              {userLikes.includes(match.name) && <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Liked</span>}
            </div>
            <div>
              {mutualMatches.includes(match.name) ? (
                <button onClick={() => navigate('/chat')} style={{ background: '#ff69b4', color: 'white' }}>Chat (Matched!)</button>
              ) : (
                <button onClick={() => navigate('/chat')}>Message</button>
              )}
              <button 
                onClick={() => viewProfile(match)} 
                style={{ 
                  marginLeft: '10px', 
                  background: '#17a2b8', 
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                👁️ View Profile
              </button>
              <button 
                onClick={() => handleLike(match.name)} 
                disabled={userLikes.includes(match.name)}
                style={{ 
                  marginLeft: '10px', 
                  background: userLikes.includes(match.name) ? '#ccc' : 'green', 
                  color: 'white',
                  cursor: userLikes.includes(match.name) ? 'not-allowed' : 'pointer'
                }}
              >
                {userLikes.includes(match.name) ? 'Liked' : 'Like'}
              </button>
              <button style={{ marginLeft: '10px', background: 'red', color: 'white' }}>Pass</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ [key: string]: (string | { type: 'image', src: string })[] }>({
    'Jane Smith': ['Hello!', 'How are you?'],
    'Alex Johnson': ['Hi there!', 'Nice to meet you.'],
    'Bob Wilson': ['Hey! We matched! 💕', 'Can\'t wait to chat!']
  });
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('Jane Smith');
  const [showShareConfirm, setShowShareConfirm] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [userToReport, setUserToReport] = useState('');
  const [chats, setChats] = useState([
    { name: 'Jane Smith', lastMessage: 'See you soon!', lastActivity: new Date('2026-01-02T10:00:00'), profileImage: 'https://picsum.photos/100/100?random=1' },
    { name: 'Alex Johnson', lastMessage: 'Thanks!', lastActivity: new Date('2026-01-02T09:30:00'), profileImage: 'https://picsum.photos/100/100?random=2' },
    { name: 'Bob Wilson', lastMessage: 'Hey! We matched! 💕', lastActivity: new Date('2026-01-02T11:00:00'), profileImage: 'https://picsum.photos/100/100?random=3' }, // Mutual match - most recent
  ]);

  // Sort chats by most recent activity
  const sortedChats = [...chats].sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), `You: ${newMessage}`]
      }));
      // Update last activity timestamp for this chat
      setChats(prev => prev.map(chat => 
        chat.name === selectedChat 
          ? { ...chat, lastActivity: new Date(), lastMessage: `You: ${newMessage}` }
          : chat
      ));
      setNewMessage('');
    }
  };

  const handleImageShare = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessages(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), { type: 'image', src: reader.result as string }]
        }));
        // Update last activity timestamp for this chat
        setChats(prev => prev.map(chat => 
          chat.name === selectedChat 
            ? { ...chat, lastActivity: new Date(), lastMessage: '📷 Image shared' }
            : chat
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const sharePhone = () => {
    setShowShareConfirm(true);
  };

  const confirmShare = () => {
    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), `You shared your phone: 0712345678`]
    }));
    // Update last activity timestamp for this chat
    setChats(prev => prev.map(chat => 
      chat.name === selectedChat 
        ? { ...chat, lastActivity: new Date(), lastMessage: '📱 Phone number shared' }
        : chat
    ));
    setShowShareConfirm(false);
  };

  const startCall = () => {
    setIsCalling(true);
  };

  const endCall = () => {
    setIsCalling(false);
  };

  const deleteChat = (chatName: string) => {
    setChats(prev => prev.filter(chat => chat.name !== chatName));
    if (selectedChat === chatName) {
      setSelectedChat('');
    }
    setMessages(prev => {
      const newMessages = { ...prev };
      delete newMessages[chatName];
      return newMessages;
    });
  };

  const blockUser = (userName: string) => {
    if (window.confirm(`Block ${userName}? You won't see their messages anymore.`)) {
      setBlockedUsers(prev => [...prev, userName]);
      deleteChat(userName); // Also delete the chat when blocking
    }
  };

  const openReportModal = (userName: string) => {
    setUserToReport(userName);
    setShowReportModal(true);
  };

  const submitReport = () => {
    if (reportReason.trim()) {
      alert(`Report submitted for ${userToReport}: ${reportReason}`);
      setShowReportModal(false);
      setReportReason('');
      setUserToReport('');
    } else {
      alert('Please provide a reason for the report.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '80vh', padding: '20px' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', paddingRight: '10px' }}>
        <h2>Chats</h2>
        {sortedChats.filter(chat => !blockedUsers.includes(chat.name)).map((chat) => (
          <div
            key={chat.name}
            style={{
              padding: '10px',
              margin: '5px 0',
              background: selectedChat === chat.name ? '#e0e0e0' : '#f9f9f9',
              cursor: 'pointer',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <img
              src={chat.profileImage}
              alt={`${chat.name} profile`}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ddd'
              }}
            />
            <div onClick={() => setSelectedChat(chat.name)} style={{ flex: 1 }}>
              <strong>{chat.name}</strong>
              <p style={{ fontSize: '12px', color: '#666', margin: '2px 0' }}>{chat.lastMessage}</p>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openReportModal(chat.name);
                }}
                style={{
                  padding: '3px 6px',
                  background: '#ffc107',
                  color: 'black',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}
              >
                Report
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  blockUser(chat.name);
                }}
                style={{
                  padding: '3px 6px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}
              >
                Block
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete chat with ${chat.name}?`)) {
                    deleteChat(chat.name);
                  }
                }}
                style={{
                  padding: '3px 6px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ width: '70%', paddingLeft: '10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h1>Chat with {selectedChat}</h1>
          <button onClick={startCall} style={{
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            📞 Call
          </button>
        </div>
        {isCalling && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h2>Calling {selectedChat}...</h2>
              <p>In-app call (mock)</p>
              <button onClick={endCall} style={{
                padding: '10px 20px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                Hang Up
              </button>
            </div>
          </div>
        )}
        {showReportModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              minWidth: '300px'
            }}>
              <h3>Report {userToReport}</h3>
              <p>Please provide a reason for reporting this user:</p>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Describe the issue..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  margin: '10px 0',
                  resize: 'vertical'
                }}
              />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setReportReason('');
                    setUserToReport('');
                  }}
                  style={{
                    padding: '8px 16px',
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={submitReport}
                  style={{
                    padding: '8px 16px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}
        <div style={{
          flex: 1,
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
          overflowY: 'scroll',
          background: '#fafafa',
          marginBottom: '10px'
        }}>
          {(messages[selectedChat] || []).map((msg, idx) => (
            typeof msg === 'string' ? (
              <p key={idx} style={{
                background: msg.startsWith('You:') ? '#007bff' : '#e9ecef',
                color: msg.startsWith('You:') ? 'white' : 'black',
                padding: '8px',
                borderRadius: '5px',
                margin: '5px 0',
                maxWidth: '70%',
                alignSelf: msg.startsWith('You:') ? 'flex-end' : 'flex-start'
              }}>
                {msg}
              </p>
            ) : (
              <img key={idx} src={msg.src} alt="Shared" style={{ maxWidth: '200px', borderRadius: '5px', margin: '5px 0' }} />
            )
          ))}
        </div>
        {showShareConfirm && (
          <div style={{ color: 'red', margin: '10px 0', padding: '10px', border: '1px solid red', borderRadius: '5px' }}>
            Are you sure you want to share your phone number with {selectedChat}? 
            <button onClick={confirmShare} style={{ marginLeft: '10px', background: 'green', color: 'white' }}>Yes</button>
            <button onClick={() => setShowShareConfirm(false)} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>No</button>
          </div>
        )}
        <div style={{ display: 'flex' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <input type="file" accept="image/*" onChange={handleImageShare} style={{ display: 'none' }} id="image-upload" />
          <label htmlFor="image-upload" style={{
            padding: '10px 20px',
            marginLeft: '10px',
            background: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            📷
          </label>
          <button onClick={sendMessage} style={{
            padding: '10px 20px',
            marginLeft: '10px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Send
          </button>
          <button onClick={sharePhone} style={{
            padding: '10px 20px',
            marginLeft: '10px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Share Phone
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [userLikes, setUserLikes] = useState<string[]>([]);

  // Sample profiles for homepage browsing
  const featuredProfiles = [
    {
      name: 'Jane Smith',
      age: 24,
      interests: 'Reading, Travel',
      profileImage: 'https://picsum.photos/100/100?random=1',
      bio: 'Book lover and world traveler',
      occupation: 'Graphic Designer'
    },
    {
      name: 'Alex Johnson',
      age: 28,
      interests: 'Sports, Music',
      profileImage: 'https://picsum.photos/100/100?random=2',
      bio: 'Fitness enthusiast and chef',
      occupation: 'Personal Trainer'
    },
    {
      name: 'Sarah Kimani',
      age: 26,
      interests: 'Art, Yoga',
      profileImage: 'https://picsum.photos/100/100?random=4',
      bio: 'Creative soul and artist',
      occupation: 'Artist'
    },
    {
      name: 'David Oduya',
      age: 32,
      interests: 'Technology, Hiking',
      profileImage: 'https://picsum.photos/100/100?random=5',
      bio: 'Tech geek who loves outdoors',
      occupation: 'Software Engineer'
    }
  ];

  const handleLike = (name: string) => {
    if (!userLikes.includes(name)) {
      setUserLikes(prev => [...prev, name]);
      // In a real app, this would send to backend
      alert(`You liked ${name}!`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Welcome to LoveConnect! 💕</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>Discover amazing people and find your perfect match</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {featuredProfiles.map((profile, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              background: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <img
                src={profile.profileImage}
                alt={`${profile.name} profile`}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #007bff',
                  marginBottom: '10px'
                }}
              />
              <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{profile.name}, {profile.age}</h3>
              <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{profile.occupation}</p>
            </div>

            <p style={{ color: '#555', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
              {profile.bio}
            </p>

            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Interests:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                {profile.interests.split(', ').map((interest, interestIdx) => (
                  <span
                    key={interestIdx}
                    style={{
                      background: '#f0f8ff',
                      color: '#007bff',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(profile.name);
                }}
                disabled={userLikes.includes(profile.name)}
                style={{
                  padding: '8px 16px',
                  background: userLikes.includes(profile.name) ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: userLikes.includes(profile.name) ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {userLikes.includes(profile.name) ? '✓ Liked' : '❤️ Like'}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/matches');
                }}
                style={{
                  padding: '8px 16px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                👁️ View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>Ready to Find More Matches?</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Browse through hundreds of profiles and connect with amazing people in your area.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/matches')}
            style={{
              padding: '12px 24px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Browse All Matches
          </button>
          <button
            onClick={() => navigate('/premium')}
            style={{
              padding: '12px 24px',
              background: 'gold',
              color: 'black',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
};

const PremiumPage: React.FC = () => {
  const [isPremium, setIsPremium] = useState<boolean>(localStorage.getItem("isPremium") === "true");

  const handleUpgrade = () => {
    setIsPremium(true);
    localStorage.setItem("isPremium", "true");
    alert('Upgraded to Premium! Now you can see who liked you and boost your visibility.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Premium Features</h1>
      <p>Unlock advanced features to enhance your dating experience.</p>
      {!isPremium ? (
        <div>
          <h3>Premium Plans (KES)</h3>
          <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4>Weekly - KES 20</h4>
            <ul>
              <li>See who liked your profile</li>
              <li>Boost your profile visibility (increase liking rates)</li>
              <li>Unlimited likes</li>
            </ul>
            <button onClick={handleUpgrade} style={{ background: 'gold', color: 'black', padding: '10px' }}>Upgrade Weekly</button>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4>Monthly - KES 55</h4>
            <ul>
              <li>See who liked your profile</li>
              <li>Boost your profile visibility (increase liking rates)</li>
              <li>Unlimited likes</li>
              <li>Priority matching</li>
            </ul>
            <button onClick={handleUpgrade} style={{ background: 'gold', color: 'black', padding: '10px' }}>Upgrade Monthly</button>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h4>Yearly - KES 400</h4>
            <ul>
              <li>See who liked your profile</li>
              <li>Boost your profile visibility (increase liking rates)</li>
              <li>Unlimited likes</li>
              <li>Priority matching</li>
              <li>Advanced filters</li>
              <li>Read receipts in chat</li>
            </ul>
            <button onClick={handleUpgrade} style={{ background: 'gold', color: 'black', padding: '10px' }}>Upgrade Yearly</button>
          </div>
        </div>
      ) : (
        <div>
          <h3>You are Premium!</h3>
          <p>Enjoy your features.</p>
          <button onClick={() => alert('Viewing likes... (mock)')}>See Who Liked Me</button>
          <button onClick={() => alert('Boost activated! (mock)')}>Boost Profile</button>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isPremium, setIsPremium] = useState<boolean>(localStorage.getItem("isPremium") === "true");

  const isRegister = mode === "register";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const body: any = { email, password };
      if (isRegister) {
        body.name = name;
        body.gender = gender;
        body.age = Number(age);
      }

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setToken(data.token || null);
      localStorage.setItem("token", data.token);
      setMessage(isRegister ? "Registered successfully!" : "Logged in successfully!");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsPremium(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isPremium");
  };

  if (token) {
    return (
      <Router>
        <nav>
          <button onClick={() => window.location.href = "/"}>Home</button>
          <button onClick={() => window.location.href = "/profile"}>Profile</button>
          <button onClick={() => window.location.href = "/matches"}>Matches</button>
          <button onClick={() => window.location.href = "/chat"}>Chat</button>
          <button onClick={() => window.location.href = "/premium"}>Premium</button>
          {isPremium && <span style={{ color: 'gold', fontWeight: 'bold', marginLeft: '10px' }}>✓ Premium</span>}
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div className="app-root">
      <div className="auth-card">
        <h1 className="app-title">Dating App</h1>
        <div className="mode-toggle">
          <button
            onClick={() => setMode("login")}
            className={mode === "login" ? "mode-btn active" : "mode-btn"}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={mode === "register" ? "mode-btn active" : "mode-btn"}
          >
            Register
          </button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {isRegister && (
            <>
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Gender
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Age
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </label>
            </>
          )}
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Create account" : "Login"}
          </button>
          <button type="button" className="primary-btn" onClick={() => { setToken("fake"); localStorage.setItem("token", "fake"); }}>
            Skip Auth (View Pages)
          </button>
        </form>
        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
};

export default App;
