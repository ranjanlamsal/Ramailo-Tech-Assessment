import Footer from "../footer/footer";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
import { url } from "../../config/api";
import "./post.css"

const Post = ({ id, title, content, editable = false, setPosts }) => {
    const navigate = useNavigate()
    return (

        <Card title={title} bordered={true} style={{ width: "100%" }}>
            <p>{content}</p>
            {editable ?
                <>
                    <MdEdit size={24} className="clickable" onClick={() => {
                        navigate(`create/${id}`)
                    }} /> <MdDelete size={24} color="red" className="clickable" onClick={() => {
                        url.delete(`post/update_post/${id}`).then(res => {
                            navigate("/")
                            setPosts(post => post.filter(el => el.id != id))
                        }).catch(err => {
                            alert(err.message)
                        })
                    }} />
                </> : null}
        </Card>
    )
}
export default Post