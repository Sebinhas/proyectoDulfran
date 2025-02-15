import useProfile from "./UseProfile";    
import CompanyProfile from "./components/CompanyProfile/CompanyProfile";
import UserProfile from "./components/UserProfile/UserProfile";

const Profile = () => {
    const { user } = useProfile();

    if (!user) return null;

    return (
        <div className="w-full flex flex-col gap-4 p-4">
            {user.profile_type === 'admin' ? (
                <CompanyProfile company={user} />
            ) : (
                <UserProfile user={user} />
            )}
        </div>
    );
}

export default Profile;