// import React, { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import { useNavigate } from "react-router-dom";
// import { Button, Modal, Form, Container } from "react-bootstrap";
// import "./home.css";
// import { addTransaction, getTransactions } from "../../utils/ApiRequest";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Spinner from "../../components/Spinner";
// import TableData from "./TableData";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import Analytics from "./Analytics";

// const Home = () => {
//   const navigate = useNavigate();

//   const toastOptions = {
//     position: "bottom-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   };
//   const [cUser, setcUser] = useState();
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const [frequency, setFrequency] = useState("7");
//   const [type, setType] = useState("all");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [view, setView] = useState("table");
//   const [highestExpenseMonth, setHighestExpenseMonth] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const handleStartChange = (date) => {
//     setStartDate(date);
//   };

//   const handleEndChange = (date) => {
//     setEndDate(date);
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     const avatarFunc = async () => {
//       if (localStorage.getItem("user")) {
//         const user = JSON.parse(localStorage.getItem("user"));
//         console.log(user);

//         if (user.isAvatarImageSet === false || user.avatarImage === "") {
//           navigate("/setAvatar");
//         }
//         setcUser(user);
//         setRefresh(true);
//       } else {
//         navigate("/login");
//       }
//     };

//     avatarFunc();
//   }, [navigate]);

//   // const fetchHighestExpenseMonth = async () => {
//   //   try {
//   //     console.log("Fetching highest expense month...");
//   //     const response = await axios.post('http://localhost:8081/api/v1/transaction/highest-expense-month', {
//   //       userId: cUser._id,
//   //       year: selectedYear
//   //     });
  
//   //     console.log("API response:", response.data);
  
//   //     const { data } = response;
  
//   //     if (data.success) {
//   //       setHighestExpenseMonth(data.highestExpenseMonth);
//   //       toast.success("Fetched highest expense month successfully");
//   //     } else {
//   //       toast.error(data.message);
//   //     }
//   //   } catch (err) {
//   //     console.error("Error fetching highest expense month:", err);
//   //     toast.error("Failed to fetch highest expense month");
//   //   }
//   // };
  


//   // Function to fetch the highest expense month from the backend
//   const fetchHighestExpenseMonth = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:8081/api/v1/transaction/highest-expense-month",
//         {
//           userId: cUser._id,
//           year: selectedYear,
//         }
//       );

//       const { data } = response;

//       if (data.success) {
//         setHighestExpenseMonth(data.highestExpenseMonth);
//         toast.success("Fetched highest expense month successfully");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       console.error("Error fetching highest expense month:", err);
//       toast.error("Failed to fetch highest expense month");
//     }
//     setLoading(false);
//   };

//   // Function to convert the month number to a month name
//   const getMonthName = (monthNumber) => {
//     const date = new Date();
//     date.setMonth(monthNumber - 1); // Month number is 1-indexed, so we subtract 1
//     return date.toLocaleString("default", { month: "long" });
//   };

//   const [values, setValues] = useState({
//     title: "",
//     amount: "",
//     description: "",
//     category: "",
//     date: "",
//     transactionType: "",
//   });

//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleChangeFrequency = (e) => {
//     setFrequency(e.target.value);
//   };

//   const handleSetType = (e) => {
//     setType(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { title, amount, description, category, date, transactionType } =
//       values;

//     if (
//       !title ||
//       !amount ||
//       !description ||
//       !category ||
//       !date ||
//       !transactionType
//     ) {
//       toast.error("Please enter all the fields", toastOptions);
//     }
//     setLoading(true);

//     const { data } = await axios.post(addTransaction, {
//       title: title,
//       amount: amount,
//       description: description,
//       category: category,
//       date: date,
//       transactionType: transactionType,
//       userId: cUser._id,
//     });

//     if (data.success === true) {
//       toast.success(data.message, toastOptions);
//       handleClose();
//       setRefresh(!refresh);
//     } else {
//       toast.error(data.message, toastOptions);
//     }

//     setLoading(false);
//   };

//   const handleReset = () => {
//     setType("all");
//     setStartDate(null);
//     setEndDate(null);
//     setFrequency("7");
//     setSelectedYear(new Date().getFullYear());
//     setHighestExpenseMonth(null); 
//   };


  


//   useEffect(() => {

//     const fetchAllTransactions = async () => {
//       try {
//         setLoading(true);
//         console.log(cUser._id, frequency, startDate, endDate, type);
//         const { data } = await axios.post(getTransactions, {
//           userId: cUser._id,
//           frequency: frequency,
//           startDate: startDate,
//           endDate: endDate,
//           type: type,
//         });
//         console.log(data);
  
//         setTransactions(data.transactions);
  
//         setLoading(false);
//       } catch (err) {
//         // toast.error("Error please Try again...", toastOptions);
//         setLoading(false);
//       }
//     };

//     fetchAllTransactions();
//   }, [refresh, frequency, endDate, type, startDate]);

//   const handleTableClick = (e) => {
//     setView("table");
//   };

//   const handleChartClick = (e) => {
//     setView("chart");
//   };

//   return (
//     <>
//       <Header />

//       {loading ? (
//         <>
//           <Spinner />
//         </>
//       ) : (
//         <>
//           <Container
//             style={{ position: "relative", zIndex: "2 !important" }}
//             className="mt-3"
//           >
//             <div className="filterRow">
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '20px',
//               }}>
//                 <Form.Group className="mb-3" controlId="formSelectFrequency">
//                   <Form.Label>Select Frequency</Form.Label>
//                   <Form.Select
//                     name="frequency"
//                     value={frequency}
//                     onChange={handleChangeFrequency}
//                     style={{ width: '200px' }} 
//                   >
//                     <option value="7">Last Week</option>
//                     <option value="30">Last Month</option>
//                     <option value="365">Last Year</option>
//                     <option value="custom">Custom</option>
//                   </Form.Select>
//                 </Form.Group>
//               </div>
              

//               <div className="text-black type">
//                 <Form.Group className="mb-3" controlId="formSelectFrequency">
//                   <Form.Label>Type</Form.Label>
//                   <Form.Select
//                     name="type"
//                     value={type}
//                     onChange={handleSetType}
//                     style={{ width: '200px' }}
//                   >
//                     <option value="all">All</option>
//                     <option value="expense">Expense</option>
//                     <option value="credit">Earned</option>
//                   </Form.Select>
//                 </Form.Group>
//               </div>

//               <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                 }}>
//                 <FormatListBulletedIcon
//                   sx={{ cursor: "pointer" }}
//                   onClick={handleTableClick}
//                   style={{
//                     color: view === "table" ? '#1976d2' : '#757575', // Active and inactive icon colors
//                     fontSize: '24px',
//                     transition: 'color 0.3s ease',
//                     transform: view === "table" ? 'scale(1.1)' : 'scale(1)',
//                   }}
//                 />
//                 <BarChartIcon
//                   sx={{ cursor: "pointer" }}
//                   onClick={handleChartClick}
//                   style={{
//                     color: view === "chart" ? '#1976d2' : '#757575', // Active and inactive icon colors
//                     fontSize: '24px',
//                     transition: 'color 0.3s ease',
//                     transform: view === "chart" ? 'scale(1.1)' : 'scale(1)',
//                   }}
//                 />
//               </div>
//               <div>
//               <label htmlFor="year">Select Year: </label>
//       <select
//         id="year"
//         value={selectedYear}
//         onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//       >
//         {[...Array(5)].map((_, index) => {
//           const year = new Date().getFullYear() - index;
//           return (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           );
//         })}
//       </select>

//       <button
//         onClick={fetchHighestExpenseMonth}
//         style={{
//           backgroundColor: "#1976d2",
//           border: "none",
//           color: "white",
//           padding: "10px 20px",
//           borderRadius: "5px",
//           marginLeft: "10px",
//         }}
//         disabled={loading}
//       >
//         {loading ? "Loading..." : "Highest Expense Month"}
//       </button>
//               </div>
//               <div>
//                 <Button onClick={handleShow} style={{
//                   backgroundColor: '#1976d2',
//                   border: 'none',
//                   color: 'white',
//                   padding: '10px 20px',
//                   borderRadius: '5px',
//                 }}>
//                   Add New
//                 </Button>
//                 <Button onClick={handleShow} className="mobileBtn" >
//                   +
//                 </Button>
//                 <Modal show={show} onHide={handleClose} centered>
//                   <Modal.Header closeButton>
//                     <Modal.Title>Add Transaction Details</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     <Form>
//                       <Form.Group className="mb-3" controlId="formName">
//                         <Form.Label>Title</Form.Label>
//                         <Form.Control
//                           name="title"
//                           type="text"
//                           placeholder="Enter Transaction Name"
//                           value={values.name}
//                           onChange={handleChange}
//                         />
//                       </Form.Group>

//                       <Form.Group className="mb-3" controlId="formAmount">
//                         <Form.Label>Amount</Form.Label>
//                         <Form.Control
//                           name="amount"
//                           type="number"
//                           placeholder="Enter your Amount"
//                           value={values.amount}
//                           onChange={handleChange}
//                         />
//                       </Form.Group>

//                       <Form.Group className="mb-3" controlId="formSelect">
//                         <Form.Label>Category</Form.Label>
//                         <Form.Select
//                           name="category"
//                           value={values.category}
//                           onChange={handleChange}
//                         >
//                           <option value="">Choose...</option>
//                           <option value="Groceries">Groceries</option>
//                           <option value="Rent">Rent</option>
//                           <option value="Salary">Salary</option>
//                           <option value="Tip">Tip</option>
//                           <option value="Food">Food</option>
//                           <option value="Medical">Medical</option>
//                           <option value="Utilities">Utilities</option>
//                           <option value="Entertainment">Entertainment</option>
//                           <option value="Transportation">Transportation</option>
//                           <option value="Other">Other</option>
//                         </Form.Select>
//                       </Form.Group>

//                       <Form.Group className="mb-3" controlId="formDescription">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="description"
//                           placeholder="Enter Description"
//                           value={values.description}
//                           onChange={handleChange}
//                         />
//                       </Form.Group>

//                       <Form.Group className="mb-3" controlId="formSelect1">
//                         <Form.Label>Transaction Type</Form.Label>
//                         <Form.Select
//                           name="transactionType"
//                           value={values.transactionType}
//                           onChange={handleChange}
//                         >
//                           <option value="">Choose...</option>
//                           <option value="credit">Credit</option>
//                           <option value="expense">Expense</option>
//                         </Form.Select>
//                       </Form.Group>

//                       <Form.Group className="mb-3" controlId="formDate">
//                         <Form.Label>Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="date"
//                           value={values.date}
//                           onChange={handleChange}
//                         />
//                       </Form.Group>

//                       {/* Add more form inputs as needed */}
//                     </Form>
//                   </Modal.Body>
//                   <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                       Close
//                     </Button>
//                     <Button variant="primary" onClick={handleSubmit} style={{
//                         backgroundColor: '#1976d2',
//                         border: 'none',
//                         color: 'white',
//                         padding: '10px 20px',
//                         borderRadius: '5px',
//                       }}>
//                       Submit
//                     </Button>
//                   </Modal.Footer>
//                 </Modal>
//               </div>
//             </div>
//             <br style={{ color: "white" }}></br>
//             <div>

//         <div>
      

//       {highestExpenseMonth && (
//         <div style={{ marginTop: "20px" }}>
//           <h4>Highest Expense Month:</h4>
//           <p>
//             <strong>Month:</strong> {getMonthName(highestExpenseMonth._id.month)}
//           </p>
//           <p>
//             <strong>Total Amount:</strong> Rs.{highestExpenseMonth.totalAmount.toFixed(2)}
//           </p>
//         </div>
//       )}
//     </div>

//       </div>
    
//             {frequency === "custom" ? (
//               <>
//                 <div className="date">
//                   <div className="form-group">
//                     <label htmlFor="startDate" className="text-black">
//                       Start Date:
//                     </label>
//                     <div>
//                       <DatePicker
//                         selected={startDate}
//                         onChange={handleStartChange}
//                         selectsStart
//                         startDate={startDate}
//                         endDate={endDate}
//                       />
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="endDate" className="text-black">
//                       End Date:
//                     </label>
//                     <div>
//                       <DatePicker
//                         selected={endDate}
//                         onChange={handleEndChange}
//                         selectsEnd
//                         startDate={startDate}
//                         endDate={endDate}
//                         minDate={startDate}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <></>
//             )}

//             <div className="containerBtn">
//               <Button variant="primary" onClick={handleReset}>
//                 Reset Filter
//               </Button>
//             </div>
//             {view === "table" ? (
//               <>
//                 <TableData data={transactions} user={cUser} />
//               </>
//             ) : (
//               <>
//                 <Analytics transactions={transactions} user={cUser} />
//               </>
//             )}
//             <ToastContainer />
//           </Container>
//         </>
//       )}
//     </>
//   );
// };

// export default Home;




import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Container } from "react-bootstrap";
import "./home.css";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import Analytics from "./Analytics";

