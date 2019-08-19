import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const result = await axios(
                'https://www.bookmarks.dev/api/public/bookmarks',
            );
            setData(result.data);
        };

        fetchData();
    }, []);


    return (

        <div>
            <h1>Latest Public Bookmarks</h1>
            {data.map((bookmark) => (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{bookmark.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{bookmark.location}</h6>
                        <p className="card-text">{bookmark.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
