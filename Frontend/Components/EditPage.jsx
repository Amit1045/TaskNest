import { useNoteStore } from "../customHook/useNoteStore";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Editpage = ({ entity, isOpen, onClose }) => {
    const EditEntity = useNoteStore((state) => state.EditEntity);
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
      title: "",
      noteDescription: "",
      Status: "Active",
      priority:"Medium"
    });
  
    useEffect(() => {
      if (entity) {
        setFormData({
          title: entity.title || "",
          noteDescription: entity.noteDescription || "",
          Status: entity.Status || "Active",
          priority: entity.priority || "Medium",
        });
      }
    }, [entity]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await EditEntity(entity._id, formData);
          if (!res) {
            alert("Something went wrong!");
            return;
          }
          alert(res.message || "Updated successfully!");
         
          if (res.success){     
            onClose();
            navigate('/')
        
        }
        } catch (error) {
          console.error(error);
          alert("Update failed: " + error.message);
        }
      };
  
    return (
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl p-6 w-96 shadow-lg animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
  
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="border px-3 py-2 rounded-lg outline-none text-black"
              required
            />
            <textarea
              name="noteDescription"
              value={formData.noteDescription}
              onChange={handleChange}
              placeholder="Description"
              className="border px-3 py-2 rounded-lg outline-none resize-none text-black"
              rows={4}
            />
            <select
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg outline-none text-black"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border px-3 py-2 rounded-lg outline-none text-black"
            >
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
  
            <div className="flex justify-end gap-3 mt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Editpage;