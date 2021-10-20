import createFirebase from '../utils/createFirebase';
import {
    collection,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';
import { createDocFromMovie, createDocFromTvShow } from '../utils/createMovieDocument';

const db = createFirebase();

class MovieDataService {
    async getAll() {
        let movies = new Map();

        const querySnapshot = await getDocs(collection(db, 'movies').orderBy('created_at', 'desc'));

        querySnapshot.forEach((doc) => movies.put(doc.id, doc.data()));

        return movies;
    }

    subscribe(observer) {
        const ref = collection(db, 'movies');
        const q = query(ref, orderBy('created_at', 'desc'));

        return onSnapshot(q, observer);
    }

    async get(id) {
        const movieRef = doc(db, 'movies', `${id}`);

        const movieSnap = await getDoc(movieRef);

        if (movieSnap.exists()) {
            return movieSnap.data();
        }

        return false;
    }

    async add(data) {
        const ref = collection(db, 'movies');

        return await addDoc(ref, data);
    }

    async put(id, data) {
        const docRef = doc(db, 'movies', `${id}`);

        await setDoc(docRef, data);
    }

    async update(id, data) {
        const movieRef = doc(db, 'movies', `${id}`);

        await updateDoc(movieRef, data);
    }

    async delete(id) {
        await deleteDoc(doc(db, 'movies', `${id}`));
    }

    async addMovie(mediaType, movie) {
        let model = mediaType === 'movie' ? createDocFromMovie(movie) : createDocFromTvShow(movie);

        return await this.add(model.toDocumentObject());
    }
}

export default new MovieDataService();
