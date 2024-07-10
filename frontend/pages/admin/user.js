import Navbar from '../../components/Navbar';
import withAuth from '../../hoc/withAuth';

const UserPage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl">UserPage</h1>
        <p>Welcome to your UserPage!</p>
      </div>
    </div>
  );
};

export default withAuth(UserPage, ['user', 'admin']);
