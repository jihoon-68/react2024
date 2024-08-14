import Photo from "../Photo.js";
export default ({photoArr}) =>{
    
    return(<div className="w3-content">{
        photoArr.map(function (item, idx){
            return < Photo key={item.no} item={item.img} />
        })
    }</div>)
}