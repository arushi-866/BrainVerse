import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const TabsContext = React.createContext(null);

const Tabs = React.forwardRef(({ 
  defaultValue, 
  className, 
  children, 
  onValueChange,
  ...props 
}, ref) => {
  const [currentValue, setCurrentValue] = React.useState(defaultValue);
  const tabsRef = React.useRef(null);

  const handleValueChange = (value) => {
    setCurrentValue(value);
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ currentValue, handleValueChange }}>
      <div 
        ref={tabsRef}
        className={className} 
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ 
  value, 
  className, 
  children, 
  ...props 
}, ref) => {
  const { currentValue, handleValueChange } = React.useContext(TabsContext);

  return (
    <button
      ref={ref}
      className={className}
      onClick={() => handleValueChange(value)}
      data-state={currentValue === value ? "active" : "inactive"}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ 
  value, 
  className, 
  children, 
  ...props 
}, ref) => {
  const { currentValue } = React.useContext(TabsContext);

  return (
    <AnimatePresence mode="wait">
      {currentValue === value && (
        <motion.div
          ref={ref}
          key={value} // Make sure key is unique
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={className}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };