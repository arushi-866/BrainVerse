import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export default function CreateGroupModal({ isOpen, onClose }) {
  const [groupTitle, setGroupTitle] = useState('');
  const [participants, setParticipants] = useState([{ email: '', name: '' }]);

  const addParticipant = () => {
    setParticipants([...participants, { email: '', name: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle group creation logic here
    onClose();
  };

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
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Group</h2>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Title
                </label>
                <input
                  type="text"
                  value={groupTitle}
                  onChange={(e) => setGroupTitle(e.target.value)}
                  className="input-primary"
                  placeholder="Enter group title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Participants
                </label>
                <div className="space-y-4">
                  {participants.map((participant, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4"
                    >
                      <input
                        type="text"
                        value={participant.name}
                        onChange={(e) => {
                          const newParticipants = [...participants];
                          newParticipants[index].name = e.target.value;
                          setParticipants(newParticipants);
                        }}
                        className="input-primary"
                        placeholder="Name"
                        required
                      />
                      <input
                        type="email"
                        value={participant.email}
                        onChange={(e) => {
                          const newParticipants = [...participants];
                          newParticipants[index].email = e.target.value;
                          setParticipants(newParticipants);
                        }}
                        className="input-primary"
                        placeholder="Email"
                        required
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  type="button"
                  onClick={addParticipant}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                >
                  <UserPlusIcon className="h-5 w-5" />
                  <span>Add Participant</span>
                </motion.button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary"
              >
                Create Group
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}