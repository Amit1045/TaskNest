import { create } from 'zustand'
const baseUrl="http://localhost:8000/api"

export const useNoteStore = create((set) => ({
    notes: [],
    loading: false,
    error: null,
    filters: {
        status: [],
        priority: []
      },

    fetchNotes: async () => {
        set({ loading: true, error: null })
        try {
            const res = await fetch(`${baseUrl}`)
            const result = await res.json()
            if (result.success === "true") {
                set({ notes: result.data, loading: false })
            } else {
                set({ error: "Failed to load the error" })
            }
        } catch (error) {
            set({ error: err.message, loading: false });
        }
    },

    createEntity: async (formData) => {
        if (!formData.title || !formData.description) {
            return { success: false, message: "All fields are required!" };
        }
        try {
            const res = await fetch(`${baseUrl}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.title,
                    noteDescription: formData.description,
                    Status: formData.status,
                    priority: formData.priority,
                  }),
            });
            const response = await res.json()
            if (response.success === true) {
                //there is the logic to add another notes in the cards
                set((state) => ({ notes: [...state.notes, response.data] }));
                return { success: true, message: "Note created successfully!" }
            } else {
                set({ success:false ,error: "Failed to Create Note" })
            }
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
            if (error.response && error.response.data) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: "Something went wrong." };
            }
        }
    },

    DeleteEntity:async (eid)=>{
        try {
            const res=await fetch(`${baseUrl}/delete/${eid}`,{
                method:"DELETE"
            })
            if(!res.ok){
             return {success: false,message:"Failed to delete product"}
            }
            set((state) => ({
                notes: state.notes.filter((note) => note._id !== eid),
              }));
              return {success:true,message:"Note Deleted successfully!"}

        } catch (error) {
            return {success:false,message:error.message}
        }
    },

    EditEntity: async (id, updatedData) => {
        try {
          const res = await fetch(`http://localhost:8000/api/edit/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          });
      
          const data = await res.json(); // parse JSON from backend
      
          if (!res.ok) {
            // backend returned an error
            return { success: false, message: data.message || "Failed to update note" };
          }
      
          // update local state
          set((state) => ({
            notes: state.notes.map((note) =>
              note._id === id ? { ...note, ...updatedData } : note
            ),
          }));
      
          return { success: true, message: "Note updated successfully!" };
      
        } catch (error) {
          console.error(error);
          return { success: false, message: error.message || "Something went wrong" };
        }
      },
      
      
            
}))