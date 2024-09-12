import express from 'express';
import { addTransactionController, deleteTransactionController, getAllTransactionController, updateTransactionController,getHighestExpenseMonth } from '../controllers/transactionController.js';

const router = express.Router();

router.route("/addTransaction").post(addTransactionController);
router.route("/getTransaction").post(getAllTransactionController);
router.route("/deleteTransaction/:id").post(deleteTransactionController);
router.route('/updateTransaction/:id').put(updateTransactionController);
router.route('/transaction/highest-expense-month').post(getHighestExpenseMonth);


export default router;