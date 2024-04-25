import { HomeOutlined, PlusCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import "./footer.css"

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className='footer'>


            <div className='footer_main_container'>
                <div className='footer_inner_container'>
                    <Link to='/'>
                        <Button type="primary" >
                            <HomeOutlined twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />
                        </Button>
                    </Link>
                    <Link to='/create'>
                        <Button type="primary" >
                            <PlusCircleOutlined twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />
                        </Button>
                    </Link>

                    <Button onClick={() => {
                        localStorage.clear()
                        navigate("/login")
                    }} type="primary" >
                        <LogoutOutlined twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />
                    </Button>



                </div>

            </div>
        </div>
    )
}

export default Footer
