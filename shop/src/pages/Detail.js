import {useParams } from "react-router-dom";

function Detail(props) {
    let {id} = useParams();
    let item = props.shoes.find((x)=>{
        return x.id == id; 
    })
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src="https://codingapple1.github.io/shop/shoes1.jpg" alt="신발"width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{item.title}</h4>
                        <p>{item.content}</p>
                        <p>{item.price}</p>
                        <button className="btn btn-danger">주문하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Detail;