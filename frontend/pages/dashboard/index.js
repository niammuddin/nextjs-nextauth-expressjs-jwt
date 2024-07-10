import Navbar from '../../components/Navbar';
import withAuth from '../../hoc/withAuth';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  );
};

export default withAuth(Dashboard, ['admin', 'user']);
