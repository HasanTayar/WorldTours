// components/UserProfile.js
import Settings from './Settings';

function UserProfile({ user }) {
    console.table(user);
    return (
        <div>
            <Settings user={user} />
        </div>
    );
}

export default UserProfile;
