import SwipeableTemporaryDrawer from "./drawer";

export default function Dashboard() {
  return (
 <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            backgroundImage: `url("${process.env.PUBLIC_URL}/dashboard.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
      <h1>Welcome to the Dashboard</h1>
        <SwipeableTemporaryDrawer/>
    </div>
  );
}