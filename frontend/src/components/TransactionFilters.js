// src/components/TransactionFilters.js
import React from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransactionFilters = ({ filters, setFilters, fetchHighestExpenseMonth, selectedYear, setSelectedYear }) => {
  const handleFrequencyChange = (e) => setFilters({ ...filters, frequency: e.target.value });
  const handleTypeChange = (e) => setFilters({ ...filters, type: e.target.value });
  const handleStartDateChange = (date) => setFilters({ ...filters, startDate: date });
  const handleEndDateChange = (date) => setFilters({ ...filters, endDate: date });
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  return (
    <Form className="mb-3">
      <Form.Group controlId="frequency">
        <Form.Label>Select Frequency</Form.Label>
        <Form.Control as="select" value={filters.frequency} onChange={handleFrequencyChange}>
          <option value="all">All</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="transactionType">
        <Form.Label>Select Type</Form.Label>
        <Form.Control as="select" value={filters.type} onChange={handleTypeChange}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <DatePicker selected={filters.startDate} onChange={handleStartDateChange} />
      </Form.Group>

      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <DatePicker selected={filters.endDate} onChange={handleEndDateChange} />
      </Form.Group>

      <Form.Group controlId="year">
        <Form.Label>Year</Form.Label>
        <Form.Control type="number" value={selectedYear} onChange={handleYearChange} />
        <Button variant="primary" onClick={fetchHighestExpenseMonth}>
          Fetch Highest Expense Month
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TransactionFilters;
