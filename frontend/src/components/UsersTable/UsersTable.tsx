import React from "react";
import "./UsersTable.css";

export type UserWithStats = {
    id: number;
    name: string;
    email: string;
    age: number;
    registered: string;
    postCount: number;
    totalViews: number;
    isActive: boolean;
};

type Props = {
    users: UserWithStats[];
};

const UsersTable: React.FC<Props> = ({ users }) => {
    return (
        <div className="table-wrapper">
            <table className="table">
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
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.registered}</td>
                            <td>{user.postCount}</td>
                            <td>{user.totalViews}</td>
                            <td>{user.isActive ? "yes" : "not"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
