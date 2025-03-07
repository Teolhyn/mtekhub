import { useState, useEffect } from "react";
import ChemicalTable from "../components/chemicaltable";
import ChemicalOrderModal from "../components/chemicalordermodal";

import { RestService } from "../api";

const ChemicalOrders = () => {
  const [restCheck, setRestCheck] =
    useState<Awaited<ReturnType<typeof RestService.restRestCheckRetrieve>>>();
  const [chemicalOrders, setChemicalOrders] = useState<any[]>([]); // State for storing chemical orders

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


  return (
    <>
      <h2>Rest API</h2>
      <p>{restCheck?.message}</p>

      {/* Display list of chemical orders in a table */}
      <h3>Chemical Orders</h3>
      <ChemicalTable orders={chemicalOrders} />

      {/* Button to open the request form */}
      <ChemicalOrderModal />
      {/* Modal for adding a new chemical order */}
    </>
  );
};

export default ChemicalOrders;

