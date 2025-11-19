import { useState, useEffect } from "react";
import {
    collection, addDoc, getDoc, getDocs,
    query, orderBy, limit
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const useFirebase = () => {
    const [loading, setLoading] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);

    const saveScore = async (playerName, score) => {
        try {
            setLoading(true);
            await addDoc(collection(db, 'scores'), {
                playerName,
                score,
                timestamp: new Date()
            });
            await fetchLeaderboard();

        } catch (error) {
            console.error('Error saving score:', error);

        } finally {
            setLoading(false);
        }
    }

    const fetchLeaderboard = async () => { 
        try {
            setLoading(true);
            const q = query(
                collection(db, 'scores'),
                orderBy('scores', 'desc'),
                limit(10)
            );
            const querySnapshot = await getDocs(q);
            const scores = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLeaderboard(scores);

        } catch (error) {
            console.error('Error fetching leaderboard', error);
            
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return { leaderboard, saveScore, loading, fetchLeaderboard };
};