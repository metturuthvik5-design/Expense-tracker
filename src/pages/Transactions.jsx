import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { Link } from "react-router-dom";

const Transactions = () => {
  const context = useContext(ExpenseContext);

  const transactions = context?.transactions || [];
  const deleteTransaction = context?.deleteTransaction || (() => {});
  const editTransaction = context?.editTransaction || (() => {});

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const startEdit = (txn) => {
    setEditingId(txn.id);
    setEditData({
      description: txn.description || "",
      amount: txn.amount || "",
      category: txn.category || "",
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = () => {
    if (editTransaction) {
      editTransaction(editingId, editData);
    }
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Transactions</h2>

      <Link
        to="/dashboard"
        style={{
          color: "blue",
          textDecoration: "underline",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        ← Back to Dashboard
      </Link>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                {editingId === txn.id ? (
                  <>
                    <td>{txn.date}</td>

                    <td>
                      <input
                        type="text"
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        name="amount"
                        value={editData.amount}
                        onChange={handleEditChange}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                      />
                    </td>

                    <td>
                      <button onClick={saveEdit}>Save</button>

                      <button onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{txn.date}</td>
                    <td>{txn.description}</td>
                    <td>₹{txn.amount}</td>
                    <td>{txn.category}</td>

                    <td>
                      <button onClick={() => startEdit(txn)}>
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTransaction(txn.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;