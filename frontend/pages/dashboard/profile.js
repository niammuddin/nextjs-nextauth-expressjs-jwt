import Navbar from '../../components/Navbar';
import withAuth from '../../hoc/withAuth';

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl">Profile</h1>
        <p>This is your profile page.</p>
      </div>
    </div>
  );
};

export default withAuth(Profile, ['admin', 'user']);
