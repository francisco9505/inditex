import "./Post.css"

export const Post =(props)=>{
    console.log(props);
    return <>
    <div className="post">
        <div className="post__image-container">
            <img className="post__image" src={props['im:image'][2].label}  />
        </div>
        <div className="post__details">
            <span className="post__name">{props['im:name'].label}</span>
            <span className="post__author">{props['im:artist'].label}</span>
        </div>
    </div>
    </>
}