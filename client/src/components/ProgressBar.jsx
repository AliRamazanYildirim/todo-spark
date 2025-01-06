const ProgressBar = ({progress}) => {
    const colors = [
        "#301a4b",
        "#6db1bf",
        "#3f6c51",
        "#3f6c51",
        "#450920",
        "#001524",
        "#603808"
    ]
    
    const randomColor = colors[Math.floor(Math.random()*colors.length)];
    
    return<div className="progress-bar">
        <div className="inner-bar"
        style={{width:`${progress}%`, backgroundColor:randomColor}}></div>
    </div>
}

export default ProgressBar;