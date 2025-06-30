import { useEffect, useState } from "react";
import axios from "axios";

type UserStats = {
    id: number;
    name: string;
    email: string;
    age: number;
    registered: string;
    postCount: number;
    totalViews: number;
    isActive: boolean;
};

function App() {
    const [users, setUsers] = useState<UserStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:3001/users-with-stats")
            .then((res) => setUsers(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: 24 }}>
            <h1>User Dashboard</h1>
            <table
                style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    marginTop: 16,
                }}
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Registered</th>
                        <th>Posts</th>
                        <th>Views</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.age}</td>
                            <td>{u.registered}</td>
                            <td>{u.postCount}</td>
                            <td>{u.totalViews}</td>
                            <td>{u.isActive ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
