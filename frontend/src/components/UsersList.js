import {useState, useEffect} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

const UsersList = () => {
    const [users, userUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        userUsers(response.data);
    }
    console.log(users)
    return (
        <div>
            {users.map((product, index) => (
                <div key={product.id}>
                    <div>{index + 1}</div>
                    <div>{product.name}</div>
                    <div>
                        <Link to={`/edit/${product.id}`} className="button is-small is-info">Edit</Link>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default UsersList