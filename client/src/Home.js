import React from 'react';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user && (
        <div>
          <h2>Hello, {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
