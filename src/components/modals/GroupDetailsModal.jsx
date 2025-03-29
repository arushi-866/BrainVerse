import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function GroupDetailsModal({ isOpen, onClose, group }) {
  if (!group) return null;

  const transactions = [
    {
      id: 1,
      description: 'Dinner at Restaurant',
      amount: 1200,
      paidBy: 'John Doe',
      date: '2024-02-15',
      status: 'pending'
    },
    {
      id: 2,
      description: 'Movie Tickets',
      amount: 800,
      paidBy: 'Jane Smith',
      date: '2024-02-14',
      status: 'settled'
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.button>
            </div>

            <div className="space-y-8">
              {/* Group Members */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Members</h3>
                <div className="flex flex-wrap gap-4">
                  {Array.from({ length: group.members }).map((_, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2"
                    >
                      <UserCircleIcon className="h-6 w-6 text-gray-600" />
                      <span className="text-sm text-gray-700">Member {index + 1}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Transactions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transactions</h3>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
                          <p className="text-sm text-gray-600">Paid by {transaction.paidBy}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₹{transaction.amount}</p>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              transaction.status === 'settled'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}