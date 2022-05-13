import AuthService from "../services/auth.service";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();


    return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Welcome</strong> to your profile
                    </h3>
                </header>
                <h3>Account info:</h3>
                <p>
                    <strong>Username: </strong>{currentUser.username}
                </p>
                <p>
                    <strong>Email:</strong> {currentUser.email}
                </p>
                <p>
                     {currentUser.roles && currentUser.roles.map((role, index) => <p key={index}><strong>Authorities: </strong>{role}</p>)}
                </p>
            </div>
        )
};


export default Profile;
