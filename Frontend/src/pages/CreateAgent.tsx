import { useState } from "react";
import axios from "axios";

const CreateAgent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "NETWORK",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/users/agent",
        {
          ...formData,
          role: "AGENT",
        }
      );

      alert("Agent created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        specialization: "NETWORK",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create agent");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">
        Create Agent
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        />

        <select
          value={formData.specialization}
          onChange={(e) =>
            setFormData({
              ...formData,
              specialization: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
        >
          <option value="NETWORK">
            NETWORK
          </option>

          <option value="ACCESS">
            ACCESS
          </option>

          <option value="SOFTWARE">
            SOFTWARE
          </option>

          <option value="OTHER">
            OTHER
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Create Agent
        </button>
      </form>
    </div>
  );
};

export default CreateAgent;