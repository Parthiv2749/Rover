
import roverVid from '../../resource/images/RoverVid.mp4';
import './Homepage.css';
import teamPic from '../../resource/images/Team.jpg';
import Mentor from '../../resource/images/Member/Mentor.png';
import Shan from '../../resource/images/Member/Shan.png';
import Raj from '../../resource/images/Member/Raj.png';
import Parth from '../../resource/images/Member/Parthiv.png';
import Dhruvang from '../../resource/images/Member/Dhruvang.png';
import Abhishek from '../../resource/images/Member/Abhishek.png';

function Homepage(){
    return(

    <div>
        <div id="Main" className="Page1">
            <div className="introduction">

                <h1>
                    <span className="name">Introducing <br/>    Team Fusion,<br/></span>
                    <span className="intro"> Robofest 4.0 </span>
                </h1>
                <video autoPlay loop muted plays-inline>
                    <source src={roverVid} type="video/mp4"/>
                </video>
            </div>
       </div>
      
       <div className="about">
            <center><div className="AboutT">About Us</div></center>
            <img src={teamPic} alt=""/>
            <p>Rover Team Fusion is a highly energetic team working on innovative robotic solutions in space exploration and research. They put together engineering, programming, and design into a multispace and multi-environment rovers as the team collaboratively creates multi-terrain and multi-environmental projects. Most of their projects focus on state-of-the-art technologies primarily concerning autonomous navigation, sensor integration, and data collection activities focused on advancing our knowledge and acuity of planetary bodies and other challenging landscapes. Thus, by teamwork, inspiration, and creativity, Rover Team Fusion strives for the limits of robotic discovery to be exceeded for betterment in the field.

            </p>
       </div>

       <div className="Member">
        <center><div className="AboutT">Team Members</div></center>
        <div className="Mentor">
            <div className="EachMember">
                <img src={Mentor} alt="" />
                <p>
                    Dr. Viranchi Pandya
                    Team Mentor 
                    Assistant Professor
                </p>
            </div>
        </div>
        
        <div className="TemaMember">
            
            <div className="EachMember">
                <img src={Shan} alt="" />
                <p>
                    Shaan Bhuva
                    Team Leader
                    Semester III
                    Electronics and communication Department
                </p>
            </div>
            <div className="EachMember">
                <img src={Raj} alt="" />
                <p>
                    Raj Bambhaniya
                    Semester V
                    Electrical Department
                </p>
            </div>
            <div className="EachMember">
                <img src={Parth} alt="" />
                <p>
                    Parthiv Vekariya
                    Semester III
                    Computer science Department
                </p>
            </div>
            <div className="EachMember">
                <img src={Abhishek} alt="" />
                <p>
                    Abhishek Shukla
                    Semester III
                    Mechanical Department
                </p>
            </div>
            <div className="EachMember">
                <img src={Dhruvang} alt="" />
                <p>
                    Dhruvang Patel
                    Semester III
                    Electronics and communication Department
                </p>
            </div>
        </div>
       </div>
    </div>   
    );
}

export default Homepage;