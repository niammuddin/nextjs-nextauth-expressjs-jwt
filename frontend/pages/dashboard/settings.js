import Navbar from '../../components/Navbar';
import withAuth from '../../hoc/withAuth';

const Settings = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl">Settings</h1>
        <p>This is your settings page.</p>
      </div>
    </div>
  );
};

export default withAuth(Settings, ['admin']);
