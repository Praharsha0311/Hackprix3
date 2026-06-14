import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";


export async function getTickets() {
  try {
    const querySnapshot = await getDocs(
      collection(db, "tickets")
    );

    const tickets: any[] = [];

    querySnapshot.forEach((doc) => {
      tickets.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return tickets;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function registerUser(userData: any) {
  return await addDoc(
    collection(db, "users"),
    userData
  );
}

export async function registerExpert(expertData: any) {
  return await addDoc(
    collection(db, "experts"),
    expertData
  );
}

export async function findUserByEmail(email: string) {
    const q = query(
      collection(db, "users"),
      where("email", "==", email)
    );
  
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
}

export async function findExpertByEmail(email: string) {
const q = query(
    collection(db, "experts"),
    where("email", "==", email)
);

const snapshot = await getDocs(q);

return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
}));
}