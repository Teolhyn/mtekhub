import { useState } from "react";
import cookie from "cookie";

const ChemicalOrderModal = () => {

  const [showForm, setShowForm] = useState(false); // State to toggle the order request form
  const [newOrder, setNewOrder] = useState({ chemical_name: "", cas_number: "", orderer: "" }); // New order data
  const [chemicalOrders, setChemicalOrders] = useState<any[]>([]); // State for storing chemical orders

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { csrftoken } = cookie.parse(document.cookie);
    try {
      const response = await fetch("/api/chemicalorder/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": csrftoken,
        },
        body: JSON.stringify(newOrder),
      });
      if (response.ok) {
        const data = await response.json();
        setChemicalOrders((prevOrders) => [...prevOrders, data]);
        setShowForm(false); // Close the form after submitting
        setNewOrder({ chemical_name: "", cas_number: "", orderer: "" }); // Reset form
      } else {
        console.error("Failed to submit new order");
      }
    } catch (error) {
      console.error("Error submitting new order:", error);
    }
  };
  return (
    <>
      <button className="btn flex justify-center" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}>
        Order Request
      </button>
      <dialog id="my_modal_1">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="relative bg-white p-4 rounded-md">
          <h2 className="text-2xl">Request an Chemical order</h2>
          <p>Instructions Lorem ipsum stuff here</p>
          <form onSubmit={handleFormSubmit} className="form-control flex flex-col gap-4">
            <input name="chemical_name" onChange={handleInputChange} required type="text" placeholder="Chemical Name" value={newOrder.chemical_name} className="input input-bordered w-full max-w-md" />
            <input name="cas_number" onChange={handleInputChange} required type="text" placeholder="CAS number" value={newOrder.cas_number} className="input input-bordered w-full max-w-md" />
            <input name="orderer" onChange={handleInputChange} required type="text" placeholder="Orderer" value={newOrder.orderer} className="input input-bordered w-full max-w-md" />
            <button type="submit" className="button">Submit</button>
          </form>
          <button className="button" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).close()}>Close</button>
        </div>
      </dialog>
    </>
  );
};

export default ChemicalOrderModal;
