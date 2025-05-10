import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Custom Components
const Input = ({ placeholder, value, onChange, className }) => (
  <input 
    type="text" 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`} 
  />
)

const PantryItem = ({ item, onUpdate, onDelete, onAddToShopping }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState({ ...item })

  const handleSave = () => {
    onUpdate(editedItem)
    setIsEditing(false)
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2">
        {isEditing ? (
          <input 
            type="text" 
            value={editedItem.name} 
            onChange={(e) => setEditedItem({...editedItem, name: e.target.value})}
            className="w-full border rounded px-2 py-1"
          />
        ) : (
          item.name
        )}
      </td>
      <td className="py-2">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              value={editedItem.quantity} 
              onChange={(e) => setEditedItem({...editedItem, quantity: Number(e.target.value)})}
              className="w-20 border rounded px-2 py-1"
            />
            <input 
              type="text" 
              value={editedItem.unit} 
              onChange={(e) => setEditedItem({...editedItem, unit: e.target.value})}
              className="w-20 border rounded px-2 py-1"
            />
          </div>
        ) : (
          `${item.quantity} ${item.unit}`
        )}
      </td>
      <td className="py-2 text-right">
        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <button 
              onClick={handleSave} 
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button 
              onClick={() => onAddToShopping(item)} 
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Add to Shopping
            </button>
            <button 
              onClick={() => onDelete(item.id)} 
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

const ShoppingItem = ({ item, onUpdate, onDelete, onAddToPantry }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedItem, setEditedItem] = useState({ ...item })

  const handleSave = () => {
    onUpdate(editedItem)
    setIsEditing(false)
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2">
        {isEditing ? (
          <input 
            type="text" 
            value={editedItem.name} 
            onChange={(e) => setEditedItem({...editedItem, name: e.target.value})}
            className="w-full border rounded px-2 py-1"
          />
        ) : (
          item.name
        )}
      </td>
      <td className="py-2">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              value={editedItem.quantity} 
              onChange={(e) => setEditedItem({...editedItem, quantity: Number(e.target.value)})}
              className="w-20 border rounded px-2 py-1"
            />
            <input 
              type="text" 
              value={editedItem.unit} 
              onChange={(e) => setEditedItem({...editedItem, unit: e.target.value})}
              className="w-20 border rounded px-2 py-1"
            />
          </div>
        ) : (
          `${item.quantity} ${item.unit}`
        )}
      </td>
      <td className="py-2 text-right">
        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <button 
              onClick={handleSave} 
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button 
              onClick={() => onAddToPantry(item)} 
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Add to Pantry
            </button>
            <button 
              onClick={() => onDelete(item.id)} 
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

const ThresholdItem = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedThreshold, setEditedThreshold] = useState(item.threshold)

  const handleSave = () => {
    onUpdate({ ...item, threshold: editedThreshold })
    setIsEditing(false)
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2">{item.itemName}</td>
      <td className="py-2">
        {isEditing ? (
          <input 
            type="number" 
            value={editedThreshold} 
            onChange={(e) => setEditedThreshold(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        ) : (
          `${item.threshold} ${item.unit}`
        )}
      </td>
      <td className="py-2 text-right">
        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <button 
              onClick={handleSave} 
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(item.id)} 
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

const AddPantryItem = ({ onAddItem }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('pcs')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    onAddItem({ name, quantity, unit })
    setName('')
    setQuantity(1)
    setUnit('pcs')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex space-x-2">
        <input 
          type="text" 
          placeholder="Item name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="flex-grow border rounded px-2 py-1" 
        />
        <input 
          type="number" 
          placeholder="Qty" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1" 
        />
        <input 
          type="text" 
          placeholder="Unit" 
          value={unit} 
          onChange={(e) => setUnit(e.target.value)}
          className="w-20 border rounded px-2 py-1" 
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </form>
  )
}

const AddShoppingItem = ({ onAddItem }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('pcs')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    onAddItem({ name, quantity, unit })
    setName('')
    setQuantity(1)
    setUnit('pcs')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex space-x-2">
        <input 
          type="text" 
          placeholder="Item name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="flex-grow border rounded px-2 py-1" 
        />
        <input 
          type="number" 
          placeholder="Qty" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1" 
        />
        <input 
          type="text" 
          placeholder="Unit" 
          value={unit} 
          onChange={(e) => setUnit(e.target.value)}
          className="w-20 border rounded px-2 py-1" 
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </form>
  )
}

const AddThreshold = ({ pantryItems, onAddThreshold }) => {
  const [selectedItem, setSelectedItem] = useState('')
  const [threshold, setThreshold] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedItem) return

    const item = pantryItems.find(i => i.id === selectedItem)
    if (item) {
      onAddThreshold({
        itemId: item.id,
        itemName: item.name,
        threshold,
        unit: item.unit
      })
      setSelectedItem('')
      setThreshold(1)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex space-x-2">
        <select 
          value={selectedItem} 
          onChange={(e) => setSelectedItem(e.target.value)}
          className="flex-grow border rounded px-2 py-1"
        >
          <option value="">Select an item</option>
          {pantryItems.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Threshold" 
          value={threshold} 
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1" 
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Threshold
        </button>
      </div>
    </form>
  )
}

export default function SmartPantryManager() {
  const [pantryItems, setPantryItems] = useState([])
  const [shoppingItems, setShoppingItems] = useState([])
  const [thresholds, setThresholds] = useState([])
  const [pantrySearch, setPantrySearch] = useState("")

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadedPantryItems = localStorage.getItem("pantryItems")
    const loadedShoppingItems = localStorage.getItem("shoppingItems")
    const loadedThresholds = localStorage.getItem("thresholds")

    if (loadedPantryItems) setPantryItems(JSON.parse(loadedPantryItems))
    if (loadedShoppingItems) setShoppingItems(JSON.parse(loadedShoppingItems))
    if (loadedThresholds) setThresholds(JSON.parse(loadedThresholds))
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pantryItems", JSON.stringify(pantryItems))
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems))
    localStorage.setItem("thresholds", JSON.stringify(thresholds))

    // Check thresholds
    checkThresholds()
  }, [pantryItems, shoppingItems, thresholds])

  // Function to normalize item names (lowercase)
  const normalizeItemName = (name) => {
    return name.toLowerCase().trim()
  }

  // Add item to pantry
  const addPantryItem = (newItem) => {
    const normalizedName = normalizeItemName(newItem.name)

    // Check if item already exists (case insensitive)
    const existingItemIndex = pantryItems.findIndex((item) => normalizeItemName(item.name) === normalizedName)

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...pantryItems]
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        unit: newItem.unit, // Update unit if it changed
      }
      setPantryItems(updatedItems)
    } else {
      // Add new item
      setPantryItems([
        ...pantryItems,
        {
          id: uuidv4(),
          name: newItem.name,
          quantity: newItem.quantity,
          unit: newItem.unit,
        },
      ])
    }
  }

  // Update pantry item
  const updatePantryItem = (updatedItem) => {
    setPantryItems(pantryItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  // Delete pantry item
  const deletePantryItem = (itemId) => {
    setPantryItems(pantryItems.filter((item) => item.id !== itemId))

    // Also delete any thresholds for this item
    setThresholds(thresholds.filter((threshold) => threshold.itemId !== itemId))
  }

  // Add item to shopping list
  const addShoppingItem = (newItem) => {
    const normalizedName = normalizeItemName(newItem.name)

    // Check if item already exists (case insensitive)
    const existingItemIndex = shoppingItems.findIndex((item) => normalizeItemName(item.name) === normalizedName)

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...shoppingItems]
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        unit: newItem.unit, // Update unit if it changed
      }
      setShoppingItems(updatedItems)
    } else {
      // Add new item
      setShoppingItems([
        ...shoppingItems,
        {
          id: uuidv4(),
          name: newItem.name,
          quantity: newItem.quantity,
          unit: newItem.unit,
        },
      ])
    }
  }

  // Update shopping item
  const updateShoppingItem = (updatedItem) => {
    setShoppingItems(shoppingItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  // Delete shopping item
  const deleteShoppingItem = (itemId) => {
    setShoppingItems(shoppingItems.filter((item) => item.id !== itemId))
  }

  // Add threshold
  const addThreshold = (newThreshold) => {
    const existingThresholdIndex = thresholds.findIndex((threshold) => threshold.itemId === newThreshold.itemId)

    if (existingThresholdIndex >= 0) {
      // Update existing threshold
      const updatedThresholds = [...thresholds]
      updatedThresholds[existingThresholdIndex] = {
        ...updatedThresholds[existingThresholdIndex],
        threshold: newThreshold.threshold,
      }
      setThresholds(updatedThresholds)
    } else {
      // Add new threshold
      setThresholds([
        ...thresholds,
        {
          id: uuidv4(),
          itemId: newThreshold.itemId,
          itemName: newThreshold.itemName,
          threshold: newThreshold.threshold,
          unit: newThreshold.unit,
        },
      ])
    }
  }

  // Update threshold
  const updateThreshold = (updatedThreshold) => {
    setThresholds(thresholds.map((threshold) => (threshold.id === updatedThreshold.id ? updatedThreshold : threshold)))
  }

  // Delete threshold
  const deleteThreshold = (thresholdId) => {
    setThresholds(thresholds.filter((threshold) => threshold.id !== thresholdId))
  }

  // Check thresholds and add items to shopping list if needed
  const checkThresholds = () => {
    thresholds.forEach((threshold) => {
      const pantryItem = pantryItems.find((item) => item.id === threshold.itemId)

      if (pantryItem && pantryItem.quantity < threshold.threshold) {
        // Check if item is already in shopping list
        const normalizedName = normalizeItemName(pantryItem.name)
        const existingInShoppingList = shoppingItems.some((item) => normalizeItemName(item.name) === normalizedName)

        if (!existingInShoppingList) {
          // Add to shopping list
          addShoppingItem({
            name: pantryItem.name,
            quantity: threshold.threshold - pantryItem.quantity,
            unit: pantryItem.unit,
          })
        }
      }
    })
  }

  // Filter pantry items based on search
  const filteredPantryItems = pantryItems.filter((item) => item.name.toLowerCase().includes(pantrySearch.toLowerCase()))

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">Smart Pantry Manager</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pantry Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-green-700 mb-1">Your Pantry</h2>
            <p className="text-gray-500 text-sm mb-4">Track your available ingredients</p>

            <Input
              placeholder="Search pantry items..."
              value={pantrySearch}
              onChange={(e) => setPantrySearch(e.target.value)}
              className="mb-4"
            />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Item</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPantryItems.length > 0 ? (
                    filteredPantryItems.map((item) => (
                      <PantryItem
                        key={item.id}
                        item={item}
                        onUpdate={updatePantryItem}
                        onDelete={deletePantryItem}
                        onAddToShopping={addShoppingItem}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500">
                        No items in your pantry. Add your first item below.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <AddPantryItem onAddItem={addPantryItem} />
            </div>
          </div>

          {/* Shopping List Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-green-700 mb-1">Your Shopping List</h2>
            <p className="text-gray-500 text-sm mb-4">Items you need to purchase</p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Item</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shoppingItems.length > 0 ? (
                    shoppingItems.map((item) => (
                      <ShoppingItem
                        key={item.id}
                        item={item}
                        onUpdate={updateShoppingItem}
                        onDelete={deleteShoppingItem}
                        onAddToPantry={addPantryItem}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500">
                        Your shopping list is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <AddShoppingItem onAddItem={addShoppingItem} />
            </div>
          </div>
        </div>

        {/* Thresholds Section */}
        <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-green-700 mb-1">Set Thresholds for Item Count</h2>
          <p className="text-gray-500 text-sm mb-4">
            When pantry items fall below these thresholds, they'll be automatically added to your shopping list
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Item</th>
                  <th className="py-2">Minimum Threshold</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {thresholds.length > 0 ? (
                  thresholds.map((threshold) => (
                    <ThresholdItem
                      key={threshold.id}
                      item={threshold}
                      onUpdate={updateThreshold}
                      onDelete={deleteThreshold}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500">
                      No thresholds set. Add your first threshold below.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <AddThreshold pantryItems={pantryItems} onAddThreshold={addThreshold} />
          </div>
        </div>
      </div>
    </main>
  )
}