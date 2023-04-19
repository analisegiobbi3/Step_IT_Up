// import React from 'react';
// import Header from '../components/Header';

// export default function Home() {
//   return (
//     <>
//         <Header />
//     </>
//   );
// }

// import package and local style sheet
import React from 'react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* homepage with name display */}
      <h1 className="appName">STEP IT UP</h1>
    </div>
  );
}
