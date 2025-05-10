import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function AddExpenseModal({ isOpen, onClose }) {
  const [expenseData, setExpenseData] = useState({
    title: '',
    amount: '',
    paidBy: 'single',
    payers: [{ name: '', amount: '' }],
    participants: [],
    deadline: '',
    interestRate: '0',
    currency: 'INR',
    date: new Date().toISOString().split('T')[0],
  });

  const currencies = [
    { code: 'INR', symbol: '₹' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'JPY', symbol: '¥' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle expense creation logic here
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Expense</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expense Title
                  </label>
                  <input
                    type="text"
                    value={expenseData.title}
                    onChange={(e) => setExpenseData({ ...expenseData, title: e.target.value })}
                    className="input-primary"
                    placeholder="Enter expense title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={expenseData.currency}
                      onChange={(e) => setExpenseData({ ...expenseData, currency: e.target.value })}
                      className="input-primary w-24"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={expenseData.amount}
                      onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                      className="input-primary flex-1"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Type
                  </label>
                  <select
                    value={expenseData.paidBy}
                    onChange={(e) => setExpenseData({ ...expenseData, paidBy: e.target.value })}
                    className="input-primary"
                  >
                    <option value="single">Paid by one person</option>
                    <option value="multiple">Split payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={expenseData.date}
                    onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                    className="input-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Deadline
                  </label>
                  <input
                    type="date"
                    value={expenseData.deadline}
                    onChange={(e) => setExpenseData({ ...expenseData, deadline: e.target.value })}
                    className="input-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    value={expenseData.interestRate}
                    onChange={(e) => setExpenseData({ ...expenseData, interestRate: e.target.value })}
                    className="input-primary"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Participants
                </label>
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700"
                  >
                    <UserGroupIcon className="h-5 w-5" />
                    <span>Select Participants</span>
                  </motion.button>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary"
              >
                Add Expense
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}