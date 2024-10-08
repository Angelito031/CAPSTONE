import { create } from "zustand";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db, storage }  from "../firebase/firebase.js"
import { collection,  doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import axios from "axios";

const useAuthStore = create((set) => ({
  isAuth: true,
  user: {role: "COMPANY"},
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
  message: null,
  success: false,

  // Setters for success and message
  setSuccess: (success) => set({ success }),
  setMessage: (message) => set({ message }),
  setJobs: (jobs) => set({ jobs }),

  // Fetch jobs from Firestore
  fetchJobs: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'jobLists'));
      const jobsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ jobs: jobsArray });
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  },

  // Create a job in Firestore
  createJob: async (userId, job) => {
    try {
      console.log(userId, job);
      const docRef = doc(db, 'jobLists', userId);
      const docSnap = await getDoc(docRef);

      // Set success and message after creating the job
      set((state) => ({
          success: true,
          message: "Job created successfully",
      }));

      if (docSnap.exists()) {
        // If the document exists, update the jobs array
        const currentData = docSnap.data();
        const updatedJobs = [...(currentData.jobs || []), job];
        await updateDoc(docRef, { jobs: updatedJobs });
      } else {
        // If the document doesn't exist, create a new document with the job
        await setDoc(docRef, { jobs: [job] });
      }

      // Update the jobs state after job creation
      set((state) => ({
        jobs: [...state.jobs, job],
      }));

    } catch (error) {
      // Set failure and message in case of error
      set((state) => ({
        success: false,
        message: "Failed to create job",
      }));
      console.error("Failed to create job", error);
    }
  },

  // Delete a job in Firestore
  deleteJob: async (jobId) => {
    try {
      await deleteDoc(doc(db, 'jobLists', jobId));
      set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== jobId),
      }));
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  },

  // Update a job in Firestore
  updateJob: async (jobId, updatedJob) => {
    try {
      const jobRef = doc(db, 'jobLists', jobId);
      await updateDoc(jobRef, updatedJob);
      set((state) => ({
        jobs: state.jobs.map((job) =>
          job.id === jobId ? { id: jobId, ...updatedJob } : job
        ),
      }));
    } catch (error) {
      console.error("Failed to update job", error);
    }
  },
}));


const useUserStore = create((set) => ({
  users: [],
  message: "",
  isFetching: false,
  success: false,
  setSuccess: (success) => set({ success }),
  setMessage: (message) => set({ message }),
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
  }
  ,
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
  },
  removeAccount: async (uid, role) => {
    try {
      // Only allow deletion if the user is an ADMIN or SADMIN
      if (role === 'ADMIN' || role === 'SADMIN') {
        const response =  await axios.delete(`http://127.0.0.1:9000/api/deleteUser/${uid}`); 
        set({ success: true, message: response.data });
      } else {
        console.log(`User account with ID ${uid} cannot be deleted.`);
      }
    } catch (error) {
      console.error("Failed to delete user account", error.message, error.code);
    }
  },
  createAccount: async (data, lastSegment) => {
    try {
      let email, password, firstname, lastname, companyname;

      if (lastSegment === 'user') {
        email = data.floating_email;
        password = data.floating_password;
        firstname = data.floating_first_name;
        lastname = data.floating_last_name;
      } else {
        email = data.floating_email;
        password = data.floating_password;
        companyname = data.floating_company_name;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
     
      await sendEmailVerification(auth.currentUser);
      const userId = userCredential.user.uid;

      const userDocData = {
        email,
        department: lastSegment === 'user' ? 'College of Engineering and Technology' : companyname,
        role: lastSegment === 'user' ? 'STUDENT' : 'COMPANY',
        uid: userId,
      };

      // Add `firstname`, `lastname`, and `resume` if `lastSegment` is 'user'
      if (lastSegment === 'user') {
        userDocData.firstname = firstname;
        userDocData.lastname = lastname;
        userDocData.resume = {};
      } else {
        // Add `companyname` if `lastSegment` is not 'user'
        userDocData.companyname = companyname;
      }

      await setDoc(doc(db, "users", userId), userDocData);

      await setDoc(doc(db, "usersChats", userId), {
        chats: []
      });

      if(lastSegment === 'company') {
        await setDoc(doc(db, "jobLists", userId), {
          jobs: []
        })
      }

      set({ success: true, message: "User account created & Email verification sent" });
    } catch (error) {
      console.error("Failed to delete user account", error.message, error.code);
      let errorMessage = "An error occurred.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }
      set({ success: false, message: errorMessage });
    }
  },
  adminUpdateUser: async (uid, data, role, adminUid) => {
    try {
      // Update user data in Firestore
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef); 
      const oldEmail = userSnapshot.data().email;
      console.log(data)
      // Allow admins to update user data in Firestore
      if (role === "ADMIN" || role === "SADMIN") {
        await updateDoc(userRef, { ...data });
      }
  
      // Only SADMIN can change the email
      if (role === "SADMIN" && data.email !== oldEmail ) {
        await axios.post(`http://127.0.0.1:9000/api/changeEmail`, {
          uid: uid,            // User ID whose email is being updated
          newEmail: data.email, // The new email address
          adminUid: adminUid,  // The UID of the admin who is changing the email
        });
      }

      if(data.password?.length > 0) {
        await axios.post(`http://127.0.0.1:9000/api/changePassword`, {
          uid: uid,            // User ID whose password is being updated
          newPassword: data.password, // The new password
        });
      }
  
      set({ success: true, message: "User updated successfully" });
    } catch (error) {
      console.error("Failed to update user", error.message, error.code);
  
      // Handle specific error cases if needed
      if (error.code === "auth/requires-recent-login") {
        console.error("The user needs to re-authenticate before this operation can be executed.");
      }
    }
  },
  
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
