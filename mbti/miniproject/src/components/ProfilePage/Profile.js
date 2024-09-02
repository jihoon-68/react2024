import { useNavigate } from "react-router-dom";
import "./Profile.css";
const Profile=({logout})=>{
    const navigate = useNavigate();
    const logoutUrl = () => {
        logout();
        navigate("/");
    };
    return(
        <div className="profile-page">
            <div>
                <img src="../../images/bae.jpg"></img>
            </div>
            <div>
                <p>이름</p>
                <p>이메일</p>
                <p>코멘트</p>
            </div>
            <button type="button" onClick={()=>{logoutUrl()}}>로구아웃</button>
        </div>
    )
}

export default Profile;