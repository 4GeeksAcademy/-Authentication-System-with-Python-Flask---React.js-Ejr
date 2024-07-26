import { db } from "../../firebaseConfig";
import { collection, getDocs, doc, updateDoc, addDoc,deleteDoc } from "firebase/firestore";

const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		programs: [],
		totalHours: [],
		inputStatusMessage: "",
	  },
	  actions: {
		getProgram: async () => {
			try {
			  const querySnapshot = await getDocs(collection(db, "Programs"));
			  const data = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			  }));
			  let sortedData = data.sort(
				(a, b) => a.program_number - b.program_number
			  );
			  setStore({ programs: sortedData });
			  return data;
			} catch (error) {
			  console.log("Error loading programs from Firestore", error);
			}
		  },
		  updateProgram: async (programData) => {
			programData.forEach( async (program)=>{
				try {
					const programRef = doc(db, "Programs", program.id);
					await updateDoc(programRef, program);
	  
					setStore({ inputStatusMessage: "Programs successfully updated!" });
		  
					// Fetch updated programs to refresh the state
					const updatedPrograms = await getDocs(collection(db, "Programs"));
					const data = updatedPrograms.docs.map((doc) => ({
					  id: doc.id,
					  ...doc.data(),
					}));
					let sortedData = data.sort(
					  (a, b) => a.program_number - b.program_number
					);
					console.log(sortedData,"sortedData")
					setStore({ programs: sortedData });
		  
					return data;
				  } catch (error) {
					setStore({
					  inputStatusMessage: "Programs not updated, please try again",
					});
					console.log("Error updating program in Firestore", error);
				  }
			})
			
		  },
		  createProgram: async (programData) => {
			try {
			  // Add a new document in collection "Programs"
			  await addDoc(collection(db, "Programs"), programData);
			  setStore({ inputStatusMessage: "Program successfully created!" });
		
			  // Fetch updated programs to refresh the state
			  const updatedPrograms = await getDocs(collection(db, "Programs"));
			  const data = updatedPrograms.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			  }));
			  let sortedData = data.sort(
				(a, b) => a.program_number - b.program_number
			  );
			  setStore({ programs: sortedData });
		
			  return data;
			} catch (error) {
			  setStore({ inputStatusMessage: "Program not created, please try again" });
			  console.error("Error creating program in Firestore", error);
			}
		  },
		clearInputStatusMessage: () => {
		  setStore({ inputStatusMessage: "" });
		},
  
		addTotalHours: () => {
		  let totalHoursArray = [];
		  let store = getStore();
		  store.programs.forEach((program) => {
			let weekday = [
			  "monday",
			  "tuesday",
			  "wednesday",
			  "thursday",
			  "friday",
			  "saturday",
			  "sunday",
			];
			let programHours = { name: program.name };
  
			weekday.forEach((weekday) => {
			  const startTimeStr = program[`${weekday}_start`];
			  const endTimeStr = program[`${weekday}_end`];
  
			  // Parse the time strings into Date objects
			  const startTime = new Date(`01/01/2022 ${startTimeStr}`);
			  const endTime = new Date(`01/01/2022 ${endTimeStr}`);
  
			  // Calculate the difference between the start and end times in milliseconds
			  const timeDiff = endTime.getTime() - startTime.getTime();
  
			  // Convert the time difference from milliseconds to hours
			  const hoursDiff = timeDiff / (1000 * 60 * 60);
			  // const widthValue = hoursDiff * 100;
			  // Round the result to two decimal places
			  const totalHours = hoursDiff.toFixed(2);
  
			  programHours[`${weekday}_hours`] = totalHours;
			});
			totalHoursArray.push(programHours);
		  });
  
		  setStore({ totalHours: totalHoursArray });
		},
		deleteProgram: async (programId) => {
			try {
			  const programRef = doc(db, "Programs", programId);
			  await deleteDoc(programRef);
		
			  setStore({ inputStatusMessage: "Program successfully deleted!" });
		
			  // Fetch updated programs to refresh the state
			  const updatedPrograms = await getDocs(collection(db, "Programs"));
			  const data = updatedPrograms.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			  }));
			  let sortedData = data.sort(
				(a, b) => a.program_number - b.program_number
			  );
			  setStore({ programs: sortedData });
		
			 
			} catch (error) {
			  setStore({ inputStatusMessage: "Program not deleted, please try again" });
			  console.log("Error deleting program in Firestore", error);
		
			  // Clear the inputStatusMessage after a delay even on error
			 
			}
		  },
	  },
	};
  };
  
  export default getState;