const Home = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const [cUser, setcUser] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("all");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");
  const [highestExpenseMonth, setHighestExpenseMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleStartChange = (date) => {
    setStartDate(date);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const avatarFunc = async () => {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.isAvatarImageSet === false || user.avatarImage === "") {
          navigate("/setAvatar");
        }
        setcUser(user);
        setRefresh(true);
      } else {
        navigate("/login");
      }
    };

    avatarFunc();
  }, [navigate]);

  const fetchHighestExpenseMonth = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        // "http://localhost:8081/api/v1/transaction/highest-expense-month",
        "https://expensetracker-backend-jk4b.onrender.com/api/v1/transaction/highest-expense-month",
        {
          userId: cUser._id,
          year: selectedYear,
        }
      );

      const { data } = response;

      if (data.success) {
        setHighestExpenseMonth(data.highestExpenseMonth);
        toast.success("Fetched highest expense month successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error fetching highest expense month:", err);
      toast.error("Enter a valid Year");
    }
    setLoading(false);
  };

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, amount, description, category, date, transactionType } =
      values;

    if (
      !title ||
      !amount ||
      !description ||
      !category ||
      !date ||
      !transactionType
    ) {
      toast.error("Please enter all the fields", toastOptions);
    }
    setLoading(true);

    const { data } = await axios.post(addTransaction, {
      title: title,
      amount: amount,
      description: description,
      category: category,
      date: date,
      transactionType: transactionType,
      userId: cUser._id,
    });

    if (data.success === true) {
      toast.success(data.message, toastOptions);
      handleClose();
      setRefresh(!refresh);
    } else {
      toast.error(data.message, toastOptions);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("all");
    setSelectedYear(new Date().getFullYear());
    setHighestExpenseMonth(null); 
  };

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency: frequency,
          startDate: startDate,
          endDate: endDate,
          type: type,
        });
        setTransactions(data.transactions);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, [refresh, frequency, endDate, type, startDate]);

  const handleTableClick = () => {
    setView("table");
  };

  const handleChartClick = () => {
    setView("chart");
  };

  return (
    <>
      <Header />

      {loading ? (
        <Spinner />
      ) : (
        <Container
          style={{ position: "relative", zIndex: 2 }}
          className="mt-3"
        >
          <div style={{ marginBottom: "20px", display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="frequency" style={{ marginRight: '10px' }}>Select Frequency</label>
              {/* <select
                id="frequency"
                name="frequency"
                value={frequency}
                onChange={handleChangeFrequency}
                style={{ marginRight: '20px', padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
              >
                <option value="7">Last Week</option>
                <option value="30">Last Month</option>
                <option value="365">Last Year</option>
                <option value="custom">Custom</option>
              </select> */}
              <select
  id="frequency"
  name="frequency"
  value={frequency}
  onChange={handleChangeFrequency}
  style={{ marginRight: '20px', padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
>
  <option value="all">All Transactions</option> {/* Default value */}
  <option value="7">Last Week</option>
  <option value="30">Last Month</option>
  <option value="365">Last Year</option>
  <option value="custom">Custom</option>
</select>
              <label htmlFor="type" style={{ marginRight: '10px' }}>Type</label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={handleSetType}
                style={{ marginRight: '20px', padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
              >
                <option value="all">All</option>
                <option value="expense">Expense</option>
                <option value="credit">Income</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FormatListBulletedIcon
                sx={{ cursor: "pointer" }}
                onClick={handleTableClick}
                style={{
                  color: view === "table" ? '#1976d2' : '#757575',
                  fontSize: '24px',
                  marginRight: '10px',
                  transition: 'color 0.3s ease',
                  transform: view === "table" ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              <BarChartIcon
                sx={{ cursor: "pointer" }}
                onClick={handleChartClick}
                style={{
                  color: view === "chart" ? '#1976d2' : '#757575',
                  fontSize: '24px',
                  transition: 'color 0.3s ease',
                  transform: view === "chart" ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              <div style={{ marginLeft: '20px' }}>
                <label htmlFor="year" style={{ marginRight: '10px' }}>Select Year:</label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                >
                  {[...Array(5)].map((_, index) => {
                    const year = new Date().getFullYear() - index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                <button
                  onClick={fetchHighestExpenseMonth}
                  style={{
                    backgroundColor: "#1976d2",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Highest Expense Month"}
                </button>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Button
                onClick={handleShow}
                style={{
                  backgroundColor: '#1976d2',
                  border: 'none',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                }}
              >
                Add New
              </Button>
              <Button
                onClick={handleShow}
                className="mobileBtn"
                style={{
                  display: 'none',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  fontSize: '18px',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  textAlign: 'center',
                  lineHeight: '40px',
                }}
              >
                +
              </Button>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Add Transaction Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        type="text"
                        placeholder="Enter Transaction Name"
                        value={values.title}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        name="amount"
                        type="number"
                        placeholder="Enter your Amount"
                        value={values.amount}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Tip">Tip</option>
                        <option value="Food">Food</option>
                        <option value="Medical">Medical</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        name="description"
                        placeholder="Enter Description"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Transaction Type</Form.Label>
                      <Form.Select
                        name="transactionType"
                        value={values.transactionType}
                        onChange={handleChange}
                      >
                        <option value="">Choose...</option>
                        <option value="credit">Income</option>
                        <option value="expense">Expense</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: '#1976d2',
                      border: 'none',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '5px',
                    }}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            {highestExpenseMonth && (
              <div>
                <h4>Highest Expense Month:</h4>
                <p>
                  <strong>Month:</strong> {getMonthName(highestExpenseMonth._id.month)}
                </p>
                <p>
                  <strong>Total Amount:</strong> Rs.{highestExpenseMonth.totalAmount.toFixed(2)}
                </p>
              </div>
            )}
          </div>
          {frequency === "custom" && (
            <div className="date" style={{ marginTop: '20px' }}>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label htmlFor="startDate" className="text-black" style={{ marginRight: '10px' }}>
                  Start Date:
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate" className="text-black" style={{ marginRight: '10px' }}>
                  End Date:
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>
          )}
          <div className="containerBtn" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              variant="primary"
              onClick={handleReset}
              style={{
                backgroundColor: '#1976d2',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
              }}
            >
              Reset Filter
            </Button>
          </div>
          {view === "table" ? (
            <TableData data={transactions} user={cUser} />
          ) : (
            <Analytics transactions={transactions} user={cUser} />
          )}
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default Home;
