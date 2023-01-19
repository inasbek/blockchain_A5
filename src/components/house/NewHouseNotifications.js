import {Link} from 'react-router-dom';

function NewHouseNotification(){
    return(
    <div class="container2">
        <div className="row">
            <div className="text-center">
                <span className="display"> 🥰 Welcome 🥰 </span>
                <div className="lead">
                   Thank you for your purchase! Click to see your realEstates or back to home to buy more!
                </div>
                <Link to="/myrealEstates" className="btn">
                   See My RealEstates
                </Link>
                <Link to="/" className="btn">
                   Back to Home
                </Link>
            </div>
        </div>
    </div>
);
}

export default NewHouseNotification;
