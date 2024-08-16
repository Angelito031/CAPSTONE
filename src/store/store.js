import { create } from "zustand";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage }  from "../firebase/firebase.js"
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

const useAuthStore = create((set) => ({
  isAuth: false,
  user: null,
  servererror: null,
  currentUser: null,
  success: false,
  setSuccess: (success) => set({ success }),
  setUser: (user) => set({ user }),
  setIsAuth: (isAuth) => set({ isAuth }),
  setServerError: (servererror) => set({ servererror }),
  setCurrentUser: (currentUser) => set({ currentUser }),
  login: async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const userRef = doc(db, "users", userCredential.user.uid);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
      if(auth.currentUser.emailVerified){
        set({ user: userData, isAuth: true,  currentUser: auth.currentUser.uid });
      }else{
        set({servererror: "Please verify your email first"});
      }
      
    } catch (error) {
      console.error("Login failed", error.message, error.code);
      let errorMessage = "An error occurred.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Wrong email or password.";
      }else if (error.code === "auth/email-not-verified") {
        errorMessage = "Please verify your email first.";
      }

      set({servererror: errorMessage });
    }
  },
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, isAuth: false,  currentUser: null });
    } catch (error) {
      console.error("Logout failed", error.message, error.code);
    }
  },
  register: async (userDetails) => {
    const { email, password, firstname, lastname } = userDetails;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        set({ success: true });
        await sendEmailVerification(auth.currentUser);
        const userId = userCredential.user.uid;
    
        await setDoc(doc(db, "users", userId), {
          firstname,
          lastname,
          email,
          department: "College of Engineering and Technology",
          role: "STUDENT",
          uid: userId,
          resume: {}
        });
    
        await setDoc(doc(db, "usersChats", userId), {
          chats: []
        });
      
    } catch (error) {
      console.error("Registration failed", error.message, error.code);
      let errorMessage = "An error occurred.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }

      set({servererror: errorMessage });
    }
  },
  forgotpassword: async (email) => {
    try {
      let isEmailExist = false;
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      
      const qSnapshot = await getDocs(q);
      qSnapshot.forEach((doc) => {
        isEmailExist = true;
        console.log(doc);
      })
      
      // Send password reset email
      if(isEmailExist){
        await sendPasswordResetEmail(auth, email);
        set({ success: true });
      }else{
        set({ servererror: "Email does not exist." });
      }
  
    } catch (error) {
      console.log("Failed to send password reset email", error.message, error.code);
      if (error.code === "auth/invalid-email") {
        set({ servererror: "Invalid email format." });
      } else {
        set({ servererror: "Failed to send password reset email." });
      }
    }
  }
}));

const useJobStore = create((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  fetchJobs: async () => {
    try {
      const response = await axios.get("/api/jobs");
      set({ jobs: response.data });
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  },
}));

const useUserStore = create((set) => ({
  users: [],
  isFetching: false,
  setUsers: (users) => set({ users }),
  fetchUsers: async () => {
    set({ isFetching: true });
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs.map(doc => doc.data()).filter(user => user.role !== 'SADMIN' && user.role !== 'ADMIN');

      set({ users: usersList, isFetching: false });
    } catch (error) {
      console.error("Failed to fetch users", error.message, error.code);
      set({ isFetching: false });
    }
  },
  updateUser: async (userDetails, image) => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const imageRef = ref(storage, `images/${auth.currentUser.uid}/${image.name}`);
      
      await uploadBytes(imageRef, image).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        userDetails.profile = downloadURL;
  
        await updateDoc(userRef, { ...userDetails });
      });
  
    } catch (error) {
      console.error("Failed to update user", error.message, error.code);
      // Handle specific error cases if needed
      if (error.code === "auth/requires-recent-login") {
        console.error("The user needs to re-authenticate before this operation can be executed.");
      }
    }
  },  
  updateResume: async (resume, image) => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const imageRef = ref(storage, `images/${auth.currentUser.uid}/resume/${image.name}`);
      
      await uploadBytes(imageRef, image).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        resume.image = downloadURL;
  
        await updateDoc(userRef, { resume });
      });
      
    } catch (error) {
      console.error("Failed to update user", error.message, error.code);
      // Handle specific error cases if needed
      if (error.code === "auth/requires-recent-login") {
        console.error("The user needs to re-authenticate before this operation can be executed.");
      }
    }
  }
}));

const useSearchStore = create((set) => ({
  searchQuery: "",
  setSearchQuery: (search) => set({ searchQuery: search }),
  search: async (query) => {
    try {
      const response = await axios.get(
        `/api/jobs?search=${encodeURIComponent(query)}`,
      );
      set({ jobs: response.data });
    } catch (error) {
      console.error("Failed to search jobs", error);
    }
  },
}));

export { useAuthStore, useJobStore, useUserStore, useSearchStore };
