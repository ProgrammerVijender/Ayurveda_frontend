import { useEffect, useState } from 'react';
import axios from 'axios';
import avatar from '../temp/avataar.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RecommendUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          'http://localhost:8181/api/v1/user/othersWithPosts',
          { withCredentials: true }
        );

        const userList = Array.isArray(response.data)
          ? response.data
          : response.data.users;

        setUsers(userList || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch recommended users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="p-6 max-w-md mx-auto rounded-xl bg-white/70 backdrop-blur-md border border-blue-200 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 tracking-wide">🌿 Other Users</h2>

      {loading && <p className="text-gray-500 text-sm">Loading users...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {!loading && users.length === 0 && !error && (
        <p className="text-gray-500 text-sm">No users found.</p>
      )}

      <div className="flex flex-col gap-5">
        {Array.isArray(users) &&
          users.map((user) => (
            <div
              key={user.id || user._id}
              className="flex items-center p-4 rounded-xl bg-white/90 backdrop-blur-md shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.015] transition-transform duration-200"
            >
              <img
                src={avatar}
                alt={user.fullname}
                className="w-14 h-14 rounded-full ring-2 ring-blue-400 object-cover shadow-sm mr-4"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">{user.fullname}</p>
                <p className="text-sm text-gray-500">📝 Posts: {user.postCount}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecommendUsers;