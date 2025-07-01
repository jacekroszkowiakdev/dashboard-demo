import { useEffect, useState } from "react";
import axios from "axios";
import UsersTable, {
    type UserWithStats,
} from "./components/UsersTable/UsersTable";

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
    const [minViews, setMinViews] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>("0");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async (views: number) => {
            try {
                const response = await axios.get<UserWithStats[]>(
                    `http://localhost:3003/api/users-with-high-views?minViews=${views}`
                );
                setUsers(response.data);
            } catch (error: unknown) {
                console.error("Error fetching users:", error);
                setError("Failed to load users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(minViews);
    }, [minViews]);

    const applyFilter = () => {
        const parsed = parseInt(inputValue, 10);
        if (!isNaN(parsed)) {
            setMinViews(parsed);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: 24 }}>
            <h1>User Dashboard</h1>
            <div style={{ marginBottom: 16 }}>
                <label>
                    Minimum total views:{" "}
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{ marginLeft: 8, padding: 4, width: 100 }}
                    />
                </label>
                <button
                    onClick={applyFilter}
                    style={{
                        marginLeft: 12,
                        padding: "6px 12px",
                        cursor: "pointer",
                        background: "#007acc",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                    }}
                >
                    Apply Filter
                </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <UsersTable users={users} />
        </div>
    );
}

export default App;
