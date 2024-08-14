const Photo = ({key, item})=>{
    
    return (
        <div className="w3-row w3-margin" key={key}>
            <div className="w3-third">
            <img src={item} style={{width:"100%",minHeight:"200px"}}/>
            </div>
            <div className="w3-twothird w3-container">
            <h2>5 Terre</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            </div>
        </div>
    );
}

export default Photo;