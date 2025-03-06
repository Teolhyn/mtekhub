import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import cookie from "cookie";
import { RestService } from "../api";

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);
  const [restCheck, setRestCheck] =
    useState<Awaited<ReturnType<typeof RestService.restRestCheckRetrieve>>>();
  const [chemicalOrders, setChemicalOrders] = useState<any[]>([]); // State for storing chemical orders
  const [showForm, setShowForm] = useState(false); // State to toggle the order request form
  const [newOrder, setNewOrder] = useState({ chemical_name: "", cas_number: "", orderer: "" }); // New order data

  useEffect(() => {
    // Fetch the REST API data
    async function onFetchRestCheck() {
      setRestCheck(await RestService.restRestCheckRetrieve());
    }

    // Fetch the list of chemical orders from /api/chemicalorder/
    async function onFetchChemicalOrders() {
      try {
        const response = await fetch("/api/chemicalorder/"); // API call to fetch chemical orders
        if (response.ok) {
          const data = await response.json(); // Parse the JSON data
          setChemicalOrders(data.results); // Set the fetched data from 'results'
        } else {
          console.error("Failed to fetch chemical orders");
        }
      } catch (error) {
        console.error("Error fetching chemical orders:", error);
      }
    }

    // Call the functions to fetch data
    onFetchRestCheck();
    onFetchChemicalOrders();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // POST request to create a new order (Assuming backend API exists for this)

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
      <h2>Rest API</h2>
      <p>{restCheck?.message}</p>

      {/* Display list of chemical orders in a table */}
      <h3>Chemical Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Chemical Name</th>
            <th>CAS Number</th>
            <th>Orderer</th>
          </tr>
        </thead>
        <tbody>
          {chemicalOrders.length > 0 ? (
            chemicalOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.chemical_name}</td>
                <td>{order.cas_number}</td>
                <td>{order.orderer}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No chemical orders available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Button to open the request form */}
      <Button variant="primary" onClick={() => setShowForm(true)}>
        Request Order
      </Button>

      {/* Modal for adding a new chemical order */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request New Chemical Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="chemical_name">
              <Form.Label>Chemical Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter chemical name"
                name="chemical_name"
                value={newOrder.chemical_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="cas_number">
              <Form.Label>CAS Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CAS number"
                name="cas_number"
                value={newOrder.cas_number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="orderer">
              <Form.Label>Orderer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="orderer"
                value={newOrder.orderer}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Order
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Button variant="outline-dark" onClick={() => setShowBugComponent(true)}>
        Click to test if Sentry is capturing frontend errors! (Should only work
        in Production)
      </Button>
      {/* NOTE: The next line intentionally contains an error for testing frontend errors in Sentry. */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {showBugComponent && (showBugComponent as any).field.notexist}
    </>
  );
};

export default Home;

