import Transaction from "../models/TransactionModel.js";
import User from "../models/UserSchema.js";
import moment from "moment";

export const addTransactionController = async (req, res) => {
  try {
    const {
      title,
      amount,
      description,
      date,
      category,
      userId,
      transactionType,
    } = req.body;
    // console.log(title, amount, description, date, category, userId, transactionType);
    if (
      !title ||
      !amount ||
      !description ||
      !date ||
      !category ||
      !transactionType
    ) {
      return res.status(408).json({
        success: false,
        messages: "Please Fill all fields",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    let newTransaction = await Transaction.create({
      title: title,
      amount: amount,
      category: category,
      description: description,
      date: date,
      user: userId,
      transactionType: transactionType,
    });
    user.transactions.push(newTransaction);
    user.save();
    return res.status(200).json({
      success: true,
      message: "Transaction Added Successfully",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

// export const getAllTransactionController = async (req, res) => {
//   try {
//     const { userId, type, frequency, startDate, endDate } = req.body;
//     console.log(userId, type, frequency, startDate, endDate);
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     // Create a query object with the user and type conditions
//     const query = {
//       user: userId,
//     };
//     if (type !== 'all') {
//       query.transactionType = type;
//     }
//     // Add date conditions based on 'frequency' and 'custom' range
//     if (frequency !== 'custom') {
//       query.date = {
//         $gt: moment().subtract(Number(frequency), "days").toDate()
//       };
//     } else if (startDate && endDate) {
//       query.date = {
//         $gte: moment(startDate).toDate(),
//         $lte: moment(endDate).toDate(),
//       };
//     }
//     // console.log(query);
//     const transactions = await Transaction.find(query);
//     // console.log(transactions);
//     return res.status(200).json({
//       success: true,
//       transactions: transactions,
//     });
//   } catch (err) {
//     return res.status(401).json({
//       success: false,
//       messages: err.message,
//     });
//   }
// };


export const getAllTransactionController = async (req, res) => {
  try {
    const { userId, type = 'all', frequency = 'all', startDate, endDate } = req.body;
    console.log(userId, type, frequency, startDate, endDate);
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Build query to filter transactions by user
    const query = { user: userId };

    // Filter by type if not 'all'
    if (type !== 'all') {
      query.transactionType = type;
    }

    // Handle frequency or custom date range
    if (frequency !== 'all') {
      if (frequency !== 'custom') {
        query.date = {
          $gt: moment().subtract(Number(frequency), "days").toDate(),
        };
      } else if (startDate && endDate) {
        // Validate dates
        if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
          return res.status(400).json({
            success: false,
            message: "Invalid date range provided.",
          });
        }

        query.date = {
          $gte: moment(startDate).toDate(),
          $lte: moment(endDate).toDate(),
        };
      }
    }

    // Fetch transactions based on query
    const transactions = await Transaction.find(query);

    // If no transactions found
    if (transactions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No transactions found for the given criteria.",
        transactions: [],
      });
    }

    // Return all transactions
    return res.status(200).json({
      success: true,
      transactions,
    });

  } catch (err) {
    // Log error for debugging
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.body.userId;
    // console.log(transactionId, userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const transactionElement = await Transaction.findByIdAndDelete(
      transactionId
    );
    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "transaction not found",
      });
    }
    const transactionArr = user.transactions.filter(
      (transaction) => transaction._id === transactionId
    );
    user.transactions = transactionArr;
    user.save();
    // await transactionElement.remove();
    return res.status(200).json({
      success: true,
      message: `Transaction successfully deleted`,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

export const updateTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { title, amount, description, date, category, transactionType } =
      req.body;
    console.log(title, amount, description, date, category, transactionType);
    const transactionElement = await Transaction.findById(transactionId);
    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "transaction not found",
      });
    }
    if (title) {
      transactionElement.title = title;
    }
    if (description) {
      transactionElement.description = description;
    }
    if (amount) {
      transactionElement.amount = amount;
    }
    if (category) {
      transactionElement.category = category;
    }
    if (transactionType) {
      transactionElement.transactionType = transactionType;
    }
    if (date) {
      transactionElement.date = date;
    }
    await transactionElement.save();
    // await transactionElement.remove();
    return res.status(200).json({
      success: true,
      message: `Transaction Updated Successfully`,
      transaction: transactionElement,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};



// export const getHighestExpenseMonth = async (req, res) => {
//   try {
//     const { userId, year } = req.body;

//     // Ensure the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Get all expenses for the specified year
//     const expenses = await Transaction.aggregate([
//       {
//         $match: {
//           user: userId,
//           transactionType: "expense",
//           date: {
//             $gte: new Date(`${year}-01-01`),
//             $lte: new Date(`${year}-12-31`)
//           }
//         }
//       },
//       {
//         $group: {
//           _id: { month: { $month: "$date" } },
//           totalAmount: { $sum: "$amount" }
//         }
//       },
//       {
//         $sort: { totalAmount: -1 }
//       },
//       {
//         $limit: 1
//       }
//     ]);

//     // Check if there are expenses
//     if (expenses.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No expenses found for this year",
//       });
//     }

//     // Respond with the highest expense month
//     return res.status(200).json({
//       success: true,
//       highestExpenseMonth: expenses[0],
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


export const getHighestExpenseMonth = async (req, res) => {
  try {
    const { userId, year } = req.body;

    // Validate the year
    if (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear()) {
      return res.status(400).json({
        success: false,
        message: "Invalid year provided",
      });
    }

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Get all expenses for the specified year
    const expenses = await Transaction.aggregate([
      {
        $match: {
          user: user._id,
          transactionType: "expense",
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { totalAmount: -1 }
      },
      {
        $limit: 1
      }
    ]);

    // Check if there are expenses
    if (expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expenses found for this year",
      });
    }

    // Respond with the highest expense month
    return res.status(200).json({
      success: true,
      highestExpenseMonth: expenses[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

