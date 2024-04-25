import "./home.css"
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import { Card } from 'antd';
import Post from "../post/post";
import { url } from "../../config/api";


const Home = () => {
    const [posts, setPosts] = useState([])
    const userId = localStorage.getItem("userId")
    useEffect(() => {
        url.get("post/get_post").then(res => {
            console.log(res.data);
            setPosts(res.data)
        })
    }, [])
    return (
        <>
            <div className="home_main_container" style={{ width: "100%", padding: "30px", paddingBottom: "100px" }}>
                <div className="home_inner_container" >
                    {
                        posts.map(el => {
                            console.log(el);
                            return (
                                <Post title={el.title} content={el.content} id={el.id} editable={el.created_by == userId} setPosts={setPosts} />
                            )
                        })
                    }
                </div>


            </div >
            <Footer />
        </>
    )
}

export default Home;